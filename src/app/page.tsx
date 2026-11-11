"use client";

import { useState } from "react";
import NotchNavbar from "@/components/navigation/NotchNavbar";
import AmbientGlow from "@/components/ui/AmbientGlow";
import EdgeBlur from "@/components/ui/EdgeBlur";
import HeroText from "@/components/hero/HeroText";
import CenterpieceArtwork from "@/components/hero/CenterpieceArtwork";
import FallingPetals from "@/components/hero/FallingPetals";
import PullCordToggle from "@/components/ui/PullCordToggle";
import ProjectsSection from "@/components/projects/ProjectsSection";
import GitHubContributionGraph from "@/components/activity/GitHubContributionGraph";

export default function Home() {
  const [sliderProgress, setSliderProgress] = useState(0.5);

  return (
    <main className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-250 selection:bg-blue-500/20">
      {/* Ceiling Hanging Pull-Cord Theme Switcher (FeralUI / Verlet Physics) */}
      <PullCordToggle />

      {/* Apple Notch Navbar (Flush top, inverted wings, ultra-compact) */}
      <NotchNavbar />

      {/* Full-Viewport Falling Botanical Petals (Rose, Marigold, Jasmine) across the entire website */}
      <FallingPetals progress={sliderProgress} />

      {/* Progressive Multi-Layer Frosted Edge Blur (Top & Bottom Viewport Bokeh on Scroll) */}
      <EdgeBlur edge="top" />
      <EdgeBlur edge="bottom" />

      {/* Ambient Blue Edge Glow (Subtle atmosphere) */}
      <AmbientGlow />

      {/* Section 1: Hero Text with DevTools [Width × Height] Inspector Box */}
      <HeroText />

      {/* Section 2: Centerpiece Artwork with Feathered Dither Vignette & Day ↔ Night Scrub Slider */}
      <CenterpieceArtwork onProgressChange={setSliderProgress} />

      {/* Section 3: kshv.me-Style 2-Column Projects Showcase (Indian Stamp Badge + Real Covers + 2-Line Summaries) */}
      <ProjectsSection />

      {/* Section 4: Akoder-Style Live GitHub Contribution Heatmap Grid (Dakshx07) */}
      <GitHubContributionGraph username="Dakshx07" />
    </main>
  );
}
