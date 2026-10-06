"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
  getActiveNavigationId,
  getNavigationHref,
  getSectionIdFromHash,
  getVisibleSectionId,
  navigation,
  type NavigationId,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

function readHashSection(): NavigationId {
  return getSectionIdFromHash(window.location.hash) ?? "home";
}

export function SiteHeader({ name, monogram }: { name: string; monogram: string }) {
  const pathname = usePathname();
  const pinnedHashRef = useRef<NavigationId | null>(null);
  const subscribeToUrl = useCallback((onChange: () => void) => {
    const handler = () => {
      pinnedHashRef.current = readHashSection();
      onChange();
    };

    window.addEventListener("hashchange", handler);
    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("hashchange", handler);
      window.removeEventListener("popstate", handler);
    };
  }, []);
  const urlHash = useSyncExternalStore<NavigationId>(
    subscribeToUrl,
    readHashSection,
    (): NavigationId => "home",
  );
  const [clickedSection, setClickedSection] = useState<NavigationId | null>(null);
  const [visibleSection, setVisibleSection] = useState<NavigationId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  if (clickedSection && urlHash === clickedSection) {
    setClickedSection(null);
    setVisibleSection(null);
  }

  const homepageSection = clickedSection ?? visibleSection ?? urlHash;
  const activeId = getActiveNavigationId(pathname, homepageSection);
  const homeHref = pathname === "/" ? "#home" : "/#home";

  useEffect(() => {
    pinnedHashRef.current = urlHash;
  }, [urlHash]);

  useEffect(() => {
    if (pathname !== "/") {
      pinnedHashRef.current = null;
      return;
    }

    function syncFromViewport() {
      const visible = getVisibleSectionId();

      if (pinnedHashRef.current) {
        if (visible !== pinnedHashRef.current) return;
        pinnedHashRef.current = null;
      }

      setVisibleSection((current) => (current === visible ? current : visible));
    }

    const observer = new IntersectionObserver(syncFromViewport, {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0, 0.15, 0.3, 0.5, 1],
    });

    navigation.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    function releaseHashPin() {
      pinnedHashRef.current = null;
      setClickedSection(null);
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        syncFromViewport();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", releaseHashPin, { passive: true });
    window.addEventListener("touchmove", releaseHashPin, { passive: true });
    syncFromViewport();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", releaseHashPin);
      window.removeEventListener("touchmove", releaseHashPin);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  function lockToHashNavigation(id: NavigationId) {
    pinnedHashRef.current = id;
    setClickedSection(id);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line/90 bg-paper/90 backdrop-blur-xl">
      <div className="site-container flex h-[4.5rem] items-center justify-between gap-6">
        <a
          href={homeHref}
          className="group flex items-center gap-3"
          aria-label={`${name} — home`}
          onClick={() => lockToHashNavigation("home")}
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center border border-ink bg-ink font-mono text-[0.65rem] font-bold tracking-widest text-paper transition group-hover:bg-accent-strong"
          >
            {monogram}
          </span>
          <span className="hidden text-sm font-semibold tracking-[-0.01em] sm:inline">
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
          {navigation.map((item) => {
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={getNavigationHref(item, pathname)}
                aria-current={isActive ? "page" : undefined}
                onClick={() => lockToHashNavigation(item.id)}
                className={cn(
                  "relative px-2.5 py-2 text-[0.78rem] font-medium text-ink-muted transition hover:text-ink",
                  isActive &&
                    "text-accent after:absolute after:inset-x-2.5 after:-bottom-[1.25rem] after:h-px after:bg-accent",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md border border-line bg-paper-strong text-ink xl:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "fixed inset-x-0 top-[4.5rem] h-[calc(100dvh-4.5rem)] border-t border-line bg-paper px-4 py-8 transition duration-200 xl:hidden",
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav
          className="site-container grid divide-y divide-line border-y border-line"
          aria-label="Mobile navigation"
        >
          {navigation.map((item, index) => {
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={getNavigationHref(item, pathname)}
                aria-current={isActive ? "page" : undefined}
                onClick={() => lockToHashNavigation(item.id)}
                className={cn(
                  "flex items-center justify-between py-4 text-lg font-medium text-ink transition hover:pl-2 hover:text-accent",
                  isActive && "text-accent",
                )}
              >
                {item.label}
                <span className={cn("metadata", isActive ? "text-accent" : "text-ink-muted")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
