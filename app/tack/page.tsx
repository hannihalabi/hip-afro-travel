import type { Metadata } from "next";
import Link from "next/link";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Tack för din bokning | Hip Afro Travel",
  robots: { index: false },
};

export default function TackPage() {
  return (
    <div className={styles.confirmPage}>
      <main className={styles.confirmCard}>
        <span className={styles.confirmIcon} aria-hidden="true">
          🎉
        </span>
        <p className={styles.kicker}>Betalningen är genomförd</p>
        <h1>Tack – din plats är bokad!</h1>
        <p>
          Ett kvitto från Stripe skickas till din e-post. Vi hör av oss inom
          kort med all praktisk information inför resan till Gambia.
        </p>
        <p>
          Frågor? Ring <a href="tel:0701507074">070-150 70 74</a> eller mejla{" "}
          <a href="mailto:Jennifer.dixon@hipafrotravel.com">
            Jennifer.dixon@hipafrotravel.com
          </a>
          .
        </p>
        <Link className={styles.primaryButton} href="/">
          Tillbaka till startsidan
        </Link>
      </main>
    </div>
  );
}
