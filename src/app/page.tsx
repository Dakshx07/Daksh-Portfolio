import Preloader from "@/components/preloader/Preloader";
import HeroSection from "@/components/hero/HeroSection";
import HeroSequenceCanvas from "@/components/hero/HeroSequenceCanvas";
import AboutSection from "@/components/sections/AboutSection";
import CircleGallerySection from "@/components/sections/CircleGallerySection";
import FooterSection from "@/components/sections/FooterSection";
import ProjectDetailDrawer from "@/components/ui/ProjectDetailDrawer";
import AntiInspectProtection from "@/components/ui/AntiInspectProtection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white">
      {/* Anti-Inspect & Asset Copy Protection */}
      <AntiInspectProtection />

      <Preloader />

      <HeroSection />

      <HeroSequenceCanvas />

      <AboutSection />

      <CircleGallerySection />

      <FooterSection />
      
      <ProjectDetailDrawer />
    </main>
  );
}

