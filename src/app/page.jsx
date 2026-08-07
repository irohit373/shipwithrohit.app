"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Lenis from "lenis";
import { useTheme } from "next-themes";
import SiteNav from "@/components/layout/SiteNav";

import HeroSection from "@/components/hero/HeroSection";
import HeroSocialLinks from "@/components/hero/HeroSocialLinks";
import SectionHeader from "@/components/ui/SectionHeader";

import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificationSection from "@/components/sections/CertificationSection";

import {
  navItems,

  contactContent,
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
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(newTheme);
    });
  };

  const handleSmoothNav = (event, href) => {
    if (!href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    setActiveSection(href);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 0.62, offset: 0 });
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

      <AboutSection />

      <SkillsSection />

      <ExperienceSection />

      <ProjectsSection />

      <CertificationSection />

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
