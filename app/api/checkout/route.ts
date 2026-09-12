import { NextResponse } from "next/server";
import Stripe from "stripe";

const PROMOTION_CODE = "START26";
const PROMOTION_AMOUNT = 700_000;
const PROMOTION_CURRENCY = "sek";
const PROMOTION_COUPON_ID = "hipafro_start26_7000_sek";

// Priserna sätts här på servern – frontend skickar bara ett trip-id och kan
// aldrig påverka beloppet.
const TRIPS: Record<
  string,
  { name: string; description: string; unitAmount: number }
> = {
  "resa-1": {
    name: "Kundaliniyoga & hormonell balans med Ewa · 10–17 feb 2026",
    description:
      "7 dagar i Gambia. Del i dubbelrum. Boende i Yogavilla, frukost, middag, transfer, workshops och utflykter enligt resebeskrivningen ingår. Flyg bokas separat. Bokningen bekräftas av Hipafrotravel efter genomförd betalning.",
    unitAmount: 1_700_000,
  },
  "resa-2": {
    name: "Kundaliniyoga & hormonell balans med Ewa · 21–28 feb 2026",
    description:
      "7 dagar i Gambia. Del i dubbelrum. Boende i Yogavilla, frukost, middag, transfer, workshops och utflykter enligt resebeskrivningen ingår. Flyg bokas separat. Bokningen bekräftas av Hipafrotravel efter genomförd betalning.",
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
  try {
    ({ tripId } = await request.json());
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan" }, { status: 400 });
  }

  const trip = typeof tripId === "string" ? TRIPS[tripId] : undefined;
  if (!trip || typeof tripId !== "string") {
    return NextResponse.json({ error: "Okänd resa" }, { status: 400 });
  }

  const origin =
    request.headers.get("origin") ?? new URL(request.url).origin;

  try {
    const stripe = new Stripe(secretKey);
    await ensurePromotionCode(stripe);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "sv",
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
              name: trip.name,
              description: trip.description,
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
