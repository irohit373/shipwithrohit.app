import { heroContent, quickStats } from "@/data/site";
import HeroSocialLinks from "./HeroSocialLinks";

export default function HeroSection({ onSmoothNav }) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true" />

      <div className="hero-copy fade-up">
        <p className="eyebrow">{heroContent.eyebrow}</p>
        <h1 id="hero-title">{heroContent.name}</h1>
        <p className="hero-role">{heroContent.role}</p>
        <p className="hero-intro">{heroContent.intro}</p>

        <HeroSocialLinks className="fade-up fade-up-delay-1" />

        <div className="hero-actions fade-up fade-up-delay-2">
          <a href="#projects" className="button button-primary" onClick={(event) => onSmoothNav(event, "#projects")}>
            Explore projects
          </a>
          <a href="#contact" className="button button-ghost" onClick={(event) => onSmoothNav(event, "#contact")}>
            Contact
          </a>
        </div>
      </div>

      <div className="stats-grid fade-up fade-up-delay-3" aria-label="Quick stats">
        {quickStats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
