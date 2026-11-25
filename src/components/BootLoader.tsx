"use client";

import { useEffect, useState } from "react";
import { Monogram } from "./Monogram";

export function BootLoader() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const seen = window.sessionStorage.getItem("ay-loaded");
    if (seen) return;

    const rafId = requestAnimationFrame(() => {
      setVisible(true);
    });

    const finish = () => {
      setFading(true);
      window.sessionStorage.setItem("ay-loaded", "1");
      setTimeout(() => setVisible(false), 320);
    };

    if (document.readyState === "complete") {
      const t = setTimeout(finish, 260);
      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(t);
      };
    }

    const onLoad = () => {
      setTimeout(finish, 180);
    };
    window.addEventListener("load", onLoad, { once: true });
    const safety = setTimeout(finish, 1100);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
      clearTimeout(safety);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-bg text-text transition-opacity duration-300 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <Monogram size={44} />
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-text-secondary">
          <span>Anshul Yadav</span>
          <span className="inline-block h-1.5 w-1.5 bg-accent" />
          <span>Portfolio</span>
        </div>
      </div>
    </div>
  );
}
