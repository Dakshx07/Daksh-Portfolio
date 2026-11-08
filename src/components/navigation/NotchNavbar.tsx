"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface NotchNavbarProps {
  sticker?: string;
}

export default function NotchNavbar({ sticker = "/stickers/pip-coffee.svg" }: NotchNavbarProps) {
  const [isVisible, setIsVisible] = useState(true);

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

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        Compact Apple / Supaste Dynamic Island Notch
        Snug width housing ONLY:
        [ Mascot Sticker ] ------- [ Mode Switcher ] [ Get in touch ↗ ]
      */}
      <div className="relative pointer-events-auto flex items-center justify-between w-auto min-w-[240px] sm:min-w-[270px] h-10 sm:h-11 px-2.5 sm:px-3 bg-[#000000] text-white border-b border-x border-white/10 rounded-b-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] select-none gap-3 sm:gap-4">
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

        {/* Left: Pixel Sticker Mascot Icon ONLY */}
        <button
          onClick={scrollToTop}
          type="button"
          className="group relative flex items-center justify-center cursor-pointer p-0.5 rounded-lg transition-transform focus:outline-none"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sticker}
            alt="Mascot Sticker"
            className="w-6 h-6 sm:w-7 sm:h-7 object-contain transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-8"
            draggable={false}
          />
        </button>

        {/* Right: Theme Toggle & Supaste High-Contrast White Pill CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Subtle Sun/Moon Switcher */}
          <ThemeToggle />

          {/* Supaste-Style Pure White High-Contrast Pill Button */}
          <a
            href="mailto:contact@dakshhiran.dev"
            className="flex items-center gap-1 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full text-[11.5px] sm:text-[12px] font-semibold bg-white text-black hover:bg-zinc-200 active:scale-95 transition-all duration-150 shadow-sm"
          >
            <span>Get in touch</span>
            <svg
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-black"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
