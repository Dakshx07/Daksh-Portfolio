"use client";

import { useState } from "react";

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  description: string;
  tech: string[];
  links: { label: string; href: string }[];
}

const SELECTED_PROJECTS: Project[] = [
  {
    id: "agent-spm",
    number: "01",
    title: "Agent SPM",
    subtitle: "Autonomous Agent Skills Package Manager & CLI Registry",
    year: "2026",
    category: "SYSTEMS / CLI",
    description:
      "Architectural package hub and sandboxed resolution engine for autonomous AI agent skills. Built with Rust and TypeScript to validate, sandbox, and hot-link agent tools across isolated runtime environments with zero dependency collisions.",
    tech: ["TypeScript", "Rust", "Node.js", "CLI", "AST Parsing"],
    links: [
      { label: "GitHub ↗", href: "https://github.com/Dakshx07" },
      { label: "Documentation ↗", href: "https://github.com/Dakshx07" },
    ],
  },
  {
    id: "sentinel",
    number: "02",
    title: "Sentinel",
    subtitle: "Autonomous Codebase Security & Hardening Engine",
    year: "2025",
    category: "AI / SECURITY",
    description:
      "Red-team static analysis scanner identifying privilege escalation, memory leaks, and broken access controls across enterprise codebases. Generates verified AST patch plans and enforces automated CI/CD security gates.",
    tech: ["Next.js", "Python", "AST Engine", "OpenAI", "Tailwind CSS"],
    links: [
      { label: "GitHub ↗", href: "https://github.com/Dakshx07" },
      { label: "Live Demo ↗", href: "https://github.com/Dakshx07" },
    ],
  },
  {
    id: "orbies",
    number: "03",
    title: "Orbies",
    subtitle: "Mobile Community Gathering & RSVP Protocol",
    year: "2025",
    category: "MOBILE / PROTOCOL",
    description:
      "Cross-platform mobile application engineered with React Native and Reanimated 3. Features gesture-driven event discovery, offline ticket pass sync, and sub-100ms real-time RSVP state machines backed by Go microservices.",
    tech: ["React Native", "Expo", "Reanimated 3", "Go", "PostgreSQL"],
    links: [
      { label: "App Store ↗", href: "https://github.com/Dakshx07" },
      { label: "GitHub ↗", href: "https://github.com/Dakshx07" },
    ],
  },
  {
    id: "ayuchain",
    number: "04",
    title: "AyuChain",
    subtitle: "AI & Distributed Prescription Verification Ledger",
    year: "2024",
    category: "BLOCKCHAIN / VISION",
    description:
      "Tamper-proof medical ledger combining OCR prescription parsing with Polygon blockchain audit trails, eliminating counterfeit pharmacy claims across 40+ decentralized clinics.",
    tech: ["Solidity", "Polygon", "Python OCR", "Fastify", "Next.js"],
    links: [
      { label: "GitHub ↗", href: "https://github.com/Dakshx07" },
      { label: "Protocol Spec ↗", href: "https://github.com/Dakshx07" },
    ],
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

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section className="relative mx-auto w-full max-w-[720px] px-6 pt-12 pb-28 text-[var(--text-primary)]">
      {/* ── 01 / SELECTED WORKS ── */}
      <div className="mb-14">
        {/* Section Label (kshv.me style) */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs tracking-widest text-[var(--text-muted)] uppercase">
              01 / Selected Works
            </span>
          </div>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            2024 — 2026
          </span>
        </div>

        {/* Project Rows */}
        <div className="divide-y divide-[var(--border)]">
          {SELECTED_PROJECTS.map((project) => {
            const isHovered = activeProject === project.id;

            return (
              <article
                key={project.id}
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                className="group py-8 transition-colors duration-200"
              >
                {/* Header: Number, Title & Category */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2.5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[var(--text-muted)] opacity-60">
                      {project.number}
                    </span>
                    <h3 className="font-sans font-semibold text-lg sm:text-[19px] tracking-tight text-[var(--text-primary)] group-hover:text-blue-500 transition-colors duration-150">
                      {project.title}
                    </h3>
                  </div>

                  <span className="font-mono text-[11px] tracking-wider text-[var(--text-muted)] uppercase pl-6 sm:pl-0">
                    {project.category}
                  </span>
                </div>

                {/* Subtitle / Role */}
                <p className="text-[13.5px] font-medium text-[var(--text-secondary)] mb-3 pl-6">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-[14px] leading-relaxed text-[var(--text-muted)] mb-4 pl-6 max-w-[620px]">
                  {project.description}
                </p>

                {/* Tech Pills & Live Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-4 pl-6 pt-1">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10.5px] px-2 py-0.5 rounded bg-[var(--card-hover)] text-[var(--text-secondary)] border border-[var(--border)] select-none"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11.5px] text-[var(--text-primary)] hover:text-blue-500 transition-colors duration-150 underline underline-offset-4 decoration-[var(--border)] hover:decoration-blue-500"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── 02 / OPEN SOURCE & UPSTREAM CONTRIBUTIONS ── */}
      <div>
        {/* Section Label */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] sm:text-xs tracking-widest text-[var(--text-muted)] uppercase">
              02 / Upstream & Open Source
            </span>
          </div>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            124 Merged PRs
          </span>
        </div>

        {/* Metric Banner (kshv.me style) */}
        <div className="p-3.5 mb-6 rounded-lg bg-[var(--card-hover)] border border-[var(--border)] flex flex-wrap items-center justify-between gap-2 text-[12px] font-mono text-[var(--text-secondary)]">
          <span className="font-medium text-[var(--text-primary)]">
            124 MERGED PRS • 42 REPOSITORIES
          </span>
          <span className="text-emerald-500 font-medium">
            CAREER-OPS ORG MEMBER
          </span>
        </div>

        {/* Contribution Rows */}
        <div className="divide-y divide-[var(--border)]">
          {OPEN_SOURCE_REPOS.map((repo) => (
            <div
              key={repo.name}
              className="py-4.5 group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
            >
              <div className="flex-1">
                <div className="flex items-baseline gap-2.5 mb-1">
                  <a
                    href={repo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[15px] text-[var(--text-primary)] group-hover:text-blue-500 transition-colors duration-150"
                  >
                    {repo.name}
                  </a>
                  <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {repo.prs}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-[var(--text-muted)] max-w-[540px]">
                  {repo.desc}
                </p>
              </div>

              <span className="font-mono text-[10.5px] text-[var(--text-muted)] uppercase self-start sm:self-auto">
                {repo.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Full Showcase Link */}
        <div className="mt-8 pt-4 border-t border-[var(--border)] flex justify-between items-center text-xs font-mono">
          <span className="text-[var(--text-muted)]">
            Active maintainer & contributor
          </span>
          <a
            href="https://github.com/Dakshx07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-primary)] hover:text-blue-500 transition-colors duration-150 underline underline-offset-4 decoration-[var(--border)] hover:decoration-blue-500"
          >
            Explore all repositories on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
