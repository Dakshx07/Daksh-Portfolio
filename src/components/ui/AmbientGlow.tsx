export default function AmbientGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden="true"
    >
      {/* Top subtle blue ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] max-w-4xl h-36 sm:h-48 opacity-30 blur-2xl sm:blur-3xl transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, var(--ambient-glow) 0%, transparent 70%)",
        }}
      />

      {/* Bottom subtle blue ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] max-w-4xl h-36 sm:h-48 opacity-30 blur-2xl sm:blur-3xl transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, var(--ambient-glow) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

