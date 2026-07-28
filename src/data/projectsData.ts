export interface ProjectItem {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  alt: string;
  description?: string;
  tags?: string[];
  gallery?: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "cyberdiag",
    title: "CyberDiag website",
    date: "01 2025",
    coverImage: "/assets/images/projects/Covers/cyberDiag_web.avif",
    alt: "CyberDiag website project preview",
    description: "Cybersecurity assessment portal & interactive diagnostic platform.",
    tags: ["React", "TypeScript", "Tailwind CSS", "GSAP"],
    gallery: [
      "/assets/images/projects/CyberDiagWebsite/image1.png",
      "/assets/images/projects/CyberDiagWebsite/image2.png",
      "/assets/images/projects/CyberDiagWebsite/image3.png",
    ],
  },
  {
    id: "anima",
    title: "Anima",
    date: "06 2025",
    coverImage: "/assets/images/projects/Covers/Anima.avif",
    alt: "Anima interactive web showcase",
    description: "Interactive web platform celebrating environmental and wildlife causes.",
    tags: ["WebGL", "Three.js", "GSAP", "CSS3"],
    gallery: [
      "/assets/images/projects/Anima/image1.png",
      "/assets/images/projects/Anima/image2.png",
      "/assets/images/projects/Anima/image3.png",
    ],
  },
  {
    id: "cyberdiag-app",
    title: "CyberDiag app",
    date: "09 2025",
    coverImage: "/assets/images/projects/Covers/CyberDiag.avif",
    alt: "CyberDiag desktop app preview",
    description: "Desktop application for automated system security scans and auditing.",
    tags: ["Tauri", "Rust", "React", "TypeScript"],
    gallery: [
      "/assets/images/projects/cyberdiag/image1.png",
      "/assets/images/projects/cyberdiag/image2.png",
      "/assets/images/projects/cyberdiag/image3.png",
    ],
  },
  {
    id: "zenith",
    title: "Zenith",
    date: "11 2025",
    coverImage: "/assets/images/projects/Covers/Zenith.avif",
    alt: "Zenith browser concept preview",
    description: "Modern minimalist browser application with custom tab management.",
    tags: ["Electron", "React", "Node.js"],
    gallery: [
      "/assets/images/projects/Zenith/image1.png",
      "/assets/images/projects/Zenith/image2.png",
      "/assets/images/projects/Zenith/image3.png",
    ],
  },
];

export const CIRCLE_GALLERY_IMAGES = [
  { id: "cyberdiag", src: "/assets/images/projects/Covers/cyberDiag_web.avif", alt: "CyberDiag website project preview" },
  { id: "anima", src: "/assets/images/projects/Covers/Anima.avif", alt: "Anima interactive web showcase" },
  { id: "cyberdiag-app", src: "/assets/images/projects/Covers/CyberDiag.avif", alt: "CyberDiag desktop app preview" },
  { id: "zenith", src: "/assets/images/projects/Covers/Zenith.avif", alt: "Zenith browser concept preview" },
  { id: "skymcdb", src: "/assets/images/projects/Covers/SkymcDB.avif", alt: "SkymcDB builder toolkit preview" },
  { id: "chromablock", src: "/assets/images/projects/Covers/ChromaBlock.avif", alt: "ChromaBlock web application preview" },
  { id: "symphony", src: "/assets/images/projects/Covers/Symphony.avif", alt: "Symphony web music player preview" },
  { id: "echo", src: "/assets/images/projects/Covers/Echo.avif", alt: "Echo AI interface preview" },
];
