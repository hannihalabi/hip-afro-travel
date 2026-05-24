import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HIP AFRO TRAVEL | Gambiaresor med kultur & community",
  description:
    "Upplev Gambia med HIP AFRO TRAVEL - temaresor med kultur, gemenskap och äventyr. Se datum, paket och praktisk info.",
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
