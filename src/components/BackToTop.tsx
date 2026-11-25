"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="no-print fixed bottom-6 right-6 z-40 inline-flex h-10 w-10 items-center justify-center border border-border-strong bg-bg-secondary text-text shadow-sm hover:border-accent hover:text-accent transition-colors"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
