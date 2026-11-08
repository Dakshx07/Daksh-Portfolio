"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface SnapWordProps {
  id: string;
  children: React.ReactNode;
}

function SnapWord({ id, children }: SnapWordProps) {
  return (
    <span
      data-snap={id}
      className="cursor-crosshair font-medium whitespace-nowrap text-[var(--text-primary)] transition-colors duration-150"
    >
      {children}
    </span>
  );
}

export default function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSnap, setActiveSnap] = useState<string>("role");
  const [box, setBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const updateBox = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.querySelector(`[data-snap="${activeSnap}"]`);
    if (!target) return;
    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    setBox({
      x: Math.round(tRect.left - cRect.left - 2),
      y: Math.round(tRect.top - cRect.top - 1),
      width: Math.round(tRect.width + 4),
      height: Math.round(tRect.height + 2),
    });
  }, [activeSnap]);

  useEffect(() => {
    updateBox();
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updateBox);
    }
    const ro = new ResizeObserver(updateBox);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", updateBox);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateBox);
    };
  }, [updateBox]);

  const handlePointerOver = (e: React.PointerEvent) => {
    const target = (e.target as HTMLElement).closest("[data-snap]");
    if (target && target instanceof HTMLElement && target.dataset.snap) {
      setActiveSnap(target.dataset.snap);
    }
  };

  return (
    <header className="relative mx-auto w-full max-w-[720px] px-6 pt-24 sm:pt-36 pb-6">
      {/* Centered Editorial Bio Column with Figma Selection Box System */}
      <div
        ref={containerRef}
        onPointerOver={handlePointerOver}
        className="relative max-w-[580px] mx-auto space-y-4 text-[15px] sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal selection:bg-blue-500/20"
      >
        {/* Figma Selection Box with 4 Corner Handles & Floating Dimension Tag */}
        {box && (
          <div
            aria-hidden="true"
            className="selection-box"
            style={{
              transform: `translate3d(${box.x}px, ${box.y}px, 0)`,
              width: box.width,
              height: box.height,
            }}
          >
            <i />
            <i />
            <i />
            <i />
            <span className="selection-tag">
              {box.width} × {box.height}
            </span>
          </div>
        )}

        <p>
          I&apos;m Daksh, a <SnapWord id="role">creative developer</SnapWord> &{" "}
          <SnapWord id="engineer">software engineer</SnapWord> from India.
        </p>

        <p>
          I bridge the gap between <SnapWord id="design">design engineering</SnapWord> and{" "}
          <SnapWord id="systems">systems architecture</SnapWord>—building high-performance web experiences,{" "}
          <SnapWord id="shaders">WebGL shaders</SnapWord>, and developer tooling end to end.
        </p>

        <p>
          Active contributor across{" "}
          <SnapWord id="oss">open-source platforms</SnapWord> (
          <SnapWord id="nhost">Nhost</SnapWord>, <SnapWord id="career-ops">Career-Ops</SnapWord>,{" "}
          <SnapWord id="supercompress">Supercompress</SnapWord>). Say hi at{" "}
          <a
            href="mailto:contact@dakshhiran.dev"
            className="text-[var(--text-primary)] underline underline-offset-4 decoration-[var(--border)] hover:decoration-blue-500 transition-colors duration-150"
          >
            contact@dakshhiran.dev
          </a>
          , or find me on{" "}
          <a
            href="https://x.com/DakshHiran7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-primary)] hover:text-blue-500 transition-colors duration-150"
          >
            X
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/Dakshx07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-primary)] hover:text-blue-500 transition-colors duration-150"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </header>
  );
}
