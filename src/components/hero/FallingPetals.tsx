"use client";

import React, { useMemo } from "react";

export type PetalType = "rose" | "marigold" | "jasmine";

interface PetalData {
  id: number;
  left: number; // 0 - 100%
  type: PetalType;
  drift: number; // -80 to 80px
  fallDuration: number; // 5s - 12s
  delay: number; // 0s - 8s
  scale: number; // 0.7 - 1.25
  rotation: number;
  flipDuration: number;
}

// 36 pre-calculated static petal trajectories to ensure pure SSR/hydration safety
const PRESET_PETALS: PetalData[] = [
  { id: 1, left: 8, type: "rose", drift: 45, fallDuration: 8.5, delay: 0.2, scale: 0.95, rotation: 18, flipDuration: 2.8 },
  { id: 2, left: 18, type: "marigold", drift: -55, fallDuration: 7.2, delay: 2.1, scale: 1.1, rotation: -32, flipDuration: 3.2 },
  { id: 3, left: 28, type: "rose", drift: 60, fallDuration: 9.8, delay: 4.5, scale: 0.85, rotation: 45, flipDuration: 2.5 },
  { id: 4, left: 42, type: "jasmine", drift: -35, fallDuration: 11.0, delay: 1.0, scale: 0.8, rotation: 12, flipDuration: 3.0 },
  { id: 5, left: 56, type: "rose", drift: 50, fallDuration: 7.8, delay: 3.4, scale: 1.05, rotation: -15, flipDuration: 2.4 },
  { id: 6, left: 68, type: "marigold", drift: -40, fallDuration: 8.9, delay: 0.8, scale: 0.9, rotation: 28, flipDuration: 3.4 },
  { id: 7, left: 82, type: "rose", drift: 65, fallDuration: 10.2, delay: 2.7, scale: 1.15, rotation: -50, flipDuration: 2.7 },
  { id: 8, left: 92, type: "jasmine", drift: -30, fallDuration: 8.0, delay: 5.1, scale: 0.85, rotation: 35, flipDuration: 3.1 },
  { id: 9, left: 12, type: "rose", drift: -45, fallDuration: 9.2, delay: 6.2, scale: 1.0, rotation: -22, flipDuration: 2.9 },
  { id: 10, left: 24, type: "marigold", drift: 70, fallDuration: 7.5, delay: 1.5, scale: 1.2, rotation: 60, flipDuration: 2.6 },
  { id: 11, left: 36, type: "jasmine", drift: -50, fallDuration: 10.5, delay: 3.9, scale: 0.75, rotation: -40, flipDuration: 3.5 },
  { id: 12, left: 48, type: "rose", drift: 35, fallDuration: 8.2, delay: 5.7, scale: 0.95, rotation: 15, flipDuration: 2.3 },
  { id: 13, left: 62, type: "rose", drift: -60, fallDuration: 9.0, delay: 0.4, scale: 1.08, rotation: -28, flipDuration: 3.3 },
  { id: 14, left: 74, type: "marigold", drift: 40, fallDuration: 8.4, delay: 4.1, scale: 0.88, rotation: 38, flipDuration: 2.8 },
  { id: 15, left: 86, type: "rose", drift: -45, fallDuration: 11.5, delay: 1.8, scale: 1.12, rotation: -42, flipDuration: 3.0 },
  { id: 16, left: 4, type: "marigold", drift: 55, fallDuration: 7.9, delay: 3.1, scale: 1.0, rotation: 25, flipDuration: 2.7 },
  { id: 17, left: 32, type: "rose", drift: -65, fallDuration: 9.6, delay: 6.8, scale: 0.92, rotation: -18, flipDuration: 3.2 },
  { id: 18, left: 66, type: "jasmine", drift: 45, fallDuration: 10.0, delay: 2.4, scale: 0.82, rotation: 52, flipDuration: 2.5 },
  { id: 19, left: 80, type: "rose", drift: -35, fallDuration: 8.7, delay: 5.3, scale: 1.04, rotation: -30, flipDuration: 3.6 },
  { id: 20, left: 95, type: "marigold", drift: 50, fallDuration: 9.3, delay: 0.6, scale: 0.96, rotation: 22, flipDuration: 2.9 },
  { id: 21, left: 15, type: "jasmine", drift: -40, fallDuration: 11.2, delay: 4.8, scale: 0.78, rotation: -12, flipDuration: 3.3 },
  { id: 22, left: 45, type: "rose", drift: 55, fallDuration: 7.6, delay: 1.2, scale: 1.18, rotation: 40, flipDuration: 2.4 },
  { id: 23, left: 52, type: "marigold", drift: -55, fallDuration: 8.8, delay: 6.0, scale: 0.9, rotation: -36, flipDuration: 3.0 },
  { id: 24, left: 78, type: "rose", drift: 35, fallDuration: 9.4, delay: 3.6, scale: 1.02, rotation: 16, flipDuration: 2.8 },
];

interface FallingPetalsProps {
  progress?: number;
  count?: number;
}

export default function FallingPetals({ progress, count }: FallingPetalsProps) {
  const activeCount = useMemo(() => {
    if (typeof count === "number") {
      return Math.max(0, Math.min(PRESET_PETALS.length, count));
    }
    const p = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress as number)) : 0.5;
    // Maps Day (0.0) -> 5 petals to Night (1.0) -> 24 petals dynamically with slider
    return Math.round(5 + p * 19);
  }, [progress, count]);

  const activePetals = useMemo(() => {
    return PRESET_PETALS.slice(0, activeCount);
  }, [activeCount]);

  if (activePetals.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="petals pointer-events-none fixed inset-0 z-30 overflow-hidden select-none"
    >
      {/* SVG linear-gradient definitions for rose, marigold, and jasmine petals */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Indian Rose Petal (Deep Pink to Crimson) */}
          <linearGradient id="petal-rose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7aa8" />
            <stop offset="55%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>

          {/* Marigold / Genda Petal (Bright Golden Sun to Amber) */}
          <linearGradient id="petal-marigold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Jasmine / Mogra Petal (Soft Pearl White to Warm Cream) */}
          <linearGradient id="petal-jasmine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>
        </defs>
      </svg>

      {/* Render active floating petals */}
      {activePetals.map((petal) => {
        const gradientId =
          petal.type === "rose"
            ? "url(#petal-rose)"
            : petal.type === "marigold"
            ? "url(#petal-marigold)"
            : "url(#petal-jasmine)";

        return (
          <div
            key={petal.id}
            className="petal"
            style={
              {
                left: `${petal.left}%`,
                "--drift": `${petal.drift}px`,
                "--fall": `${petal.fallDuration}s`,
                "--delay": `${petal.delay}s`,
              } as React.CSSProperties
            }
          >
            <svg
              width={13 * petal.scale}
              height={16 * petal.scale}
              viewBox="0 0 10 13"
              fill="none"
              style={{
                transform: `rotate(${petal.rotation}deg)`,
                animationDuration: `${petal.flipDuration}s`,
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.18))",
              }}
            >
              {/* Organic floral petal contour modeled directly from Indian botanical flora */}
              <path
                d="M5 12.2C1.6 10.6 0 7.6 0.6 4.6 1.1 2 3 0.4 5 0.9 7 0.4 8.9 2 9.4 4.6 10 7.6 8.4 10.6 5 12.2Z"
                fill={gradientId}
              />
              {/* Delicate translucent center vein */}
              <path
                d="M5 1.5V10.8"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

