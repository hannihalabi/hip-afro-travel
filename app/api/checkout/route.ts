import { NextResponse } from "next/server";
import Stripe from "stripe";

const PROMOTION_CODE = "START26";
const PROMOTION_AMOUNT = 700_000;
const PROMOTION_CURRENCY = "sek";
const PROMOTION_COUPON_ID = "hipafro_start26_7000_sek";

// Priserna sätts här på servern – frontend skickar bara ett trip-id och kan
// aldrig påverka beloppet.
type CheckoutLocale = "sv" | "en" | "de" | "fr" | "es";

const SUPPORTED_LOCALES = new Set<CheckoutLocale>(["sv", "en", "de", "fr", "es"]);

const CHECKOUT_COPY: Record<CheckoutLocale, { trip: string; description: string }> = {
  sv: {
    trip: "Kundaliniyoga & hormonell balans med Ewa",
    description: "7 dagar i Gambia. Del i dubbelrum. Boende i Yogavilla, frukost, middag enligt reseprogrammet, transfer, workshops och utflykter enligt resebeskrivningen ingår. Flyg och personliga kostnader ingår inte. Bokningen blir bindande efter genomförd betalning och bekräftelse från Hipafrotravel.",
  },
  en: {
    trip: "Kundalini yoga & hormonal balance with Ewa",
    description: "7 days in The Gambia. Shared double room. Accommodation at Yogavilla, breakfast, dinner according to the itinerary, transfers, workshops and excursions described in the trip are included. Flights and personal expenses are not included. The booking becomes binding after completed payment and confirmation from Hipafrotravel.",
  },
  de: {
    trip: "Kundalini-Yoga & hormonelles Gleichgewicht mit Ewa",
    description: "7 Tage in Gambia. Unterbringung im Doppelzimmer. Unterkunft in der Yogavilla, Frühstück, Abendessen laut Reiseprogramm, Transfers, Workshops und die beschriebenen Ausflüge sind inklusive. Flüge und persönliche Ausgaben sind nicht inbegriffen. Die Buchung wird nach erfolgter Zahlung und Bestätigung durch Hipafrotravel verbindlich.",
  },
  fr: {
    trip: "Kundalini yoga & équilibre hormonal avec Ewa",
    description: "7 jours en Gambie. Chambre double partagée. L’hébergement à la Yogavilla, le petit-déjeuner, les dîners prévus au programme, les transferts, les ateliers et les excursions décrites sont inclus. Les vols et les dépenses personnelles ne sont pas inclus. La réservation devient ferme après paiement et confirmation par Hipafrotravel.",
  },
  es: {
    trip: "Kundalini yoga y equilibrio hormonal con Ewa",
    description: "7 días en Gambia. Habitación doble compartida. Se incluyen el alojamiento en Yogavilla, el desayuno, las cenas según el programa, los traslados, los talleres y las excursiones descritas. Los vuelos y los gastos personales no están incluidos. La reserva será vinculante una vez realizado el pago y recibida la confirmación de Hipafrotravel.",
  },
};

const TRIPS: Record<
  string,
  { dates: Record<CheckoutLocale, string>; unitAmount: number }
> = {
  "resa-1": {
    dates: {
      sv: "10–17 feb 2027",
      en: "10–17 Feb 2027",
      de: "10.–17. Feb. 2027",
      fr: "10–17 févr. 2027",
      es: "10–17 feb 2027",
    },
    unitAmount: 1_700_000,
  },
  "resa-2": {
    dates: {
      sv: "21–28 feb 2027",
      en: "21–28 Feb 2027",
      de: "21.–28. Feb. 2027",
      fr: "21–28 févr. 2027",
      es: "21–28 feb 2027",
    },
    unitAmount: 1_700_000,
  },
};

