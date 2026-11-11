"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { JellyBlobMascot, type JellyBlobMood } from "feral-blob";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
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
    id: "sentinel",
    title: "Sentinel",
    description:
      "Autonomous codebase security scanner and AST patch planner for automated CI/CD hardening.",
    image: "/assets/images/projects/Covers/Sentinel.avif",
    link: "https://sentinell-ai.netlify.app/",
  },
  {
    id: "orbies",
    title: "Orbies",
    description:
      "Volunteering & local community event platform with gesture discovery and real-time RSVPs.",
    image: "/assets/images/projects/Covers/Orbies.avif",
    link: "https://orbies.in/",
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

            {/* Title (kshv.me typography: no hover color shift, steady) */}
            <div className="mt-2.5 mb-1">
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
