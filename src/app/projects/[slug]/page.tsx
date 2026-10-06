import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { portfolioData } from "@/data/portfolio";
import { hasContent, isUsableHref } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolioData.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioData.projects.find(
    (project) => project.slug === slug,
  );

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioData.projects.find(
    (project) => project.slug === slug,
  );

  if (!project) notFound();

  const narrativeSections = [
    { title: "Problem", content: project.problem },
    { title: "Approach", content: project.approach },
    { title: "Solution", content: project.solution },
    { title: "My role", content: project.role },
    { title: "Learning", content: project.learning },
  ].filter((section) => hasContent(section.content));

  const projectLinks = [
    { label: "Live demo", href: project.links.demo },
    { label: "Documentation", href: project.links.documentation },
  ].filter((link) => isUsableHref(link.href));

  const hasCaseStudyContent =
    narrativeSections.length > 0 ||
    project.technologies.length > 0 ||
    project.skills.length > 0 ||
    project.results.length > 0 ||
    projectLinks.length > 0;

  return (
    <main id="main-content">
      <section className="border-b border-line bg-accent-soft/40 py-16 sm:py-24">
        <div className="site-container">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to projects
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-3">
                {project.categories.map((category) => (
                  <span key={category} className="eyebrow text-signal">
                    {category}
                  </span>
                ))}
              </div>
              <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-ink sm:text-6xl sm:leading-[1.03]">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">
                {project.summary}
              </p>
              {isUsableHref(project.caseStudyFile) ? (
                <div className="mt-8">
                  <ButtonLink href={project.caseStudyFile}>
                    View Project Report
                  </ButtonLink>
                </div>
              ) : null}
              {isUsableHref(project.links.github) ? (
                <div className={isUsableHref(project.caseStudyFile) ? "mt-6" : "mt-8"}>
                  <p className="eyebrow text-ink-muted">
                    Project GitHub Repository
                  </p>
                  <div className="mt-3">
                    <ButtonLink href={project.links.github}>
                      GitHub Repository
                    </ButtonLink>
                  </div>
                </div>
              ) : null}
            </div>

            <dl className="grid gap-px overflow-hidden border border-line bg-line">
              <div className="bg-paper-strong p-4">
                <dt className="metadata uppercase text-ink-muted">Status</dt>
                <dd className="mt-2 text-sm font-semibold text-ink">
                  {project.status}
                </dd>
              </div>
              <div className="bg-paper-strong p-4">
                <dt className="metadata uppercase text-ink-muted">Date</dt>
                <dd className="mt-2 text-sm font-semibold text-ink">
                  {hasContent(project.date) ? project.date : "To be added"}
                </dd>
              </div>
            </dl>
          </div>

          {project.image.startsWith("/") ? (
            <div className="relative mt-12 aspect-[16/7] overflow-hidden border border-line bg-paper-strong">
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                priority
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      {hasCaseStudyContent ? (
        <section className="section-shell">
          <div className="site-container">
            <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
              <div className="space-y-12">
                <CaseStudySection title="Overview">
                  <p>{project.summary}</p>
                </CaseStudySection>

                {narrativeSections.map((section) => (
                  <CaseStudySection key={section.title} title={section.title}>
                    <p>{section.content}</p>
                  </CaseStudySection>
                ))}

                {project.results.length ? (
                  <CaseStudySection title="Outcome">
                    <ul className="space-y-3">
                      {project.results.map((result) => (
                        <li key={result} className="flex gap-3">
                          <span className="mt-3 size-1.5 shrink-0 rounded-full bg-signal" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </CaseStudySection>
                ) : null}
              </div>

              <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
                {project.technologies.length ? (
                  <MetaPanel title="Technology" items={project.technologies} />
                ) : null}
                {project.skills.length ? (
                  <MetaPanel title="Skills" items={project.skills} />
                ) : null}
                {projectLinks.length ? (
                  <div className="border border-line bg-paper-strong p-5">
                    <p className="eyebrow text-ink-muted">Project links</p>
                    <div className="mt-4 space-y-3">
                      {projectLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 text-sm font-semibold text-accent"
                        >
                          {link.label}
                          <ArrowUpRight aria-hidden="true" className="size-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </aside>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-6">
      <p className="eyebrow text-accent">{title}</p>
      <div className="mt-4 text-base leading-8 text-ink-muted">{children}</div>
    </section>
  );
}

function MetaPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-line bg-paper-strong p-5">
      <p className="eyebrow text-ink-muted">{title}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
