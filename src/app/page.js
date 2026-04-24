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

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const isThemeReady = typeof resolvedTheme === "string";
  const [activeSection, setActiveSection] = useState("#about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef(null);
  const skillTapeWrapperRef = useRef(null);
  const skillTapeContentRef = useRef(null);
  const skillTapeLenisRef = useRef(null);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href);
    const sectionElements = sectionIds
      .map((id) => document.querySelector(id))
      .filter(Boolean);

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (!visibleEntries.length) return;

        const topMost = visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!topMost?.target?.id) return;

        const nextSection = `#${topMost.target.id}`;
        setActiveSection((prev) => (prev === nextSection ? prev : nextSection));
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(Math.min(Math.max(nextProgress, 0), 1));
    };

    handleScrollProgress();
    window.addEventListener("scroll", handleScrollProgress, { passive: true });
    window.addEventListener("resize", handleScrollProgress);

    return () => {
      window.removeEventListener("scroll", handleScrollProgress);
      window.removeEventListener("resize", handleScrollProgress);
    };
  }, []);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll(".reveal"));
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.18,
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.72,
      wheelMultiplier: 1.25,
      touchMultiplier: 1.2,
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



  useEffect(() => {
    const wrapper = skillTapeWrapperRef.current;
    const content = skillTapeContentRef.current;

    if (!wrapper || !content) return;

    const lenisHorizontal = new Lenis({
      wrapper,
      content,
      orientation: "horizontal",
      gestureOrientation: "both",
      duration: 0.55,
      wheelMultiplier: 1.8,
      touchMultiplier: 1.2,
      smoothWheel: true,
      syncTouch: false,
    });

    skillTapeLenisRef.current = lenisHorizontal;
    let isInteracting = false;

    const pauseAutoSlide = () => {
      isInteracting = true;
    };

    const resumeAutoSlide = () => {
      isInteracting = false;
    };

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 0.5 && Math.abs(event.deltaX) < 0.5) return;

      event.preventDefault();
      const next = wrapper.scrollLeft + event.deltaY + event.deltaX;
      lenisHorizontal.scrollTo(next, { duration: 0.3 });
    };

    wrapper.addEventListener("wheel", onWheel, { passive: false });
    wrapper.addEventListener("mouseenter", pauseAutoSlide);
    wrapper.addEventListener("mouseleave", resumeAutoSlide);
    wrapper.addEventListener("focusin", pauseAutoSlide);
    wrapper.addEventListener("focusout", resumeAutoSlide);
    wrapper.addEventListener("pointerdown", pauseAutoSlide);
    wrapper.addEventListener("pointerup", resumeAutoSlide);
    wrapper.addEventListener("touchstart", pauseAutoSlide, { passive: true });
    wrapper.addEventListener("touchend", resumeAutoSlide, { passive: true });

    let rafId;
    const raf = (time) => {
      if (!isInteracting) {
        const singleTrackWidth = content.scrollWidth / 2;
        const autoNext = wrapper.scrollLeft + 1.2;

        lenisHorizontal.scrollTo(autoNext, { immediate: true });

        if (singleTrackWidth > 0 && wrapper.scrollLeft >= singleTrackWidth) {
          lenisHorizontal.scrollTo(wrapper.scrollLeft - singleTrackWidth, { immediate: true });
        }
      }

      lenisHorizontal.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      wrapper.removeEventListener("wheel", onWheel);
      wrapper.removeEventListener("mouseenter", pauseAutoSlide);
      wrapper.removeEventListener("mouseleave", resumeAutoSlide);
      wrapper.removeEventListener("focusin", pauseAutoSlide);
      wrapper.removeEventListener("focusout", resumeAutoSlide);
      wrapper.removeEventListener("pointerdown", pauseAutoSlide);
      wrapper.removeEventListener("pointerup", resumeAutoSlide);
      wrapper.removeEventListener("touchstart", pauseAutoSlide);
      wrapper.removeEventListener("touchend", resumeAutoSlide);
      lenisHorizontal.destroy();
      skillTapeLenisRef.current = null;
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
      lenisRef.current.scrollTo(target, { duration: 0.55 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.history.replaceState(null, "", href);
  };

  return (
    <main className="portfolio-shell mx-auto max-w-6xl px-4 py-6 text-black transition-colors dark:text-white md:px-6 md:py-10">
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />

      <div className="sticky top-3 z-40 mb-5 flex flex-col gap-3 border border-black/10 bg-white/65 px-3 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/45 sm:flex-row sm:items-center sm:justify-between md:mb-8">
        <p className="inline-flex w-fit border border-black/20 bg-white/70 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] backdrop-blur dark:border-white/30 dark:bg-black/40">
          shipwithrohit.app
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleSmoothNav(event, item.href)}
              aria-current={activeSection === item.href ? "page" : undefined}
              className={`border px-3 py-1 text-[11px] font-black uppercase tracking-widest transition-colors ${
                activeSection === item.href
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/40 bg-white/70 hover:bg-black hover:text-white dark:border-white/40 dark:bg-black/50 dark:hover:bg-white dark:hover:text-black"
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="border-2 border-black bg-white px-3 py-1 text-lg leading-none transition-transform hover:-translate-y-0.5 dark:border-white dark:bg-black"
            aria-label="Toggle dark mode"
            disabled={!isThemeReady}
          >
            {isThemeReady ? (resolvedTheme === "dark" ? "☀️" : "🌙") : "◐"}
          </button>
        </div>
      </div>

      <section
        id="home"
        className="section-card reveal relative overflow-hidden border-2 border-black px-6 py-10 transition-colors dark:border-white md:px-10 md:py-16 lg:min-h-[86vh] lg:py-20"
      >
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald-300/40 blur-3xl dark:bg-emerald-400/20" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl dark:bg-cyan-500/20" aria-hidden="true" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-10">
          <div>
            <h1 className="fade-up gradient-text text-5xl font-black uppercase leading-[0.86] tracking-tighter md:text-7xl lg:text-8xl">
              Rohit Deshmukh
            </h1>
            <p className="fade-up mt-3 text-xs font-black uppercase tracking-[0.3em] text-black/50 dark:text-white/40 md:text-sm">
              Full Stack Developer / AI Product Builder
            </p>
            <p className="fade-up mt-8 max-w-4xl text-lg font-bold leading-loose md:text-xl">
              I design and ship clean digital products where engineering meets business impact.
              From recruitment intelligence to ML-enabled search, I focus on systems that scale,
              move fast, and create measurable outcomes.
            </p>
            <p className="fade-up mt-6 border-l-2 border-black pl-4 font-mono text-xs uppercase leading-relaxed tracking-widest text-black/60 dark:border-white dark:text-white/60 md:text-sm">
              Building practical software. Shipping with intent. Optimizing for real users.
            </p>
            <div className="fade-up mt-8 flex flex-wrap gap-2">
              <a
                href="#projects"
                onClick={(event) => handleSmoothNav(event, "#projects")}
                className="border-2 border-black bg-black px-4 py-2 text-sm font-black uppercase tracking-tight text-white transition-colors hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
              >
                Explore Projects
              </a>
              <a
                href="#contact"
                onClick={(event) => handleSmoothNav(event, "#contact")}
                className="border-2 border-black px-4 py-2 text-sm font-black uppercase tracking-tight transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
              >
                Let us Collaborate
              </a>
            </div>
          </div>

          <aside className="fade-up grid w-full max-w-xs grid-cols-2 gap-2 self-end sm:max-w-sm lg:grid-cols-1 lg:gap-3">
            {quickStats.map((stat) => (
              <article key={stat.label} className="border-2 border-black bg-white/80 p-3 backdrop-blur dark:border-white dark:bg-black/45">
                <p className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50">{stat.label}</p>
                <p className="mt-1 text-base font-black uppercase tracking-tight">{stat.value}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section id="about" className="section-card reveal mt-6 border-2 border-black p-6 transition-colors dark:border-white md:p-8">
        <p className="mb-3 text-xs font-black uppercase tracking-widest text-black/50 dark:text-white/50">About</p>
        <h2 className="mb-5 text-3xl font-black uppercase tracking-tight">A bit about me</h2>
        <p className="font-bold leading-loose">
          I am currently pursuing B.Tech in Computer Science and Business Systems at RGPV, Bhopal. I enjoy solving real-world problems through scalable web engineering and AI-backed features.
        </p>
        <p className="mt-4 font-bold leading-loose">
          My core stack is MERN and Next.js, with strong backend work in Python and PHP ecosystems. I have built recruitment SaaS, ML-based prediction workflows, and education-focused platforms.
        </p>
        <p className="mt-4 font-bold leading-loose">
          I care about maintainable code, measurable performance, and team-friendly delivery. I am open to exciting engineering opportunities.
        </p>
      </section>

      <section id="skills" className="section-card reveal mt-6 border-2 border-black p-6 transition-colors dark:border-white md:p-8">
        <p className="mb-3 text-xs font-black uppercase tracking-widest text-black/50 dark:text-white/50">Skills</p>
        <h2 className="mb-5 text-3xl font-black uppercase tracking-tight">Engineering stack</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <article
              key={group.category}
              className="skills-category-card relative border-2 border-black bg-white/80 p-4 transition-colors dark:border-white dark:bg-black/45"
            >
              <h3 className="text-sm font-black uppercase tracking-widest">{group.category}</h3>
              <ul className="mt-3 space-y-1 pl-5 font-bold">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-6 border-2 border-black/70 bg-white/60 p-3 dark:border-white/60 dark:bg-black/40">
          <div className="skills-tape-shell relative overflow-hidden">
            <div
              ref={skillTapeWrapperRef}
              className="skills-tape-wrapper overflow-x-scroll"
              role="region"
              aria-label="Horizontally scrollable skills list"
              tabIndex={0}
            >
              <div ref={skillTapeContentRef} className="skills-tape-content flex w-max gap-2 py-1">
                {[...skillTape, ...skillTape].map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="skills-tape-pill inline-flex border-2 border-black bg-white px-3 py-2 text-[11px] font-black uppercase tracking-wider text-black transition-transform duration-300 hover:-translate-y-1 hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section-card reveal mt-6 border-2 border-black p-6 transition-colors dark:border-white md:p-8">
        <p className="mb-3 text-xs font-black uppercase tracking-widest text-black/50 dark:text-white/50">Experience</p>
        <h2 className="mb-5 text-3xl font-black uppercase tracking-tight">Experience & Education</h2>
        <div className="space-y-4">
          {journey.map((item) => (
            <article key={`${item.period}-${item.role}`} className="border-2 border-black p-4 transition-colors dark:border-white">
              <p className="font-mono text-xs font-black uppercase tracking-widest text-black/40 dark:text-white/40">{item.period}</p>
              <h3 className="mt-2 text-xl font-black uppercase tracking-tight">{item.role}</h3>
              <p className="mt-1 text-sm font-black uppercase tracking-wide text-black/50 dark:text-white/50">{item.org}</p>
              <p className="mt-3 font-bold leading-loose">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section-card reveal mt-6 border-2 border-black p-6 transition-colors dark:border-white md:p-8">
        <p className="mb-3 text-xs font-black uppercase tracking-widest text-black/50 dark:text-white/50">Projects</p>
        <h2 className="mb-5 text-3xl font-black uppercase tracking-tight">Selected work</h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <article key={project.title} className="project-card reveal border-2 border-black p-4 pt-5 transition-colors dark:border-white">
              <p className="font-mono text-xs font-black uppercase tracking-widest text-black/40 dark:text-white/40">{project.date}</p>
              <h3 className="mt-2 text-xl font-black uppercase tracking-tight">{project.title}</h3>
              <p className="mt-3 font-bold leading-loose">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-black px-2 py-1 text-[10px] font-black uppercase tracking-widest transition-colors dark:border-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                >
                  GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black bg-black px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
                >
                  Live
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="certifications" className="section-card reveal mt-6 border-2 border-black p-6 transition-colors dark:border-white md:p-8">
        <p className="mb-3 text-xs font-black uppercase tracking-widest text-black/50 dark:text-white/50">Certifications</p>
        <h2 className="mb-5 text-3xl font-black uppercase tracking-tight">Credentials</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {certifications.map((cert) => (
            <article key={cert.title} className="border-2 border-black p-4 transition-colors dark:border-white">
              <p className="font-mono text-xs font-black uppercase tracking-widest text-black/40 dark:text-white/40">{cert.date}</p>
              <h3 className="mt-2 text-base font-black uppercase tracking-tight">{cert.title}</h3>
              <p className="mt-1 text-xs font-black uppercase tracking-wide text-black/50 dark:text-white/50">{cert.issuer}</p>
              <p className="mt-3 font-bold leading-loose">{cert.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 border-2 border-dashed border-black/20 p-4 transition-colors dark:border-white/20">
          {highlights.map((item) => (
            <p key={item} className="font-bold leading-loose">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section id="contact" className="section-card reveal mt-6 border-2 border-black p-6 transition-colors dark:border-white md:p-8">
        <p className="mb-3 text-xs font-black uppercase tracking-widest text-black/50 dark:text-white/50">Contact</p>
        <h2 className="mb-4 text-3xl font-black uppercase tracking-tight">Let us build together</h2>
        <p className="font-bold leading-loose">If you are building something ambitious, I would love to collaborate.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href="mailto:deshmukhrohit373@gmail.com"
            className="contact-link-gradient border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
          >
            deshmukhrohit373@gmail.com
          </a>
          <a
            href="https://github.com/irohit373"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-gradient border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/irohit373"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-gradient border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
