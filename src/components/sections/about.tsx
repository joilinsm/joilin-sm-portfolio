import { portfolioData } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="about" className="section-shell">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              label="01 / About"
              title="An interdisciplinary profile, built with clear direction."
              description="Technology is most valuable when it is understood alongside the people, processes, and decisions it supports."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border-l-2 border-accent pl-6 sm:pl-9">
              {portfolioData.profile.about.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "text-xl font-medium leading-8 tracking-[-0.02em] text-ink sm:text-2xl sm:leading-9"
                      : "mt-5 text-base leading-7 text-ink-muted sm:text-lg sm:leading-8"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-20 border-y border-line">
          <div className="grid lg:grid-cols-[0.55fr_1.45fr]">
            <div className="border-b border-line bg-ink p-7 text-paper lg:border-r lg:border-b-0 sm:p-9">
              <p className="eyebrow text-signal">Why my profile</p>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Technical foundation.
                <br />
                Business context.
                <br />
                Analytical focus.
              </h3>
            </div>

            <div className="grid sm:grid-cols-2">
              {portfolioData.profileStrengths.map((strength, index) => (
                <article
                  key={strength.title}
                  className="border-b border-line p-6 last:border-b-0 sm:p-7 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <span className="metadata text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-ink">
                    {strength.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">
                    {strength.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
