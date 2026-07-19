"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/page.module.css";
import Reveal from "@/components/Reveal";

export type GalleryItem = {
  mediaType: "image" | "video";
  src: string;
  alt: string;
  tag: string;
  poster?: string;
  wide?: boolean;
  tall?: boolean;
};

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = activeIndex !== null;
  const activeItem = activeIndex === null ? null : items[activeIndex];

  const close = () => setActiveIndex(null);
  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + items.length) % items.length
    );
  };
  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % items.length
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + items.length) % items.length
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % items.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, items.length]);

  return (
    <>
      <div className={styles.galleryGrid}>
        {items.map((item, index) => (
          <Reveal
            className={`${styles.galleryTile} ${
              item.wide ? styles.galleryTileWide : ""
            } ${item.tall ? styles.galleryTileTall : ""}`}
            key={item.src}
            style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
          >
            <button
              type="button"
              className={styles.galleryOpenButton}
              onClick={() => setActiveIndex(index)}
              aria-label={`Öppna ${item.tag.toLowerCase()} i stort format`}
            >
              {item.mediaType === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  className={styles.galleryVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={styles.galleryImage}
                  sizes="(max-width: 700px) 86vw, (max-width: 1100px) 45vw, 30vw"
                />
              )}
              <span className={styles.galleryTag}>{item.tag}</span>
              <span className={styles.galleryZoomIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="10.5" cy="10.5" r="5.5" />
                  <path d="m15 15 5 5M10.5 8v5M8 10.5h5" />
                </svg>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {activeItem && activeIndex !== null ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.tag}: ${activeItem.alt}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.lightboxClose}
            onClick={close}
            aria-label="Stäng bildvisning"
          >
            <span aria-hidden="true" />
          </button>

          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrevious}`}
            onClick={showPrevious}
            aria-label="Föregående bild"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>

          <figure className={styles.lightboxFigure}>
            <div className={styles.lightboxMedia}>
              {activeItem.mediaType === "video" ? (
                <video
                  key={activeItem.src}
                  src={activeItem.src}
                  poster={activeItem.poster}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  priority
                  className={styles.lightboxImage}
                  sizes="100vw"
                />
              )}
            </div>
            <figcaption>
              <strong>{activeItem.tag}</strong>
              <span>{activeItem.alt}</span>
              <small>
                {activeIndex + 1} / {items.length}
              </small>
            </figcaption>
          </figure>

          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={showNext}
            aria-label="Nästa bild"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      ) : null}
    </>
  );
}
