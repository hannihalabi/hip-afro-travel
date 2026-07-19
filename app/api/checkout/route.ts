import { NextResponse } from "next/server";
import Stripe from "stripe";

// Priserna sätts här på servern – frontend skickar bara ett trip-id och kan
// aldrig påverka beloppet.
const TRIPS: Record<
  string,
  { name: string; description: string; unitAmount: number }
> = {
  "ewa-november": {
    name: "Kundaliniyoga & hormonell balans med Ewa · 8–15 nov 2026",
    description:
      "7 dagar i Gambia. Del i dubbelrum. Boende, transfer, utflykter och matmeny med fisk, kött, vegetariskt och veganskt ingår – flyg bokas separat.",
    unitAmount: 1_700_000,
  },
  "ewa-februari": {
    name: "Kundaliniyoga & hormonell balans med Ewa · 14–21 feb 2027",
    description:
      "7 dagar i Gambia. Del i dubbelrum. Boende, transfer, utflykter och matmeny med fisk, kött, vegetariskt och veganskt ingår – flyg bokas separat.",
    unitAmount: 1_700_000,
  },
  delta: {
    name: "Träningsresa med Delta · 21–28 feb 2027",
    description:
      "7 dagar i Gambia. Del i dubbelrum. Boende, transfer, utflykter och matmeny med fisk, kött, vegetariskt och veganskt ingår – flyg bokas separat.",
    unitAmount: 1_700_000,
  },
};

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
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "sv",
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
