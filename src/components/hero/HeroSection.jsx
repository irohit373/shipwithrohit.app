import { heroContent } from "@/data/site";
import HeroSocialLinks from "./HeroSocialLinks";

export default function HeroSection({ onSmoothNav }) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true" />

      <div className="hero-copy fade-up">
        <p className="eyebrow">{heroContent.name}</p>
        <h1 id="hero-title">{heroContent.role}</h1>
        <p className="hero-intro">{heroContent.intro}</p>

        <HeroSocialLinks className="fade-up fade-up-delay-1" />
        
      </div>
    </section>
  );
}
