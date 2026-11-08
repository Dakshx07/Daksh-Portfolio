"use client";

import { useEffect, useState, useRef } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface NotchNavbarProps {
  sticker?: string;
}

// Authentic Brand Logos (brandlogos.net), Official Hex Colors & Non-Overlapping Radial Arc
const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/dakshhiran",
    dx: 104, // Top-right flank: fully clear of the button and navbar wing
    dy: 6,
    openDelay: 0,
    closeDelay: 105,
    // Authentic square brand logo with rounded corners
    shapeClass: "rounded-[6px] bg-[#0A66C2] border border-[#0A66C2]/60 shadow-[0_6px_20px_rgba(10,102,194,0.6)] hover:shadow-[0_6px_22px_rgba(10,102,194,0.8)]",
    // Official LinkedIn 'in' letterform mark in official square
    icon: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:contact@dakshhiran.dev",
    dx: 88,  // Lower-right flank: fully clear of both right and bottom pill edges
    dy: 42,
    openDelay: 45,
    closeDelay: 70,
    // Standalone logo with NO background behind it
    shapeClass: "bg-transparent border-0 shadow-none",
    // Prominent full-size authentic Google Workspace 4-color Gmail 'M'
    icon: (
      <svg className="w-7 h-7 sm:w-7.5 sm:h-7.5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" viewBox="24 46 464 345">
        <path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285F4" />
        <path d="M154 248l102 77l102-77v-98l-102 77l-102-77" fill="#EA4335" />
        <path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34A853" />
        <path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#C5221F" />
        <path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#FBBC04" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/Dakshx07",
    dx: 44,  // Bottom-right edge
    dy: 54,
    openDelay: 90,
    closeDelay: 35,
    shapeClass: "rounded-full bg-[#181717] border border-white/20 shadow-[0_6px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_6px_22px_rgba(255,255,255,0.35)]",
    // Official GitHub Octocat silhouette mark
    icon: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/DakshHiran7",
    dx: -2,  // Bottom-center: safe distance from theme toggle
    dy: 54,
    openDelay: 135,
    closeDelay: 0,
    shapeClass: "rounded-full bg-[#000000] border border-white/25 shadow-[0_6px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_6px_22px_rgba(255,255,255,0.35)]",
    // Official 𝕏 vector
    icon: (
      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
  },
];

export default function NotchNavbar({ sticker = "/stickers/nori-cool.svg" }: NotchNavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isSocialHovered, setIsSocialHovered] = useState(false);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll listener:
  // Visible at top of page (scrollY <= 45).
  // Slides smoothly up off the screen as user scrolls down.
  // Slides smoothly back down when returning to the top!
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        setIsVisible(scrollY <= 45);
        rafId = null;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsSocialHovered(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    // 120ms debounce prevents flickering during mouse transit over the arc
    leaveTimerRef.current = setTimeout(() => {
      setIsSocialHovered(false);
    }, 120);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none px-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {/* 
        The Apple / Supaste Notch Body
        Solid pitch-black obsidian container (#000000) with mathematical concave wings
        Centered with balanced max-width to hug navigation items gracefully
      */}
      <div className="relative pointer-events-auto flex items-center justify-between w-auto min-w-[330px] sm:min-w-[370px] h-11 sm:h-12 pl-3.5 pr-3 sm:pl-4 sm:pr-3.5 bg-[#000000] text-white border-b border-x border-white/10 rounded-b-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] select-none gap-4 sm:gap-6">
        {/* Left Inverted Wing (G1 continuous cubic fillet scooping into the ceiling) */}
        <div className="absolute -left-4 top-0 w-4 h-4 pointer-events-none">
          <svg className="w-4 h-4 overflow-visible" viewBox="0 0 16 16">
            <path
              d="M 0 0 H 16 V 16 C 16 7.16 8.84 0 0 0 Z"
              fill="#000000"
            />
            <path
              d="M 0 0 C 8.84 0 16 7.16 16 16"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Right Inverted Wing (G1 continuous cubic fillet scooping into the ceiling) */}
        <div className="absolute -right-4 top-0 w-4 h-4 pointer-events-none">
          <svg className="w-4 h-4 overflow-visible" viewBox="0 0 16 16">
            <path
              d="M 0 16 V 0 H 16 C 7.16 0 0 7.16 0 16 Z"
              fill="#000000"
            />
            <path
              d="M 16 0 C 7.16 0 0 7.16 0 16"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Left: nori-cool Mascot Sticker & 'daksh' Wordmark in Geist Pixel Square */}
        <button
          onClick={scrollToTop}
          type="button"
          className="group relative flex items-center gap-2 cursor-pointer p-0.5 rounded-lg transition-transform focus:outline-none"
          aria-label="Daksh - Scroll to top"
          title="Scroll to top"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sticker}
            alt="nori-cool mascot"
            className="w-7 h-7 sm:w-7.5 sm:h-7.5 object-contain transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-8"
            draggable={false}
          />
          <span className="font-semibold text-[13px] sm:text-sm tracking-tight text-white font-sans">
            dksh
          </span>
        </button>

        {/* Right Controls: Morphicons Theme Toggle & Semi-Circle Radial Fan-Out Bloom */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Morphicons.com Spring Morphing Sun <-> Moon Switcher */}
          <ThemeToggle />

          {/* "Get in touch" CTA with Curved Semi-Circular Social Bloom */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* The Main High-Contrast White Pill */}
            <a
              href="mailto:contact@dakshhiran.dev"
              className="relative z-20 flex items-center gap-1.5 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[12px] sm:text-[12.5px] font-semibold bg-white text-black hover:bg-zinc-200 active:scale-95 transition-all duration-150 shadow-sm"
            >
              <span>Get in touch</span>
              <svg
                className="w-3 h-3 stroke-black"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>

            {/* Scoped Hit Bridge: STRICTLY starts at left-0 so theme toggle is never triggered */}
            <div className="absolute left-0 -right-36 -top-3 -bottom-20 z-10 pointer-events-auto" />

            {/* Curved Right-to-Bottom Social Media Fan-Out Arc (z-30 to float on top with zero clipping) */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-opacity duration-200 ${
                isSocialHovered ? "pointer-events-auto opacity-100" : "opacity-0"
              }`}
            >
              {SOCIAL_LINKS.map((social) => {
                const transform = isSocialHovered
                  ? `translate(${social.dx}px, ${social.dy}px) scale(1)`
                  : "translate(0px, 0px) scale(0.2)";

                const delay = isSocialHovered ? social.openDelay : social.closeDelay;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className={`absolute -top-4 -left-4 flex items-center justify-center w-8 h-8 ${social.shapeClass} text-white hover:scale-125 transition-all duration-300 cursor-pointer`}
                    style={{
                      transform,
                      opacity: isSocialHovered ? 1 : 0,
                      transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      transitionDelay: `${delay}ms`,
                    }}
                  >
                    {social.icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
