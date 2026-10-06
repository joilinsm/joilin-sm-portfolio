"use client";

import { useMemo, useState } from "react";
import {
  Award,
  Building2,
  ChevronDown,
  ExternalLink,
  FileText,
  GraduationCap,
  LibraryBig,
} from "lucide-react";
import { cn, isUsableHref } from "@/lib/utils";
import type {
  AcademicDocument,
  AcademicRecord,
  Education,
} from "@/types/portfolio";

export function AcademicRecordsExplorer({
  education,
  documents,
  records,
}: {
  education: Education;
  documents: AcademicDocument[];
  records: AcademicRecord[];
}) {
  const [openSemester, setOpenSemester] = useState<string | null>(
    records[0]?.semester ?? null,
  );

  const semesterGroups = useMemo(() => groupRecordsBySemester(records), [records]);
  const transcriptDocument = documents.find(
    (document) => document.id === "btech-transcript",
  );

  return (
    <section
      id="academic-profile"
      className="border border-line bg-paper-strong"
      aria-labelledby="academic-profile-heading"
    >
      <div className="flex items-center gap-4 border-b border-line p-6 sm:p-8">
        <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-accent-soft text-accent">
          <LibraryBig aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="eyebrow text-accent">Academic Profile</p>
          <h3
            id="academic-profile-heading"
            className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink"
          >
            Undergraduate academic record
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Class X and Class XII are presented only as certificates. Detailed
            academic information is provided for the B.Tech degree.
          </p>
        </div>
      </div>

      <div className="space-y-12 p-6 sm:p-8">
        <BtechSummary education={education} />
        <AcademicDocuments documents={documents} />

        {education.highlights.length ? (
          <ProfileBlock
            eyebrow="Academic highlights"
            title="What the undergraduate record establishes."
          >
            <ul className="grid gap-3 sm:grid-cols-2">
              {education.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 border border-line bg-paper p-4 text-sm leading-6 text-ink-muted"
                >
                  <Award
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-accent"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </ProfileBlock>
        ) : null}

        <ProfileBlock
          eyebrow="Semester overview"
          title="Eight-semester undergraduate structure."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => {
              const semester = String(index + 1);
              const group = semesterGroups.get(semester);
              const subjectCount = group?.length ?? 0;

              return (
                <article
                  key={semester}
                  className="border border-line bg-paper p-4"
                >
                  <p className="metadata text-ink-muted">Semester {semester}</p>
                  <p className="mt-2 text-sm font-semibold text-ink">
                    {subjectCount
                      ? `${subjectCount} subject${subjectCount === 1 ? "" : "s"}`
                      : "Recorded in transcript"}
                  </p>
                </article>
              );
            })}
          </div>
          <p className="mt-4 text-sm leading-6 text-ink-muted">
            Total: {education.academicCredits} academic credits · {education.ects}{" "}
            ECTS
          </p>
        </ProfileBlock>

        <ProfileBlock
          eyebrow="Detailed B.Tech academic record"
          title="Semester-wise subjects, credits, ECTS, and grades."
        >
          {semesterGroups.size ? (
            <div className="space-y-3">
              {[...semesterGroups.entries()].map(([semester, subjects]) => (
                <details
                  key={semester}
                  open={openSemester === semester}
                  className="group border border-line bg-paper"
                  onToggle={(event) => {
                    if (event.currentTarget.open) setOpenSemester(semester);
                  }}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4">
                    <span className="font-semibold text-ink">
                      Semester {semester}
                    </span>
                    <span className="flex items-center gap-3 text-sm text-ink-muted">
                      {subjects.length} subject{subjects.length === 1 ? "" : "s"}
                      <ChevronDown
                        aria-hidden="true"
                        className="size-4 transition group-open:rotate-180"
                      />
                    </span>
                  </summary>
                  <SemesterTable records={subjects} />
                </details>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-line bg-paper px-5 py-8">
              <p className="font-semibold text-ink">
                The detailed semester-wise record is documented in the B.Tech
                transcript.
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
                Subject codes, credits, ECTS, and grades are not displayed as a
                reconstructed table here. The official transcript remains the
                source of the complete undergraduate record.
              </p>
              {transcriptDocument && isUsableHref(transcriptDocument.file) ? (
                <DocumentButton
                  href={transcriptDocument.file}
                  label="View Transcript"
                  className="mt-5"
                />
              ) : null}
            </div>
          )}
        </ProfileBlock>

        {education.coursework.length ? (
          <ProfileBlock
            eyebrow="Relevant coursework"
            title="Undergraduate subjects relevant to Master's study."
          >
            <ul className="grid gap-3 sm:grid-cols-2">
              {education.coursework.map((course) => (
                <li key={course.subject} className="border-l border-signal pl-3">
                  <p className="text-sm font-semibold text-ink">{course.subject}</p>
                  {course.description ? (
                    <p className="mt-1 text-xs leading-5 text-ink-muted">
                      {course.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </ProfileBlock>
        ) : null}

        {education.gradeLegend.length ? (
          <ProfileBlock
            eyebrow="Grade legend"
            title="Anna University letter-grade scale."
          >
            <dl className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
              {education.gradeLegend.map((entry) => (
                <div key={entry.grade} className="bg-paper p-4">
                  <dt className="font-semibold text-ink">{entry.grade}</dt>
                  <dd className="mt-1 text-sm text-ink-muted">{entry.meaning}</dd>
                </div>
              ))}
            </dl>
          </ProfileBlock>
        ) : null}

        {education.academicAlignment.length ? (
          <ProfileBlock
            eyebrow="Academic alignment for Master's study"
            title="How this undergraduate record relates to the intended Master's direction."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              {education.academicAlignment.map((item) => (
                <article
                  key={item.title}
                  className="border border-line bg-paper p-5"
                >
                  <h4 className="font-semibold text-ink">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </ProfileBlock>
        ) : null}
      </div>
    </section>
  );
}

function BtechSummary({ education }: { education: Education }) {
  const facts = [
    { label: "Degree", value: education.degree },
    { label: "Institution", value: education.institution },
    {
      label: "Affiliation",
      value: education.affiliation || education.institution,
    },
    { label: "Graduation", value: education.graduationYear },
    { label: "Classification", value: education.classification || "—" },
    { label: "CGPA", value: `${education.cgpa} / ${education.cgpaScale}` },
    {
      label: "Academic Credits",
      value: education.academicCredits || "—",
    },
    { label: "ECTS", value: education.ects || "—" },
  ];

  return (
    <ProfileBlock
      eyebrow="B.Tech academic summary"
      title={education.degree}
    >
      <div className="mb-6 flex flex-col gap-2 text-sm text-ink-muted sm:flex-row sm:flex-wrap sm:gap-x-7">
        <p className="flex items-center gap-2">
          <GraduationCap aria-hidden="true" className="size-4 text-accent" />
          {education.institution}
        </p>
        {education.affiliation ? (
          <p className="flex items-center gap-2">
            <Building2 aria-hidden="true" className="size-4 text-accent" />
            {education.affiliation}
          </p>
        ) : null}
      </div>

      <dl className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-paper p-4">
            <dt className="metadata uppercase text-ink-muted">{fact.label}</dt>
            <dd className="mt-2 text-sm font-semibold leading-6 text-ink">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs leading-5 text-ink-muted">
        German-scale equivalent: {education.germanGradeEquivalent} (supporting
        conversion)
      </p>
    </ProfileBlock>
  );
}

function AcademicDocuments({ documents }: { documents: AcademicDocument[] }) {
  return (
    <ProfileBlock
      eyebrow="Academic documents"
      title="Certificates and official undergraduate records."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {documents.map((document) => {
          const isSimpleCertificate = document.presentation === "certificate";

          return (
            <article
              key={document.id}
              className="flex h-full flex-col border border-line bg-paper p-5"
            >
              <div className="flex items-start gap-3">
                <FileText
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-accent"
                />
                <div>
                  <h4 className="font-semibold text-ink">{document.title}</h4>
                  <p
                    className={
                      isSimpleCertificate
                        ? "mt-1 text-sm text-ink-muted"
                        : "mt-2 text-sm leading-6 text-ink-muted"
                    }
                  >
                    {document.description}
                  </p>
                </div>
              </div>
              {isUsableHref(document.file) ? (
                <DocumentButton
                  href={document.file}
                  label={document.buttonLabel}
                  className="mt-5"
                />
              ) : (
                <p className="mt-5 text-sm italic text-ink-muted">
                  Document will be available after the file has been added.
                </p>
              )}
            </article>
          );
        })}
      </div>
    </ProfileBlock>
  );
}

function SemesterTable({ records }: { records: AcademicRecord[] }) {
  return (
    <div className="overflow-x-auto border-t border-line">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line text-ink-muted">
            {["Sem", "Subject Code", "Subject", "Credits", "ECTS", "Grade"].map(
              (heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="eyebrow px-3 py-3 font-semibold"
                >
                  {heading}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b border-line text-ink">
              <td className="px-3 py-3 text-ink-muted">{record.semester}</td>
              <td className="px-3 py-3 font-mono text-xs">{record.subjectCode}</td>
              <th scope="row" className="px-3 py-3 font-medium">
                {record.subject}
              </th>
              <td className="px-3 py-3">{record.credits || "—"}</td>
              <td className="px-3 py-3">{record.ects || "—"}</td>
              <td className="px-3 py-3">{record.grade || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProfileBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="eyebrow text-accent">{eyebrow}</p>
      <h4 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-ink">
        {title}
      </h4>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function DocumentButton({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-accent hover:underline",
        className,
      )}
    >
      {label}
      <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
    </a>
  );
}

function groupRecordsBySemester(records: AcademicRecord[]) {
  const groups = new Map<string, AcademicRecord[]>();

  records.forEach((record) => {
    const existing = groups.get(record.semester) ?? [];
    groups.set(record.semester, [...existing, record]);
  });

  return groups;
}
