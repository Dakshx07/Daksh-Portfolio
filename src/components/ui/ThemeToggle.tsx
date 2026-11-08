"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Enforce dark mode by default
    document.documentElement.classList.remove("light");
    setTheme("dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  if (!mounted) {
    return <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 opacity-0" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="group relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[var(--notch-border)] hover:border-[var(--border-hover)] bg-[var(--card-hover)] text-[var(--text-secondary)] hover:text-[var(--notch-text)] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-0"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Morphicons.com Inspired Spring Morph SVG Toggle (Sun <-> Moon) */}
      <svg
        viewBox="0 0 24 24"
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <mask id="morphicons-moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          {/* Dynamic scoop circle that slides in to carve the crescent moon */}
          <circle
            cx={isDark ? "28" : "18"}
            cy={isDark ? "0" : "6"}
            r="8"
            fill="black"
            className="transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        </mask>

        {/* Central Sun/Moon Body with Moon Mask */}
        <circle
          cx="12"
          cy="12"
          r={isDark ? "5" : "8"}
          fill="currentColor"
          stroke="none"
          mask="url(#morphicons-moon-mask)"
          className="transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />

        {/* 8 Radial Sun Rays that rotate and spring-collapse on moon */}
        <g
          stroke="currentColor"
          className={`origin-center transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
            isDark
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-0 -rotate-90 pointer-events-none"
          }`}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
}
