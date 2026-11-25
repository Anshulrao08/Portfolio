"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import Lenis from "lenis";

type Theme = "dark" | "light";

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  recruiterMode: boolean;
  toggleRecruiterMode: () => void;
  commandOpen: boolean;
  setCommandOpen: React.Dispatch<React.SetStateAction<boolean>>;
  terminalOpen: boolean;
  setTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reducedMotion: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside Providers");
  }
  return ctx;
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeTheme(callback: () => void) {
  window.addEventListener("ay-theme-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("ay-theme-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return "dark";
}

function subscribeRecruiter(callback: () => void) {
  window.addEventListener("ay-recruiter-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("ay-recruiter-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getRecruiterSnapshot(): boolean {
  return window.localStorage.getItem("ay-recruiter") === "true";
}

export function Providers({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
  const theme = useSyncExternalStore<Theme>(
    subscribeTheme,
    getThemeSnapshot,
    () => "dark"
  );
  const recruiterMode = useSyncExternalStore(
    subscribeRecruiter,
    getRecruiterSnapshot,
    () => false
  );

  const [commandOpen, setCommandOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-recruiter-mode", String(recruiterMode));
  }, [recruiterMode]);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("ay-theme", next);
    window.dispatchEvent(new Event("ay-theme-change"));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const toggleRecruiterMode = useCallback(() => {
    const next = !getRecruiterSnapshot();
    document.documentElement.setAttribute("data-recruiter-mode", String(next));
    window.localStorage.setItem("ay-recruiter", String(next));
    window.dispatchEvent(new Event("ay-recruiter-change"));
  }, []);

  // Lenis smooth scroll (disabled when reduced motion or recruiter mode is active)
  useEffect(() => {
    if (reducedMotion || recruiterMode) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion, recruiterMode]);

  // Global keyboard shortcuts: Cmd/Ctrl+K (Command Palette), ~ or Ctrl+Shift+A (Terminal)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen(false);
        setCommandOpen((prev) => !prev);
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setCommandOpen(false);
        setTerminalOpen((prev) => !prev);
        return;
      }

      if (!isInput && (e.key === "`" || e.key === "~")) {
        e.preventDefault();
        setCommandOpen(false);
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        recruiterMode,
        toggleRecruiterMode,
        commandOpen,
        setCommandOpen,
        terminalOpen,
        setTerminalOpen,
        reducedMotion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
