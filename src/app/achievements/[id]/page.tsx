import type { Metadata } from "next";
import {
  ArrowLeft,
  Award,
  Building2,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioData } from "@/data/portfolio";
import { isUsableHref } from "@/lib/utils";

interface AchievementPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return portfolioData.achievements.map((achievement) => ({
    id: achievement.id,
  }));
}

export async function generateMetadata({
  params,
}: AchievementPageProps): Promise<Metadata> {
  const { id } = await params;
  const achievement = portfolioData.achievements.find(
    (achievement) => achievement.id === id,
  );

  if (!achievement) return {};

  return {
    title: achievement.title,
    description: achievement.description,
    openGraph: {
      title: achievement.title,
      description: achievement.description,
      type: "article",
    },
  };
}

export default async function AchievementPage({
  params,
}: AchievementPageProps) {
  const { id } = await params;
  const achievement = portfolioData.achievements.find(
    (achievement) => achievement.id === id,
  );

  if (!achievement) notFound();

  const evidence =
    achievement.certificateFile || achievement.evidenceUrl || "";

  return (
    <main id="main-content">
      <section className="border-b border-line bg-accent-soft/40 py-16 sm:py-24">
        <div className="site-container">
          <Link
            href="/#certifications"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to achievements
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-end">
            <div>
              <p className="eyebrow text-signal">{achievement.category}</p>
              <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-ink sm:text-6xl sm:leading-[1.03]">
                {achievement.title}
              </h1>
              {achievement.organization ? (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">
                  {achievement.organization}
                </p>
              ) : null}
            </div>

            <dl className="grid gap-px overflow-hidden border border-line bg-line">
              <DetailFact
                icon={<CalendarDays className="size-4" />}
                label="Date"
                value={achievement.date}
              />
              <DetailFact
                icon={<Award className="size-4" />}
                label="Category"
                value={achievement.category}
              />
            </dl>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <article className="border-t border-line pt-6">
            <p className="eyebrow text-accent">Achievement overview</p>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-muted">
              {achievement.description}
            </p>

            {achievement.organization ? (
              <dl className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                <OverviewItem
                  icon={<Building2 className="size-4" />}
                  label="Organisation"
                  value={achievement.organization}
                />
                <OverviewItem
                  icon={<CalendarDays className="size-4" />}
                  label="Date"
                  value={achievement.date}
                />
              </dl>
            ) : null}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-line bg-paper-strong p-5">
              <p className="eyebrow text-ink-muted">Recognition</p>
              <p className="mt-4 font-semibold text-ink">
                {achievement.category}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{achievement.date}</p>
            </div>

            {isUsableHref(evidence) ? (
              <div className="border border-line bg-paper-strong p-5">
                <p className="eyebrow text-ink-muted">Supporting evidence</p>
                <a
                  href={evidence}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-between gap-3 text-sm font-semibold text-accent"
                >
                  View evidence
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
}

function DetailFact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-paper-strong p-4">
      <dt className="metadata flex items-center gap-2 uppercase text-ink-muted">
        <span aria-hidden="true">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}

function OverviewItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-paper-strong p-5">
      <dt className="metadata flex items-center gap-2 uppercase text-ink-muted">
        <span aria-hidden="true">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 text-sm font-semibold leading-6 text-ink">{value}</dd>
    </div>
  );
}
