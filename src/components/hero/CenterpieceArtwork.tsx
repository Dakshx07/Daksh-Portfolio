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

export default function CenterpieceArtwork() {
  const [progress, setProgress] = useState(0.5); // 0.0 (દિન) to 1.0 (રાત)
  const [isScrubbing, setIsScrubbing] = useState(false);
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
    }
  };

  const handleScrub = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clampedX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const p = Math.max(0, Math.min(1, clampedX / rect.width));
    setProgress(p);

    if (videoRef.current && Number.isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
      videoRef.current.currentTime = p * videoRef.current.duration;
    }
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsScrubbing(true);
    if (videoRef.current) videoRef.current.pause();
    handleScrub(e.clientX);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      handleScrub(e.clientX);
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
    setIsScrubbing(false);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

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
  const fieldColor = interpolateColor(validProgress);
  const moonOpacity = Math.max(0, Math.min(1, (validProgress - 0.45) * 4));
  const sunOpacity = 1 - moonOpacity;

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

      {/* Interactive Day ↔ Night Tick-Mark Scrub Slider */}
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

          {/* Authentic Postage Stamp Slider Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-transform duration-100 ${
              isScrubbing ? "scale-105" : "group-hover:scale-105"
            }`}
            style={{
              left: `${validProgress * 100}%`,
              width: 34,
              height: 42,
            }}
          >
            <div className="stamp-control relative w-full h-full">
              {/* Perforated antique paper base */}
              <span className="stamp-paper" />

              {/* Arched colored field with dynamic sky interpolation */}
              <span
                className="stamp-arch absolute inset-x-[5px] bottom-[5px] top-[5px]"
                style={{ backgroundColor: fieldColor }}
              >
                <svg viewBox="0 0 22 30" className="absolute inset-0 w-full h-full">
                  {/* Daytime Radiant Sun with 12 Spoke Rays */}
                  <g style={{ opacity: sunOpacity }} fill="#FFFFFF">
                    <circle cx="11" cy="15" r="3.2" />
                    {Array.from({ length: 12 }, (_, t) => 30 * t).map((angle) => (
                      <rect
                        key={angle}
                        x="10.4"
                        y={angle % 60 === 0 ? 7.6 : 8.6}
                        width="1.2"
                        height={angle % 60 === 0 ? 2.8 : 1.8}
                        rx="0.6"
                        transform={`rotate(${angle} 11 15)`}
                      />
                    ))}
                  </g>

                  {/* Nighttime Crescent Moon */}
                  <path
                    style={{ opacity: moonOpacity }}
                    fill="#FFFFFF"
                    d="M13.6 9.6a5.8 5.8 0 1 0 0 10.8a4.6 4.6 0 0 1 0-10.8z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
