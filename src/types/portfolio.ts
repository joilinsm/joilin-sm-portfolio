export type SkillLevel = "Core" | "Working Knowledge" | "Familiar" | "Developing";

export type ProjectCategory =
  | "Data Analytics"
  | "Business Analysis"
  | "Business Intelligence"
  | "Technology"
  | "Academic"
  | "Business"
  | "Other";

export type AcademicCategory =
  | "Computer Science"
  | "Business"
  | "Mathematics"
  | "Statistics"
  | "Data Analytics"
  | "Management"
  | "Information Systems"
  | "Other";

export interface SocialLink {
  label: "LinkedIn" | "GitHub" | "Email" | "Phone";
  href: string;
}

export interface Profile {
  name: string;
  shortName: string;
  eyebrow: string;
  headline: string;
  introduction: string;
  location: string;
  availability: string;
  about: string[];
  documents: {
    cvPath: string;
    cvAvailable: boolean;
  };
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  affiliation?: string;
  location: string;
  graduationYear: string;
  period: string;
  classification?: string;
  cgpa: string;
  cgpaScale: string;
  germanGradeEquivalent: string;
  academicCredits?: string;
  ects?: string;
  description: string;
  coursework: Array<{
    subject: string;
    description: string;
    category: AcademicCategory;
  }>;
  highlights: string[];
  gradeLegend: Array<{
    grade: string;
    meaning: string;
  }>;
  academicAlignment: Array<{
    title: string;
    description: string;
  }>;
  achievements: string[];
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  achievements: string[];
  tools: string[];
  skillsDeveloped: string[];
  supportingDocuments: Array<{
    label: string;
    href: string;
  }>;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: Array<{
    name: string;
    level?: SkillLevel;
  }>;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  status: string;
  date: string;
  categories: ProjectCategory[];
  featured: boolean;
  image: string;
  problem: string;
  approach: string;
  solution: string;
  role: string;
  technologies: string[];
  skills: string[];
  results: string[];
  learning: string;
  links: {
    github: string;
    demo: string;
    documentation: string;
  };
  caseStudyFile?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  institution?: string;
  date: string;
  type?: string;
  result?: string;
  score?: string;
  details?: string;
  duration?: string;
  credentialId: string;
  credentialUrl: string;
  certificateFile?: string;
  document?: string;
  category?: string;
  skills?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  organization?: string;
  category: string;
  date: string;
  description: string;
  certificateFile?: string;
  evidenceUrl?: string;
}

export interface AcademicDocument {
  id: string;
  title: string;
  description: string;
  file: string;
  buttonLabel: string;
  presentation: "certificate" | "degree-document";
}

export interface AcademicRecord {
  id: string;
  semester: string;
  subjectCode: string;
  subject: string;
  credits: string;
  ects: string;
  grade: string;
}

export interface Language {
  name: string;
  qualification: string;
  level: string;
  date?: string;
  note: string;
  scores: Array<{
    label: string;
    value: string;
  }>;
  certificateFiles?: Array<{
    label: string;
    href: string;
  }>;
  certificationIds?: string[];
}

export interface JourneyMilestone {
  title: string;
  detail: string;
  date: string;
  status: string;
}

export interface PortfolioData {
  site: {
    url: string;
    title: string;
    description: string;
    locale: string;
  };
  profile: Profile;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  socialLinks: SocialLink[];
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  academicDocuments: AcademicDocument[];
  academicRecords: AcademicRecord[];
  academicInterests: string[];
  researchDirection: {
    title: string;
    introduction: string;
    focusAreas: Array<{
      title: string;
      description: string;
    }>;
  };
  languages: Language[];
  whyGermany: {
    introduction: string;
    reasons: Array<{
      title: string;
      description: string;
    }>;
  };
  profileStrengths: Array<{
    title: string;
    description: string;
  }>;
  germanyJourney: JourneyMilestone[];
  currentlyLearning: Array<{
    area: string;
    description: string;
  }>;
  careerDirection: string;
  futureGoals: string[];
}
