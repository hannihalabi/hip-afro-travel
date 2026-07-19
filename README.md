# Hip Afro Travel

Webbplats för Hip Afro Travels gruppresor till Gambia. Projektet är byggt med
Next.js, React och TypeScript och deployas som en sammanhållen applikation på
Vercel.

## Lokal utveckling

Installera beroenden och starta utvecklingsservern:

```bash
npm ci
npm run dev
```

Öppna [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Kommandon

- `npm run dev` startar den lokala utvecklingsservern.
- `npm run lint` kör ESLint.
- `npm run build` skapar ett produktionsbygge.

## Betalning med Stripe

Knapparna **Boka & betala** anropar `POST /api/checkout`. API-routen skapar en
Stripe Checkout-session och skickar besökaren vidare till Stripes betalsida.
Efter genomförd betalning återvänder besökaren till `/tack/`.

Priserna definieras på serversidan i `app/api/checkout/route.ts`. Frontend
skickar endast resans id och kan därför inte ändra beloppet.

### Miljövariabler

Följande miljövariabel krävs lokalt och i Vercel:

- `STRIPE_SECRET_KEY` – Stripes hemliga API-nyckel. Använd en testnyckel under
  utveckling och byt till en live-nyckel inför lansering.

Skapa `.env.local` för lokal utveckling:

```bash
STRIPE_SECRET_KEY=sk_test_...
```

Miljöfiler är ignorerade av Git och ska inte checkas in.

Stripe Checkout är konfigurerat för kort och Klarna. Klarna måste vara
aktiverat för kontot i Stripe Dashboard. Apple Pay kan visas automatiskt av
Stripe när kundens enhet och webbläsare stöder det.

## Deployment

Hela projektet deployas på Vercel från repositoryts rot. Någon separat
serverapplikation eller GitHub Pages-deployment behövs inte.

1. Skapa eller anslut projektet i Vercel.
2. Behåll repositoryts rot som **Root Directory**.
3. Lägg till `STRIPE_SECRET_KEY` under projektets miljövariabler.
4. Deploya projektet.

Testa betalflödet med Stripes testuppgifter innan live-nyckeln aktiveras.
