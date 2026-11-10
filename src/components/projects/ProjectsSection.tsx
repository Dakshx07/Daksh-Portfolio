"use client";

import { useState } from "react";
import { JellyBlobMascot, type JellyBlobMood } from "feral-blob";
import "feral-blob/blob.css";

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
  gradient: string;
  accent: string;
  previewGraphic: React.ReactNode;
}

const PROJECTS: Project[] = [
  {
    id: "agent-spm",
    number: "01",
    title: "Agent SPM",
    category: "SYSTEMS / CLI",
    description:
      "Autonomous agent skills package manager & sandboxed resolution engine built with Rust and TypeScript.",
    tech: ["TypeScript", "Rust", "Node.js", "AST"],
    link: "https://github.com/Dakshx07",
    gradient: "from-blue-600/20 via-indigo-900/10 to-transparent",
    accent: "#3b82f6",
    previewGraphic: (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-blue-950/40 via-zinc-950 to-zinc-950">
        <div className="flex items-center justify-between text-[10px] font-mono text-blue-400/80">
          <span>SPM_CORE_V2.1</span>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        </div>
        <div className="space-y-1.5 font-mono text-[11px] text-zinc-300">
          <div className="text-zinc-500 text-[10px]">$ npx agent-spm resolve</div>
          <div className="text-blue-400 font-semibold">✓ 14 tools linked (0 collisions)</div>
          <div className="text-zinc-400 text-[10px]">Memory footprint: &lt;18MB sandboxed</div>
        </div>
        <div className="flex gap-1.5">
          <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300">Rust</span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-300">CLI</span>
        </div>
      </div>
    ),
  },
  {
    id: "sentinel",
    number: "02",
    title: "Sentinel",
    category: "AI / SECURITY",
    description:
      "Red-team AST static analysis scanner and automated CI/CD code hardening patch engine.",
    tech: ["Python", "AST Engine", "Next.js", "Tailwind"],
    link: "https://github.com/Dakshx07",
    gradient: "from-emerald-600/20 via-teal-900/10 to-transparent",
    accent: "#10b981",
    previewGraphic: (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-emerald-950/40 via-zinc-950 to-zinc-950">
        <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400/80">
          <span>SENTINEL_SCANNER</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="space-y-1.5 font-mono text-[11px] text-zinc-300">
          <div className="text-zinc-500 text-[10px]">$ sentinel --audit AST</div>
          <div className="text-emerald-400 font-semibold">✓ 0 privilege escalations</div>
          <div className="text-zinc-400 text-[10px]">Automated patch plan verified</div>
        </div>
        <div className="flex gap-1.5">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300">Python</span>
          <span className="px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-[10px] font-mono text-teal-300">Security</span>
        </div>
      </div>
    ),
  },
  {
    id: "orbies",
    number: "03",
    title: "Orbies",
    category: "MOBILE / PROTOCOL",
    description:
      "Sub-100ms real-time community RSVP protocol and offline-first event ticket pass sync.",
    tech: ["React Native", "Expo", "Reanimated 3", "Go"],
    link: "https://github.com/Dakshx07",
    gradient: "from-purple-600/20 via-pink-900/10 to-transparent",
    accent: "#a855f7",
    previewGraphic: (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-purple-950/40 via-zinc-950 to-zinc-950">
        <div className="flex items-center justify-between text-[10px] font-mono text-purple-400/80">
          <span>ORBIES_PASS_SYNC</span>
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
        </div>
        <div className="space-y-1.5 font-mono text-[11px] text-zinc-300">
          <div className="text-purple-300 font-semibold">Offline Pass Verification</div>
          <div className="text-zinc-400 text-[10px]">60fps gesture physics • Reanimated 3</div>
          <div className="text-zinc-500 text-[10px]">Latency: 42ms state propagation</div>
        </div>
        <div className="flex gap-1.5">
          <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-300">Mobile</span>
          <span className="px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20 text-[10px] font-mono text-pink-300">Go</span>
        </div>
      </div>
    ),
  },
  {
    id: "ayuchain",
    number: "04",
    title: "AyuChain",
    category: "BLOCKCHAIN / VISION",
    description:
      "AI OCR prescription verification and tamper-proof blockchain audit ledger across clinics.",
    tech: ["Solidity", "Polygon", "Python OCR", "Fastify"],
    link: "https://github.com/Dakshx07",
    gradient: "from-amber-600/20 via-orange-900/10 to-transparent",
    accent: "#f59e0b",
    previewGraphic: (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-amber-950/40 via-zinc-950 to-zinc-950">
        <div className="flex items-center justify-between text-[10px] font-mono text-amber-400/80">
          <span>AYUCHAIN_LEDGER</span>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        </div>
        <div className="space-y-1.5 font-mono text-[11px] text-zinc-300">
          <div className="text-amber-400 font-semibold">Polygon Block #48192801</div>
          <div className="text-zinc-400 text-[10px]">Tamper-proof pharmacy audit trail</div>
          <div className="text-zinc-500 text-[10px]">40+ decentralized clinics active</div>
        </div>
        <div className="flex gap-1.5">
          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300">Polygon</span>
          <span className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-[10px] font-mono text-orange-300">OCR</span>
        </div>
      </div>
    ),
  },
];

