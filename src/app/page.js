"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useTheme } from "next-themes";

const skills = [
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
    items: ["REST APIs", "WebSocket", "JWT", "OAuth", "LLM Integration"],
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "Docker", "AWS", "Linux/VPS", "CI/CD", "MongoDB", "MySQL"],
  },
];

const journey = [
  {
    period: "July 2025 - Oct 2025",
    role: "PHP Web Developer & Networking Intern",
    org: "MAIG Innovation, Indore",
    detail:
      "Handled a major CodeIgniter migration, shipped user-facing improvements, configured Linux cloud setups, and supported CI/CD workflows with Git and Bitbucket.",
  },
  {
    period: "Sept 2023 - June 2026",
    role: "B.Tech in Computer Science & Business Systems",
    org: "School of Information Technology, RGPV, Bhopal",
    detail:
      "CGPA 7.43/10. Key coursework included DSA, OOPS, DBMS, OS, Networking, System Design, and product thinking.",
  },
  {
    period: "Jan 2022 - Mar 2022",
    role: "Web Backend Developer Intern",
    org: "Holy Faith Welfare Foundation, Bhopal",
    detail:
      "Built backend modules with PHP and MySQL, implemented session authentication and RBAC, and collaborated in Agile sprints.",
  },
  {
    period: "Sept 2020 - June 2023",
    role: "Diploma in Computer Science & Engineering",
    org: "Govt. Polytechnic College, Khirsadoh",
    detail: "CGPA 8.42/10 with foundations in programming, data structures, and core computer science.",
  },
];

const projects = [
  {
    title: "Velocity-HR - AI Recruitment Platform",
    date: "December 2025",
    description:
      "AI recruitment SaaS with resume screening, candidate matching, and fast interview scheduling, designed to cut hiring cycle time by around 60%.",
    tags: ["Next.js", "Python", "FastAPI", "PostgreSQL", "OpenAI API"],
    live: "https://velocity-h.vercel.app",
    github: "https://github.com/irohit373/Velocity-HR",
  },
  {
    title: "JetLens - ML Flight Search Platform",
    date: "June 2025",
    description:
      "Flight discovery platform integrating multiple airline sources, with smart caching for lower latency and ML price prediction near 85% accuracy.",
    tags: ["Next.js", "Python", "Flask", "MongoDB", "Scikit-learn", "PyTorch"],
    live: "#",
    github: "https://github.com/irohit373/jetlens",
  },
  {
    title: "Learnify - Educational CMS Platform",
    date: "November 2024",
    description:
      "Scalable MERN-based educational CMS with real-time content workflows, JWT auth, and optimized MongoDB query performance.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    live: "https://learnify-ed-tech-platform-mern.vercel.app/",
    github: "https://github.com/irohit373/Learnify-EdTech-Platform-MERN",
  },
];

const certifications = [
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
    title: "SCA Foundation Certification",
    issuer: "SCA (Digital Content & Agile)",
    date: "2023",
    description: "Digital content operations and Agile fundamentals.",
  },
];

