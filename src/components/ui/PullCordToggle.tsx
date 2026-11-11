"use client";

import { useState, useEffect } from "react";
import { PullCord } from "pullcord";
import "pullcord/pullcord.css";

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
      style={
        {
          "--pullcord-top": "0px",
          "--pullcord-right": "clamp(1.5rem, 5vw, 4rem)",
          "--pullcord-z": "60",
          "--pullcord-ink": isLight ? "#27272a" : "#e4e4e7",
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
    </div>
  );
}
