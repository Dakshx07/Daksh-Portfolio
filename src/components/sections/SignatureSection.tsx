"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function SignatureSection() {
  const [isSigned, setIsSigned] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger write animation on scroll into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSigned(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Click to replay animation
  const handleReplay = useCallback(() => {
    setIsSigned(false);
    setTimeout(() => {
      setIsSigned(true);
    }, 60);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full max-w-[580px] mx-auto px-6 py-14 sm:py-20 flex flex-col items-center justify-center select-none"
      aria-label="Signature"
    >
      {/* Seamless Floating Signature (No Box) */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleReplay}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleReplay();
          }
        }}
        title="Click to replay signature"
        className="group relative cursor-pointer inline-flex flex-col items-center justify-center p-2 -rotate-[1.5deg] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {/* 'Daksh' in Keshav's authentic handwriting font (Caveat) */}
        <div className="relative overflow-hidden pr-2">
          <span
            className="inline-block font-['Caveat',_cursive] text-[56px] sm:text-[68px] font-semibold tracking-wide text-[var(--text-primary)] leading-none select-none transition-colors duration-250"
            style={{
              clipPath: isSigned ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: isSigned
                ? "clip-path 0.75s cubic-bezier(0.35, 0, 0.25, 1) 0.1s"
                : "none",
            }}
          >
            Daksh
          </span>
        </div>

        {/* Organic Handwritten Wavy Underline (Matching Keshav's ink gesture) */}
        <svg
          viewBox="0 0 200 24"
          className="w-48 sm:w-60 h-auto -mt-2 overflow-visible text-[var(--text-primary)] transition-colors duration-250"
          fill="none"
        >
          <path
            d="M 4 10 C 42 14, 88 13, 138 7 C 160 4, 180 5, 194 9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 210,
              strokeDashoffset: isSigned ? 0 : 210,
              transition: isSigned
                ? "stroke-dashoffset 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.75s, opacity 0.1s ease 0.75s"
                : "none",
              opacity: isSigned ? 1 : 0,
            }}
          />
        </svg>

        {/* Replay hint on hover */}
        <span className="absolute -bottom-3 right-0 opacity-0 group-hover:opacity-40 transition-opacity duration-200 font-mono text-[9px] text-[var(--text-muted)]">
          ↺
        </span>
      </div>
    </section>
  );
}
