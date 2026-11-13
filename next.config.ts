import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Security & Anti-Inspection Hardening
  productionBrowserSourceMaps: false, // Ensure source files / TypeScript comments are NEVER published
  poweredByHeader: false, // Hide 'X-Powered-By: Next.js' signature from scanners

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevent site from being embedded in iframes (anti-clickjacking / anti-cloning)
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Prevent MIME-sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Restrict referrer leakage
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Disable unneeded browser APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
