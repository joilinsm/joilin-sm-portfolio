import {
  ArrowDownRight,
  BookOpen,
  GraduationCap,
  Languages,
  MapPin,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { portfolioData } from "@/data/portfolio";
import { hasContent } from "@/lib/utils";

export function Hero() {
  const education = portfolioData.education[0];
  const english = portfolioData.languages.find(
    (language) => language.name === "English",
  );
  const german = portfolioData.languages.find(
    (language) => language.name === "German",
  );

  return (
    <section id="home" className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-y-0 right-0 hidden w-[34%] border-l border-line bg-accent-soft/45 lg:block" />
      <div className="site-container relative grid min-h-[calc(100svh-4.5rem)] items-center gap-16 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:py-24">
        <Reveal>
          <div className="max-w-4xl">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <p className="eyebrow text-accent">{portfolioData.profile.eyebrow}</p>
              <span className="h-px w-8 bg-signal" aria-hidden="true" />
              <p className="metadata text-ink-muted">Master&apos;s focus · Germany</p>
            </div>

            <h1 className="text-balance text-[clamp(3.5rem,10vw,7.8rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-ink">
              {portfolioData.profile.name}
            </h1>

            <p className="mt-9 max-w-3xl text-balance text-xl font-medium leading-8 tracking-[-0.02em] text-ink sm:text-2xl sm:leading-9">
              {portfolioData.profile.headline}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
              {portfolioData.profile.introduction}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="#education">
                Explore my academic profile
              </ButtonLink>
              <ButtonLink
                href={portfolioData.profile.documents.cvPath}
                variant="secondary"
                download
                available={portfolioData.profile.documents.cvAvailable}
              >
                Download CV
              </ButtonLink>
              <ButtonLink href="#projects" variant="quiet">
                View projects
              </ButtonLink>
            </div>
            {!portfolioData.profile.documents.cvAvailable ? (
              <p className="metadata mt-3 text-ink-muted">
                CV placeholder — add the PDF and enable it in the content file.
              </p>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <aside
            aria-label="Academic snapshot"
            className="editorial-shadow relative border border-line bg-paper-strong"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="eyebrow text-ink-muted">Academic snapshot</p>
              <span className="metadata text-accent">Profile / 2026</span>
            </div>

            <div className="space-y-0">
              <SnapshotRow
                icon={<GraduationCap className="size-4" />}
                label="Degree"
                value={education.degree.replace("B.Tech — ", "")}
                note={`Graduation ${education.graduationYear}`}
              />
              <SnapshotRow
                icon={<BookOpen className="size-4" />}
                label="Academic result"
                value={`${education.cgpa} / ${education.cgpaScale} CGPA`}
                note={`German equivalent: ${education.germanGradeEquivalent}`}
              />
              <SnapshotRow
                icon={<Languages className="size-4" />}
                label="Languages"
                value={`${english?.qualification} ${english?.level}`}
                note={`${german?.qualification} · ${german?.level}`}
              />
              <SnapshotRow
                icon={<MapPin className="size-4" />}
                label="Direction"
                value="Master's study in Germany"
                note={
                  hasContent(portfolioData.profile.location)
                    ? portfolioData.profile.location
                    : "Location to be added"
                }
              />
            </div>

            <a
              href="#about"
              className="flex items-center justify-between border-t border-line bg-ink px-5 py-4 text-sm font-semibold text-paper transition hover:bg-accent-strong"
            >
              Continue through profile
              <ArrowDownRight aria-hidden="true" className="size-4" />
            </a>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function SnapshotRow({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="grid grid-cols-[2rem_1fr] gap-3 border-b border-line px-5 py-5 last:border-b-0">
      <span
        aria-hidden="true"
        className="mt-0.5 grid size-8 place-items-center rounded-sm bg-accent-soft text-accent"
      >
        {icon}
      </span>
      <div>
        <p className="metadata uppercase text-ink-muted">{label}</p>
        <p className="mt-1.5 text-sm font-semibold text-ink">{value}</p>
        <p className="mt-1 text-xs leading-5 text-ink-muted">{note}</p>
      </div>
    </div>
  );
}
