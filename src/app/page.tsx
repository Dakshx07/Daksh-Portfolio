import AmbientGlow from "@/components/ui/AmbientGlow";
import HeroText from "@/components/hero/HeroText";
import CenterpieceArtwork from "@/components/hero/CenterpieceArtwork";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-250 selection:bg-blue-500/20">
      {/* Ambient Blue Edge Glow (Top & Bottom subtle vignette) */}
      <AmbientGlow />

      {/* Section 1: Hero Text with DevTools [Width × Height] Inspector Box & Dual Theme Switcher */}
      <HeroText />

      {/* Section 2: Centerpiece Artwork with Feathered Dither Vignette & Day ↔ Night Scrub Slider */}
      <CenterpieceArtwork />
    </main>
  );
}
