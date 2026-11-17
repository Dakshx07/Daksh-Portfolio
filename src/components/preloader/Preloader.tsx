"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import asciiData from "./asciiData.json";

// Complementary Interlocking Fracture Polygons (Exact match to crack path)
const LEFT_JAGGED_CLIP =
  "polygon(0% 0%, 50% 0%, 49.2% 7%, 51.4% 15%, 48.6% 23%, 51% 31%, 49.2% 40%, 50% 50%, 51.6% 58%, 48.4% 66%, 51.2% 74%, 48.8% 82%, 50.8% 91%, 50% 100%, 0% 100%)";

const RIGHT_JAGGED_CLIP =
  "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50.8% 91%, 48.8% 82%, 51.2% 74%, 48.4% 66%, 51.6% 58%, 50% 50%, 49.2% 40%, 51% 31%, 48.6% 23%, 51.4% 15%, 49.2% 7%)";

export default function Preloader() {
  const [isFinished, setIsFinished] = useState(false);

  // Structural & Element Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftHandRef = useRef<HTMLDivElement>(null);
  const rightHandRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const crackTopPathRef = useRef<SVGPathElement>(null);
  const crackBottomPathRef = useRef<SVGPathElement>(null);
  const crackBranchesRef = useRef<SVGGElement>(null);

  // Mask & Wave Dynamic Refs (Direct DOM mutation to prevent 60fps React re-renders)
  const leftImgRef = useRef<HTMLImageElement>(null);
  const rightImgRef = useRef<HTMLImageElement>(null);
  const leftAsciiRef = useRef<HTMLPreElement>(null);
  const rightAsciiRef = useRef<HTMLPreElement>(null);
  const leftWaveRef = useRef<HTMLDivElement>(null);
  const rightWaveRef = useRef<HTMLDivElement>(null);

  // Real Authentic Audio Refs
  const tearAudioRef = useRef<HTMLAudioElement | null>(null);
  const impactAudioRef = useRef<HTMLAudioElement | null>(null);
  const partingAudioRef = useRef<HTMLAudioElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Real Wall Cracking Sound Player (Plays automatically by default)
  const playCrackSound = useCallback((type: "top" | "contact" | "parting") => {
    try {
      let audio: HTMLAudioElement | null = null;
      if (type === "top") audio = tearAudioRef.current;
      else if (type === "contact") audio = impactAudioRef.current;
      else if (type === "parting") audio = partingAudioRef.current;

      if (audio) {
        audio.currentTime = 0;
        audio.volume = type === "contact" ? 1.0 : type === "top" ? 0.95 : 0.85;
        audio.play().catch(() => {});
      }
    } catch {
      // Audio playback fallback
    }
  }, []);

  const handleSkip = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.35,
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

    // Lock scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Pre-instantiate authentic physical audio recordings
    tearAudioRef.current = new Audio("/assets/audio/crack-tear.wav");
    impactAudioRef.current = new Audio("/assets/audio/crack-impact.wav");
    partingAudioRef.current = new Audio("/assets/audio/wall-parting.wav");
    tearAudioRef.current.preload = "auto";
    impactAudioRef.current.preload = "auto";
    partingAudioRef.current.preload = "auto";

    // Unmute on first interaction
    const unlockAudio = () => {
      if (tearAudioRef.current) tearAudioRef.current.load();
      if (impactAudioRef.current) impactAudioRef.current.load();
      if (partingAudioRef.current) partingAudioRef.current.load();
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    // Escape key listener for instant skip
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleSkip();
    };
    window.addEventListener("keydown", onKeyDown);

    // Master Timeline (Tightly tuned for snappy, cinematic 3.3s flow)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tlRef.current = tl;

      // Closed state: panels meet seamlessly down the middle
      gsap.set(leftPanelRef.current, { xPercent: 0 });
      gsap.set(rightPanelRef.current, { xPercent: 0 });

      // Start offscreen
      gsap.set(leftHandRef.current, { x: "-60vw", opacity: 1 });
      gsap.set(rightHandRef.current, { x: "60vw", opacity: 1 });
      if (sparkRef.current) {
        gsap.set(sparkRef.current, { scale: 0, opacity: 0 });
      }

      // SVG crack paths initialized completely hidden (0 opacity until Stage 4/6)
      if (crackTopPathRef.current) {
        const lenTop = crackTopPathRef.current.getTotalLength() || 700;
        gsap.set(crackTopPathRef.current, {
          strokeDasharray: lenTop,
          strokeDashoffset: lenTop,
          opacity: 0,
        });
      }
      if (crackBottomPathRef.current) {
        const lenBottom = crackBottomPathRef.current.getTotalLength() || 700;
        gsap.set(crackBottomPathRef.current, {
          strokeDasharray: lenBottom,
          strokeDashoffset: lenBottom,
          opacity: 0,
        });
      }
      if (crackBranchesRef.current) {
        gsap.set(crackBranchesRef.current, { opacity: 0 });
      }

      // Initial visual states
      if (leftImgRef.current) leftImgRef.current.style.opacity = "0";
      if (rightImgRef.current) rightImgRef.current.style.opacity = "0";
      if (leftWaveRef.current) leftWaveRef.current.style.opacity = "0";
      if (rightWaveRef.current) rightWaveRef.current.style.opacity = "0";

      const metamorphObj = { val: 0 };

      // ─────────────────────────────────────────────────────────────
      // STAGE 1: The Approach (1.35s - Snappy & Smooth)
      // Hands glide from offscreen toward center
      // ─────────────────────────────────────────────────────────────
      tl.to(
        leftHandRef.current,
        {
          x: 0,
          duration: 1.35,
          ease: "power3.out",
        },
        0
      );
      tl.to(
        rightHandRef.current,
        {
          x: 0,
          duration: 1.35,
          ease: "power3.out",
        },
        0
      );

      // Deep touch contact: firm meeting with zero daylight
      tl.to(
        leftHandRef.current,
        {
          x: 4,
          duration: 0.12,
          ease: "sine.out",
        },
        "-=0.12"
      );
      tl.to(
        rightHandRef.current,
        {
          x: -4,
          duration: 0.12,
          ease: "sine.out",
        },
        "<"
      );

      // ─────────────────────────────────────────────────────────────
      // STAGE 2: Spark Ignition at Contact (50vw, 50vh)
      // ─────────────────────────────────────────────────────────────
      tl.to(
        sparkRef.current,
        {
          scale: 1.3,
          opacity: 1,
          duration: 0.08,
          ease: "power2.out",
        },
        "-=0.06"
      );
      tl.to(".spark-particle-1", { x: 9, y: -7, opacity: 0, duration: 0.25, ease: "power1.out" }, "<");
      tl.to(".spark-particle-2", { x: -9, y: -8, opacity: 0, duration: 0.25, ease: "power1.out" }, "<");
      tl.to(".spark-particle-3", { x: 8, y: 8, opacity: 0, duration: 0.25, ease: "power1.out" }, "<");
      tl.to(".spark-particle-4", { x: -8, y: 7, opacity: 0, duration: 0.25, ease: "power1.out" }, "<");
      tl.to(
        sparkRef.current,
        {
          scale: 0.6,
          opacity: 0.5,
          duration: 0.2,
          ease: "power2.out",
        },
        "+=0.02"
      );

      // ─────────────────────────────────────────────────────────────
      // STAGE 3: Bio-Scan Metamorphosis (0.65s - Direct GPU DOM update)
      // Scanning wave travels STRICTLY over hand flesh with zero void bleed
      // ─────────────────────────────────────────────────────────────
      tl.to(
        metamorphObj,
        {
          val: 1,
          duration: 0.65,
          ease: "power2.inOut",
          onUpdate: () => {
            const p = metamorphObj.val;
            const p125 = p * 125;

            // Update Left Hand
            if (leftImgRef.current) {
              leftImgRef.current.style.opacity = p === 0 ? "0" : "1";
              const mask = p < 1 ? `radial-gradient(circle at 100% 51.6%, rgba(0,0,0,1) ${p125}%, rgba(0,0,0,0) ${p125 + 6}%)` : "none";
              leftImgRef.current.style.maskImage = mask;
              leftImgRef.current.style.webkitMaskImage = mask;
            }
            if (leftAsciiRef.current) {
              leftAsciiRef.current.style.opacity = p >= 1 ? "0" : "0.85";
              const mask = p < 1 ? `radial-gradient(circle at 100% 51.6%, rgba(0,0,0,0) ${Math.max(0, p125 - 5)}%, rgba(0,0,0,1) ${p125 + 2}%)` : "none";
              leftAsciiRef.current.style.maskImage = mask;
              leftAsciiRef.current.style.webkitMaskImage = mask;
            }
            if (leftWaveRef.current) {
              leftWaveRef.current.style.opacity = p > 0.02 && p < 0.98 ? "1" : "0";
              leftWaveRef.current.style.background = `radial-gradient(circle at 100% 51.6%, 
                transparent ${Math.max(0, p125 - 8)}%, 
                rgba(56, 189, 248, 0.55) ${Math.max(0, p125 - 3)}%, 
                rgba(255, 255, 255, 0.95) ${p125}%, 
                rgba(96, 165, 250, 0.8) ${p125 + 2}%, 
                transparent ${p125 + 8}%)`;
            }

            // Update Right Hand
            if (rightImgRef.current) {
              rightImgRef.current.style.opacity = p === 0 ? "0" : "1";
              const mask = p < 1 ? `radial-gradient(circle at 0% 48.7%, rgba(0,0,0,1) ${p125}%, rgba(0,0,0,0) ${p125 + 6}%)` : "none";
              rightImgRef.current.style.maskImage = mask;
              rightImgRef.current.style.webkitMaskImage = mask;
            }
            if (rightAsciiRef.current) {
              rightAsciiRef.current.style.opacity = p >= 1 ? "0" : "0.85";
              const mask = p < 1 ? `radial-gradient(circle at 0% 48.7%, rgba(0,0,0,0) ${Math.max(0, p125 - 5)}%, rgba(0,0,0,1) ${p125 + 2}%)` : "none";
              rightAsciiRef.current.style.maskImage = mask;
              rightAsciiRef.current.style.webkitMaskImage = mask;
            }
            if (rightWaveRef.current) {
              rightWaveRef.current.style.opacity = p > 0.02 && p < 0.98 ? "1" : "0";
              rightWaveRef.current.style.background = `radial-gradient(circle at 0% 48.7%, 
                transparent ${Math.max(0, p125 - 8)}%, 
                rgba(56, 189, 248, 0.55) ${Math.max(0, p125 - 3)}%, 
                rgba(255, 255, 255, 0.95) ${p125}%, 
                rgba(96, 165, 250, 0.8) ${p125 + 2}%, 
                transparent ${p125 + 8}%)`;
            }
          },
        },
        "-=0.1"
      );

      // ─────────────────────────────────────────────────────────────
      // STAGE 4: Wall Crack Propagates Downward (Top -> Hands)
      // Real acoustic fracture sound fires!
      // ─────────────────────────────────────────────────────────────
      tl.call(() => playCrackSound("top"), undefined, "+=0.08");

      tl.set(crackTopPathRef.current, { opacity: 1 }, "<");
      tl.to(
        crackTopPathRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.22,
          ease: "power2.in",
        },
        "<"
      );
      tl.to(
        crackBranchesRef.current,
        {
          opacity: 0.9,
          duration: 0.15,
          ease: "power1.out",
        },
        "-=0.12"
      );

      // ─────────────────────────────────────────────────────────────
      // STAGE 5: The Kinetic Recoil (Crack strikes the contact point!)
      // Real structural impact fracture snap + hands flinch back
      // ─────────────────────────────────────────────────────────────
      tl.call(() => playCrackSound("contact"));

      tl.to(
        leftHandRef.current,
        {
          x: -12,
          duration: 0.12,
          ease: "power2.out",
        },
        "<"
      );
      tl.to(
        rightHandRef.current,
        {
          x: 12,
          duration: 0.12,
          ease: "power2.out",
        },
        "<"
      );

      // ─────────────────────────────────────────────────────────────
      // STAGE 6: Crack Sunders to the Bottom (Hands -> Bottom Edge)
      // ─────────────────────────────────────────────────────────────
      tl.set(crackBottomPathRef.current, { opacity: 1 }, "+=0.02");
      tl.to(
        crackBottomPathRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.18,
          ease: "power2.out",
        },
        "<"
      );

      // ─────────────────────────────────────────────────────────────
      // STAGE 7: The Jagged Sunder & Parting Reveal
      // Weighted, butter-smooth monolithic stone separation (~1.2s)
      // ─────────────────────────────────────────────────────────────
      // Short dramatic tension breath (0.12s) to register the severed screen
      tl.call(() => playCrackSound("parting"), undefined, "+=0.12");

      // Instantly dismiss solid backdrop so parting jagged gap reveals the site underneath
      if (backdropRef.current) {
        tl.set(backdropRef.current, { display: "none" }, "<");
      }

      // Crack glow softly dissolves as the chasm expands
      tl.to(
        [
          crackTopPathRef.current,
          crackBottomPathRef.current,
          crackBranchesRef.current,
          sparkRef.current,
        ],
        {
          opacity: 0,
          duration: 0.45,
          ease: "power1.out",
        },
        "<"
      );

      // Left Jagged Panel smoothly glides away to -100% with gentle quadratic inertia
      tl.to(
        leftPanelRef.current,
        {
          xPercent: -100,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<"
      );

      // Right Jagged Panel smoothly glides away to +100% with gentle quadratic inertia
      tl.to(
        rightPanelRef.current,
        {
          xPercent: 100,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            setIsFinished(true);
            document.body.style.overflow = "";
          },
        },
        "<"
      );

      // Soft opacity taper in the final 0.3s as walls clear the viewport
      tl.to(
        [leftPanelRef.current, rightPanelRef.current],
        {
          opacity: 0,
          duration: 0.3,
          ease: "power1.in",
        },
        "-=0.3"
      );
    });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", unlockAudio);
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [handleSkip, playCrackSound]);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] bg-transparent overflow-hidden cursor-pointer select-none"
      aria-label="Creation of Adam fracture introduction animation"
    >
      {/* ── SOLID SEAMLESS BACKDROP (z-10 guarantees ZERO hairline gap/bleed while closed) ── */}
      <div
        ref={backdropRef}
        className="absolute inset-0 w-full h-full bg-[#07080a] z-10 pointer-events-none"
      />

      {/* ── LEFT JAGGED PANEL (Clipped along exact fracture line, slides to -100%) ── */}
      <div
        ref={leftPanelRef}
        className="absolute inset-0 w-full h-full bg-[#07080a] will-change-transform z-20 pointer-events-none select-none overflow-hidden"
        style={{
          clipPath: LEFT_JAGGED_CLIP,
          WebkitClipPath: LEFT_JAGGED_CLIP,
        }}
      >
        {/* Full-height half wrapper with flex items-center ensures exact 50vh centering on all viewports */}
        <div className="w-1/2 h-full flex items-center justify-end overflow-visible pointer-events-none select-none">
          {/* Hand container: 58vw ensures wrist extends past screen edge into negative space with ZERO black pillars */}
          <div
            ref={leftHandRef}
            className="relative flex items-center justify-end pointer-events-none select-none will-change-transform"
            style={{
              width: "58vw",
              aspectRatio: "807 / 1117",
              transform: "translateX(-60vw)",
            }}
          >
            {/* Layer A: High-Definition Realistic Texture */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={leftImgRef}
              src="/assets/images/footer/left.png"
              alt="Left hand realistic"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none transition-opacity duration-75"
              style={{ opacity: 0 }}
            />

            {/* Layer B: Original Footer Dynamic ASCII Glyph Matrix */}
            <div className="absolute inset-0 flex items-center justify-end font-mono select-none overflow-hidden">
              <pre
                ref={leftAsciiRef}
                className="text-[#0348d8] whitespace-pre select-none pointer-events-none drop-shadow-[0_0_6px_rgba(3,72,216,0.35)]"
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "0.58vw",
                  lineHeight: "1.08",
                  letterSpacing: "0.5em",
                  opacity: 0.85,
                }}
              >
                {asciiData.left}
              </pre>
            </div>

            {/* Layer C: Bio-Scan Wave (Masked strictly to left hand texture - NEVER bleeds into void) */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden select-none"
              style={{
                maskImage: "url(/assets/images/footer/left.png)",
                WebkitMaskImage: "url(/assets/images/footer/left.png)",
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              <div
                ref={leftWaveRef}
                className="absolute inset-0 transition-opacity duration-75"
                style={{
                  opacity: 0,
                  filter: "drop-shadow(0 0 10px rgba(96, 165, 250, 0.95))",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT JAGGED PANEL (Clipped along exact fracture line, slides to +100%) ── */}
      <div
        ref={rightPanelRef}
        className="absolute inset-0 w-full h-full bg-[#07080a] will-change-transform z-20 pointer-events-none select-none overflow-hidden"
        style={{
          clipPath: RIGHT_JAGGED_CLIP,
          WebkitClipPath: RIGHT_JAGGED_CLIP,
        }}
      >
        {/* Full-height half wrapper with flex items-center ensures exact 50vh centering on all viewports */}
        <div className="w-1/2 ml-auto h-full flex items-center justify-start overflow-visible pointer-events-none select-none">
          {/* Hand container: 58vw ensures wrist extends past screen edge into positive space with ZERO black pillars */}
          <div
            ref={rightHandRef}
            className="relative flex items-center justify-start pointer-events-none select-none will-change-transform"
            style={{
              width: "58vw",
              aspectRatio: "829 / 1117",
              transform: "translateX(60vw)",
            }}
          >
            {/* Layer A: High-Definition Realistic Texture */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={rightImgRef}
              src="/assets/images/footer/right.png"
              alt="Right hand realistic"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none transition-opacity duration-75"
              style={{ opacity: 0 }}
            />

            {/* Layer B: Original Footer Dynamic ASCII Glyph Matrix */}
            <div className="absolute inset-0 flex items-center justify-start font-mono select-none overflow-hidden">
              <pre
                ref={rightAsciiRef}
                className="text-[#0348d8] whitespace-pre select-none pointer-events-none drop-shadow-[0_0_6px_rgba(3,72,216,0.35)]"
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "0.58vw",
                  lineHeight: "1.08",
                  letterSpacing: "0.5em",
                  opacity: 0.85,
                }}
              >
                {asciiData.right}
              </pre>
            </div>

            {/* Layer C: Bio-Scan Wave (Masked strictly to right hand texture - NEVER bleeds into void) */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden select-none"
              style={{
                maskImage: "url(/assets/images/footer/right.png)",
                WebkitMaskImage: "url(/assets/images/footer/right.png)",
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              <div
                ref={rightWaveRef}
                className="absolute inset-0 transition-opacity duration-75"
                style={{
                  opacity: 0,
                  filter: "drop-shadow(0 0 10px rgba(96, 165, 250, 0.95))",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── SEISMIC WALL FRACTURE SVG (Centerline x: 50%, y: 0 to 100vh) ── */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
      >
        <defs>
          <filter id="crack-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Top Fracture Path (y: 0 to 500) */}
        <path
          ref={crackTopPathRef}
          d="M 500 0 L 492 70 L 514 150 L 486 230 L 510 310 L 492 400 L 500 500"
          fill="none"
          stroke="#e0f2fe"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#crack-glow)"
          style={{
            opacity: 0,
            strokeDasharray: 700,
            strokeDashoffset: 700,
          }}
        />

        {/* Bottom Fracture Path (y: 500 to 1000) */}
        <path
          ref={crackBottomPathRef}
          d="M 500 500 L 516 580 L 484 660 L 512 740 L 488 820 L 508 910 L 500 1000"
          fill="none"
          stroke="#e0f2fe"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#crack-glow)"
          style={{
            opacity: 0,
            strokeDasharray: 700,
            strokeDashoffset: 700,
          }}
        />

        {/* Micro Branch Fissures */}
        <g ref={crackBranchesRef} stroke="#93c5fd" strokeWidth="1.8" fill="none" opacity="0">
          <path d="M 486 230 L 464 256 L 448 282" />
          <path d="M 510 310 L 532 334 L 544 362" />
          <path d="M 516 580 L 538 608 L 550 638" />
          <path d="M 484 660 L 462 688 L 450 718" />
        </g>
      </svg>

      {/* ── MINIMALIST HIGH-CRAFT CONTACT SPARK (Exact Center: 50vw, 50vh) ── */}
      <div
        ref={sparkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40 flex items-center justify-center opacity-0"
        style={{
          opacity: 0,
        }}
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
