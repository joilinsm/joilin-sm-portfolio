import { ArrowRight, BookMarked, Target } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/data/portfolio";

export function CareerDirection() {
  return (
    <section className="section-shell section-rule">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            label="09 / Forward direction"
            title="What I’m building toward."
            description={portfolioData.careerDirection}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <article className="h-full border border-line bg-ink p-7 text-paper sm:p-9">
              <div className="flex items-center gap-3 text-signal">
                <Target aria-hidden="true" className="size-5" />
                <p className="eyebrow">Future goals</p>
              </div>
              <ol className="mt-8 divide-y divide-paper/15">
                {portfolioData.futureGoals.map((goal, index) => (
                  <li
                    key={goal}
                    className="grid grid-cols-[2rem_1fr] gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <span className="metadata pt-0.5 text-signal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-7 text-paper/75">{goal}</p>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="h-full border border-line bg-paper-strong p-7 sm:p-9">
              <div className="flex items-center gap-3 text-accent">
                <BookMarked aria-hidden="true" className="size-5" />
                <p className="eyebrow">Currently learning</p>
              </div>
              <ul className="mt-8 space-y-5">
                {portfolioData.currentlyLearning.map((item) => (
                  <li key={item.area} className="flex gap-4">
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-signal"
                    />
                    <div>
                      <h3 className="font-semibold text-ink">{item.area}</h3>
                      <p className="mt-1 text-sm leading-6 text-ink-muted">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
