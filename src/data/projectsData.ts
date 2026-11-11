export interface ProjectItem {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  alt: string;
  liveUrl?: string;
  githubUrl?: string;
  description?: string;
  tags?: string[];
  gallery?: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "agent-spm",
    title: "Agent SPM",
    date: "01 2026",
    coverImage: "/assets/images/projects/Covers/AgentSPM.jpg",
    alt: "Agent SPM project preview",
    liveUrl: "https://agent-spm.com/",
    githubUrl: "https://agent-spm.com/",
    description: "Agent Skills Package Manager — Battle-tested procedural knowledge for AI agents.",
    tags: ["TypeScript", "React", "AI Agents", "Next.js"],
  },
  {
    id: "orbies",
    title: "Orbies",
    date: "02 2026",
    coverImage: "/assets/images/projects/Covers/Orbies.avif",
    alt: "Orbies project preview",
    liveUrl: "https://orbies.in/",
    githubUrl: "https://orbies.in/",
    description: "Volunteering & local community event platform.",
    tags: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
  },
  {
    id: "sentinel",
    title: "Sentinel",
    date: "03 2026",
    coverImage: "/assets/images/projects/Covers/Sentinel.avif",
    alt: "Sentinel project preview",
    liveUrl: "https://sentinell-ai.netlify.app/",
    githubUrl: "https://github.com/SynthesisxLabs/Sentinel-ML-Supabase",
    description: "AI-powered security architect that detects, fixes, and hardens codebases.",
    tags: ["Python", "Machine Learning", "Supabase", "React"],
  },
  {
    id: "ayuchain",
    title: "AyuChain",
    date: "04 2026",
    coverImage: "/assets/images/projects/Covers/AyuChain.avif",
    alt: "AyuChain project preview",
    liveUrl: "https://github.com/lakshitsonii/medichain",
    githubUrl: "https://github.com/lakshitsonii/medichain",
    description: "AI and immutable blockchain ledger for healthcare prescription validation.",
    tags: ["Blockchain", "AI", "React", "Solidity"],
  },
];

export const CIRCLE_GALLERY_IMAGES = [
  { id: "agent-spm", src: "/assets/images/projects/Covers/AgentSPM.avif", alt: "Agent SPM project preview" },
  { id: "orbies", src: "/assets/images/projects/Covers/Orbies.avif", alt: "Orbies project preview" },
  { id: "sentinel", src: "/assets/images/projects/Covers/Sentinel.avif", alt: "Sentinel project preview" },
  { id: "ayuchain", src: "/assets/images/projects/Covers/AyuChain.avif", alt: "AyuChain project preview" },
  { id: "city-night", src: "/assets/images/projects/Covers/CityNight.jpg", alt: "Anime City Night Artwork" },
  { id: "synthwave", src: "/assets/images/projects/Covers/Synthwave1984.jpg", alt: "1984 Synthwave Delorean Artwork" },
  { id: "liquid-chrome", src: "/assets/images/projects/Covers/LiquidChrome.jpg", alt: "3D Liquid Chrome Glass Artwork" },
  { id: "autumn-sunset", src: "/assets/images/projects/Covers/AutumnSunset.jpg", alt: "Watercolor Autumn Landscape Artwork" },
];
