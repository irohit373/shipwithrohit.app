"use client";

import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { Button } from "@/components/jolly/button";
import { Card, CardDescription, CardTitle } from "@/components/jolly/card";
import { Badge } from "@/components/jolly/badge";
import { Accordion } from "@/components/jolly/accordion";
import { Tooltip } from "@/components/jolly/tooltip";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import("@/components/three/hero-canvas"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 animate-pulse bg-white dark:bg-black" aria-hidden="true" />,
});

const timelineItems = [
  {
    id: "student",
    title: "Student Dev",
    content: "Built foundations in DSA, systems, and product thinking while shipping practical web features and internships.",
  },
  {
    id: "fullstack",
    title: "Full-Stack Projects",
    content: "Delivered production-minded projects in Next.js, React, Node.js, Python, and cloud-hosted environments.",
  },
  {
    id: "ai",
    title: "AI Agents",
    content: "Integrated LLM workflows, ranking logic, and intelligent automation to reduce repetitive effort.",
  },
  {
    id: "pm",
    title: "Product Mgmt Aspirations",
    content: "Combining engineering depth with roadmap thinking to build software users can trust and adopt.",
  },
];

export function StorytellingPage() {
  const progress = useScrollProgress();
  const { resolvedTheme, setTheme } = useTheme();

  useGSAP(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const cards = gsap.utils.toArray(".story-reveal");

    cards.forEach((card) => {
      gsap.set(card, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });

      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 44, scale: 0.985, filter: "blur(10px)" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.95,
              ease: "power2.out",
              overwrite: "auto",
            }
          );
        },
      });
    });

    gsap.to(".story-orb-a", {
      y: -24,
      x: 18,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".story-orb-b", {
      y: 28,
      x: -20,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="story-root relative text-black transition-colors dark:text-white">
      <HeroCanvas />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1200px 700px at 10% 12%, rgba(16, 185, 129, 0.14), transparent 58%), radial-gradient(900px 520px at 88% 24%, rgba(59, 130, 246, 0.14), transparent 62%)",
        }}
      />
      <div className="story-orb-a pointer-events-none absolute -left-24 top-24 z-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden="true" />
      <div className="story-orb-b pointer-events-none absolute -right-16 bottom-20 z-10 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.22)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.55)_100%)]" aria-hidden="true" />

      <div className="story-progress-wrap fixed left-0 right-0 top-0 z-40 px-4 pt-4 lg:px-8">
        <div className="border-2 border-black bg-white p-1 dark:border-white dark:bg-black" role="progressbar" aria-label="Story progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
          <div className="h-2 bg-black transition-all dark:bg-white" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="pointer-events-none relative z-20">
        <section className="story-step container mx-auto flex min-h-screen items-center px-4 pb-16 pt-28 lg:px-8">
          <Card className="story-reveal pointer-events-auto w-full max-w-2xl border-white/40 bg-white/72 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-white/20 dark:bg-black/45">
            <Badge className="border-emerald-700/40 text-emerald-900 dark:border-emerald-300/40 dark:text-emerald-200">Story Section 01</Badge>
            <CardTitle className="mt-3 text-3xl leading-[0.95] md:text-5xl">Student Dev to Builder</CardTitle>
            <CardDescription>
              Started with core CS fundamentals, then moved quickly into shipping features, debugging legacy systems, and learning how products scale in the real world.
            </CardDescription>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tooltip trigger={<Button variant="solid" aria-label="Open projects section">View Projects</Button>}>
                Jump to project chapters
              </Tooltip>
              <Button variant="outline" aria-label="Toggle theme" onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
                {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </Card>
        </section>

        <section className="story-step container mx-auto flex min-h-screen items-center px-4 py-16 lg:px-8">
          <Card className="story-reveal pointer-events-auto w-full max-w-2xl border-white/40 bg-white/72 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl md:ml-auto dark:border-white/20 dark:bg-black/45">
            <Badge className="border-sky-700/40 text-sky-900 dark:border-sky-300/40 dark:text-sky-200">Story Section 02</Badge>
            <CardTitle className="mt-3 text-3xl leading-[0.95] md:text-5xl">Full-Stack Projects</CardTitle>
            <CardDescription>
              Built end-to-end systems across Next.js, React, Python, Node.js, and data layers, focusing on architecture, latency, and reliable delivery.
            </CardDescription>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Next.js</Badge>
              <Badge>FastAPI</Badge>
              <Badge>PostgreSQL</Badge>
              <Badge>React</Badge>
            </div>
          </Card>
        </section>

        <section className="story-step container mx-auto flex min-h-screen items-center px-4 py-16 lg:px-8">
          <Card className="story-reveal pointer-events-auto w-full max-w-3xl border-white/40 bg-white/72 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-white/20 dark:bg-black/45">
            <Badge className="border-violet-700/40 text-violet-900 dark:border-violet-300/40 dark:text-violet-200">Story Section 03</Badge>
            <CardTitle className="mt-3 text-3xl leading-[0.95] md:text-5xl">AI Agents and Automation</CardTitle>
            <CardDescription>
              Integrated AI features that automate repetitive workflows, improve matching and discovery, and convert data into practical product behavior.
            </CardDescription>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card className="bg-transparent">
                <CardTitle className="text-base">Code Tunnel</CardTitle>
                <CardDescription>Camera navigates through floating snippets as capabilities evolve.</CardDescription>
              </Card>
              <Card className="bg-transparent">
                <CardTitle className="text-base">Explosion Phase</CardTitle>
                <CardDescription>Particles and snippets burst into project highlights while scrolling.</CardDescription>
              </Card>
              <Card className="bg-transparent">
                <CardTitle className="text-base">Timeline Merge</CardTitle>
                <CardDescription>3D energy fades into roadmap-oriented execution thinking.</CardDescription>
              </Card>
            </div>
          </Card>
        </section>

        <section className="story-step container mx-auto flex min-h-screen items-center px-4 py-16 lg:px-8">
          <Card className="story-reveal pointer-events-auto w-full max-w-3xl border-white/40 bg-white/72 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl md:ml-auto dark:border-white/20 dark:bg-black/45">
            <Badge className="border-amber-700/40 text-amber-900 dark:border-amber-300/40 dark:text-amber-200">Story Section 04</Badge>
            <CardTitle className="mt-3 text-3xl leading-[0.95] md:text-5xl">Product Management Aspirations</CardTitle>
            <CardDescription>
              The long-term arc is building products with engineering precision, roadmap clarity, and strong user empathy.
            </CardDescription>
            <div className="mt-6">
              <Accordion items={timelineItems} />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="solid" aria-label="Navigate to contact">Start a conversation</Button>
              <Button variant="outline" aria-label="Navigate to projects">See full portfolio</Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
