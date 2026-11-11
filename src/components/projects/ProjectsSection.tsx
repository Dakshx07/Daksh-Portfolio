"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { JellyBlobMascot, type JellyBlobMood } from "feral-blob";

interface ProjectStoreLink {
  id: string;
  title: string;
  link: string;
  icon: React.ReactNode;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  stores?: ProjectStoreLink[];
}

const PROJECTS: Project[] = [
  {
    id: "agent-spm",
    title: "Agent SPM",
    description:
      "Autonomous skills package manager & CLI registry for AI agents with sandboxed execution.",
    image: "/assets/images/projects/Covers/AgentSPM.jpg",
    link: "https://agent-spm.com/",
  },
  
  {
    id: "orbies",
    title: "Orbies",
    description:
      "Volunteering & local community event platform with gesture discovery and real-time RSVPs.",
    image: "/assets/images/projects/Covers/Orbies.avif",
    link: "https://orbies.in/",
    stores: [
      {
        id: "apple",
        title: "Available on Apple App Store",
        link: "https://orbies.in/",
        icon: (
          <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.56.65-.96 1.7-0.85 2.72 1.01.08 2.03-.52 2.55-1.22z" />
          </svg>
        ),
      },
      {
        id: "google-play",
        title: "Available on Google Play Store",
        link: "https://orbies.in/",
        icon: (
          <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 512 512">
            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "sentinel",
    title: "Sentinel",
    description:
      "Autonomous codebase security scanner and AST patch planner for automated CI/CD hardening.",
    image: "/assets/images/projects/Covers/Sentinel.avif",
    link: "https://sentinell-ai.netlify.app/",
  },
  {
    id: "ayuchain",
    title: "AyuChain",
    description:
      "AI prescription verification and tamper-proof healthcare ledger across 40+ clinics.",
    image: "/assets/images/projects/Covers/AyuChain.avif",
    link: "https://github.com/lakshitsonii/medichain",
  },
];

const MOOD_CYCLE: JellyBlobMood[] = [
  "curious",
  "happy",
  "wave",
  "love",
  "shy",
  "surprised",
];

export default function ProjectsSection() {
  const [blobMood, setBlobMood] = useState<JellyBlobMood>("curious");
  const [moodIndex, setMoodIndex] = useState(0);
  const headingBoxRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 78, height: 26 });

  // Update dynamic Figma box dimensions for the "Projects" heading
  const updateDimensions = useCallback(() => {
    if (headingBoxRef.current) {
      const rect = headingBoxRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updateDimensions);
    }
    const ro = new ResizeObserver(updateDimensions);
    if (headingBoxRef.current) ro.observe(headingBoxRef.current);
    window.addEventListener("resize", updateDimensions);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [updateDimensions]);

  // Click / poke reaction for the project mascot blob
  const handleBlobPoke = () => {
    const nextIdx = (moodIndex + 1) % MOOD_CYCLE.length;
    setMoodIndex(nextIdx);
    setBlobMood(MOOD_CYCLE[nextIdx]);
  };

  return (
    <section className="relative mx-auto w-full max-w-[580px] px-4 sm:px-0 pt-8 pb-16 sm:pb-20 text-[var(--text-primary)]">
      {/* ── SECTION HEADER (Light Blue Mascot + Figma Box Header) ── */}
      <div className="flex items-center gap-3.5 mb-6 select-none">
        {/* FeralUI Blob Mascot with Light Bluish Palette & Perfect Proportions */}
        <button
          type="button"
          onClick={handleBlobPoke}
          className="relative w-10 h-10 sm:w-11 sm:h-11 cursor-pointer flex-shrink-0 jelly-lightblue-gradient hover:scale-105 active:scale-95 transition-transform duration-150 p-0 bg-transparent border-0 outline-none"
          title="Click to interact with the project blob!"
          aria-label="Interact with project mascot blob"
        >
          <JellyBlobMascot
            mood={blobMood}
            eyeStyle="v1"
            className="w-full h-full"
            onPoke={handleBlobPoke}
          />
        </button>

        {/* Section Heading with Figma Selection Box by Default & Increased Text Size */}
        <div className="relative inline-flex items-center">
          <div
            ref={headingBoxRef}
            className="selection-box-header px-2 py-0.5 rounded-[1px]"
          >
            {/* 4 Corner Handles of Figma Inspector */}
            <i className="handle-tl" />
            <i className="handle-tr" />
            <i className="handle-bl" />
            <i className="handle-br" />

            <h2 className="font-sans font-medium text-[20px] sm:text-[22px] tracking-tight text-[var(--text-primary)] leading-tight">
              Projects
            </h2>

            {/* Floating Figma Dimension Inspector Tag (Default Active) */}
            <span className="selection-tag">
              {dimensions.width} × {dimensions.height}
            </span>
          </div>
        </div>
      </div>

      {/* ── 2-COLUMN PROJECT GRID (kshv.me scale: max-w-[580px], borderless images, refined typography) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-5 gap-y-6 sm:gap-y-7">
        {PROJECTS.map((project) => (
          <article key={project.id} className="flex flex-col">
            {/* Clickable Borderless Image Container (Exact kshv.me proportions) */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="relative aspect-[16/10] w-full rounded-[14px] sm:rounded-[16px] overflow-hidden bg-neutral-900 block select-none"
            >
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 640px) 100vw, 290px"
                className="object-cover"
              />
            </a>

            {/* Title & Standalone Store Logos */}
            <div className="mt-2.5 mb-1 flex items-center justify-between gap-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <h3 className="font-sans font-medium text-[14.5px] sm:text-[15px] text-[var(--text-primary)] tracking-[-0.01em] leading-tight">
                  {project.title}
                </h3>
              </a>

              {/* Standalone Store Logos (Apple App Store & Google Play for Orbies) */}
              {project.stores && (
                <div className="flex items-center gap-2 flex-shrink-0 text-zinc-400 dark:text-zinc-500">
                  {project.stores.map((s) => (
                    <a
                      key={s.id}
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--text-primary)] transition-all duration-150 hover:scale-110 flex items-center justify-center p-0.5"
                      title={s.title}
                      aria-label={s.title}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Curated 2-liner description with kshv.me line-height and letter-spacing */}
            <p className="text-[13px] text-[var(--text-secondary)] leading-[1.45] tracking-[-0.01em]">
              {project.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
