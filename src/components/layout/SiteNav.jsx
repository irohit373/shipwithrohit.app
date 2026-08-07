"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/data/site";

export default function SiteNav({
  isScrolled,
  activeSection,
  isThemeReady,
  resolvedTheme,
  onToggleTheme,
  onSmoothNav,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnResize = () => {
      if (window.innerWidth > 980) {
        setIsMenuOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("resize", closeOnResize);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const isDarkTheme = isThemeReady && resolvedTheme === "dark";

  return (
    <header className={`site-nav ${isScrolled || isMenuOpen ? "site-nav--scrolled" : ""} ${isMenuOpen ? "site-nav--open" : ""}`}>
      <div className="nav-container">
        <a href="#" className="site-mark" aria-label="Rohit Deshmukh home">
          shipwithrohit
        </a>

        <nav className="site-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(event) => {
                closeMenu();
                if (item.external) return;
                onSmoothNav(event, item.href);
              }}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              aria-current={!item.external && activeSection === item.href ? "page" : undefined}
              className={!item.external && activeSection === item.href ? "is-active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          disabled={!isThemeReady}
          aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
        >
          <span className="theme-toggle__icon" aria-hidden="true">
            {isDarkTheme ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="presentation">
                <circle cx="12" cy="12" r="4.8" />
                <path d="M12 2.8v2.6" />
                <path d="M12 18.6v2.6" />
                <path d="M4.2 4.2l1.8 1.8" />
                <path d="M18 18l1.8 1.8" />
                <path d="M2.8 12h2.6" />
                <path d="M18.6 12h2.6" />
                <path d="M4.2 19.8l1.8-1.8" />
                <path d="M18 6l1.8-1.8" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="presentation">
                <path d="M20 13.2A7.5 7.5 0 1 1 10.8 4a6.8 6.8 0 1 0 9.2 9.2Z" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </header>
  );
}
