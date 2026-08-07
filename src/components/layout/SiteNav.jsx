import { navItems } from "@/data/site";

export default function SiteNav({
  isScrolled,
  activeSection,
  isThemeReady,
  resolvedTheme,
  onToggleTheme,
  onSmoothNav,
}) {
  return (
    <header className={`site-nav ${isScrolled ? "site-nav--scrolled" : ""}`}>
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

        <button type="button" className="theme-toggle" onClick={onToggleTheme} disabled={!isThemeReady}>
          {isThemeReady && resolvedTheme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
