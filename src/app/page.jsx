"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Lenis from "lenis";
import { useTheme } from "next-themes";
import SiteNav from "@/components/layout/SiteNav";
import HeroSection from "@/components/hero/HeroSection";
import HeroSocialLinks from "@/components/hero/HeroSocialLinks";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  navItems,
  skills,
  journey,
  projects,
  certifications,
  highlights,
  aboutContent,
  contactContent,
  skillTape,
} from "@/data/site";

const subscribeToClientSnapshot = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(subscribeToClientSnapshot, getClientSnapshot, getServerSnapshot);
  const isThemeReady = isMounted && typeof resolvedTheme === "string";
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
      .filter((item) => !item.external)
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
      <SiteNav
        isScrolled={isScrolled}
        activeSection={activeSection}
        isThemeReady={isThemeReady}
        resolvedTheme={resolvedTheme}
        onToggleTheme={toggleTheme}
        onSmoothNav={handleSmoothNav}
      />

      <HeroSection onSmoothNav={handleSmoothNav} />

      <section id="about" className="page-section">
        <SectionHeader
          label="About"
          title="Practical software, shipped with intent."
          subtitle={aboutContent.subtitle}
        />

        <div className="about-grid">
          <div className="about-copy">
            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
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
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    Live
                  </a>
                )}
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
          subtitle={contactContent.subtitle}
        />

        <HeroSocialLinks className="contact-social-links" />
      </section>

      <footer className="site-footer">© 2026 Rohit Deshmukh</footer>
    </main>
  );
}
