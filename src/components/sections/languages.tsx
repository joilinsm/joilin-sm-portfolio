import {
  CalendarDays,
  ExternalLink,
  Languages as LanguagesIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { portfolioData } from "@/data/portfolio";
import { isUsableHref } from "@/lib/utils";
import type { Language } from "@/types/portfolio";

export function Languages() {
  return (
    <section id="languages" className="section-shell section-rule">
      <div className="site-container">
        <Reveal>
          <div className="flex items-end justify-between gap-5 border-b border-line pb-5">
            <div>
              <p className="eyebrow text-accent">Language profile</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
                Verified qualifications and progression
              </h2>
            </div>
            <LanguagesIcon
              aria-hidden="true"
              className="hidden size-6 text-ink-muted sm:block"
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-5 pt-6 lg:grid-cols-2">
            {portfolioData.languages.map((language) => {
              const certificateLinks = getLanguageCertificateLinks(language);

              return (
                <article
                  key={language.name}
                  className="border border-line bg-paper-strong p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="eyebrow text-signal">
                        {language.qualification}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-ink">
                        {language.name}
                      </h3>
                    </div>
                    <p className="text-right text-lg font-semibold text-accent">
                      {language.level}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-ink-muted">{language.note}</p>
                  {language.date ? (
                    <p className="metadata mt-3 flex items-center gap-2 text-ink-muted">
                      <CalendarDays aria-hidden="true" className="size-3.5" />
                      {language.date}
                    </p>
                  ) : null}

                  {language.scores.length ? (
                    <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
                      {language.scores.map((score) => (
                        <div key={score.label} className="bg-paper p-3">
                          <dt className="text-xs text-ink-muted">
                            {score.label}
                          </dt>
                          <dd className="mt-1 font-semibold text-ink">
                            {score.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {certificateLinks.length ? (
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-line pt-5">
                      {certificateLinks.map((certificate) => (
                        <a
                          key={certificate.href}
                          href={certificate.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent hover:underline"
                        >
                          {certificate.label}
                          <ExternalLink
                            aria-hidden="true"
                            className="size-3.5 shrink-0"
                          />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function getLanguageCertificateLinks(language: Language) {
  const directLinks = (language.certificateFiles ?? []).filter((certificate) =>
    isUsableHref(certificate.href),
  );
  const certificationLinks = (language.certificationIds ?? []).flatMap((id) => {
    const certification = portfolioData.certifications.find(
      (entry) => entry.id === id,
    );
    const href = certification?.certificateFile || certification?.document;

    return certification && isUsableHref(href)
      ? [{ label: certification.name, href }]
      : [];
  });

  return [...directLinks, ...certificationLinks];
}
