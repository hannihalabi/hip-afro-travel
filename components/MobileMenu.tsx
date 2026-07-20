"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import { TripCalendarTrigger } from "@/components/TripCalendar";

type NavLink = {
  href: string;
  label: string;
};

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  return (
    <div
      className={styles.mobileMenu}
      data-open={open ? "true" : "false"}
    >
      <button
        type="button"
        className={styles.hamburger}
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? "Stäng meny" : "Öppna meny"}
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>
      <nav
        id="mobile-menu-panel"
        className={styles.mobilePanel}
        data-open={open ? "true" : "false"}
        aria-hidden={!open}
        aria-label="Mobilmeny"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={handleClose}
          >
            {link.label}
          </a>
        ))}
        <TripCalendarTrigger
          className={styles.mobileCta}
          onOpen={handleClose}
        >
          Boka resa
        </TripCalendarTrigger>
      </nav>
    </div>
  );
}
