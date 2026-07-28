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
  {
    id: "skymcdb",
    title: "SkymcDB",
    date: "02 2026",
    coverImage: "/assets/images/projects/Covers/SkymcDB.avif",
    alt: "SkymcDB builder toolkit preview",
    description: "Database tool & asset browser designed for voxel world builders.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    gallery: [
      "/assets/images/projects/skymcdb/image.png",
      "/assets/images/projects/skymcdb/image2.png",
      "/assets/images/projects/skymcdb/image3.png",
      "/assets/images/projects/skymcdb/image4.png",
    ],
  },
  {
    id: "chromablock",
    title: "ChromaBlock",
    date: "03 2026",
    coverImage: "/assets/images/projects/Covers/ChromaBlock.avif",
    alt: "ChromaBlock web application preview",
    description: "Cloud-based companion web application for voxel palette generation.",
    tags: ["Canvas API", "TypeScript", "Tailwind"],
    gallery: [
      "/assets/images/projects/chromablock/image1.png",
      "/assets/images/projects/chromablock/image2.png",
      "/assets/images/projects/chromablock/image3.png",
    ],
  },
  {
    id: "symphony",
    title: "Symphony",
    date: "03 2026",
    coverImage: "/assets/images/projects/Covers/Symphony.avif",
    alt: "Symphony web music player preview",
    description: "Web music player with spatial audio visualizations.",
    tags: ["Web Audio API", "Canvas", "React"],
    gallery: [
      "/assets/images/projects/symphony/image2.png",
      "/assets/images/projects/symphony/image.png",
      "/assets/images/projects/symphony/image3.png",
    ],
  },
  {
    id: "echo",
    title: "Echo",
    date: "03 2026",
    coverImage: "/assets/images/projects/Covers/Echo.avif",
    alt: "Echo AI interface preview",
    description: "Local AI conversational interface with real-time markdown streaming.",
    tags: ["LLM", "WebSockets", "React"],
    gallery: ["/assets/images/projects/echo/image.png"],
  },
];
