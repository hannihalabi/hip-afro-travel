"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import styles from "@/app/page.module.css";

type CheckoutButtonProps = {
  tripId: string;
  className?: string;
  children: ReactNode;
};

export default function CheckoutButton({
  tripId,
  className,
  children,
}: CheckoutButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleClick = async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId }),
      });
      if (!response.ok) {
        throw new Error(`Checkout svarade ${response.status}`);
      }
      const data = (await response.json()) as { url?: string };
      if (!data.url) {
        throw new Error("Checkout-svaret saknar url");
      }
      window.location.assign(data.url);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={handleClick}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Öppnar betalning…" : children}
      </button>
      {status === "error" ? (
        <span className={styles.checkoutError} role="alert">
          Betalningen kunde inte startas just nu –{" "}
          <a href="#boka">skicka en fråga</a> så hjälper vi dig.
        </span>
      ) : null}
    </>
  );
}
