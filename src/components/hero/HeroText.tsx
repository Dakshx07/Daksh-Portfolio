"use client";

import { useState, useRef, useEffect } from "react";

interface InspectableWordProps {
  children: string;
  defaultActive?: boolean;
}

function InspectableWord({ children, defaultActive = false }: InspectableWordProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const spanRef = useRef<HTMLSpanElement>(null);

  const measure = () => {
    if (spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const active = isHovered || (defaultActive && !isHovered);

  return (
    <span
      ref={spanRef}
      onMouseEnter={() => {
        measure();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-block cursor-crosshair font-medium text-[var(--text-primary)] transition-colors duration-150"
    >
      <span
        className={`px-1 py-0.5 rounded transition-all duration-150 ${
          active
            ? "border border-blue-500 bg-blue-500/10 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
            : "border border-transparent"
        }`}
      >
        {children}
      </span>

      {/* Floating DevTools Dimensions Badge (Width × Height) */}
      {active && dimensions.width > 0 && (
        <span
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-5 z-30 inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono tracking-tight text-white bg-blue-600 rounded shadow-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-150"
          style={{ transformOrigin: "top center" }}
        >
          {dimensions.width} × {dimensions.height}
        </span>
      )}
    </span>
  );
}

export default function HeroText() {
  return (
    <header className="relative mx-auto w-full max-w-[720px] px-6 pt-24 sm:pt-36 pb-6">
      {/* Centered Editorial Bio Column */}
      <div className="relative max-w-[580px] mx-auto space-y-4 text-[15px] sm:text-base leading-relaxed text-[var(--text-secondary)] font-normal selection:bg-blue-500/20">
        <p>
          I&apos;m Daksh, a <InspectableWord defaultActive={true}>creative developer</InspectableWord> &{" "}
          <InspectableWord>software engineer</InspectableWord> from India.
        </p>

        <p>
          I bridge the gap between design engineering and systems architecture—building high-performance web experiences,
          WebGL shaders, and developer tooling end to end.
        </p>

        <p>
          Active contributor across{" "}
          <InspectableWord>open-source platforms</InspectableWord> (Nhost, Career-Ops, Supercompress). Say hi at{" "}
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

