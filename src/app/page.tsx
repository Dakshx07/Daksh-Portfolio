import Preloader from "@/components/preloader/Preloader";
import HeroSection from "@/components/hero/HeroSection";
import HeroSequenceCanvas from "@/components/hero/HeroSequenceCanvas";
import AboutSection from "@/components/sections/AboutSection";
import CircleGallerySection from "@/components/sections/CircleGallerySection";
import FooterSection from "@/components/sections/FooterSection";
import ProjectDetailDrawer from "@/components/ui/ProjectDetailDrawer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white">
     
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

