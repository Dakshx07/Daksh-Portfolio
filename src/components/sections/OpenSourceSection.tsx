"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { JellyBlobMascot, type JellyBlobMood } from "feral-blob";

interface OpenSourcePR {
  id: string;
  title: string;
  prNumber: number;
  description: string;
  url: string;
}

interface OpenSourceRepo {
  id: string;
  repoName: string;
  repoUrl: string;
  year: string;
  prs: OpenSourcePR[];
}

const OPEN_SOURCE_DATA: OpenSourceRepo[] = [
  {
    id: "nhost",
    repoName: "nhost/nhost",
    repoUrl: "https://github.com/nhost/nhost",
    year: "2024",
    prs: [
      {
        id: "nhost-4984",
        title: "feat(dashboard): add last sign-in method badge",
        prNumber: 4984,
        description: "Implemented security provider authentication badges in the dashboard.",
        url: "https://github.com/nhost/nhost/pull/4984",
      },
      {
        id: "nhost-4883",
        title: "fix(docs): make message text theme-aware via pnpm",
        prNumber: 4883,
        description: "Bundled Mermaid via pnpm and calibrated dynamic theme strokes.",
        url: "https://github.com/nhost/nhost/pull/4883",
      },
      {
        id: "nhost-4739",
        title: "feat(dashboard): show subdomain & region in AppLoader",
        prNumber: 4739,
        description: "Displayed project subdomain and region in AppLoader during initialization.",
        url: "https://github.com/nhost/nhost/pull/4739",
      },
    ],
  },
  {
    id: "career-ops",
    repoName: "career-ops-hq/career-ops",
    repoUrl: "https://github.com/career-ops-hq/career-ops",
    year: "2024",
    prs: [
      {
        id: "career-5819",
        title: "fix(providers): allow credentialed HTTP proxies on loopback",
        prNumber: 5819,
        description: "Security fix allowing credentialed HTTP proxies on loopback under trusted egress.",
        url: "https://github.com/career-ops-hq/career-ops/pull/5819",
      },
      {
        id: "career-6738",
        title: "feat(providers): allow posts_per_page on jobspresso",
        prNumber: 6738,
        description: "Custom pagination configuration for remote job feed pipelines.",
        url: "https://github.com/career-ops-hq/career-ops/pull/6738",
      },
    ],
  },
  {
    id: "jitsi",
    repoName: "jitsi/jitsi-meet",
    repoUrl: "https://github.com/jitsi/jitsi-meet",
    year: "2024",
    prs: [
      {
        id: "jitsi-17752",
        title: "fix(layout): add hysteresis to aspect ratio calculation",
        prNumber: 17752,
        description: "Eliminated video grid layout thrashing during continuous browser resize.",
        url: "https://github.com/jitsi/jitsi-meet/pull/17752",
      },
      {
        id: "jitsi-17626",
        title: "fix(camera): prevent rear camera preview from mirroring",
        prNumber: 17626,
        description: "Prevented mobile rear camera preview stream from inverted horizontal flip.",
        url: "https://github.com/jitsi/jitsi-meet/pull/17626",
      },
    ],
  },
  {
    id: "processing",
    repoName: "processing/p5.js-web-editor",
    repoUrl: "https://github.com/processing/p5.js-web-editor",
    year: "2023",
    prs: [
      {
        id: "processing-4175",
        title: "fix(security): validate file extension whitelist on rename",
        prNumber: 4175,
        description: "Strict file extension whitelist validation on rename to prevent script injection.",
        url: "https://github.com/processing/p5.js-web-editor/pull/4175",
      },
    ],
  },
];

const MOOD_CYCLE: JellyBlobMood[] = [
  "happy",
  "wave",
  "curious",
  "celebrate" as JellyBlobMood,
  "love",
  "shy",
];

