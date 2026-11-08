import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistPixelSquare = localFont({
  src: "./fonts/GeistPixel-Square.woff2",
  variable: "--font-geist-pixel-square",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daksh Hiran — Design Engineer & Systems Developer",
  description: "Design engineer & systems developer specializing in modern web interfaces, motion architecture, WebGL shaders, and high-performance software engineering.",
  keywords: ["Daksh Hiran", "Design Engineer", "Creative Developer", "Software Engineer", "Next.js", "React", "TypeScript", "WebGL"],
  authors: [{ name: "Daksh Hiran", url: "https://x.com/DakshHiran7" }],
  icons: {
    icon: [
      { url: "/icon.png?v=2", type: "image/png" },
      { url: "/favicon.ico?v=2" },
    ],
    shortcut: "/icon.png?v=2",
    apple: "/icon.png?v=2",
  },
  openGraph: {
    title: "Daksh Hiran — Design Engineer & Systems Developer",
    description: "Design engineer & systems developer specializing in modern web interfaces, motion architecture, WebGL shaders, and high-performance software engineering.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#090A0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistPixelSquare.variable} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC Theme Script: Sets html class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Default to dark mode strictly & purge any cached light preference
                  document.documentElement.classList.remove('light');
                  if (localStorage.getItem('theme') === 'light') {
                    localStorage.setItem('theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
