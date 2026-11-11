# Design System & Visual Specification: Daksh Hiran Portfolio

## 1. Identity & Tone
- **Archetype:** Technical Design Engineer, Systems Architect & Open-Source Contributor.
- **Tone:** Architectural, restrained, quiet confidence, generous negative space. Zero visual slop, zero gratuitous chrome.
- **Mode:** Experience (minimalist developer showcase where the typography, spacing, project artifacts, and code speak directly).
- **Layout Model:** Single-column centered container (`max-w-2xl` / ~680px) with generous white space, modeled after `kshv.me` and `ui-skills.com`. **No floating/sticky navbar**.
- **Dual Theme Support:** Fully adaptive Light Mode and Dark Mode with zero hydration flash.

## 2. Color & Surface Hierarchy

### Dark Mode (Primary Default)
- **Canvas (`--bg-primary`):** `#090A0B` (Deep Obsidian / Zinc-950)
- **Card Surface (`--bg-surface`):** `#121316`
- **Elevated Hover (`--bg-surface-hover`):** `#1a1b1f`
- **Hairline Border (`--border-subtle`):** `rgba(255, 255, 255, 0.08)`
- **Border Hover (`--border-hover`):** `rgba(255, 255, 255, 0.18)`
- **Primary Text:** `#FAFAFA` (Crisp White)
- **Secondary Text:** `#A1A1AA` (Muted Zinc)
- **Muted Text:** `#71717A`
- **Ambient Glow:** Subtle radial blue vignette (`rgba(37, 99, 235, 0.12)`) along top & bottom edges.

### Light Mode (Editorial Paper Mode)
- **Canvas (`--bg-primary`):** `#FAFAFA` (Zinc-50 Soft Paper)
- **Card Surface (`--bg-surface`):** `#FFFFFF` (Pure Card White)
- **Elevated Hover (`--bg-surface-hover`):** `#F4F4F5` (Zinc-100)
- **Hairline Border (`--border-subtle`):** `rgba(0, 0, 0, 0.08)` (`#E4E4E7`)
- **Border Hover (`--border-hover`):** `rgba(0, 0, 0, 0.16)`
- **Primary Text:** `#090A0B` (Deep Ink Black)
- **Secondary Text:** `#52525B` (Zinc-600)
- **Muted Text:** `#71717A`
- **Ambient Glow:** Subtle airy blue vignette (`rgba(37, 99, 235, 0.06)`) along top & bottom edges.

## 3. Atmospheric Effects: Ambient Edge Vignette (kshv.me Inspiration)
- **Top & Bottom Edge Glow:** A fixed, non-blocking viewport glow along the top and bottom edges.
  - Implemented as a fixed overlay (`pointer-events-none fixed inset-0 z-40`).
  - Top vignette: `radial-gradient(ellipse 70% 100% at 50% 0%, var(--ambient-glow), transparent 70%)`.
  - Bottom vignette: `radial-gradient(ellipse 70% 100% at 50% 100%, var(--ambient-glow), transparent 70%)`.
  - Effect: Gives the page an atmospheric depth as content glides into and out of view without overpowering readability.

## 4. Page Structure & Flow (Top to Bottom)
1. **Inline Header (Hero):**
   - No floating navbar. The page starts naturally with generous top padding (`pt-24 sm:pt-32 pb-16`).
   - Clean typographic lockup: Name ("Daksh Hiran") + Role ("Design Engineer & Creative Developer").
   - Inline status badge with pulsing green indicator: `Available for select opportunities`.
   - Inline social links (X, GitHub, LinkedIn, Email) + **Minimalist Theme Toggle (Sun/Moon)**.
2. **About / Introduction:**
   - 2–3 sentences of articulate, focused bio in Geist Sans (`text-[15px]` to `text-base`, optimal 60–65ch measure).
3. **Selected Works (Flagship Projects):**
   - Clean, well-spaced project entries (Agent SPM, Sentinel, Orbies, AyuChain).
   - Each project has:
     - Header: Title (Geist Sans medium), year/date (Geist Mono text-xs), live link icon (`ArrowUpRight`).
     - 1-line description of technical outcome and impact.
     - Tech stack pills in Geist Mono.
     - High-resolution AVIF preview image framed in a sleek hairline border.