const highlights = [
  "Built AI-first products that reduced time-to-hire by nearly 60%.",
  "Shipped ML integrations with price prediction accuracy around 85%.",
  "Improved platform response speed with intelligent caching patterns.",
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const quickStats = [
  { label: "Products Built", value: "12+" },
  { label: "AI/ML Projects", value: "6" },
  { label: "Internships", value: "2" },
  { label: "Shipping Focus", value: "Fast + Stable" },
];

const skillTape = skills.flatMap((group) => group.items.map((item) => `${group.category} - ${item}`));

function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="section-heading">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  );
}

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const isThemeReady = typeof resolvedTheme === "string";
  const [activeSection, setActiveSection] = useState("#about");
  const [isScrolled, setIsScrolled] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (!visibleEntries.length) return;

        const topMost = visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (topMost?.target?.id) {
          setActiveSection(`#${topMost.target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.18, 0.32, 0.5],
      }
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.78,
      wheelMultiplier: 1.08,
      touchMultiplier: 1.1,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const toggleTheme = () => {
    if (!isThemeReady) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleSmoothNav = (event, href) => {
    if (!href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    setActiveSection(href);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 0.62, offset: -88 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.history.replaceState(null, "", href);
  };

  return (
    <main className="site-shell">
      <header className={`site-nav ${isScrolled ? "site-nav--scrolled" : ""}`}>
        <a href="#" className="site-mark" aria-label="Rohit Deshmukh home">
          shipwithrohit
        </a>

        <nav className="site-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleSmoothNav(event, item.href)}
              aria-current={activeSection === item.href ? "page" : undefined}
              className={activeSection === item.href ? "is-active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button type="button" className="theme-toggle" onClick={toggleTheme} disabled={!isThemeReady}>
          {isThemeReady && resolvedTheme === "dark" ? "Light" : "Dark"}
        </button>
      </header>

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy fade-up">
          <p className="eyebrow">shipwithrohit.app</p>
          <h1 id="hero-title">Rohit Deshmukh</h1>
          <p className="hero-role">Full Stack Developer / AI Product Builder</p>
          <p className="hero-intro">
            I design and ship clean digital products where engineering meets business impact. From recruitment intelligence to
            ML-enabled search, I focus on systems that scale, move fast, and create measurable outcomes.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="button button-primary" onClick={(event) => handleSmoothNav(event, "#projects")}>
              Explore projects
            </a>
            <a href="#contact" className="button button-ghost" onClick={(event) => handleSmoothNav(event, "#contact")}>
              Contact
            </a>
          </div>
        </div>

        <div className="stats-grid fade-up" aria-label="Quick stats">
          {quickStats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="page-section">
        <SectionHeader
          label="About"
          title="Practical software, shipped with intent."
          subtitle="A full-stack builder focused on maintainable systems, useful AI features, and product outcomes."
        />

        <div className="about-grid">
          <div className="about-copy">
            <p>
              I am currently pursuing B.Tech in Computer Science and Business Systems at RGPV, Bhopal. I enjoy solving
              real-world problems through scalable web engineering and AI-backed features.
            </p>
            <p>
              My core stack is MERN and Next.js, with strong backend work in Python and PHP ecosystems. I have built
              recruitment SaaS, ML-based prediction workflows, and education-focused platforms.
            </p>
            <p>
              I care about maintainable code, measurable performance, and team-friendly delivery. I am open to exciting
              engineering opportunities.
            </p>
          </div>

          <div className="highlight-panel">
            {highlights.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="page-section">
        <SectionHeader
          label="Skills"
          title="Engineering stack"
          subtitle="A focused toolkit for product-grade web apps, APIs, deployment, and applied AI workflows."
        />

        <div className="card-grid skills-grid">
          {skills.map((group) => (
            <article key={group.category} className="zed-card skill-card">
              <h3>{group.category}</h3>
              <div className="pill-wrap">
                {group.items.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="skill-tape" aria-label="Skills tape">
          {[...skillTape, ...skillTape].map((skill, index) => (
            <span key={`${skill}-${index}`}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="experience" className="page-section">
        <SectionHeader
          label="Experience"
          title="Experience & education"
          subtitle="A timeline of internships, engineering education, and production-focused learning."
        />

        <div className="timeline">
          {journey.map((item) => (
            <article key={`${item.period}-${item.role}`} className="timeline-item">
              <p className="timeline-period">{item.period}</p>
              <h3>{item.role}</h3>
              <p className="timeline-org">{item.org}</p>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="page-section">
        <SectionHeader
          label="Projects"
          title="Selected work"
          subtitle="Product builds across AI recruiting, ML search, and education platforms."
        />

        <div className="card-grid project-grid">
          {projects.map((project) => (
            <article key={project.title} className="zed-card project-card">
              <p className="card-date">{project.date}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="pill-wrap">
                {project.tags.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="card-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  Live
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionHeader
          label="Credentials"
          title="Certifications"
          subtitle="Focused learning across Python, industry application, and agile digital content operations."
        />

        <div className="card-grid certification-grid">
          {certifications.map((cert) => (
            <article key={cert.title} className="zed-card certification-card">
              <p className="card-date">{cert.date}</p>
              <h3>{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p>{cert.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <SectionHeader
          label="Contact"
          title="Let us build something useful."
          subtitle="Available for full-stack engineering, AI product builds, and product-minded development work."
        />

        <div className="contact-links">
          <a href="mailto:deshmukhrohit373@gmail.com">deshmukhrohit373@gmail.com</a>
          <a href="https://github.com/irohit373" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/irohit373" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </section>

      <footer className="site-footer">© 2026 Rohit Deshmukh</footer>
    </main>
  );
}