const OPEN_SOURCE_REPOS = [
  {
    name: "Nhost",
    prs: "13 Merged PRs",
    desc: "Engineered dashboard UI primitives, high-throughput table grid actions, Combobox v2 migrations, and private storage authenticated downloads.",
    tag: "CORE DASHBOARD",
    link: "https://github.com/nhost/nhost",
  },
  {
    name: "Career-Ops",
    prs: "3 Merged PRs",
    desc: "Official Organization Member. Implemented loopback proxy security under trusted egress, deduplication tracker, and session resilience.",
    tag: "SECURITY / CORE",
    link: "https://github.com/career-ops",
  },
  {
    name: "Jitsi Meet",
    prs: "3 Merged PRs",
    desc: "Fixed WebRTC video grid aspect ratio hysteresis, eliminating layout thrashing and rendering freezes during active speaker switches.",
    tag: "WEBRTC / AUDIO",
    link: "https://github.com/jitsi/jitsi-meet",
  },
  {
    name: "Supercompress",
    prs: "6 Merged PRs",
    desc: "Query-aware token compression algorithms for LLM context windows, reducing inference latency and context overflow on long sessions.",
    tag: "AI TOOLING",
    link: "https://github.com/Dakshx07",
  },
  {
    name: "Processing Foundation",
    prs: "1 Merged PR",
    desc: "Security validation for file rename extensions, whitelist enforcement, and path traversal mitigation across desktop IDE builds.",
    tag: "GSOC / SECURITY",
    link: "https://github.com/processing",
  },
];

const MOODS: JellyBlobMood[] = ["curious", "happy", "wave", "love", "surprised"];

export default function ProjectsSection() {
  const [blobMoodIndex, setBlobMoodIndex] = useState(0);

  const cycleMood = () => {
    setBlobMoodIndex((prev) => (prev + 1) % MOODS.length);
  };

  return (
    <section className="relative mx-auto w-full max-w-[720px] px-6 pt-16 pb-28 text-[var(--text-primary)]">
      {/* ── 01 / SELECTED WORKS HEADER (Figma Box Default Active + FeralUI Blob) ── */}
      <div className="mb-10">
        <div className="flex items-center gap-3.5 mb-2">
          {/* Interactive FeralUI Jelly Blob Companion */}
          <button
            onClick={cycleMood}
            type="button"
            className="w-8 h-8 cursor-pointer transform hover:scale-110 active:scale-95 transition-transform focus:outline-none select-none"
            title="Click to poke the blob!"
            aria-label="Interactive Blob Mascot"
          >
            <JellyBlobMascot
              mood={MOODS[blobMoodIndex]}
              eyeStyle="v1"
              className="w-full h-full pointer-events-none"
            />
          </button>

          {/* Header Title with Authentically Active Figma Selection Box by Default */}
          <div className="relative inline-block selection-box-header">
            {/* 4 Corner Resize Handles */}
            <i className="handle-tl" />
            <i className="handle-tr" />
            <i className="handle-bl" />
            <i className="handle-br" />

            <h2 className="font-mono text-xs sm:text-[13px] tracking-wider text-[var(--select)] font-semibold px-2 py-0.5 select-none">
              01 / SELECTED WORKS
            </h2>

            {/* Figma Live Coordinate Tag */}
            <span className="selection-tag">184 × 22</span>
          </div>
        </div>

        <p className="text-xs sm:text-[13px] text-[var(--text-muted)] font-sans mt-3">
          Independent systems, developer tooling & production protocols.
        </p>
      </div>

      {/* ── 2-COLUMN PROJECT GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-16">
        {PROJECTS.map((project) => (
          <article key={project.id} className="flex flex-col group">
            {/* Clickable Image Container (Redirects directly on click, NO arrow icon) */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="relative aspect-[16/10] w-full rounded-xl border border-[var(--border)] overflow-hidden bg-zinc-950/70 hover:border-blue-500/50 hover:shadow-[0_8px_25px_rgba(37,99,235,0.18)] transition-all duration-200 cursor-pointer block select-none"
            >
              {/* Subtle Stipple Dither Vignette */}
              <div className="scenery absolute inset-0 opacity-20 pointer-events-none" />

              {/* Graphic Preview */}
              <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-250 ease-out">
                {project.previewGraphic}
              </div>
            </a>

            {/* Title & 2-Liner Description Below Image */}
            <div className="mt-3 flex flex-col">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h3 className="font-sans font-semibold text-base sm:text-[17px] text-[var(--text-primary)] group-hover:text-blue-500 transition-colors duration-150">
                  {project.title}
                </h3>
                <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
                  {project.category}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* ── 02 / UPSTREAM & OPEN SOURCE (124 Merged PRs) ── */}
      <div className="pt-8 border-t border-[var(--border)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="font-mono text-xs sm:text-[13px] tracking-wider text-[var(--text-muted)] uppercase">
              02 / Upstream & Open Source
            </h2>
          </div>
          <span className="font-mono text-[11px] text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
            124 Merged PRs
          </span>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {OPEN_SOURCE_REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 hover:bg-[var(--card-hover)] px-2 -mx-2 rounded-lg transition-colors group block"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-sans font-medium text-sm text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">
                  {repo.name}
                </span>
                <span className="font-mono text-[11px] text-blue-400/90 font-medium">
                  {repo.prs}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] sm:max-w-[420px] leading-relaxed">
                {repo.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
