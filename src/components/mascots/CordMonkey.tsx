"use client";

import { useEffect, useRef, useState } from "react";

interface CordMonkeyProps {
  onPull?: () => void;
  isLight?: boolean;
}

export default function CordMonkey({ onPull, isLight = false }: CordMonkeyProps) {
  const monkeyRef = useRef<HTMLDivElement>(null);
  const [isWobbling, setIsWobbling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Synchronize monkey position and pendulum tilt with the PullCord Verlet rope physics
    let animationFrameId: number;
    let targetGroup: SVGGElement | null = null;
    let lastTransform = "";

    const findTargetGroup = () => {
      // Find the knob's group in the pullcord SVG that updates during drag and swing
      return document.querySelector<SVGGElement>(".pullcord svg g[transform]");
    };

    const updatePhysics = () => {
      if (!targetGroup || !targetGroup.isConnected) {
        targetGroup = findTargetGroup();
      }

      if (targetGroup && monkeyRef.current) {
        const transform = targetGroup.getAttribute("transform") || "";
        if (transform !== lastTransform) {
          lastTransform = transform;
          // Format is typically: translate(x.xx y.yy)
          const match = transform.match(/translate\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/);
          if (match) {
            const knobDx = parseFloat(match[1]);
            const knobDy = parseFloat(match[2]);

            // Monkey is clamped ~45% up the rope from the top anchor
            // Therefore it travels ~45% of the knob's horizontal and vertical displacement
            const monkeyDx = knobDx * 0.45;
            const monkeyDy = knobDy * 0.45;

            // Natural pendulum tilt based on horizontal deflection
            const swingAngle = Math.max(-28, Math.min(28, knobDx * 0.38));

            monkeyRef.current.style.transform = `translate3d(${monkeyDx}px, ${monkeyDy}px, 0) rotate(${swingAngle}deg)`;
          }
        }
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWobbling(true);

    // Trigger rope pull via existing knob button or callback
    const knobButton = document.querySelector<HTMLButtonElement>(".pullcord-knob");
    if (knobButton) {
      knobButton.click();
    } else {
      onPull?.();
    }

    setTimeout(() => {
      setIsWobbling(false);
    }, 600);
  };

  return (
    <div
      ref={monkeyRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Tug monkey to switch theme"
      className="group absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none transition-transform duration-75 ease-out will-change-transform"
      style={{
        // Align fist top center (68.2% of width) with the vertical rope centerline (x = 32px of 64px cord container)
        // 66px * 0.682 = 45px -> left = 32 - 45 = -13px
        left: "-13px",
        top: "60px",
        width: "66px",
        height: "106px",
        zIndex: 65,
      }}
    >
      {/* Playful Handwritten Tooltip Hint on Hover */}
      <div
        className={`absolute -left-20 top-6 px-2 py-1 rounded bg-black/90 text-white dark:bg-white dark:text-black text-[10px] font-mono tracking-wider border border-white/20 dark:border-black/20 shadow-lg pointer-events-none transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
          isHovered ? "opacity-100 scale-100 -translate-x-1" : "opacity-0 scale-95 translate-x-1"
        }`}
      >
        <span>tug me 🐒</span>
      </div>

      {/* Die-Cut Monkey Mascot Asset */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mascots/pull-cord-monkey.png"
        alt="Pull-cord monkey mascot"
        draggable={false}
        className={`w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] transition-all duration-200 ${
          isWobbling ? "scale-110 rotate-6" : isHovered ? "scale-105 -rotate-3" : "scale-100 rotate-0"
        } ${isLight ? "contrast-105" : ""}`}
      />
    </div>
  );
}
