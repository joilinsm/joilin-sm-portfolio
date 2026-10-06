import type { Metadata } from "next";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  ExternalLink,
  Fingerprint,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioData } from "@/data/portfolio";
import { hasContent, isUsableHref } from "@/lib/utils";

interface CertificationPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return portfolioData.certifications.map((certification) => ({
    id: certification.id,
  }));
}

export async function generateMetadata({
  params,
}: CertificationPageProps): Promise<Metadata> {
  const { id } = await params;
  const certification = portfolioData.certifications.find(
    (certification) => certification.id === id,
  );

  if (!certification) return {};

  const description = `${certification.name}, issued by ${certification.issuer}.`;

  return {
    title: certification.name,
    description,
    openGraph: {
      title: certification.name,
      description,
      type: "article",
    },
  };
}

export default async function CertificationPage({
  params,
}: CertificationPageProps) {
  const { id } = await params;
  const certification = portfolioData.certifications.find(
    (certification) => certification.id === id,
  );

  if (!certification) notFound();

  const certificateFile =
    certification.certificateFile || certification.document || "";
  const resources = [
    { label: "View certificate", href: certificateFile },
    { label: "Verify credential", href: certification.credentialUrl },
  ].filter((resource) => isUsableHref(resource.href));

  return (
    <main id="main-content">
      <section className="border-b border-line bg-accent-soft/40 py-16 sm:py-24">
        <div className="site-container">
          <Link
            href="/#certifications"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to certifications
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-end">
            <div>
              <p className="eyebrow text-signal">
                {certification.category ||
                  certification.type ||
                  "Certification"}
              </p>
              <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-ink sm:text-6xl sm:leading-[1.03]">
                {certification.name}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">
                {certification.issuer}
                {certification.institution
                  ? ` · ${certification.institution}`
                  : ""}
              </p>
            </div>

            <dl className="grid gap-px overflow-hidden border border-line bg-line">
              <DetailFact
                icon={<CalendarDays className="size-4" />}
                label="Date"
                value={certification.date}
              />
              <DetailFact
                icon={<BadgeCheck className="size-4" />}
                label="Result"
                value={
                  [certification.result, certification.score]
                    .filter(Boolean)
                    .join(" · ") || "Not specified"
                }
              />
            </dl>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div className="space-y-10">
            <section className="border-t border-line pt-6">
              <p className="eyebrow text-accent">Credential overview</p>
              <dl className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                <OverviewItem
                  icon={<Building2 className="size-4" />}
                  label="Issuing organisation"
                  value={certification.issuer}
                />
                <OverviewItem
                  icon={<CalendarDays className="size-4" />}
                  label="Date"
                  value={certification.date}
                />
                {hasContent(certification.duration) ? (
                  <OverviewItem
                    label="Duration"
                    value={certification.duration}
                  />
                ) : null}
                {hasContent(certification.details) ? (
                  <OverviewItem
                    label="Details"
                    value={certification.details}
                  />
                ) : null}
                {hasContent(certification.credentialId) ? (
                  <OverviewItem
                    icon={<Fingerprint className="size-4" />}
                    label="Credential ID"
                    value={certification.credentialId}
                  />
                ) : null}
              </dl>
            </section>

            {certification.skills?.length ? (
              <section className="border-t border-line pt-6">
                <p className="eyebrow text-accent">Associated skills</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {certification.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line bg-paper-strong px-3 py-1.5 text-xs font-medium text-ink"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-line bg-paper-strong p-5">
              <p className="eyebrow text-ink-muted">Credential status</p>
              <p className="mt-4 font-semibold text-ink">
                {certification.result || "Completed"}
              </p>
              {certification.score ? (
                <p className="mt-1 text-sm text-ink-muted">
                  Score: {certification.score}
                </p>
              ) : null}
            </div>

            {resources.length ? (
              <div className="border border-line bg-paper-strong p-5">
                <p className="eyebrow text-ink-muted">Documents &amp; links</p>
                <div className="mt-4 space-y-3">
                  {resources.map((resource) => (
                    <a
                      key={resource.label}
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 text-sm font-semibold text-accent"
                    >
                      {resource.label}
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </a>
                  ))}
                </div>
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
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-paper-strong p-5">
      <dt className="metadata flex items-center gap-2 uppercase text-ink-muted">
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        {label}
      </dt>
      <dd className="mt-2 text-sm font-semibold leading-6 text-ink">{value}</dd>
    </div>
  );
}
