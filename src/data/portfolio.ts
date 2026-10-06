import type { PortfolioData } from "@/types/portfolio";
/**
 * EDIT THIS FILE TO UPDATE PORTFOLIO CONTENT.
 *
 * Personal details, links, projects, experience, and academic records live here
 * so UI components never need to be edited when the content changes.
 */
const profile: PortfolioData["profile"] = {
  name: "JOILIN S M",
  shortName: "JSM",
  eyebrow: "COMPUTER SCIENCE × BUSINESS SYSTEMS",
  headline:
    "Computer Science and Business Systems graduate building a career at the intersection of data, technology, and business.",
  introduction:
    "Preparing for Master's study in Germany and developing practical expertise in Data Analytics, Business Analysis, Business Intelligence, and Digital Transformation.",
  location:
    "Azhaigiamandapam -629167, Kanyakumari District, Tamil Nadu, India",
  availability: "Preparing for Master's study in Germany",
  about: [
    "I’m a Computer Science and Business Systems graduate focused on turning data and technology into practical business solutions.",
    "My interests span Data Analytics, Business Analysis, Business Intelligence, and Digital Transformation, combining technical understanding with business thinking to analyse problems, improve processes, and generate actionable insights.",
    "I am preparing to pursue a Master's degree in Germany, where I aim to deepen my academic knowledge, gain practical industry exposure, and build a long-term career at the intersection of technology, data, and business.",
  ],
  documents: {
    cvPath: "/documents/joilin-cv.pdf",
    cvAvailable: true,
  },
};
const contact = {
  email: "joilinsm@gmail.com",
  phone: "+91 8110882543",
  location:
    "Azhaigiamandapam -629167, Kanyakumari District, Tamil Nadu, India",
};
const externalProfiles = {
  linkedin: "https://www.linkedin.com/in/joilinsm/",
  github: "https://github.com/joilinsm/",
};
export const portfolioData: PortfolioData = {
  site: {
    url: "[ADD CANONICAL URL]",
    title: `${profile.name} — Academic & Professional Portfolio`,
    description:
      "Academic and professional portfolio of Joilin S M, a Computer Science and Business Systems graduate preparing for Master's study in Germany.",
    locale: "en",
  },
  profile,
  contact,
  socialLinks: [
    {
      label: "LinkedIn",
      href: externalProfiles.linkedin,
    },
    {
      label: "GitHub",
      href: externalProfiles.github,
    },
    {
      label: "Email",
      href: `mailto:${contact.email}`,
    },
    {
      label: "Phone",
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
    },
  ],
  education: [
    {
      id: "btech-csbs",
      degree: "B.Tech — Computer Science and Business Systems",
      institution: "R.M.K. Engineering College",
      affiliation: "Affiliated to Anna University",
      location: "Chennai, India",
      graduationYear: "April 2026",
      period: "2022 — 2026",
      classification: "First Class",
      cgpa: "7.63",
      cgpaScale: "10",
      germanGradeEquivalent: "2.42",
      academicCredits: "159",
      ects: "240",
      description:
        "An interdisciplinary degree combining computer science foundations with business systems and organisational context.",
      coursework: [],
      highlights: [
        "First Class classification in B.Tech Computer Science and Business Systems.",
        "Undergraduate result of 7.63 CGPA on a 10-point scale.",
        "Completed 159 academic credits, corresponding to 240 ECTS.",
        "An interdisciplinary academic foundation connecting computer science with business systems.",
      ],
      gradeLegend: [
        { grade: "O", meaning: "Outstanding" },
        { grade: "A+", meaning: "Excellent" },
        { grade: "A", meaning: "Very Good" },
        { grade: "B+", meaning: "Good" },
        { grade: "B", meaning: "Average" },
        { grade: "C", meaning: "Satisfactory" },
        { grade: "RA", meaning: "Reappearance" },
        { grade: "SA", meaning: "Shortage of Attendance" },
        { grade: "W", meaning: "Withdrawal" },
      ],
      academicAlignment: [
        {
          title: "Information Systems",
          description:
            "The Computer Science and Business Systems degree provides a foundation for Master's study in information systems, connecting technical systems with organisational processes.",
        },
        {
          title: "Data Analytics and Business Intelligence",
          description:
            "The undergraduate combination of computing and business context supports further study in analytics, reporting, and data-informed decision making.",
        },
        {
          title: "Digital Transformation",
          description:
            "An interdisciplinary background in technology and business processes is relevant to Master's programmes focused on organisational change through digital systems.",
        },
        {
          title: "Technology and Business Management",
          description:
            "The degree structure supports progression toward Master's fields that sit between technology management, digital business, and applied information systems.",
        },
      ],
      achievements: [],
    },
  ],
  experience: [
    {
      id: "business-analyst-intern-2026",
      position: "Business Analyst Intern",
      company: "Exlife Solutions",
      location: "Trivandrum, Kerala, India",
      startDate: "02/02/2026",
      endDate: "27/05/2026",
      responsibilities: [
        "Participated in business analysis and project support activities",
        "Supported requirement gathering and workflow analysis",
        "Contributed to process documentation and data analysis",
        "Participated in client coordination activities",
        "Gained hands-on exposure to business operations, Agile methodologies, and project management practices",
      ],
      achievements: [
        "Demonstrated analytical thinking, professionalism, dedication, and teamwork throughout the internship",
        "Contributed effectively to business analysis and project support activities",
      ],
      tools: [
        "Microsoft Excel",
        "Jira",
        "Microsoft Power BI",
      ],
      skillsDeveloped: [
        "Business Analysis",
        "Requirement Gathering",
        "Workflow Analysis",
        "Process Documentation",
        "Data Analysis",
        "Client Coordination",
        "Agile Methodologies",
        "Project Management",
        "Teamwork",
      ],
      supportingDocuments: [
        {
          label: "Business Analyst Internship Completion Certificate",
          href:
            "/documents/certificates/business-analyst-internship-certificate.pdf",
        },
      ],
    },
    {
      id: "data-analytics-intern-2024",
      position: "Data Analytics Intern",
      company: "M Squared Software & Services Pvt Ltd",
      location: "Thiruvananthapuram, Kerala, India",
      startDate: "20/06/2024",
      endDate: "12/07/2024",
      responsibilities: [
        "Completed a 4-week internship in Data Analytics as part of the academic curriculum",
        "Participated in the Data Analytics internship program",
      ],
      achievements: [
        "Successfully completed the 4-week Data Analytics internship",
        "Received a certificate of participation from M Squared Software & Services Pvt Ltd",
      ],
      tools: [],
      skillsDeveloped: [
        "Data Analytics",
      ],
      supportingDocuments: [
        {
          label: "Data Analytics Internship Certificate",
          href:
            "/documents/certificates/m-squared-internship-certificate.pdf",
        },
      ],
    },
  ],
  skills: [
    {
      name: "Data Analytics",
      description:
        "Analytical methods for preparing, interpreting, and communicating data.",
      skills: [
        { name: "Data Analysis" },
        { name: "Data Interpretation" },
        { name: "Data Cleaning" },
        { name: "Data Visualisation" },
        { name: "Statistical Analysis" },
        { name: "SQL" },
      ],
    },
    {
      name: "Business Analysis",
      description:
        "Structured analysis of requirements, processes, and stakeholder needs.",
      skills: [
        { name: "Requirements Analysis" },
        { name: "Business Process Analysis" },
        { name: "Stakeholder Analysis" },
        { name: "Process Improvement" },
        { name: "Business Requirements" },
        { name: "Problem Solving" },
        { name: "Documentation" },
      ],
    },
    {
      name: "Business Intelligence",
      description:
        "Turning operational data into reporting and decision-oriented insight.",
      skills: [
        { name: "Dashboard Development" },
        { name: "KPI Analysis" },
        { name: "Reporting" },
        { name: "Data Visualisation" },
        { name: "Business Insights" },
      ],
    },
    {
      name: "Project Management",
      description:
        "Organising work, communication, and delivery in structured projects.",
      skills: [
        { name: "Project Planning" },
        { name: "Task Management" },
        { name: "Documentation" },
        { name: "Agile Concepts" },
        { name: "Stakeholder Coordination" },
        { name: "Project Tracking" },
      ],
    },
  ],
  projects: [
    {
      slug: "line-follower-robot",
      title: "Line Follower Robot",
      summary:
        "An academic robotics project focused on developing a robot capable of following a predefined path using sensor-based navigation.",
      status: "Completed academic project",
      date: "7 November 2023",
      categories: ["Academic", "Technology"],
      featured: false,
      image: "",
      problem: "",
      approach: "",
      solution: "",
      role: "",
      technologies: [],
      skills: [],
      results: [],
      learning: "",
      links: {
        github: "",
        demo: "",
        documentation: "",
      },
      caseStudyFile: "/documents/certificates/line-follower-robot.pdf",
    },
    {
      slug: "ransomware-protection-using-fpolicy",
      title: "Ransomware Protection Using FPolicy",
      summary:
        "An academic cybersecurity project exploring ransomware protection through real-time file monitoring and FPolicy-based file-access policy enforcement.",
      status: "Completed academic project",
      date: "18 April 2024",
      categories: ["Academic", "Technology"],
      featured: true,
      image: "",
      problem:
        "Ransomware attacks can compromise organizational data through unauthorized or malicious file activity. The project explored proactive monitoring and policy enforcement to help detect and mitigate ransomware-related activity.",
      approach:
        "The project used NetApp FPolicy together with VMware Workstation, PuTTY, and PowerShell to configure, monitor, and manage file-access policies and security-related activities.",
      solution:
        "A ransomware-protection approach based on real-time file monitoring, FPolicy policy management, notification and quarantine, and logging and reporting.",
      role:
        "Project contributor involved in the development, testing, and documentation of the solution.",
      technologies: [
        "NetApp FPolicy",
        "VMware Workstation",
        "PuTTY",
        "PowerShell",
      ],
      skills: [
        "Cybersecurity",
        "File Monitoring",
        "Security Policy Management",
        "PowerShell",
        "System Testing",
        "Technical Documentation",
      ],
      results: [
        "FPolicy configuration and policy-enforcement scenarios were tested.",
        "Real-time file-access monitoring was evaluated.",
        "PowerShell-based administrative tasks were tested.",
        "Integration and system reliability were evaluated through defined test cases.",
      ],
      learning:
        "Gained practical exposure to cybersecurity, file-access monitoring, security policy enforcement, system administration, testing, and technical documentation.",
      links: {
        github: "",
        demo: "",
        documentation: "",
      },
      caseStudyFile:
        "/documents/certificates/ransomware-protection-using-fpolicy.pdf",
    },
    {
      slug:
        "implementation-of-ransomware-protection-using-snapshots-worm-files-and-fpolicy",
      title:
        "Implementation of Ransomware Protection Using Snapshots, WORM Files and FPolicy",
      summary:
        "An academic cybersecurity project focused on implementing ransomware protection using snapshots, WORM files, and FPolicy.",
      status: "Completed academic project",
      date: "25 March 2026",
      categories: ["Academic", "Technology"],
      featured: true,
      image: "",
      problem: "",
      approach: "",
      solution: "",
      role: "",
      technologies: [
        "Snapshots",
        "WORM Files",
        "FPolicy",
      ],
      skills: [
        "Cybersecurity",
        "Ransomware Protection",
        "Data Protection",
        "Security Policy Management",
      ],
      results: [],
      learning: "",
      links: {
        github: "",
        demo: "",
        documentation: "",
      },
      caseStudyFile:
        "/documents/certificates/implementation-of-ransomware-protection-using-snapshots-worm-files-and-fpolicy.pdf",
    },
    {
      slug: "smart-task-expense-system",
      title: "Smart Task Expense System",
      summary:
        "A productivity and financial management system currently in development, combining task management, expense tracking, budgeting, savings goals, and data-driven insights.",
      status: "Project in development",
      date: "[ADD PROJECT DATE]",
      categories: ["Technology", "Business"],
      featured: true,
      image: "",
      problem: "",
      approach: "",
      solution: "",
      role: "",
      technologies: [],
      skills: [],
      results: [],
      learning: "",
      links: {
        github: "https://github.com/joilinsm/smart-task-expense-system",
        demo: "",
        documentation: "",
      },
    },
  ],
  certifications: [
    {
      id: "goethe-zertifikat-b1-hoeren",
      name: "Goethe-Zertifikat B1 — Hören",
      issuer: "Goethe-Institut",
      institution: "Goethe-Institut",
      date: "24 August 2026",
      type: "German Language Certification — B1 Module",
      result: "Passed",
      score: "67/100",
      details: "CEFR Level B1 — Listening module",
      credentialId: "1160-AB1A-0002944471",
      credentialUrl: "https://www.goethe.de/verify",
      certificateFile:
        "/documents/certificates/goethe-zertifikat-b1-hoeren.pdf",
      skills: [
        "German Language",
        "Listening",
      ],
    },
    {
      id: "goethe-zertifikat-b1-lesen",
      name: "Goethe-Zertifikat B1 — Lesen",
      issuer: "Goethe-Institut",
      institution: "Goethe-Institut",
      date: "24 August 2026",
      type: "German Language Certification — B1 Module",
      result: "Passed",
      score: "70/100",
      details: "CEFR Level B1 — Reading module",
      credentialId: "1160-AB1A-0002944472",
      credentialUrl: "https://www.goethe.de/verify",
      certificateFile:
        "/documents/certificates/goethe-zertifikat-b1-lesen.pdf",
      skills: [
        "German Language",
        "Reading",
      ],
    },
    {
      id: "goethe-zertifikat-b1-schreiben",
      name: "Goethe-Zertifikat B1 — Schreiben",
      issuer: "Goethe-Institut",
      institution: "Goethe-Institut",
      date: "29 June 2026",
      type: "German Language Certification — B1 Module",
      result: "Passed",
      score: "75/100",
      details: "CEFR Level B1 — Writing module",
      credentialId: "1160-AB1A-0002866274",
      credentialUrl: "https://www.goethe.de/verify",
      certificateFile:
        "/documents/certificates/goethe-zertifikat-b1-schreiben.pdf",
      skills: [
        "German Language",
        "Writing",
      ],
    },
    {
      id: "nptel-human-computer-interaction",
      name: "Human Computer Interaction (In English)",
      issuer: "NPTEL",
      institution:
        "Indraprastha Institute of Information Technology Delhi",
      date: "Jan–Apr 2025",
      type: "NPTEL Online Certification",
      result: "Elite",
      score: "85%",
      details: "12-week course",
      credentialId: "NPTEL25CS38S643209974",
      credentialUrl: "",
      certificateFile:
        "/documents/certificates/human-computer-interaction-2025.pdf",
      skills: [
        "Human-Computer Interaction",
        "User-Centered Design",
        "Interface Design",
      ],
    },
    {
      id: "data-analytics-course-2025",
      name: "Data Analytics",
      issuer: "Sharon Softwares",
      institution:
        "Sharon Softwares – Professional Software Training & Development",
      date: "June–July 2025",
      type: "Course Certificate",
      duration: "5 June 2025 – 4 July 2025",
      result: "Successfully completed",
      credentialId: "SS1406",
      credentialUrl: "",
      certificateFile:
        "/documents/certificates/data-analytics-course.pdf",
      skills: [
        "Data Analytics",
      ],
    },
    {
      id: "excel-basic-intermediate-mastery",
      name: "Excel Basic to Intermediate Mastery",
      issuer: "Not specified on certificate",
      institution: "",
      date: "18 February 2026",
      type: "Course Completion Certificate",
      result: "Successfully completed",
      credentialId: "",
      credentialUrl: "",
      certificateFile:
        "/documents/certificates/excel-basic-to-intermediate-mastery-certificate.pdf",
      skills: [
        "Microsoft Excel",
        "Data Analysis",
        "Spreadsheet Analysis",
      ],
    },
    {
      id: "goethe-zertifikat-a1-start-deutsch-1",
      name: "Goethe-Zertifikat A1: Start Deutsch 1",
      issuer: "Goethe-Institut",
      institution: "Goethe-Institut",
      date: "26 February 2026",
      type: "German Language Certification",
      result: "Satisfactory",
      score: "75/100",
      details: "CEFR Level A1",
      credentialId: "1160-ASA1-0002664594",
      credentialUrl: "https://www.goethe.de/verify",
      certificateFile:
        "/documents/certificates/goethe-zertifikat-a1-start-deutsch-1.pdf",
      skills: [
        "German Language",
        "Listening",
        "Reading",
        "Writing",
        "Speaking",
      ],
    },
    {
      id: "goethe-zertifikat-a2",
      name: "Goethe-Zertifikat A2",
      issuer: "Goethe-Institut",
      institution: "Goethe-Institut",
      date: "28 April 2026",
      type: "German Language Certification",
      result: "Satisfactory",
      score: "74/100",
      details: "CEFR Level A2",
      credentialId: "1160-AA2A-0002751441",
      credentialUrl: "https://www.goethe.de/verify",
      certificateFile:
        "/documents/certificates/goethe-zertifikat-a2.pdf",
      skills: [
        "German Language",
        "Listening",
        "Reading",
        "Writing",
        "Speaking",
      ],
    },
  ],
  achievements: [
    {
      id: "invente-24-paper-presentation",
      title: "Paper Presentation Participant",
      organization:
        "Invente '24 — SSN College of Engineering & Shiv Nadar University Chennai",
      date: "September 2024",
      category: "Academic",
      description:
        "Participated in a paper presentation conducted as part of Invente '24, a national-level tech-fest.",
      certificateFile:
        "/documents/certificates/ssn-certificate.pdf",
    },
    {
      id: "techclub-project-presentation-2025",
      title: "Project Presentation Competition Participant",
      organization:
        "Computer Science and Business Systems Tech Club, R.M.K. Engineering College",
      date: "1 March 2025",
      category: "Academic",
      description:
        "Participated in a Project Presentation Competition conducted during the Academic Year 2024–2025.",
      certificateFile:
        "/documents/certificates/techclub-certificate-of-participation-2024.pdf",
    },
    {
      id: "technex-19-arduino-merit",
      title: "Certificate of Merit — Arduino Robotics",
      organization:
        "Innovians Technologies — Technex '19",
      date: "10–11 August 2018",
      category: "Recognition",
      description:
        "Received a Certificate of Merit for active participation in a national-level workshop on Arduino-based Robotics & Electronics Circuit.",
      certificateFile:
        "/documents/certificates/certificate-of-merit-arduino-robotics.pdf",
    },
    {
      id: "junior-red-cross-secondary",
      title: "Junior Red Cross — Secondary Level",
      organization:
        "Indian Red Cross Society, Tamil Nadu State Branch",
      date: "2017–2018",
      category: "Leadership & Service",
      description:
        "Successfully completed the secondary level as a member of the Junior Red Cross Group of Kuzhithurai Educational District.",
      certificateFile:
        "/documents/certificates/junior-red-cross-secondary-level-certificate-2017.pdf",
    },
    {
      id: "junior-red-cross-orientation-camp",
      title: "Junior Red Cross Orientation Camp",
      organization: "Indian Red Cross Society",
      date: "9–11 November 2017",
      category: "Leadership & Service",
      description:
        "Attended the Junior Red Cross Orientation Camp held at Vivekananda Kendra, Kanyakumari.",
      certificateFile:
        "/documents/certificates/juniors-orientation-camp-certificate-2017.pdf",
    },
    {
      id: "geneva-convention-day",
      title: "Geneva Convention Day",
      organization: "Indian Red Cross Society",
      date: "23 October 2018",
      category: "Leadership & Service",
      description:
        "Participated in the Geneva Convention Day celebration held at Bethlahem Matriculation Higher Secondary School, Kanyakumari.",
      certificateFile:
        "/documents/certificates/geneva-convention-day-certificate-2018.pdf",
    },
    {
      id: "junior-red-cross-primary",
      title: "Junior Red Cross — Primary Level",
      organization:
        "Indian Red Cross Society, Tamil Nadu State Branch",
      date: "2016–2017",
      category: "Leadership & Service",
      description:
        "Successfully completed the primary level as a member of the Junior Red Cross Group.",
      certificateFile:
        "/documents/certificates/junior-red-cross-primary-level-certificate-2016.pdf",
    },
  ],
  academicDocuments: [
    {
      id: "class-10-certificate",
      title: "10th Certificate",
      description: "Class X academic certificate",
      file: "/documents/certificates/10th-pass-certificate.pdf",
      buttonLabel: "View Certificate",
      presentation: "certificate",
    },
    {
      id: "class-12-certificate",
      title: "12th Certificate",
      description: "Class XII academic certificate",
      file: "/documents/certificates/12th-certificate.pdf",
      buttonLabel: "View Certificate",
      presentation: "certificate",
    },
    {
      id: "btech-transcript",
      title: "B.Tech Transcript",
      description:
        "Official undergraduate academic transcript verifying B.Tech subjects, credits, and grades.",
      file: "/documents/certificates/btech-transcript.pdf",
      buttonLabel: "View Transcript",
      presentation: "degree-document",
    },
    {
      id: "btech-provisional-certificate",
      title: "B.Tech Provisional Certificate",
      description:
        "Provisional degree certificate confirming completion of B.Tech in Computer Science and Business Systems.",
      file: "/documents/certificates/btech-provisional-certificate.pdf",
      buttonLabel: "View Certificate",
      presentation: "degree-document",
    },
  ],
  academicRecords: [],
  academicInterests: [
    "Business Information Systems",
    "Information Systems",
    "Business Analytics",
    "Data Analytics",
    "Business Intelligence",
    "Digital Transformation",
    "Digital Business Management",
    "Technology Management",
    "Supply Chain & Business Analytics",
    "FinTech / Financial Technology",
    "Human-Computer Interaction / UX Management",
    "AI + Business Applications",
  ],
  researchDirection: {
    title: "Academic Interests & Future Direction",
    introduction:
      "My academic interests are centred on how information, data, and technology can improve organisational decisions and business processes. During Master's study, I want to explore these areas with academic depth and practical relevance.",
    focusAreas: [
      {
        title: "Information Systems",
        description:
          "The design and use of systems that connect people, processes, data, and organisational goals.",
      },
      {
        title: "Data-driven Decision Making",
        description:
          "Analytical approaches that transform reliable data into understandable and actionable business insight.",
      },
      {
        title: "AI for Business",
        description:
          "Responsible applications of artificial intelligence within practical business and operational contexts.",
      },
      {
        title: "Digital Transformation",
        description:
          "How organisations adapt processes, capabilities, and strategy through appropriate digital technologies.",
      },
    ],
  },
  languages: [
    {
      name: "English",
      qualification: "IELTS",
      level: "7.5 overall",
      date: "23 May 2026",
      note: "International English Language Testing System",
      scores: [
        {
          label: "Listening",
          value: "8.0",
        },
        {
          label: "Reading",
          value: "8.0",
        },
        {
          label: "Speaking",
          value: "6.5",
        },
        {
          label: "Writing",
          value: "6.5",
        },
      ],
      certificateFiles: [
        {
          label: "View IELTS certificate",
          href: "/documents/certificates/ielts.pdf",
        },
      ],
    },
    {
      name: "German",
      qualification: "Goethe-Zertifikat B1",
      level: "B1",
      date: "June–August 2026",
      note: "B1 modules completed",
      scores: [
        {
          label: "Reading",
          value: "70/100",
        },
        {
          label: "Listening",
          value: "67/100",
        },
        {
          label: "Writing",
          value: "75/100",
        },
        {
          label: "Speaking",
          value: "To be added",
        },
      ],
      certificationIds: [
        "goethe-zertifikat-b1-hoeren",
        "goethe-zertifikat-b1-lesen",
        "goethe-zertifikat-b1-schreiben",
      ],
    },
  ],
  whyGermany: {
    introduction:
      "Germany is my intended destination for Master's education because its academic environment combines structured learning, applied research, and meaningful connections between universities and industry.",
    reasons: [
      {
        title: "Academic strength",
        description:
          "Germany's public universities and Universities of Applied Sciences offer rigorous pathways across technology, information systems, and business.",
      },
      {
        title: "Applied education",
        description:
          "Practice-oriented programmes create opportunities to connect academic frameworks with real organisational challenges.",
      },
      {
        title: "Academia–industry connection",
        description:
          "The close relationship between education, research, and industry supports professionally relevant learning.",
      },
      {
        title: "European perspective",
        description:
          "Studying in Germany would provide an international environment for developing academic, professional, and intercultural capability.",
      },
    ],
  },
  profileStrengths: [
    {
      title: "Technology understanding",
      description:
        "A Computer Science and Business Systems foundation for evaluating technical possibilities in context.",
    },
    {
      title: "Business perspective",
      description:
        "An interdisciplinary view of processes, requirements, stakeholders, and organisational needs.",
    },
    {
      title: "Analytical thinking",
      description:
        "A developing focus on data analytics, business intelligence, and evidence-informed problem solving.",
    },
    {
      title: "Practical exposure",
      description:
        "Internship experience in data analytics and business analysis environments.",
    },
    {
      title: "International ambition",
      description:
        "Focused preparation for Master's education and long-term professional development in Germany.",
    },
  ],
  germanyJourney: [
    {
      title: "Interdisciplinary Bachelor's foundation",
      detail:
        "B.Tech in Computer Science and Business Systems",
      date: "2026",
      status: "Academic foundation",
    },
    {
      title: "English language qualification",
      detail: "IELTS overall score: 7.5",
      date: "23 May 2026",
      status: "Completed",
    },
    {
      title: "German language qualification",
      detail:
        "Goethe-Zertifikat B1 — modules completed",
      date: "June–August 2026",
      status: "Completed",
    },
    {
      title: "Master's preparation",
      detail:
        "Exploring programmes aligned with information systems, analytics, business, and digital transformation.",
      date: "",
      status: "Current focus",
    },
  ],
  currentlyLearning: [
    {
      area: "German language",
      description:
        "Continued development beyond certified B1 level toward B2.",
    },
    {
      area: "Data & Business Intelligence",
      description:
        "Strengthening analytical thinking, reporting, and decision-oriented communication.",
    },
    {
      area: "AI applications in business",
      description:
        "Exploring responsible ways to apply AI to practical organisational problems.",
    },
    {
      area: "Digital transformation",
      description:
        "Developing a structured understanding of technology-enabled organisational change.",
    },
  ],
  careerDirection:
    "I aim to build a career in Germany at the intersection of technology, data, and business, with a focus on solving practical organisational problems through analytical thinking and effective digital solutions.",
  futureGoals: [
    "Pursue a Master's degree in Germany in an interdisciplinary technology and business field.",
    "Develop stronger analytical and data-informed decision-making capabilities.",
    "Build practical expertise in business technology and digital transformation.",
    "Gain meaningful industry exposure within Germany's international professional environment.",
  ],
};
export type Portfolio = typeof portfolioData;
