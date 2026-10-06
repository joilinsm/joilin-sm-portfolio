import { AcademicRecordsExplorer } from "@/components/sections/academic-records-explorer";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/data/portfolio";

export function Education() {
  const undergraduateEducation = portfolioData.education[0];

  return (
    <section id="education" className="section-shell section-rule">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            label="Academic profile"
            title="Education"
            description="Academic background, qualifications, coursework, and academic records"
          />
        </Reveal>

        {undergraduateEducation ? (
          <div className="mt-14">
            <AcademicRecordsExplorer
              education={undergraduateEducation}
              documents={portfolioData.academicDocuments}
              records={portfolioData.academicRecords}
            />
          </div>
        ) : (
          <p className="mt-10 text-sm italic text-ink-muted">
            Education details will appear here after they have been added.
          </p>
        )}
      </div>
    </section>
  );
}
