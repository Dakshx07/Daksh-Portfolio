import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daksh Hiran — Creative Developer & Software Engineer",
  description: "Creative developer & software engineer specializing in modern web interfaces, motion design, interactive architecture, and full-stack software engineering.",
  keywords: ["Daksh Hiran", "Creative Developer", "Software Engineer", "Web Design", "GSAP", "WebGL", "Next.js", "React"],
  authors: [{ name: "Daksh Hiran" }],
  openGraph: {
    title: "Daksh Hiran — Creative Developer & Software Engineer",
    description: "Creative developer & software engineer specializing in modern web interfaces, motion design, interactive architecture, and full-stack software engineering.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />
        <link rel="preload" href="/assets/images/hero%20sequence/0001.jpg?v=20260416-r2" as="image" />
        <link rel="stylesheet" href="/styles/index.css" />
        <Script src="/js/i18n.js" strategy="beforeInteractive" />
        <Script src="/js/core-renderer.js" strategy="beforeInteractive" />
        <Script src="/js/hero-project.js" strategy="beforeInteractive" />
        <Script src="/js/vendor/gsap.min.js" strategy="beforeInteractive" />
        <Script src="/js/vendor/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="/js/vendor/lenis.min.js" strategy="beforeInteractive" />
      </head>
      <body className="bg-[#0a0a0a] text-white font-sans" suppressHydrationWarning>
        {children}
        <Script src="/js/index.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
