"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

export function ThemeToggle() {
  const isDark = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("portfolio-theme-change", onStoreChange);
      return () =>
        window.removeEventListener("portfolio-theme-change", onStoreChange);
    },
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  function toggleTheme() {
    const nextTheme = !isDark;
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme ? "dark" : "light");
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid size-10 place-items-center rounded-md border border-line bg-paper-strong text-ink transition hover:border-accent hover:text-accent"
      aria-label={isDark ? "Switch to light colour theme" : "Switch to dark colour theme"}
      title={isDark ? "Use light theme" : "Use dark theme"}
    >
      {isDark ? (
        <Sun aria-hidden="true" className="size-4" />
      ) : (
        <Moon aria-hidden="true" className="size-4" />
      )}
    </button>
  );
}
