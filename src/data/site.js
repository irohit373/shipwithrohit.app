export const socialLinks = {
  email: { href: "mailto:irohit0100@gmail.com", label: "Email" },
  github: { href: "https://github.com/irohit0001", label: "GitHub" },
  linkedin: { href: "https://linkedin.com/in/irohit0001", label: "LinkedIn" },
  resume: {
    href: "https://drive.google.com/file/d/1SnEyEbG92RMJ5yuqfUs4szXv6td57R1G/view",
    label: "Resume",
    external: true,
  },
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: socialLinks.resume.href, external: true },
];

export const quickStats = [
  { label: "Products Built", value: "12+" },
  { label: "AI/ML Projects", value: "6" },
  { label: "Internships", value: "3" },
  { label: "Shipping Focus", value: "Fast + Stable" },
];

export const heroContent = {
  eyebrow: "shipwithrohit.app",
  name: "Rohit Deshmukh",
  role: "Full Stack Developer / AI Product Builder",
  intro:
    "I design and ship clean digital products where engineering meets business impact. I focus on systems that scale, move fast, and create measurable outcomes. shipping AI-first products on the side.",
};

export const skills = [
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "PHP", "C++"],
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React", "Node.js", "Express.js", "Flask", "CodeIgniter"],
  },
  {
    category: "Backend/APIs",
    items: ["REST APIs", "WebSocket", "JWT", "OAuth", "LLM Integration", "AI Orchestration"],
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "Docker", "AWS", "GCP", "Linux/VPS", "CI/CD", "MongoDB", "MySQL", "PostgresSQL", "Vercel"],
  },
];

export const journey = [
  {
    period: "April 2026 - Jun 2026",
    role: "Software Development Engineer - Intern",
    org: "Aligntogether Solutions, Bhopal",
    detail:
      "Optimized code, supported migrations, and helped with server/devops work while keeping systems stable.",
  },
  {
    period: "July 2025 - Oct 2025",
    role: "PHP Web Developer & Networking - Intern",
    org: "MAIG Innovation, Indore",
    detail:
      "Handled a CodeIgniter migration, shipped improvements, and supported Networking, Linux, Git, and CI/CD work.",
  },
  {
    period: "Sept 2023 - June 2026",
    role: "B.Tech in Computer Science & Business Systems",
    org: "School of Information Technology, RGPV, Bhopal",
    detail: "CGPA 7.43/10. Coursework covered DSA, OOPS, DBMS, OS, networking, system design, and product thinking.",
  },
  {
    period: "Jan 2022 - Mar 2022",
    role: "Backend Developer - Intern",
    org: "Holy Faith Welfare Foundation, Bhopal",
    detail: "Built PHP and MySQL backend modules, added session auth and RBAC, and worked in Agile sprints.",
  },
  {
    period: "Sept 2020 - June 2023",
    role: "Diploma in Computer Science & Engineering",
    org: "Govt. Polytechnic College, Khirsadoh",
    detail: "CGPA 8.42/10 with a strong foundation in programming, data structures, and core CS.",
  },
];

export const projects = [
  {
    title: "Velocity-HR - AI Recruitment Platform",
    description:
      "AI recruitment SaaS with resume screening, candidate matching, and fast interview scheduling — cut hiring cycle time by around 60% for early adopters.",
    tags: ["Next.js", "Python", "FastAPI", "PostgreSQL", "OpenAI API"],
    live: "https://velocity-h.vercel.app",
    github: "https://github.com/irohit0001/Velocity-HR",
  },
  {
    title: "JetLens - ML Flight Search Platform",
    description:
      "Flight discovery platform integrating multiple airline sources, with smart caching for lower latency and ML price prediction near 85% accuracy.",
    tags: ["Next.js", "Python", "Flask", "MongoDB", "Scikit-learn", "PyTorch"],
    github: "https://github.com/irohit0001/jetlens",
  },
  {
    title: "Learnify - Educational CMS Platform",
    description:
      "Scalable MERN-based educational CMS with real-time content workflows, JWT auth, and optimized MongoDB queries for faster page loads.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    github: "https://github.com/irohit0001/Learnify-EdTech-Platform-MERN",
  },
];

export const certifications = [
  {
    title: "Docker Foundations Professional Certificate",
    issuer: "Docker, Inc",
    date: "Issued Jul 2026",
    description: "Skills: Containerization.",
  },
  {
    title: "Career Essentials in GitHub Professional Certificate",
    issuer: "GitHub",
    date: "Issued Jul 2026",
    description: "Skills: GitHub.",
  },
  {
    title: "Certificate of Completion: AI Fluency Framework & Foundations",
    issuer: "Anthropic",
    date: "Issued Jul 2026",
    description: "Credential ID whr88u9qsk59.",
  },
  {
    title: "Microsoft Azure Essentials Professional Certificate by Microsoft and LinkedIn",
    issuer: "Microsoft",
    date: "Issued Jul 2026",
    description: "Skills: Cloud Computing, Microsoft Azure.",
  },
  {
    title: "Advanced SQL for Query Tuning and Performance Optimization",
    issuer: "LinkedIn",
    date: "Issued Jul 2026",
    description: "Skills: SQL.",
  },
  {
    title: "Python Programming Certification",
    issuer: "Cisco Networking Academy",
    date: "2024",
    description: "Strong grounding in programming logic and data structures.",
  },
  {
    title: "Industrial Python Certification",
    issuer: "Infosys ICT Academy",
    date: "2024",
    description: "Applied Python in practical and industry-oriented scenarios.",
  },
  {
    title: "Scrimba AI Certification",
    issuer: "Scrimba",
    date: "2026",
    description: "Scrimba AI certification on AI orchestration, AI integration and other.",
  },
];

export const highlights = [
  "Built AI-first products that reduced time-to-hire by nearly 60%.",
  "Shipped ML integrations with price prediction accuracy around 85%.",
  "Improved platform response speed with intelligent caching patterns.",
];

export const aboutContent = {
  subtitle: "A full-stack builder focused on maintainable systems, useful AI features, and product outcomes.",
  paragraphs: [
    // "I enjoy solving real-world problems through scalable engineering and AI-backed features.",
    "My core stack is MERN and Next.js, with strong backend work in Python and PHP ecosystems. I have built recruitment SaaS, ML-based prediction workflows, and education-focused platforms.",
    "I care about maintainable code, measurable performance, and team-friendly delivery. Open to full-stack and AI product roles where I can ship meaningful work.",
  ],
};

export const contactContent = {
  subtitle:
    "Available for full-stack engineering, AI product builds, and product-minded development work.",
};

export const skillTape = skills.flatMap((group) => group.items.map((item) => `${group.category} - ${item}`));
