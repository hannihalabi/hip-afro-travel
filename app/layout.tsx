import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hip Afro Travel | Gruppresor till Gambia",
  description:
    "Boka en 7-dagars träningsresa till Gambia med stretch, HIIT, functional movement, utflykter och återhämtning. 17 000 kr per person.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
