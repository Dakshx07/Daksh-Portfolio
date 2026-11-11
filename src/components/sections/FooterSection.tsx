"use client";

import { useEffect, useRef, useState } from "react";
import landPolygons from "@/data/footer-earth-land.json";

const DITHER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const PIXEL_SIZE = 2;
const ORBIT_DURATION = 32000;

function satelliteOrbit(width: number, height: number, visibleWidth: number): Keyframe[] {
  const crest = 32; // Headroom above the curved dome
  const radius = width * 0.72;
  const centerY = radius + crest;

  return Array.from({ length: 97 }, (_, index) => {
    const angle = (index / 96) * Math.PI * 2 - 0.8;
    const depth = Math.cos(angle);
    const x = Math.sin(angle) * Math.min(width, visibleWidth) * 0.36;
    const y = crest + 14 + Math.sin(angle) * 16 - depth * 14;
    const horizon = centerY - Math.sqrt(Math.max(0, radius * radius - x * x));
    const opacity = depth >= 0 ? 1 : Math.max(0, Math.min(1, (horizon - y - 4) / 16));

    return {
      offset: index / 96,
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-18 + Math.sin(angle) * 14}deg) scale(${
        0.88 + depth * 0.12
      })`,
      opacity,
    };
  });
}

function readColor(element: Element, name: string): number[] {
  const val = getComputedStyle(element).getPropertyValue(name).trim();
  if (!val) return [35, 112, 190];
  return val.split(/\s+/).map(Number);
}

// ── FOOTER EARTH CANVAS & ORBITING SATELLITE ──
function FooterEarth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const satelliteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const footer = canvas.closest("footer");
    const context = canvas.getContext("2d");
    const map = document.createElement("canvas");
    map.width = 720;
    map.height = 360;
    const mapContext = map.getContext("2d", { willReadFrequently: true });
    if (!context || !mapContext) {
      console.error("Footer Earth could not create a canvas context.");
      return;
    }

    mapContext.fillStyle = "white";
    for (const polygon of landPolygons as unknown as number[][][][]) {
      mapContext.beginPath();
      for (const ring of polygon) {
        ring.forEach(([longitude, latitude], index) => {
          const x = ((longitude + 180) / 360) * map.width;
          const y = ((90 - latitude) / 180) * map.height;
          if (index === 0) mapContext.moveTo(x, y);
          else mapContext.lineTo(x, y);
        });
        mapContext.closePath();
      }
      mapContext.fill("evenodd");
    }
    const land = mapContext.getImageData(0, 0, map.width, map.height).data;
    let palette = ["deep", "ocean", "light", "cloud"].map((name) =>
      readColor(canvas, `--footer-earth-${name}`)
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    let lastFrame = 0;
    let elapsed = 0;
    let orbit: Animation | undefined;

    const themeObserver = new MutationObserver(() => {
      palette = ["deep", "ocean", "light", "cloud"].map((name) =>
        readColor(canvas, `--footer-earth-${name}`)
      );
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const updateOrbit = () => {
      if (!orbit) return;
      if (reducedMotion.matches) {
        orbit.pause();
        orbit.currentTime = 0;
      } else if (visible && !document.hidden) {
        orbit.play();
      } else {
        orbit.pause();
      }
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      if (width <= 0 || height <= 0) return;
      const image = context.createImageData(width, height);

      // Crest headroom ensures the Earth sphere forms a perfect curved dome that never hits row 0
      const crest = 16;
      const radius = width * 0.72;
      const centerY = radius + crest;
      const angle = 0.1 + elapsed * 0.000018;

      for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
          const x = (column - width / 2) / radius;
          const y = (centerY - row) / radius;
          const distance = x * x + y * y;
          if (distance >= 1) continue;

          const z = Math.sqrt(1 - distance);
          const latitude = Math.asin(y * 0.66 - z * 0.75);
          const longitude = Math.atan2(x, y * 0.75 + z * 0.66) + angle;
          const mapX = Math.floor(((longitude / (Math.PI * 2) + 1.5) % 1) * map.width);
          const mapY = Math.min(
            map.height - 1,
            Math.floor((0.5 - latitude / Math.PI) * map.height)
          );
          const isLand = land[(mapY * map.width + mapX) * 4 + 3] > 0;
          const clouds =
            Math.sin(longitude * 14 + Math.sin(latitude * 17) * 1.7) +
            Math.sin(latitude * 36 + longitude * 5) * 0.65 +
            Math.sin(longitude * 31 - latitude * 23) * 0.3 +
            Math.sin(longitude * 71 + latitude * 53) * 0.16;
          const light = Math.max(0, Math.min(1, 0.22 + x * 0.4 + y * 0.06 + z * 0.4));
          const terrain = Math.sin(longitude * 24) * Math.sin(latitude * 29) * 0.05;
          const detail =
            (isLand ? 0.12 + terrain : 0) + Math.max(0, Math.min(0.12, (clouds - 0.8) * 0.12));
          const brightness = Math.min(0.99, light * 0.8 + detail);
          const threshold = (DITHER[(row % 4) * 4 + (column % 4)] + 0.5) / 16;
          const edge = Math.min(1, z * 3.5);
          if (threshold > edge * Math.min(1, 0.48 + brightness * 0.75)) continue;

          const shade = Math.floor(brightness * 3 + threshold);
          const level =
            clouds > 1.5 && light > 0.58
              ? 3
              : isLand
              ? Math.min(2, Math.max(1, shade + 1))
              : Math.min(1, shade);
          const offset = (row * width + column) * 4;
          image.data[offset] = palette[level][0] ?? 35;
          image.data[offset + 1] = palette[level][1] ?? 112;
          image.data[offset + 2] = palette[level][2] ?? 190;
          image.data[offset + 3] = 255;
        }
      }
      context.putImageData(image, 0, 0);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      canvas.width = Math.max(1, Math.round(bounds.width / PIXEL_SIZE));
      canvas.height = Math.max(1, Math.round(bounds.height / PIXEL_SIZE));
      const orbitTime = orbit?.currentTime ?? 0;
      orbit?.cancel();
      orbit = satelliteRef.current?.animate(
        satelliteOrbit(bounds.width, bounds.height, footer?.clientWidth ?? bounds.width),
        {
          duration: ORBIT_DURATION,
          iterations: Infinity,
          easing: "linear",
        }
      );
      if (orbit) orbit.currentTime = orbitTime;
      updateOrbit();
      draw();
    };

    const tick = (time: number) => {
      if (!visible || document.hidden || reducedMotion.matches) {
        frame = 0;
        lastFrame = 0;
        return;
      }
      if (time - lastFrame >= 80) {
        if (lastFrame) elapsed += Math.min(time - lastFrame, 100);
        lastFrame = time;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };

    const update = () => {
      updateOrbit();
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
      if (visible && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(tick);
      else draw();
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    if (footer) resizeObserver.observe(footer);
    intersection.observe(canvas);
    reducedMotion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    resize();

    return () => {
      orbit?.cancel();
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      intersection.disconnect();
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <>
      {/* Orbiting 8-Bit Satellite */}
      <div
        ref={satelliteRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-9 w-12 z-20"
        style={{ transform: "translate(-120px, 12px) rotate(-28deg)" }}
      >
        <svg viewBox="0 0 64 48" className="h-full w-full" fill="none">
          <g stroke="rgb(var(--footer-earth-deep))" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M21 26h23" />
            <path d="m3 19 17-3 3 17-17 3zm38-6 17-3 3 17-17 3z" fill="rgb(var(--footer-earth-ocean))" />
            <path d="m5 21 13-2 2 12-13 2zm38-6 13-2 2 12-13 2z" fill="rgb(var(--footer-earth-light))" />
            <path
              d="m10 20 2 12m2-13 2 12M6 25l13-2M7 29l13-2m27-13 2 12m2-13 2 12m-9-7 13-2m-12 6 13-2"
              stroke="rgb(var(--footer-earth-ocean))"
              strokeWidth="1"
            />
            <path d="m24 19 10-2 7 7-2 13-11 2-6-7z" fill="var(--muted, #334155)" />
            <path d="m24 19 7 7 10-2-7-7z" fill="rgb(var(--footer-earth-cloud))" />
            <path d="m31 26 10-2-2 13-11 2z" fill="rgb(var(--footer-earth-light))" />
            <path d="m31 26-3 13m4-22 1-6" />
            <path d="m26 8 13-2c0 5-3 8-6 8s-6-2-7-6Z" fill="rgb(var(--footer-earth-cloud))" />
            <path d="m33 9 3-6m-1 0h2" strokeLinecap="round" />
          </g>
          <path
            d="M25 27h2v2h-2zm1 5h2v2h-2zm7-3h2v2h-2zm2 4h2v2h-2z"
            fill="rgb(var(--footer-earth-ocean))"
            opacity="0.65"
          />
        </svg>
      </div>

      {/* Raytraced Bayer Dither Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full"
        style={{ imageRendering: "pixelated" }}
      />
    </>
  );
}

// ── ROLLING DIGIT ODOMETER (Say hi, visitor 4,052) ──
function OdometerDigit({ digit }: { digit: number }) {
  return (
    <span className="inline-block overflow-hidden h-[22px] w-[9px] relative">
      <span
        className="flex flex-col transition-transform duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ transform: `translateY(-${digit * 22}px)` }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="flex items-center justify-center h-[22px] text-[11px] font-bold leading-none">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

// ── MAIN EXPORT: ADITYA OJHA EARTH SCENE FOOTER ──
export default function FooterSection() {
  const [visitorCount, setVisitorCount] = useState<number>(1);
  const [hasVisited, setHasVisited] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, rotate: 0 });

  // Fetch live visitor count for Daksh's website
  useEffect(() => {
    let isMounted = true;

    // Fast local recovery from cache
    try {
      const stored = localStorage.getItem("daksh_portfolio_visitors");
      if (stored) {
        const val = parseInt(stored, 10);
        if (!isNaN(val) && val > 0) setVisitorCount(val);
      }
    } catch {}

    // Fetch live hit from /api/visitors
    fetch("/api/visitors")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && typeof data.count === "number" && data.count > 0) {
          setVisitorCount(data.count);
          try {
            localStorage.setItem("daksh_portfolio_visitors", data.count.toString());
          } catch {}
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const horizontal = (e.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (e.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({
      x: horizontal * 16,
      y: vertical * 8,
      rotate: horizontal * 1.2,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0, rotate: 0 });
  };

  const handleSayHi = () => {
    setHasVisited(true);
    setVisitorCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem("daksh_portfolio_visitors", next.toString());
      } catch {}
      return next;
    });
  };

  const chars = visitorCount.toLocaleString("en-US").split("");

  return (
    <footer className="relative w-full overflow-hidden bg-[var(--bg)] pt-20 select-none transition-colors duration-250">
      {/* ── QUOTE & ATTRIBUTION ── */}
      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-6 text-center">
        <blockquote className="font-serif text-[18px] sm:text-[20px] italic leading-relaxed text-[var(--text-primary)] transition-colors duration-250">
          &ldquo;The details are not the details. They make the design.&rdquo;
        </blockquote>
        <figcaption className="mt-2.5 font-mono text-[10.5px] tracking-[0.16em] text-[var(--text-secondary)] uppercase transition-colors duration-250">
          Charles Eames
        </figcaption>

        {/* ── CREDIT LINE ── */}
        <p className="mt-5 font-mono text-[11px] text-[var(--text-muted)] tracking-wider transition-colors duration-250">
          Made with &lt;3 and lots of coffee.
        </p>
      </div>

      {/* ── PARALLAX 3D EARTH HORIZON & ORBITING SATELLITE SCENE ── */}
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative mt-2 h-56 sm:h-64 select-none overflow-hidden cursor-crosshair"
      >
        {/* Parallax Container */}
        <div className="relative left-1/2 h-full w-[calc(100%+32px)] min-w-[720px] -translate-x-1/2">
          <div
            className="h-full origin-bottom transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0) rotate(${tilt.rotate}deg)`,
            }}
          >
            <FooterEarth />
          </div>
        </div>

        {/* ── FLOATING LIQUID GLASS VISITOR COUNTER PILL ── */}
        <div className="absolute inset-x-4 top-[50%] sm:top-[52%] z-20 flex justify-center pointer-events-auto">
          <button
            type="button"
            onClick={handleSayHi}
            className="liquid-glass flex items-center justify-center gap-2 rounded-full px-5 py-2 font-mono text-[11.5px] tracking-[0.12em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
          >
            <span>Say hi, visitor</span>
            <span className="flex items-center gap-[1.5px] font-semibold text-[var(--text-primary)] ml-1">
              {chars.map((char, idx) =>
                char >= "0" && char <= "9" ? (
                  <OdometerDigit key={idx} digit={parseInt(char, 10)} />
                ) : (
                  <span key={idx} className="leading-none">
                    {char}
                  </span>
                )
              )}
            </span>
            {hasVisited && <span className="text-emerald-500 text-[10px] ml-1">👋</span>}
          </button>
        </div>
      </div>
    </footer>
  );
}
