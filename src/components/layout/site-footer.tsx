import { portfolioData } from "@/data/portfolio";
import { isUsableHref } from "@/lib/utils";

export function SiteFooter() {
  const availableLinks = portfolioData.socialLinks.filter((link) =>
    isUsableHref(link.href),
  );

  return (
    <footer className="border-t border-line bg-ink py-12 text-paper">
      <div className="site-container grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow text-signal">{portfolioData.profile.eyebrow}</p>
          <p className="mt-4 text-2xl font-semibold tracking-[-0.025em]">
            {portfolioData.profile.name}
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-paper/65">
            Germany-focused academic &amp; professional portfolio.
          </p>
        </div>

        <div className="md:text-right">
          {availableLinks.length ? (
            <nav
              aria-label="Footer links"
              className="mb-5 flex flex-wrap gap-x-5 gap-y-2 md:justify-end"
            >
              {availableLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-sm text-paper/70 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ) : null}
          <p className="metadata text-paper/50">
            © {new Date().getFullYear()} {portfolioData.profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
