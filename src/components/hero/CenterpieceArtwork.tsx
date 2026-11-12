"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Format 0-10s video time into clean MM:SS
function formatTimecode(seconds: number): string {
  const s = Math.max(0, Math.min(10, Math.round(seconds)));
  return `00:${s.toString().padStart(2, "0")}`;
}

// Precision Hardware Playhead Needle
// Stationed BELOW the line of control, with the pointed tip facing UPWARDS towards the rail
function PlayheadThumb({
  isScrubbing,
  timecode,
}: {
  isScrubbing: boolean;
  timecode: string;
}) {
  return (
    <div className="relative flex flex-col items-center select-none pointer-events-none -translate-x-1/2">
      {/* Hardware Playhead Needle: Pointed Tip Facing UP + Square Body Below */}
      <div
        className={`transition-transform duration-150 ${
          isScrubbing ? "scale-110" : "group-hover:scale-105"
        }`}
        style={{
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35))",
        }}
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Main Playhead Needle Body: Pointed Tip on Top (pointing up into the rail), Square Body Below */}
          <path
            d="M 10 2 L 2 9.5 V 21 C 2 21.8 2.6 22.5 3.5 22.5 H 16.5 C 17.4 22.5 18 21.8 18 21 V 9.5 Z"
            fill="#FFFFFF"
            stroke="rgba(0, 0, 0, 0.3)"
            strokeWidth="1.2"
          />

          {/* Center Indicator Slit */}
          <line
            x1="10"
            y1="8"
            x2="10"
            y2="17"
            stroke="#18181B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Micro Tactile Grip Lines */}
          <line
            x1="6"
            y1="11"
            x2="6"
            y2="17"
            stroke="#A1A1AA"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <line
            x1="14"
            y1="11"
            x2="14"
            y2="17"
            stroke="#A1A1AA"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Floating Micro Timecode Pill: visible on hover / active scrub, sits below the needle */}
      <div
        className={`absolute top-full mt-1.5 px-1.5 py-0.5 rounded bg-black/90 text-[10px] font-mono tracking-wider text-white border border-white/20 shadow-md transition-all duration-150 whitespace-nowrap ${
          isScrubbing ? "opacity-100 scale-100 translate-y-0.5" : "opacity-0 group-hover:opacity-100 scale-95"
        }`}
      >
        {timecode}
      </div>
    </div>
  );
}

interface CenterpieceArtworkProps {
  onProgressChange?: (progress: number) => void;
}

export default function CenterpieceArtwork({ onProgressChange }: CenterpieceArtworkProps = {}) {
  // Preset strictly in the center (0.5 = 5.0 seconds midpoint) by default
  const [progress, setProgress] = useState(0.5);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef(false);
  const railRef = useRef<HTMLDivElement>(null);

  // Auto-play video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  const handleScrub = useCallback((clientX: number) => {
    if (!railRef.current) return;
    const rect = railRef.current.getBoundingClientRect();
    const clampedX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    let p = Math.max(0, Math.min(1, clampedX / rect.width));

    // Magnetic snap to center (0.50) and boundaries (0.0, 1.0)
    if (Math.abs(p - 0.5) < 0.02) p = 0.5;
    else if (p < 0.015) p = 0;
    else if (p > 0.985) p = 1.0;

    setProgress(p);
    onProgressChange?.(p);

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
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [onMouseMove]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsScrubbing(true);
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
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const validProgress = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0.5;
  const currentTimecode = formatTimecode(validProgress * 10);

  return (
    <section className="relative mx-auto w-full max-w-[720px] px-6 pt-2 pb-16">
      {/* 
        Video Container with Stipple Dither Mask 
      */}
      <div className="scenery relative w-full aspect-[4/3] sm:aspect-[3/2] overflow-hidden select-none bg-black rounded-lg">
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
          className="w-full h-full object-cover"
        />
      </div>

      {/* Interactive Day ↔ Night Tick-Mark Scrub Slider */}
      <div className="mt-5 flex flex-col items-center">
        <div
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: "none" }}
          className="group relative flex items-center justify-between w-full max-w-md h-16 px-3 cursor-pointer select-none"
        >
          {/* Day Label (Japanese Kanji: 昼 - Daytime, reveals "Day" on hover) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setProgress(0);
              onProgressChange?.(0);
              if (videoRef.current) videoRef.current.currentTime = 0;
            }}
            className="group/day relative flex items-center justify-center mr-3 cursor-pointer py-1 select-none"
          >
            {/* Floating English Translation Badge */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 text-white dark:bg-white dark:text-black text-[10px] font-mono tracking-wider border border-white/20 dark:border-black/20 shadow-md transition-all duration-150 opacity-0 group-hover/day:opacity-100 scale-90 group-hover/day:scale-100 -translate-y-1 group-hover/day:translate-y-0 pointer-events-none whitespace-nowrap">
              Day
            </div>

            <span className="text-[14px] sm:text-[15px] font-medium tracking-tight text-[var(--text-muted)] group-hover/day:text-[var(--text-primary)] transition-colors">
              昼
            </span>
          </div>

          {/* Masked Sky Rail (Sunset-to-Night Gradient with 1.5px/6px Repeating Tick Mask) */}
          <div ref={railRef} className="relative flex-1 h-3 mx-2">
            <div className="sky-rail absolute inset-0 w-full h-full rounded-sm" />

            {/* Custom Precision Hardware Playhead Needle - Stationed BELOW the Rail, Pointing UP */}
            <div
              className="absolute top-full mt-[2px] -translate-x-1/2 pointer-events-none"
              style={{
                left: `${validProgress * 100}%`,
              }}
            >
              <PlayheadThumb
                isScrubbing={isScrubbing}
                timecode={currentTimecode}
              />
            </div>
          </div>

          {/* Night Label (Japanese Kanji: 夜 - Nighttime, reveals "Night" on hover) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setProgress(1);
              onProgressChange?.(1);
              if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
                videoRef.current.currentTime = videoRef.current.duration;
              }
            }}
            className="group/night relative flex items-center justify-center ml-3 cursor-pointer py-1 select-none"
          >
            {/* Floating English Translation Badge */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 text-white dark:bg-white dark:text-black text-[10px] font-mono tracking-wider border border-white/20 dark:border-black/20 shadow-md transition-all duration-150 opacity-0 group-hover/night:opacity-100 scale-90 group-hover/night:scale-100 -translate-y-1 group-hover/night:translate-y-0 pointer-events-none whitespace-nowrap">
              Night
            </div>

            <span className="text-[14px] sm:text-[15px] font-medium tracking-tight text-[var(--text-muted)] group-hover/night:text-[var(--text-primary)] transition-colors">
              夜
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
