"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

export default function Reveal({ children, className, id, style }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      node.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = "true";
          observer.unobserve(node);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = [styles.reveal, className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes} id={id} style={style}>
      {children}
    </div>
  );
}
