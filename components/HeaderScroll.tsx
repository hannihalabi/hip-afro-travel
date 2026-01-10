"use client";

import { useEffect, useRef } from "react";

const SCROLL_DELTA = 8;
const MOBILE_QUERY = "(max-width: 900px)";

export default function HeaderScroll() {
  const lastScrollY = useRef(0);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const mediaQuery = window.matchMedia(MOBILE_QUERY);

    const setHidden = (hidden: boolean) => {
      header.dataset.hidden = hidden ? "true" : "false";
    };

    const handleScroll = () => {
      if (!mediaQuery.matches) {
        setHidden(false);
        lastScrollY.current = window.scrollY;
        return;
      }

      const current = window.scrollY;
      const delta = current - lastScrollY.current;

      if (current <= 0) {
        setHidden(false);
      } else if (delta > SCROLL_DELTA) {
        setHidden(true);
      } else if (delta < -SCROLL_DELTA) {
        setHidden(false);
      }

      lastScrollY.current = current;
    };

    const handleResize = () => {
      if (!mediaQuery.matches) {
        setHidden(false);
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}
