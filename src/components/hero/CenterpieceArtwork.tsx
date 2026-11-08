"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Sky keyframe palette from day to night
const SKY_PALETTE: [number, [number, number, number]][] = [
  [0, [111, 176, 220]],     // Daylight sky blue #6fb0dc
  [0.36, [255, 198, 90]],   // Golden sun amber #ffc65a
  [0.48, [240, 102, 58]],   // Coral red #f0663a
  [0.58, [232, 72, 122]],   // Sunset magenta #e8487a
  [0.76, [74, 42, 150]],    // Deep purple #4a2a96
  [1, [11, 18, 56]],        // Midnight navy #0b1238
];

function interpolateColor(t: number): string {
  const clamped = Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0.5;
  const idx = SKY_PALETTE.findIndex(([stop]) => stop >= clamped);
  if (idx <= 0) return `rgb(${SKY_PALETTE[0][1].join(", ")})`;
  const [s0, c0] = SKY_PALETTE[idx - 1];
  const [s1, c1] = SKY_PALETTE[idx];
  const ratio = (clamped - s0) / (s1 - s0);
  const r = Math.round(c0[0] + (c1[0] - c0[0]) * ratio);
  const g = Math.round(c0[1] + (c1[1] - c0[1]) * ratio);
  const b = Math.round(c0[2] + (c1[2] - c0[2]) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

// Die-Cut Pixel Sticker Slider Handle (Stick It Up aesthetic)
function PixelStickerThumb({
  progress,
  isScrubbing,
  dragDirection,
}: {
  progress: number;
  isScrubbing: boolean;
  dragDirection: number;
}) {
  const isNight = progress >= 0.5;
  const tiltDeg = isScrubbing ? (dragDirection >= 0 ? 8 : -8) : 0;

  return (
    <div
      className={`relative select-none pointer-events-none transition-transform duration-200 ${
        isScrubbing ? "scale-110" : "group-hover:scale-105"
      }`}
      style={{
        width: 44,
        height: 44,
        transform: `rotate(${tiltDeg}deg)`,
        filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
      }}
    >
      {/* Day Pixel Mascot: nori-cool (sunglasses) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/stickers/nori-cool.svg"
        alt="Day Mascot"
        draggable={false}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-250 ease-out ${
          isNight ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      />

      {/* Night Pixel Mascot: pip-wizard (wizard hat & wand) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/stickers/pip-wizard.svg"
        alt="Night Mascot"
        draggable={false}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-250 ease-out ${
          isNight ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />
    </div>
  );
}

interface CenterpieceArtworkProps {
  onProgressChange?: (progress: number) => void;
}

export default function CenterpieceArtwork({ onProgressChange }: CenterpieceArtworkProps = {}) {
  const [progress, setProgress] = useState(0.5); // 0.0 (દિન) to 1.0 (રાત)
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [dragDirection, setDragDirection] = useState(0); // 1 = right, -1 = left
  const lastXRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Auto-play and verify readyState on mount and after refresh
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  // Sync playback time to slider progress when not dragging
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!isDragging.current && video && Number.isFinite(video.duration) && video.duration > 0) {
      const p = Math.max(0, Math.min(1, video.currentTime / video.duration));
      setProgress(p);
      onProgressChange?.(p);
    }
  };

  const handleScrub = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clampedX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const p = Math.max(0, Math.min(1, clampedX / rect.width));
    setProgress(p);
    onProgressChange?.(p);

    // Track direction for dynamic vinyl tilt
    if (clientX > lastXRef.current) setDragDirection(1);
    else if (clientX < lastXRef.current) setDragDirection(-1);
    lastXRef.current = clientX;

    if (videoRef.current && Number.isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
      videoRef.current.currentTime = p * videoRef.current.duration;
    }
  }, [onProgressChange]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging.current) {
      handleScrub(e.clientX);
    }
  }, [handleScrub]);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    setIsScrubbing(false);
    setDragDirection(0);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [onMouseMove]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsScrubbing(true);
    lastXRef.current = e.clientX;
    if (videoRef.current) videoRef.current.pause();
    handleScrub(e.clientX);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setIsScrubbing(true);
    lastXRef.current = e.touches[0].clientX;
    if (videoRef.current) videoRef.current.pause();
    handleScrub(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current) {
      handleScrub(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    setIsScrubbing(false);
    setDragDirection(0);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const validProgress = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0.5;

  return (
    <section className="relative mx-auto w-full max-w-[720px] px-6 pt-2 pb-16">
      {/* 
        Video Container with Keshav's Reverse-Engineered Stipple Dither Mask 
        Solidly framed with poster fallback to guarantee it never disappears on refresh
      */}
      <div className="scenery relative w-full aspect-[4/3] sm:aspect-[3/2] overflow-hidden select-none bg-black">
        {/* High-Definition ASCII Tiles Video */}
        <video
          ref={videoRef}
          src="/assets/centerpiece.mp4"
          poster="/assets/artwork/first-frame.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Interactive Day ↔ Night Tick-Mark Scrub Slider with Die-Cut Pixel Sticker Handle */}
      <div className="mt-5 flex flex-col items-center">
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="group relative flex items-center justify-between w-full max-w-md h-12 px-3 cursor-pointer select-none"
        >
          {/* Day Label (Gujarati) */}
          <span className="text-[15px] font-medium tracking-tight text-[var(--text-muted)] select-none mr-3">
            દિન
          </span>

          {/* Masked Sky Rail (Sunset-to-Night Gradient with 1.5px/6px Repeating Tick Mask) */}
          <div className="relative flex-1 h-3 mx-2">
            <div className="sky-rail absolute inset-0 w-full h-full rounded-sm" />
          </div>

          {/* Night Label (Gujarati) */}
          <span className="text-[15px] font-medium tracking-tight text-[var(--text-muted)] select-none ml-3">
            રાત
          </span>

          {/* Die-Cut Pixel Mascot Sticker Slider Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              left: `${validProgress * 100}%`,
            }}
          >
            <PixelStickerThumb
              progress={validProgress}
              isScrubbing={isScrubbing}
              dragDirection={dragDirection}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
