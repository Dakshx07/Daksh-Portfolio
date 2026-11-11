"use client";

import { useEffect, useState } from "react";

interface EdgeBlurProps {
  edge: "top" | "bottom";
}

export default function EdgeBlur({ edge }: EdgeBlurProps) {
  const [isVisible, setIsVisible] = useState(edge === "bottom");

  useEffect(() => {
    let rafId: number | null = null;

    const checkScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        if (edge === "top") {
          // Top blur should NOT be visible at default 0 scroll
          // It fades in smoothly as the user starts scrolling down
          setIsVisible(scrollY > 14);
        } else {
          // Bottom blur is visible while reading, but fades out when user reaches bottom of document
          const atBottom = windowHeight + scrollY >= docHeight - 20;
          setIsVisible(!atBottom);
        }
        rafId = null;
      });
    };

    // Initial check
    checkScroll();

    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [edge]);

  return (
    <div
      aria-hidden="true"
      className={`edge-blur transition-opacity duration-300 ease-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      data-edge={edge}
    >
      <span data-layer="1" />
      <span data-layer="2" />
      <span data-layer="3" />
    </div>
  );
}


