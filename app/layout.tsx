import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const title = "Hip Afro Travel | Yoga- och träningsresor till Gambia";
const description =
  "Två resor till Gambia i februari 2026: 10–17 februari och 21–28 februari. Boende, mat, träning och utflykter ingår. Från 17 000 kr. Delta kommer snart.";

function getSiteUrl() {
  const configuredUrl = process.env.SITE_URL;
  if (configuredUrl) {
    return configuredUrl.startsWith("http")
      ? configuredUrl
      : `https://${configuredUrl}`;
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercelUrl
    ? `https://${vercelUrl}`
    : "https://hip-afro-travel.vercel.app";
}

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
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: title,
    template: "%s | Hip Afro Travel",
  },
  description,
  applicationName: "Hip Afro Travel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "/",
    siteName: "Hip Afro Travel",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
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
