import { About } from "@/components/sections/about";
import { AcademicInterests } from "@/components/sections/academic-interests";
import { CareerDirection } from "@/components/sections/career-direction";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Germany } from "@/components/sections/germany";
import { Hero } from "@/components/sections/hero";
import { Languages } from "@/components/sections/languages";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { portfolioData } from "@/data/portfolio";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Education />
      <Germany />
      <AcademicInterests />
      <Experience />
      <Skills />
      <Projects projects={portfolioData.projects} />
      <Languages />
      <Credentials />
      <CareerDirection />
      <Contact />
    </main>
  );
}
