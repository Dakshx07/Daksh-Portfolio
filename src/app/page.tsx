"use client";

import { useState } from "react";
import NotchNavbar from "@/components/navigation/NotchNavbar";
import AmbientGlow from "@/components/ui/AmbientGlow";
import EdgeBlur from "@/components/ui/EdgeBlur";
import HeroText from "@/components/hero/HeroText";
import CenterpieceArtwork from "@/components/hero/CenterpieceArtwork";
import FallingPetals from "@/components/hero/FallingPetals";

export default function Home() {
  const [sliderProgress, setSliderProgress] = useState(0.5);

  return (
    <main className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-250 selection:bg-blue-500/20">
      {/* Supaste-Style Apple Notch Navbar (Flush top, inverted wings, max-w-[720px]) */}
      <NotchNavbar />

      {/* Full-Viewport Falling Botanical Petals (Rose, Marigold, Jasmine) across the entire website */}
      <FallingPetals progress={sliderProgress} />

      {/* Progressive Multi-Layer Frosted Edge Blur (Top & Bottom Viewport Bokeh on Scroll) */}
      <EdgeBlur edge="top" />
      <EdgeBlur edge="bottom" />

      {/* Ambient Blue Edge Glow (Subtle atmosphere) */}
      <AmbientGlow />

      {/* Section 1: Hero Text with DevTools [Width × Height] Inspector Box & Dual Theme Switcher */}
      <HeroText />

      {/* Section 2: Centerpiece Artwork with Feathered Dither Vignette & Day ↔ Night Scrub Slider */}
      <CenterpieceArtwork onProgressChange={setSliderProgress} />
    </main>
  );
}
