import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/data/portfolio";
import { isUsableHref } from "@/lib/utils";

export function Credentials() {
  return (
    <section
      id="certifications"
      className="section-shell section-rule bg-surface-muted/55"
    >
      <div className="site-container">
        <Reveal>
          <SectionHeading
            label="08 / Credentials"
            title="Certifications and achievements."
            description="This section is ready for verified credentials and evidence. No certifications or achievements are fabricated."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <CredentialPanel
            title="Certifications"
            icon={<BadgeCheck aria-hidden="true" className="size-5" />}
            emptyMessage="Certifications will be added here."
          >
            {portfolioData.certifications.map((certification) => (
              <article
                key={certification.id}
                className="border-t border-line px-6 py-5 first:border-t-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="metadata text-signal">
                    {certification.category || certification.type || "Certification"}
                  </p>
                  <p className="metadata flex items-center gap-2 text-ink-muted">
                    <CalendarDays aria-hidden="true" className="size-3.5" />
                    {certification.date}
                  </p>
                </div>
                <h4 className="mt-2 font-semibold text-ink">
                  <Link
                    href={`/certifications/${certification.id}`}
                    className="transition hover:text-accent"
                  >
                    {certification.name}
                  </Link>
                </h4>
                <p className="mt-1 text-sm text-ink-muted">
                  {certification.issuer}
                  {certification.institution
                    ? ` · ${certification.institution}`
                    : ""}
                </p>
                {certification.result || certification.score ? (
                  <p className="mt-2 text-sm font-medium text-ink">
                    {[certification.result, certification.score]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-4">
                  <DetailLink
                    href={`/certifications/${certification.id}`}
                    label="View details"
                  />
                  {isUsableHref(certification.credentialUrl) ? (
                    <CredentialLink
                      href={certification.credentialUrl}
                      label="Verify credential"
                    />
                  ) : null}
                  {isUsableHref(
                    certification.certificateFile || certification.document,
                  ) ? (
                    <CredentialLink
                      href={
                        certification.certificateFile || certification.document || ""
                      }
                      label="View certificate"
                    />
                  ) : null}
                </div>
              </article>
            ))}
          </CredentialPanel>

          <CredentialPanel
            title="Achievements"
            icon={<Award aria-hidden="true" className="size-5" />}
            emptyMessage="Verified achievements will be added here."
          >
            {portfolioData.achievements.map((achievement) => (
              <article
                key={achievement.id}
                className="border-t border-line px-6 py-5 first:border-t-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="metadata text-signal">{achievement.category}</p>
                  <p className="metadata flex items-center gap-2 text-ink-muted">
                    <CalendarDays aria-hidden="true" className="size-3.5" />
                    {achievement.date}
                  </p>
                </div>
                <h4 className="mt-2 font-semibold text-ink">
                  <Link
                    href={`/achievements/${achievement.id}`}
                    className="transition hover:text-accent"
                  >
                    {achievement.title}
                  </Link>
                </h4>
                {achievement.organization ? (
                  <p className="mt-1 text-sm font-medium text-ink-muted">
                    {achievement.organization}
                  </p>
                ) : null}
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {achievement.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-4">
                  <DetailLink
                    href={`/achievements/${achievement.id}`}
                    label="View details"
                  />
                  {isUsableHref(
                    achievement.certificateFile || achievement.evidenceUrl,
                  ) ? (
                    <CredentialLink
                      href={
                        achievement.certificateFile ||
                        achievement.evidenceUrl ||
                        ""
                      }
                      label="View evidence"
                    />
                  ) : null}
                </div>
              </article>
            ))}
          </CredentialPanel>
        </div>
      </div>
    </section>
  );
}

function DetailLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
    >
      {label}
      <ArrowUpRight aria-hidden="true" className="size-3.5" />
    </Link>
  );
}

function CredentialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
    >
      {label}
      <ExternalLink aria-hidden="true" className="size-3.5" />
    </a>
  );
}

function CredentialPanel({
  title,
  icon,
  emptyMessage,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  emptyMessage: string;
  children: React.ReactNode;
}) {
  const hasChildren = Array.isArray(children)
    ? children.length > 0
    : Boolean(children);

  return (
    <div className="min-h-64 border border-line bg-paper-strong">
      <div className="flex items-center gap-3 border-b border-line p-6">
        <span className="text-accent">{icon}</span>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
      </div>
      {hasChildren ? (
        children
      ) : (
        <div className="grid min-h-44 place-items-center p-7 text-center">
          <div>
            <p className="font-semibold text-ink">{emptyMessage}</p>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              Add a verified entry in the central portfolio data file.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
