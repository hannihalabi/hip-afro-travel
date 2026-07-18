import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hip Afro Travel | Yoga- och träningsresor till Gambia",
  description:
    "Tre resor till Gambia vintern 2026/2027: Kundaliniyoga med Ewa och träningsresa med Delta från Gladiatorerna. Boende, mat, träning och utflykter ingår. Från 17 000 kr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
