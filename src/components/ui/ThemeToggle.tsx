"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
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
    return (
      <div className="w-8 h-8 rounded-full border border-[var(--border)] opacity-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="group relative flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border)] hover:border-[var(--border-hover)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        // Sun Icon for Dark Mode (click to switch to light)
        <svg
          className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-100 transition-colors duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" strokeLinecap="round" />
        </svg>
      ) : (
        // Moon Icon for Light Mode (click to switch to dark)
        <svg
          className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-900 transition-colors duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

