"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import asciiData from "./asciiData.json";

export default function Preloader() {
  const [isFinished, setIsFinished] = useState(false);
  const [metamorphProgress, setMetamorphProgress] = useState(0);
  const [leftAscii, setLeftAscii] = useState(asciiData.left);
  const [rightAscii, setRightAscii] = useState(asciiData.right);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftWrapRef = useRef<HTMLDivElement>(null);
  const rightWrapRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleSkip = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setIsFinished(true);
          document.body.style.overflow = "";
        },
      });
    } else {
      setIsFinished(true);
      document.body.style.overflow = "";
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setIsFinished(true);
      return;
    }

    // Lock body scrolling during preloader
    document.body.style.overflow = "hidden";

    // Escape key to dismiss if desired
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleSkip();
    };
    window.addEventListener("keydown", onKeyDown);

    // ASCII Shimmer
    const jitterInterval = setInterval(() => {
      const glyphs = "·:=+<>?!/\\#@%*«»÷×≈≠";
      setLeftAscii((prev) => {
        const chars = prev.split("");
        for (let i = 0; i < 4; i++) {
          const idx = Math.floor(Math.random() * chars.length);
          if (chars[idx] !== " " && chars[idx] !== "\n") {
            chars[idx] = glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        }
        return chars.join("");
      });
      setRightAscii((prev) => {
        const chars = prev.split("");
        for (let i = 0; i < 4; i++) {
          const idx = Math.floor(Math.random() * chars.length);
          if (chars[idx] !== " " && chars[idx] !== "\n") {
            chars[idx] = glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        }
        return chars.join("");
      });
    }, 90);

    // Master Animation Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tlRef.current = tl;

      // Start COMPLETELY offscreen (outside screen boundaries)
      gsap.set(leftWrapRef.current, { xPercent: -100, opacity: 1 });
      gsap.set(rightWrapRef.current, { xPercent: 100, opacity: 1 });
      gsap.set(sparkRef.current, { scale: 0, opacity: 0 });

      const metamorphObj = { val: 0 };

      // ─────────────────────────────────────────────────────────────
      // PHASE 1: Smooth, Cinematic Glide In (Starts instantly on mount)
      // Both hands glide gracefully from outside the screen to dead center
      // ─────────────────────────────────────────────────────────────
      tl.to(
        leftWrapRef.current,
        {
          xPercent: 0,
          duration: 2.6,
          ease: "power2.out",
        },
        0
      );
      tl.to(
        rightWrapRef.current,
        {
          xPercent: 0,
          duration: 2.6,
          ease: "power2.out",
        },
        0
      );

      // Micro touch connection: ensure fingertips feel genuinely connected
      tl.to(
        leftWrapRef.current,
        {
          x: 4,
          duration: 0.18,
          ease: "sine.out",
        },
        "-=0.18"
      );
      tl.to(
        rightWrapRef.current,
        {
          x: -4,
          duration: 0.18,
          ease: "sine.out",
        },
        "<"
      );

      // ─────────────────────────────────────────────────────────────
      // PHASE 2: Minimalist Diamond Contact Spark (50vw, 50vh)
      // Clean micro-flash as fingertips touch
      // ─────────────────────────────────────────────────────────────
      tl.to(
        sparkRef.current,
        {
          scale: 1.15,
          opacity: 1,
          duration: 0.09,
          ease: "power2.out",
        },
        "-=0.1"
      );

      // Micro particles scatter
      tl.to(".spark-particle-1", { x: 8, y: -6, opacity: 0, duration: 0.32, ease: "power1.out" }, "<");
      tl.to(".spark-particle-2", { x: -8, y: -7, opacity: 0, duration: 0.32, ease: "power1.out" }, "<");
      tl.to(".spark-particle-3", { x: 7, y: 7, opacity: 0, duration: 0.32, ease: "power1.out" }, "<");
      tl.to(".spark-particle-4", { x: -7, y: 6, opacity: 0, duration: 0.32, ease: "power1.out" }, "<");

      // Spark settles gently into subtle contact point
      tl.to(
        sparkRef.current,
        {
          scale: 0.65,
          opacity: 0.55,
          duration: 0.35,
          ease: "power2.out",
        },
        "+=0.02"
      );

      // ─────────────────────────────────────────────────────────────
      // PHASE 3: Slow, Cinematic Metamorphosis (1.4s)
      // Radial wave sweeps smoothly from fingertips outward across the hands
      // ─────────────────────────────────────────────────────────────
      tl.to(
        metamorphObj,
        {
          val: 1,
          duration: 1.4,
          ease: "power1.inOut",
          onUpdate: () => {
            setMetamorphProgress(metamorphObj.val);
          },
          onComplete: () => {
            clearInterval(jitterInterval);
            // Preloader stays held on screen indefinitely as requested!
          },
        },
        "-=0.3"
      );
    });

    return () => {
      clearInterval(jitterInterval);
      window.removeEventListener("keydown", onKeyDown);
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [handleSkip]);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] bg-[#07080a] flex items-center justify-between overflow-hidden cursor-pointer select-none"
      aria-label="Creation of Adam introduction animation"
    >
      {/* ── LEFT HALF: 50% WIDTH, FULL HEIGHT, RIGHT-ALIGNED TO CENTER (50vw) ── */}
      <div
        ref={leftWrapRef}
        className="w-1/2 h-full flex items-center justify-end overflow-visible pointer-events-none select-none will-change-transform"
        style={{
          transform: "translateX(-100%)",
        }}
      >
        {/* Fixed 54vw container: extends 4% past screen edge into negative space so wrist NEVER cuts off */}
        <div
          className="relative flex items-center justify-end pointer-events-none select-none"
          style={{
            width: "54vw",
            aspectRatio: "807 / 1117",
          }}
        >
          {/* Layer A: High-Definition Realistic Texture */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/footer/left.png"
            alt="Left hand realistic"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none transition-opacity duration-75"
            style={{
              opacity: metamorphProgress === 0 ? 0 : 1,
              maskImage:
                metamorphProgress > 0 && metamorphProgress < 1
                  ? `radial-gradient(circle at 100% 51.4%, rgba(0,0,0,1) ${
                      metamorphProgress * 125
                    }%, rgba(0,0,0,0) ${metamorphProgress * 125 + 8}%)`
                  : metamorphProgress >= 1
                  ? "none"
                  : "none",
              WebkitMaskImage:
                metamorphProgress > 0 && metamorphProgress < 1
                  ? `radial-gradient(circle at 100% 51.4%, rgba(0,0,0,1) ${
                      metamorphProgress * 125
                    }%, rgba(0,0,0,0) ${metamorphProgress * 125 + 8}%)`
                  : metamorphProgress >= 1
                  ? "none"
                  : "none",
            }}
          />

          {/* Layer B: Original Footer Dynamic ASCII Glyph Matrix */}
          <div className="absolute inset-0 flex items-center justify-end font-mono select-none overflow-hidden">
            <pre
              className="text-[#0348d8] whitespace-pre select-none pointer-events-none drop-shadow-[0_0_6px_rgba(3,72,216,0.35)]"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "0.58vw",
                lineHeight: "1.08",
                letterSpacing: "0.5em",
                opacity: metamorphProgress >= 1 ? 0 : 0.85,
                maskImage:
                  metamorphProgress > 0 && metamorphProgress < 1
                    ? `radial-gradient(circle at 100% 51.4%, rgba(0,0,0,0) ${Math.max(
                        0,
                        metamorphProgress * 125 - 4
                      )}%, rgba(0,0,0,1) ${metamorphProgress * 125 + 3}%)`
                    : "none",
                WebkitMaskImage:
                  metamorphProgress > 0 && metamorphProgress < 1
                    ? `radial-gradient(circle at 100% 51.4%, rgba(0,0,0,0) ${Math.max(
                        0,
                        metamorphProgress * 125 - 4
                      )}%, rgba(0,0,0,1) ${metamorphProgress * 125 + 3}%)`
                    : "none",
              }}
            >
              {leftAscii}
            </pre>
          </div>

          {/* Metamorphosis Electric Frontier Wave */}
          {metamorphProgress > 0 && metamorphProgress < 0.98 && (
            <div
              className="absolute rounded-full pointer-events-none border border-blue-400/80 shadow-[0_0_12px_2px_rgba(96,165,250,0.7)]"
              style={{
                left: "100%",
                top: "51.4%",
                width: `${metamorphProgress * 230}%`,
                height: `${metamorphProgress * 230}%`,
                transform: "translate(-50%, -50%)",
                opacity: (1 - metamorphProgress * 0.25) * 0.85,
              }}
            />
          )}
        </div>
      </div>

      {/* ── RIGHT HALF: 50% WIDTH, FULL HEIGHT, LEFT-ALIGNED TO CENTER (50vw) ── */}
      <div
        ref={rightWrapRef}
        className="w-1/2 h-full flex items-center justify-start overflow-visible pointer-events-none select-none will-change-transform"
        style={{
          transform: "translateX(100%)",
        }}
      >
        {/* Fixed 54vw container: extends 4% past screen edge into positive space so wrist NEVER cuts off */}
        <div
          className="relative flex items-center justify-start pointer-events-none select-none"
          style={{
            width: "54vw",
            aspectRatio: "829 / 1117",
          }}
        >
          {/* Layer A: High-Definition Realistic Texture */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/footer/right.png"
            alt="Right hand realistic"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none transition-opacity duration-75"
            style={{
              opacity: metamorphProgress === 0 ? 0 : 1,
              maskImage:
                metamorphProgress > 0 && metamorphProgress < 1
                  ? `radial-gradient(circle at 0% 49.1%, rgba(0,0,0,1) ${
                      metamorphProgress * 125
                    }%, rgba(0,0,0,0) ${metamorphProgress * 125 + 8}%)`
                  : metamorphProgress >= 1
                  ? "none"
                  : "none",
              WebkitMaskImage:
                metamorphProgress > 0 && metamorphProgress < 1
                  ? `radial-gradient(circle at 0% 49.1%, rgba(0,0,0,1) ${
                      metamorphProgress * 125
                    }%, rgba(0,0,0,0) ${metamorphProgress * 125 + 8}%)`
                  : metamorphProgress >= 1
                  ? "none"
                  : "none",
            }}
          />

          {/* Layer B: Original Footer Dynamic ASCII Glyph Matrix */}
          <div className="absolute inset-0 flex items-center justify-start font-mono select-none overflow-hidden">
            <pre
              className="text-[#0348d8] whitespace-pre select-none pointer-events-none drop-shadow-[0_0_6px_rgba(3,72,216,0.35)]"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "0.58vw",
                lineHeight: "1.08",
                letterSpacing: "0.5em",
                opacity: metamorphProgress >= 1 ? 0 : 0.85,
                maskImage:
                  metamorphProgress > 0 && metamorphProgress < 1
                    ? `radial-gradient(circle at 0% 49.1%, rgba(0,0,0,0) ${Math.max(
                        0,
                        metamorphProgress * 125 - 4
                      )}%, rgba(0,0,0,1) ${metamorphProgress * 125 + 3}%)`
                    : "none",
                WebkitMaskImage:
                  metamorphProgress > 0 && metamorphProgress < 1
                    ? `radial-gradient(circle at 0% 49.1%, rgba(0,0,0,0) ${Math.max(
                        0,
                        metamorphProgress * 125 - 4
                      )}%, rgba(0,0,0,1) ${metamorphProgress * 125 + 3}%)`
                    : "none",
              }}
            >
              {rightAscii}
            </pre>
          </div>

          {/* Metamorphosis Electric Frontier Wave */}
          {metamorphProgress > 0 && metamorphProgress < 0.98 && (
            <div
              className="absolute rounded-full pointer-events-none border border-blue-400/80 shadow-[0_0_12px_2px_rgba(96,165,250,0.7)]"
              style={{
                left: "0%",
                top: "49.1%",
                width: `${metamorphProgress * 230}%`,
                height: `${metamorphProgress * 230}%`,
                transform: "translate(-50%, -50%)",
                opacity: (1 - metamorphProgress * 0.25) * 0.85,
              }}
            />
          )}
        </div>
      </div>

      {/* ── MINIMALIST HIGH-CRAFT CONTACT SPARK (Exact Center: 50vw, 50vh) ── */}
      <div
        ref={sparkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40 flex items-center justify-center"
      >
        {/* Hair-Thin Horizontal Micro-Streak */}
        <div className="absolute w-8 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

        {/* Razor-Sharp 4-Point Diamond Star Needle */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="overflow-visible"
        >
          <path
            d="M12 0 C12 7.5 10 10 2.5 12 C10 14 12 16.5 12 24 C12 16.5 14 14 21.5 12 C14 10 12 7.5 12 0 Z"
            fill="#FFFFFF"
          />
          <circle cx="12" cy="12" r="1.5" fill="#93C5FD" />
        </svg>

        {/* 4 Pinpoint Micro-Particles */}
        <div className="spark-particle-1 absolute w-[1.5px] h-[1.5px] bg-white rounded-full" />
        <div className="spark-particle-2 absolute w-[1.5px] h-[1.5px] bg-sky-200 rounded-full" />
        <div className="spark-particle-3 absolute w-[1.5px] h-[1.5px] bg-white rounded-full" />
        <div className="spark-particle-4 absolute w-[1.5px] h-[1.5px] bg-sky-200 rounded-full" />
      </div>
    </div>
  );
}