export default function OpenSourceSection() {
  const [blobMood, setBlobMood] = useState<JellyBlobMood>("happy");
  const [moodIndex, setMoodIndex] = useState(0);
  const headingBoxRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 108, height: 26 });
  const [liveMergedCount, setLiveMergedCount] = useState<number | null>(null);

  // Dynamically fetch live merged PR count from GitHub Search API for Dakshx07
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveCount() {
      try {
        const res = await fetch(
          "https://api.github.com/search/issues?q=author:Dakshx07+type:pr+is:merged"
        );
        if (res.ok) {
          const json = await res.json();
          if (isMounted && typeof json.total_count === "number") {
            setLiveMergedCount(json.total_count);
          }
        }
      } catch (err) {
        console.warn("Could not fetch live GitHub PR count:", err);
      }
    }
    fetchLiveCount();
    return () => {
      isMounted = false;
    };
  }, []);

  // Update dynamic Figma box dimensions for the "Open source" heading
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

  // Click / poke reaction for the Open Source emerald mascot blob
  const handleBlobPoke = () => {
    const nextIdx = (moodIndex + 1) % MOOD_CYCLE.length;
    setMoodIndex(nextIdx);
    setBlobMood(MOOD_CYCLE[nextIdx]);
  };

  return (
    <section className="relative mx-auto w-full max-w-[580px] px-4 sm:px-0 pt-4 pb-20 text-[var(--text-primary)]">
      {/* ── SECTION HEADER (Emerald Blob Mascot + Default Figma Box Header) ── */}
      <div className="flex items-center gap-3.5 mb-3 select-none">
        {/* FeralUI Blob Mascot with Emerald Green Merged-PR Palette */}
        <button
          type="button"
          onClick={handleBlobPoke}
          className="relative w-10 h-10 sm:w-11 sm:h-11 cursor-pointer flex-shrink-0 jelly-emerald-gradient hover:scale-105 active:scale-95 transition-transform duration-150 p-0 bg-transparent border-0 outline-none"
          title="Click to interact with the open source blob!"
          aria-label="Interact with open source mascot blob"
        >
          <JellyBlobMascot
            mood={blobMood}
            eyeStyle="v1"
            className="w-full h-full"
            onPoke={handleBlobPoke}
          />
        </button>

        {/* Section Heading with Figma Selection Box by Default */}
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
              Open source
            </h2>

            {/* Floating Figma Dimension Inspector Tag (Default Active) */}
            <span className="selection-tag">
              {dimensions.width} × {dimensions.height}
            </span>
          </div>
        </div>
      </div>

      {/* ── METRIC STRIP (Live PR count + verified repos) ── */}
      <div className="mb-8 font-mono text-[12px] text-zinc-500 tracking-tight flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[var(--text-primary)] font-medium">
            {liveMergedCount !== null ? `${liveMergedCount}+` : "128+"}
          </span>
          <span>merged PRs</span>
        </span>
        <span className="opacity-40">•</span>
        <span>42+ repositories</span>
        <span className="opacity-40">•</span>
        <span className="text-zinc-400">Org Member @career-ops-hq</span>
      </div>

      {/* ── REPOSITORIES & TIMELINE (Dotted/dashed streaming pipeline with zero year labels) ── */}
      <div className="space-y-8">
        {OPEN_SOURCE_DATA.map((repo) => (
          <div key={repo.id} className="flex flex-col">
            {/* Repo Header: GitHub icon + Repo name with dotted underline */}
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 fill-current text-[var(--text-primary)] flex-shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <a
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[14px] font-medium text-[var(--text-primary)] border-b border-dotted border-zinc-600 hover:border-zinc-300 transition-colors inline-flex items-center gap-1 group"
              >
                <span>{repo.repoName}</span>
                <span className="text-[12px] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </a>
            </div>

            {/* Timeline PRs with Marching Dashed / Dotted Active Line */}
            <div className="relative ml-2 pl-6 sm:pl-7 flex flex-col space-y-6">
              {/* Dotted / Dashed Pipeline Track (SVG with marching animated packets) */}
              <div className="absolute left-[5px] top-2 bottom-3 w-[2px]">
                {/* Subtle Dotted Base Track */}
                <div className="absolute inset-0 border-l border-dotted border-zinc-700/50 dark:border-zinc-800" />
                {/* Marching Dash Laser Beam */}
                <div className="timeline-beam" />
              </div>

              {repo.prs.map((pr) => (
                <div key={pr.id} className="relative group flex flex-col">
                  {/* Glowing Git Commit Milestone Node (Positioned on the timeline) */}
                  <div className="absolute -left-[25px] sm:-left-[29px] top-1 w-3 h-3 rounded-full border border-emerald-500/30 bg-zinc-950 flex items-center justify-center transition-transform group-hover:scale-125">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  </div>

                  {/* PR Title with GitHub icon + Dotted underline link */}
                  <div className="flex items-center gap-1.5 mb-1 min-w-0 max-w-full">
                    <svg className="w-3.5 h-3.5 fill-current text-zinc-400 flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[13.5px] font-medium text-[var(--text-primary)] border-b border-dotted border-zinc-600 hover:border-zinc-300 transition-colors inline-flex items-center gap-1 group/pr min-w-0 max-w-full"
                    >
                      <span className="truncate max-w-[240px] sm:max-w-[420px]">{pr.title} - #{pr.prNumber}</span>
                      <span className="text-[11px] opacity-70 group-hover/pr:opacity-100 group-hover/pr:translate-x-0.5 group-hover/pr:-translate-y-0.5 transition-transform flex-shrink-0">
                        ↗
                      </span>
                    </a>
                  </div>

                  {/* 1-Line Description */}
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed pl-5">
                    {pr.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

