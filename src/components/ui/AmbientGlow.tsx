export default function AmbientGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle Ground Horizon Reflection (Foot of the Viewport) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] max-w-4xl h-28 opacity-20 blur-3xl transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, var(--ambient-glow) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

