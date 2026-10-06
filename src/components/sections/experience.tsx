import { BriefcaseBusiness, CalendarDays, FileText, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/data/portfolio";
import { isUsableHref } from "@/lib/utils";

export function Experience() {
  return (
    <section
      id="experience"
      className="section-shell section-rule bg-surface-muted/55"
    >
      <div className="site-container">
        <Reveal>
          <SectionHeading
            label="04 / Practical experience"
            title="Experience that connects analysis with application."
            description="Internship exposure in data analytics and business analysis, presented without overstating responsibilities or outcomes that have not yet been documented."
          />
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[0.7rem] w-px bg-line sm:left-[8.45rem]"
          />
          <ol className="space-y-8">
            {portfolioData.experience.map((entry, index) => (
              <li
                key={entry.id}
                className="relative grid gap-4 pl-10 sm:grid-cols-[7rem_1fr] sm:gap-10 sm:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-[0.36rem] size-3 rounded-full border-[3px] border-paper bg-accent ring-1 ring-line sm:left-[8.1rem]"
                />

                <div className="pt-1 sm:text-right">
                  <p className="metadata text-accent">{entry.endDate}</p>
                  <p className="metadata mt-1 text-ink-muted">{entry.startDate}</p>
                </div>

                <Reveal delay={index * 0.05}>
                  <article className="editorial-shadow border border-line bg-paper-strong p-6 transition duration-200 hover:-translate-y-0.5 sm:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-accent">
                          <BriefcaseBusiness aria-hidden="true" className="size-4" />
                          <span className="eyebrow">Internship</span>
                        </div>
                        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-ink">
                          {entry.position}
                        </h3>
                        <p className="mt-2 font-medium text-ink-muted">
                          {entry.company}
                        </p>
                      </div>
                      <div className="space-y-2 text-sm text-ink-muted">
                        <p className="flex items-center gap-2">
                          <CalendarDays aria-hidden="true" className="size-4" />
                          {entry.startDate} — {entry.endDate}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin aria-hidden="true" className="size-4" />
                          {entry.location}
                        </p>
                      </div>
                    </div>

                    {entry.responsibilities.length ? (
                      <ul className="mt-7 grid gap-3 border-t border-line pt-6 text-sm leading-6 text-ink-muted">
                        {entry.responsibilities.map((responsibility) => (
                          <li key={responsibility} className="flex gap-3">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-signal" />
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-7 border-t border-dashed border-line pt-5 text-sm italic text-ink-muted">
                        Responsibilities, achievements, tools, and supporting
                        documents can be added in the portfolio data file.
                      </p>
                    )}

                    {entry.tools.length || entry.skillsDeveloped.length ? (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {[...entry.tools, ...entry.skillsDeveloped].map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {entry.supportingDocuments.some((document) =>
                      isUsableHref(document.href),
                    ) ? (
                      <div className="mt-6 flex flex-wrap gap-4">
                        {entry.supportingDocuments
                          .filter((document) => isUsableHref(document.href))
                          .map((document) => (
                            <a
                              key={document.href}
                              href={document.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                            >
                              <FileText aria-hidden="true" className="size-4" />
                              {document.label}
                            </a>
                          ))}
                      </div>
                    ) : null}
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
