/* eslint-disable @next/next/no-img-element */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export async function createSocialImage() {
  const [heroData, logoData] = await Promise.all([
    readFile(join(process.cwd(), "public/images/pic-1.jpeg"), "base64"),
    readFile(
      join(process.cwd(), "public/logo/hipafro-logo.jpeg"),
      "base64"
    ),
  ]);

  const heroSrc = `data:image/jpeg;base64,${heroData}`;
  const logoSrc = `data:image/jpeg;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#143826",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <img
          src={heroSrc}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, rgba(12, 29, 20, 0.94) 0%, rgba(12, 29, 20, 0.78) 52%, rgba(12, 29, 20, 0.18) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "52px 64px 58px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <img
              src={logoSrc}
              alt=""
              width={96}
              height={96}
              style={{
                borderRadius: 999,
                background: "white",
                boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Hip Afro Travel
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              maxWidth: 760,
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: 20,
                padding: "10px 20px",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: 999,
                background: "rgba(255,255,255,0.14)",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Gambia · Februari 2026
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 68,
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.045em",
              }}
            >
              <span>Träna. Andas.</span>
              <span style={{ color: "#F2A93B" }}>Landa i Gambia.</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                color: "rgba(255,255,255,0.9)",
                fontSize: 27,
                fontWeight: 500,
              }}
            >
              Yoga, träning, värme och gemenskap · 17 000 kr
            </div>
          </div>
        </div>
      </div>
    ),
    socialImageSize
  );
}
