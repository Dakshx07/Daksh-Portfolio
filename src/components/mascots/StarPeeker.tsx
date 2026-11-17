"use client";

import { useState } from "react";

interface StarPeekerProps {
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  label?: string;
}

export default function StarPeeker({
  className = "",
  style,
  width = 54,
  height = 38,
  label = "hello! ⭐",
}: StarPeekerProps) {
  const [isDucking, setIsDucking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDucking) return;

    // Trigger playful duck-down and pop-up spring animation
    setIsDucking(true);
    setTimeout(() => {
      setIsDucking(false);
    }, 420);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Click star to say hi"
      className={`group relative pointer-events-auto cursor-pointer select-none transition-transform duration-200 ease-out ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...style,
      }}
    >
      {/* Floating Micro Speech Bubble / Tooltip on Hover */}
      {label && (
        <div
          className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 text-white dark:bg-white dark:text-black text-[10px] font-mono tracking-wider border border-white/20 dark:border-black/20 shadow-md pointer-events-none transition-all duration-150 whitespace-nowrap z-30 ${
            isHovered && !isDucking
              ? "opacity-100 scale-100 -translate-y-1"
              : "opacity-0 scale-90 translate-y-1"
          }`}
        >
          {label}
        </div>
      )}

      {/* Die-Cut Star Mascot with Spring Ducking Transform */}
      <div
        className="w-full h-full transition-transform"
        style={{
          transform: isDucking
            ? "translateY(22px) scale(0.92, 0.85)"
            : isHovered
            ? "translateY(-3.5px) scale(1.06)"
            : "translateY(0) scale(1)",
          transitionDuration: isDucking ? "180ms" : "280ms",
          transitionTimingFunction: isDucking
            ? "cubic-bezier(0.55, 0, 1, 0.45)"
            : "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mascots/notch-star-peeker.png"
          alt="Star peeker mascot"
          draggable={false}
          className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] active:scale-95 transition-transform"
        />
      </div>
    </div>
  );
}
