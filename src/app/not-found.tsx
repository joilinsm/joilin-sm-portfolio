import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="grid min-h-[70svh] place-items-center px-4 py-20">
      <div className="max-w-xl text-center">
        <p className="eyebrow text-accent">404 / Not found</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">
          This page is not part of the current portfolio.
        </h1>
        <p className="mt-5 text-base leading-7 text-ink-muted">
          The address may be outdated, or the project record may not have been
          added yet.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-sm border border-ink bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-accent-strong"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Return to portfolio
        </Link>
      </div>
    </main>
  );
}