function assertCorrectPromotion(promotionCode: Stripe.PromotionCode) {
  const coupon = promotionCode.promotion.coupon;

  if (
    !coupon ||
    typeof coupon === "string" ||
    coupon.amount_off !== PROMOTION_AMOUNT ||
    coupon.currency !== PROMOTION_CURRENCY ||
    !coupon.valid
  ) {
    throw new Error(
      `${PROMOTION_CODE} finns redan i Stripe men ger inte 7 000 kr rabatt`
    );
  }
}

async function findPromotionCode(stripe: Stripe) {
  const promotionCodes = await stripe.promotionCodes.list({
    active: true,
    code: PROMOTION_CODE,
    expand: ["data.promotion.coupon"],
    limit: 1,
  });

  return promotionCodes.data[0];
}

async function ensurePromotionCode(stripe: Stripe) {
  const existingPromotionCode = await findPromotionCode(stripe);
  if (existingPromotionCode) {
    assertCorrectPromotion(existingPromotionCode);
    return;
  }

  let coupon: Stripe.Coupon;
  try {
    coupon = await stripe.coupons.retrieve(PROMOTION_COUPON_ID);
  } catch (error) {
    if (
      !(error instanceof Stripe.errors.StripeInvalidRequestError) ||
      error.code !== "resource_missing"
    ) {
      throw error;
    }

    coupon = await stripe.coupons.create({
      id: PROMOTION_COUPON_ID,
      name: `${PROMOTION_CODE} · 7 000 kr rabatt`,
      amount_off: PROMOTION_AMOUNT,
      currency: PROMOTION_CURRENCY,
      duration: "once",
      metadata: { promotion_code: PROMOTION_CODE },
    });
  }

  if (
    coupon.amount_off !== PROMOTION_AMOUNT ||
    coupon.currency !== PROMOTION_CURRENCY ||
    !coupon.valid
  ) {
    throw new Error(
      `Stripe-kupongen ${PROMOTION_COUPON_ID} har fel rabattbelopp`
    );
  }

  try {
    await stripe.promotionCodes.create({
      code: PROMOTION_CODE,
      promotion: { type: "coupon", coupon: coupon.id },
      metadata: { discount_sek: "7000" },
    });
  } catch (error) {
    // Två samtidiga kalla starter kan försöka skapa koden samtidigt. Om den
    // andra hann först accepterar vi den, men bara om rabatten är korrekt.
    const concurrentlyCreatedPromotionCode = await findPromotionCode(stripe);
    if (!concurrentlyCreatedPromotionCode) {
      throw error;
    }
    assertCorrectPromotion(concurrentlyCreatedPromotionCode);
  }
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY är inte satt");
    return NextResponse.json(
      { error: "Betalning är inte konfigurerad" },
      { status: 500 }
    );
  }

  let tripId: unknown;
  let requestedLocale: unknown;
  try {
    ({ tripId, locale: requestedLocale } = await request.json());
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan" }, { status: 400 });
  }

  const trip = typeof tripId === "string" ? TRIPS[tripId] : undefined;
  if (!trip || typeof tripId !== "string") {
    return NextResponse.json({ error: "Okänd resa" }, { status: 400 });
  }

  const locale: CheckoutLocale =
    typeof requestedLocale === "string" &&
    SUPPORTED_LOCALES.has(requestedLocale as CheckoutLocale)
      ? (requestedLocale as CheckoutLocale)
      : "sv";
  const copy = CHECKOUT_COPY[locale];

  const origin =
    request.headers.get("origin") ?? new URL(request.url).origin;

  try {
    const stripe = new Stripe(secretKey);
    await ensurePromotionCode(stripe);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale,
      allow_promotion_codes: true,
      payment_method_types: ["card", "klarna"],
      line_items: [
        {
          quantity: 1,
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 6 },
          price_data: {
            currency: "sek",
            unit_amount: trip.unitAmount,
            product_data: {
              name: `${copy.trip} · ${trip.dates[locale]}`,
              description: copy.description,
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      metadata: { tripId },
      success_url: `${origin}/tack/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#boka`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Kunde inte skapa Checkout Session", error);
    return NextResponse.json(
      { error: "Kunde inte starta betalningen" },
      { status: 502 }
    );
  }
}
