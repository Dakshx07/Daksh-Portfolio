"use client";

import { useEffect } from "react";

export default function AntiInspectProtection() {
  useEffect(() => {
    // 0. Developer signature in console
    try {
      console.log(
        "%cCrafted with passion by Daksh Hiran\n%cInterested in collaborating or building high-performance web systems? Say hi at contact@dakshhiran.dev | https://x.com/DakshHiran7",
        "font-weight: bold; font-size: 14px; color: #38bdf8; font-family: monospace;",
        "font-size: 11px; color: #a1a1aa; font-family: monospace;"
      );
    } catch {}

    // 1. Disable Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable) {
        return true;
      }
      e.preventDefault();
      return false;
    };

    // 2. Disable Keyboard Shortcuts (F12, Inspect, View Source, Save Page)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Cmd / Ctrl + Shift + I (Inspect)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i" || e.keyCode === 73)) {
        e.preventDefault();
        return false;
      }

      // Cmd / Ctrl + Shift + J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "J" || e.key === "j" || e.keyCode === 74)) {
        e.preventDefault();
        return false;
      }

      // Cmd / Ctrl + Shift + C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "C" || e.key === "c" || e.keyCode === 67)) {
        e.preventDefault();
        return false;
      }

      // Cmd / Ctrl + U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u" || e.keyCode === 85)) {
        e.preventDefault();
        return false;
      }

      // Cmd / Ctrl + S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === "S" || e.key === "s" || e.keyCode === 83)) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Disable Asset Dragging
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
