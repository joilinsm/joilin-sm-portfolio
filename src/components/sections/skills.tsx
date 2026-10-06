import {
  BarChart3,
  BriefcaseBusiness,
  ChartSpline,
  ClipboardCheck,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/data/portfolio";

const icons = [ChartSpline, BriefcaseBusiness, BarChart3, ClipboardCheck];

export function Skills() {
  return (
    <section id="skills" className="section-shell section-rule">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            label="05 / Capabilities"
            title="Skills organised by professional context."
            description="A qualitative view of relevant capability areas—without artificial percentages or unsupported proficiency scores."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {portfolioData.skills.map((category, index) => {
            const Icon = icons[index] ?? ClipboardCheck;

            return (
              <Reveal key={category.name} delay={index * 0.04}>
                <article className="group h-full border border-line bg-paper-strong p-6 transition duration-200 hover:-translate-y-1 hover:border-line-strong sm:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <span className="grid size-12 place-items-center rounded-sm bg-ink text-paper transition group-hover:bg-accent-strong">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="metadata text-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-[-0.025em] text-ink">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">
                    {category.description}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink"
                      >
                        {skill.name}
                        {skill.level ? (
                          <span className="ml-1.5 text-ink-muted">
                            · {skill.level}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
