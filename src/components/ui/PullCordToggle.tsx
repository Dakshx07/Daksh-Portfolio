"use client";

import { useState, useEffect } from "react";
import { PullCord } from "pullcord";
import "pullcord/pullcord.css";
import CordMonkey from "@/components/mascots/CordMonkey";

export default function PullCordToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const handlePull = () => {
    const next = !document.documentElement.classList.contains("light");
    if (next) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
    setIsLight(next);
  };

  if (!mounted) return null;

  return (
    <div
      className="select-none"
      style={
        {
          "--pullcord-top": "0px",
          "--pullcord-right": "clamp(0.75rem, 4vw, 3.5rem)",
          "--pullcord-z": "60",
          "--pullcord-ink": isLight ? "#27272a" : "#e4e4e7",
          touchAction: "none",
        } as React.CSSProperties
      }
    >
      <PullCord
        onPull={handlePull}
        pulled={isLight}
        ariaLabel="Pull cord to toggle light and dark theme"
        config={{
          gravity: 1350,
          damping: 0.94,
          iterations: 20,
          stretchMax: 30,
          stretchToggle: 18,
        }}
      />
      {/* Interactive Hanging Monkey Mascot attached to the pull-cord */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: "var(--pullcord-top, 0px)",
          right: "var(--pullcord-right, clamp(0.75rem, 4vw, 3.5rem))",
          zIndex: 65,
          width: "64px",
          height: "340px",
        }}
      >
        <CordMonkey onPull={handlePull} isLight={isLight} />
      </div>
    </div>
  );
}
