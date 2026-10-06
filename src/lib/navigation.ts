export const navigation = [
  { label: "Home", id: "home", href: "#home" },
  { label: "About", id: "about", href: "#about" },
  { label: "Education", id: "education", href: "#education" },
  { label: "Experience", id: "experience", href: "#experience" },
  { label: "Skills", id: "skills", href: "#skills" },
  { label: "Projects", id: "projects", href: "#projects" },
  { label: "Certifications", id: "certifications", href: "#certifications" },
  { label: "Germany", id: "germany", href: "#germany" },
  { label: "Contact", id: "contact", href: "#contact" },
] as const;

export type NavigationItem = (typeof navigation)[number];
export type NavigationId = NavigationItem["id"];

const navigationIds = new Set<string>(navigation.map((item) => item.id));

export function isNavigationId(value: string): value is NavigationId {
  return navigationIds.has(value);
}

export function getNavigationHref(
  item: NavigationItem,
  pathname: string,
): string {
  return pathname === "/" ? item.href : `/${item.href}`;
}

export function getSectionIdFromHash(hash: string): NavigationId | null {
  const id = hash.replace(/^#/, "");

  if (!id) return "home";

  return isNavigationId(id) ? id : null;
}

export function getActiveNavigationId(
  pathname: string,
  activeSection: string,
): NavigationId | null {
  if (pathname.startsWith("/projects")) {
    return "projects";
  }

  if (
    pathname.startsWith("/certifications") ||
    pathname.startsWith("/achievements")
  ) {
    return "certifications";
  }

  if (pathname !== "/") {
    return null;
  }

  return isNavigationId(activeSection) ? activeSection : "home";
}

export function getVisibleSectionId(
  getElement: (id: string) => HTMLElement | null = (id) =>
    document.getElementById(id),
  scrollY = window.scrollY,
  viewportHeight = window.innerHeight,
): NavigationId {
  const marker = scrollY + viewportHeight * 0.35;

  const sections = navigation
    .map((item) => {
      const element = getElement(item.id);
      if (!element) return null;

      const documentTop = element.getBoundingClientRect().top + scrollY;
      return { id: item.id, documentTop };
    })
    .filter((section): section is { id: NavigationId; documentTop: number } =>
      Boolean(section),
    )
    .sort((a, b) => a.documentTop - b.documentTop);

  let current: NavigationId = sections[0]?.id ?? "home";

  for (const section of sections) {
    if (section.documentTop <= marker) {
      current = section.id;
    }
  }

  return current;
}
