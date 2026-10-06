export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith("[ADD ");
}

export function hasContent(value?: string): value is string {
  return Boolean(value?.trim()) && !isPlaceholder(value ?? "");
}

export function isUsableHref(href?: string): href is string {
  if (!href?.trim() || href.includes("[ADD ")) {
    return false;
  }

  return /^(https?:\/\/|mailto:|tel:|\/|#)/.test(href);
}

export function getSiteUrl(configuredUrl: string): URL {
  if (isUsableHref(configuredUrl) && configuredUrl.startsWith("http")) {
    return new URL(configuredUrl);
  }

  return new URL("http://localhost:3000");
}
