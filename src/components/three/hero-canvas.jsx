"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { StoryScene } from "@/components/three/story-scene";
import { FallbackHero } from "@/components/three/fallback-hero";

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function useMobileMode() {
  const [mobile, setMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return mobile;
}

export default function HeroCanvas() {
  const reducedMotion = useReducedMotion();
  const mobileMode = useMobileMode();

  if (mobileMode) {
    return <FallbackHero />;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.6]}
        shadows
        fallback={<FallbackHero />}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.3, 10], fov: 42, near: 0.1, far: 150 }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <StoryScene reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
