import Link from "next/link";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { cn, isUsableHref } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  download?: boolean;
  available?: boolean;
  className?: string;
}

const styles = {
  primary:
    "border-ink bg-ink text-paper hover:-translate-y-0.5 hover:bg-accent-strong hover:border-accent-strong",
  secondary:
    "border-line-strong bg-paper-strong text-ink hover:-translate-y-0.5 hover:border-accent hover:text-accent",
  quiet: "border-transparent bg-transparent px-0 text-accent hover:text-accent-strong",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  download = false,
  available = true,
  className,
}: ButtonLinkProps) {
  const sharedClassName = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.4rem] border px-5 py-2.5 text-sm font-semibold transition duration-200",
    styles[variant],
    className,
  );

  if (!available || !isUsableHref(href)) {
    return (
      <span
        className={cn(sharedClassName, "cursor-not-allowed opacity-55")}
        aria-disabled="true"
        title="This document will be available after it has been added."
      >
        {children}
        {download ? (
          <ArrowDownToLine aria-hidden="true" className="size-4" />
        ) : (
          <ArrowRight aria-hidden="true" className="size-4" />
        )}
      </span>
    );
  }

  const usesNativeNavigation =
    download ||
    href.startsWith("/documents/") ||
    href.startsWith("#") ||
    /^(https?:\/\/|mailto:|tel:)/.test(href);

  if (usesNativeNavigation) {
    const opensNewTab = !download && (href.startsWith("http") || href.startsWith("/documents/"));

    return (
      <a
        href={href}
        className={sharedClassName}
        download={download || undefined}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
      >
        {children}
        {download ? (
          <ArrowDownToLine aria-hidden="true" className="size-4" />
        ) : (
          <ArrowRight aria-hidden="true" className="size-4" />
        )}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={sharedClassName}
    >
      {children}
      {download ? (
        <ArrowDownToLine aria-hidden="true" className="size-4" />
      ) : (
        <ArrowRight aria-hidden="true" className="size-4" />
      )}
    </Link>
  );
}
