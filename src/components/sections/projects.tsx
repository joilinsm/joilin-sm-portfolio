"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FolderKanban } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, hasContent } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types/portfolio";

const categories: Array<"All" | ProjectCategory> = [
  "All",
  "Data Analytics",
  "Business Analysis",
  "Business Intelligence",
  "Technology",
  "Academic",
  "Business",
  "Other",
];

export function Projects({ projects }: { projects: Project[] }) {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("All");
  const reduceMotion = useReducedMotion();

  const visibleProjects = useMemo(
    () =>
      selectedCategory === "All"
        ? projects
        : projects.filter((project) =>
            project.categories.includes(selectedCategory),
          ),
    [projects, selectedCategory],
  );

  return (
    <section id="projects" className="section-shell section-rule bg-surface-muted/55">
      <div className="site-container">
        <SectionHeading
          label="06 / Selected work"
          title="Projects documented as structured case studies."
          description="Project records are intentionally evidence-led. Unverified technologies, metrics, and outcomes are not displayed."
        />

        <div
          className="mt-10 flex gap-2 overflow-x-auto pb-3"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition",
                selectedCategory === category
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper-strong text-ink-muted hover:border-accent hover:text-accent",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout={!reduceMotion} className="mt-7 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project, index) => (
              <motion.article
                layout={!reduceMotion}
                key={project.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.24, delay: index * 0.025 }}
                className="editorial-shadow group flex min-h-[24rem] flex-col overflow-hidden border border-line bg-paper-strong"
              >
                <div className="relative flex min-h-40 items-end overflow-hidden border-b border-line bg-accent-soft p-6">
                  {project.image.startsWith("/") ? (
                    <>
                      <Image
                        src={project.image}
                        alt={`${project.title} project preview`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.025]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div
                        aria-hidden="true"
                        className="absolute -top-16 -right-10 size-52 rounded-full border border-accent/20"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute top-10 -right-8 size-32 rotate-12 border border-accent/15"
                      />
                    </>
                  )}
                  <div className="relative flex w-full items-end justify-between gap-5">
                    {!project.image.startsWith("/") ? (
                      <span className="grid size-12 place-items-center border border-accent/25 bg-paper-strong text-accent">
                        <FolderKanban aria-hidden="true" className="size-5" />
                      </span>
                    ) : (
                      <span aria-hidden="true" />
                    )}
                    <span className="metadata rounded-full border border-accent/25 bg-paper-strong/80 px-3 py-1.5 text-accent">
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((category) => (
                      <span key={category} className="eyebrow text-signal">
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-ink-muted">
                    {project.summary}
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
                    <span className="metadata text-ink-muted">
                      {hasContent(project.date) ? project.date : "Date to be added"}
                    </span>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition group-hover:gap-3"
                      aria-label={`Open case study for ${project.title}`}
                    >
                      Case study
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {!visibleProjects.length ? (
          <div className="mt-7 border border-dashed border-line bg-paper-strong px-6 py-12 text-center">
            <p className="font-semibold text-ink">
              No verified projects in this category yet.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Add a project in the central portfolio data file and it will appear
              here automatically.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
