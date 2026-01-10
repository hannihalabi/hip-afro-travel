"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = {
  className?: string;
  src: string;
  poster?: string;
  type?: string;
  playbackRate?: number;
};

export default function HeroVideo({
  className,
  src,
  poster,
  type = "video/mp4",
  playbackRate = 0.8,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  };

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-hidden="true"
      onLoadedMetadata={handleLoadedMetadata}
    >
      <source src={src} type={type} />
    </video>
  );
}
