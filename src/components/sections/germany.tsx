import { ArrowUpRight, MapPinned } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/data/portfolio";

export function Germany() {
  return (
    <section id="germany" className="section-shell section-rule bg-ink text-paper">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              label="02 / Germany"
              title="Why Germany?"
              description={portfolioData.whyGermany.introduction}
              inverted
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid border-t border-paper/20 sm:grid-cols-2">
              {portfolioData.whyGermany.reasons.map((reason, index) => (
                <article
                  key={reason.title}
                  className="border-b border-paper/20 py-7 sm:p-7 sm:[&:nth-child(odd)]:border-r"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="metadata text-signal">
                      DE / {String(index + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-paper/40"
                    />
                  </div>
                  <h3 className="mt-8 text-lg font-semibold">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-paper/65">
                    {reason.description}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-20 border border-paper/20">
            <div className="flex flex-col gap-5 border-b border-paper/20 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
              <div>
                <p className="eyebrow text-signal">My path to Germany</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">
                  Preparation grounded in evidence and progression.
                </h3>
              </div>
              <MapPinned aria-hidden="true" className="size-7 text-paper/50" />
            </div>

            <ol className="grid md:grid-cols-2 xl:grid-cols-4">
              {portfolioData.germanyJourney.map((milestone, index) => (
                <li
                  key={milestone.title}
                  className="relative border-b border-paper/20 p-6 last:border-b-0 md:[&:nth-child(odd)]:border-r md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-r xl:border-b-0 xl:last:border-r-0 sm:p-7"
                >
                  <div className="mb-7 flex items-center gap-3">
                    <span className="grid size-7 place-items-center rounded-full border border-signal text-[0.65rem] font-semibold text-signal">
                      {index + 1}
                    </span>
                    <span className="metadata text-paper/45">
                      {milestone.date || milestone.status}
                    </span>
                  </div>
                  <h4 className="font-semibold">{milestone.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-paper/60">
                    {milestone.detail}
                  </p>
                  {milestone.date ? (
                    <p className="metadata mt-5 text-signal">{milestone.status}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