4. **Open-Source & Upstream Contributions (The Master Showcase):**
   - **Executive Metric Strip:** `124 Merged PRs • 42 Repositories • Org Member @career-ops-hq • Pair Extraordinaire`.
   - **Tier 1 Major Upstream Platforms:**
     - **Nhost (`nhost/nhost`)** — 13 Merged PRs (Database table grid actions, Combobox primitives, AppLoader subdomain display, mobile table overflows).
     - **Career-Ops (`career-ops-hq/career-ops`)** — 3 Merged PRs (Official Org Member, loopback HTTP proxy security under trusted egress, dedup tracker calculation, Turkish i18n).
     - **Jitsi Meet (`jitsi/jitsi-meet`)** — 3 Merged PRs (WebRTC aspect-ratio hysteresis to prevent layout thrashing, popover click-outside handler).
     - **Processing Foundation (`processing/p5.js-web-editor`)** — GSoC Mentoring Org (File extension whitelist validator on rename).
     - **SuperCompress (`Supercompress/Supercompress`)** — 6 Merged PRs (LLM context compression, MCP detector for Cline/Roo Code, chunk streaming surrogate pairs).
   - **Tier 2 Ecosystem & Frameworks:**
     - **Orbies (`secreteye-gps/orbies-app`)** — 22 Merged PRs (Reanimated gesture navigation, 3D DOB wheel, VisionKit AI sticker camera).
     - **Agent SPM (`agent-spm/agent-spm-web` & `spm-cli`)** — 11 Merged PRs (Core package manager CLI, docs hub, package detail markdown renderer).
     - **Superloom Ventures (`castrum`, `dotplot`, `nzero`)** — 13 Merged PRs (SwiftUI live preview engine, continuous PiP player, passwordless OTP auth).
     - **Synthesis Labs (`Specter`, `Dynamic-island`)** — 11 Merged PRs (Architect layout engine, mobile CI/CD).
   - **Interactive PR Inspection:** Clickable verified PR links (`#4516`, `#5819`, `#17752`) with clean expand-in-place accordion.
5. **The Lab / Creative Experiments:**
   - Compact 2-column visual grid for creative code, WebGL shaders, Notion auto-layout components, and interactive prototypes.
6. **Footer / Contact:**
   - Generous bottom spacing (`pt-20 pb-24`).
   - Hairline divider.
   - Contact headline: "Let's build something together."
   - Interactive one-click email copy button with feedback (`contact@dakshhiran.dev`).
   - Timezone & status: `New Delhi, IN • IST (UTC+5:30)`.

## 5. Typography System
- **Display & UI Sans:** `Geist Sans` (via `next/font/google`)
  - Headlines: `font-medium` to `font-semibold`, tracking `-0.025em`.
  - Body: `font-normal`, `text-[15px]` / `16px`, line-height `1.65`.
- **Technical & Metadata Mono:** `Geist Mono` (via `next/font/google`)
  - Used for: Dates, tags, status pills, metrics, PR numbers, code snippets.
  - Scale: `text-xs` (12px) to `text-sm` (13px), tracking `-0.01em`.
- **Absolute Bans (from Impeccable Craft Floor):**
  - NO eyebrow or kicker labels above headings.
  - NO section numbers (01 / 02 / 03).
  - NO gradient text.
  - NO mid-sentence font switching (remove `Breton`, `Zirena`, and `Machine.otf`).

## 6. Spacing & Rhythm
- Main container: `max-w-2xl` (~672px) centered (`mx-auto px-6`).
- Section separation: `mb-20 sm:mb-24`.
- Stack gap: `space-y-4` or `space-y-6` between sub-elements.

## 7. Icons & Motion
- **Icons:** Consistent 1.5px stroke SVGs (Lucide / mx-icons style), never emojis or Unicode text icons.
- **Motion:** Subtle, intentional spring transitions for hover states, image reveal, and interactive pills.
- **Scroll:** Smooth native scroll or lightweight Lenis integration with zero DOM lag.
- **Reduced Motion:** Fully honored via `@media (prefers-reduced-motion: reduce)`.
