import { ArrowRight, Binary, ChartNoAxesCombined, Network, Workflow } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/data/portfolio";

const focusIcons = [Network, ChartNoAxesCombined, Binary, Workflow];

export function AcademicInterests() {
  return (
    <section id="academic" className="section-shell section-rule">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            label="03 / Academic direction"
            title={portfolioData.researchDirection.title}
            description={portfolioData.researchDirection.introduction}
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-2">
          {portfolioData.researchDirection.focusAreas.map((area, index) => {
            const Icon = focusIcons[index] ?? ArrowRight;

            return (
              <Reveal key={area.title} className="bg-paper-strong">
                <article className="group h-full p-6 transition hover:bg-accent-soft/45 sm:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <span className="grid size-11 place-items-center rounded-sm border border-line bg-paper text-accent">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="metadata text-ink-muted">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-9 text-xl font-semibold tracking-[-0.025em] text-ink">
                    {area.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-ink-muted">
                    {area.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-14 grid gap-8 border-t border-line pt-8 lg:grid-cols-[0.4fr_1.6fr]">
            <div>
              <p className="eyebrow text-ink-muted">Target Master&apos;s fields</p>
              <p className="mt-3 text-sm leading-6 text-ink-muted">
                Areas under active programme exploration in Germany.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2.5" aria-label="Academic interests">
              {portfolioData.academicInterests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border border-line bg-paper-strong px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
