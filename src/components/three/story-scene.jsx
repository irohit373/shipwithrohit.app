"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Sparkles,
  Text,
} from "@react-three/drei";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

function CodeTunnel({ phaseRef, darkMode }) {
  const refs = useRef([]);

  const snippets = useMemo(() => {
    return Array.from({ length: 80 }).map((_, index) => ({
      id: index,
      text: ["const app = ship()", "async function build()", "return scalableProduct", "agent.run(task)"][index % 4],
      position: new THREE.Vector3(
        Math.sin(index * 0.72) * 5,
        Math.cos(index * 0.38) * 2,
        -index * 0.75 + 4
      ),
      speed: 0.6 + (index % 7) * 0.08,
    }));
  }, []);

  useFrame((state, delta) => {
    const phase = phaseRef.current.phase;
    refs.current.forEach((node, index) => {
      if (!node) return;
      node.rotation.z += delta * 0.1;
      node.position.y += Math.sin(state.clock.elapsedTime * snippets[index].speed + index) * 0.0008;
      node.material.opacity = Math.max(0.1, 0.95 - phase * 0.25);
    });
  });

  return (
    <group>
      {snippets.map((snippet, index) => (
        <Text
          key={snippet.id}
          ref={(node) => {
            refs.current[index] = node;
          }}
          color={darkMode ? "#ffffff" : "#111111"}
          fontSize={0.16}
          letterSpacing={0.03}
          anchorX="center"
          anchorY="middle"
          position={snippet.position}
          rotation={[0, 0, (index % 5) * 0.05]}
          material-transparent
          material-opacity={0.95}
        >
          {snippet.text}
        </Text>
      ))}
    </group>
  );
}

function LaptopGlobe({ phaseRef, darkMode }) {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) return;
    const phase = phaseRef.current.phase;
    group.current.rotation.y = state.clock.elapsedTime * 0.35 + phase * 0.6;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.15;
    group.current.scale.setScalar(1 + phase * 0.2);
  });

  return (
    <Float floatIntensity={0.8} speed={1.5} rotationIntensity={0.3}>
      <group ref={group}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.9, 64, 64]} />
          <meshStandardMaterial
            color={darkMode ? "#ffffff" : "#0f172a"}
            emissive={darkMode ? "#1f2937" : "#93c5fd"}
            emissiveIntensity={0.7}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, -1.2, 0]} receiveShadow>
          <boxGeometry args={[2.3, 0.14, 1.7]} />
          <meshStandardMaterial color={darkMode ? "#111111" : "#f8fafc"} metalness={0.3} roughness={0.4} />
        </mesh>

        <mesh position={[0, -0.62, -0.72]} rotation={[-1.2, 0, 0]}>
          <planeGeometry args={[1.85, 1.1]} />
          <meshStandardMaterial
            color={darkMode ? "#0f172a" : "#dbeafe"}
            emissive={darkMode ? "#1e3a8a" : "#93c5fd"}
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
}

function StoryCameraRig({ phaseRef, reducedMotion }) {
  const { camera } = useThree();

  const cameraPoints = useMemo(
    () => [
      new THREE.Vector3(0, 0.3, 10),
      new THREE.Vector3(0, 0.6, 6),
      new THREE.Vector3(1.8, 1.2, 3.6),
      new THREE.Vector3(-2.2, 1.1, 5.2),
    ],
    []
  );

  const lookAtPoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.6, 0, -1.5),
      new THREE.Vector3(0, -0.3, 0),
    ],
    []
  );

  useFrame(() => {
    const phase = phaseRef.current.phase;
    const low = Math.floor(phase);
    const high = Math.min(3, low + 1);
    const mix = phase - low;

    const targetPosition = cameraPoints[low].clone().lerp(cameraPoints[high], mix);
    const targetLook = lookAtPoints[low].clone().lerp(lookAtPoints[high], mix);

    const smoothing = reducedMotion ? 1 : 0.08;
    camera.position.lerp(targetPosition, smoothing);
    camera.lookAt(targetLook);
  });

  return null;
}

export function StoryScene({ reducedMotion }) {
  const phaseRef = useRef({ phase: 0 });
  const { resolvedTheme } = useTheme();
  const darkMode = resolvedTheme === "dark";

  useGSAP(() => {
    if (reducedMotion) {
      phaseRef.current.phase = 0;
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: ".story-root",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        phaseRef.current.phase = self.progress * 3;
      },
      scrub: 1.1,
    });

    return () => {
      trigger.kill();
    };
  }, [reducedMotion]);

  return (
    <>
      <color attach="background" args={[darkMode ? "#000000" : "#ffffff"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 3]} intensity={1.2} castShadow />

      <StoryCameraRig phaseRef={phaseRef} reducedMotion={reducedMotion} />

      <group>
        <LaptopGlobe phaseRef={phaseRef} darkMode={darkMode} />
        <CodeTunnel phaseRef={phaseRef} darkMode={darkMode} />
        <Sparkles
          count={90}
          speed={0.35}
          size={2}
          scale={[11, 7, 10]}
          opacity={darkMode ? 0.55 : 0.35}
          color={darkMode ? "#ffffff" : "#111111"}
        />

        <Text
          position={[0, 2.4, 0]}
          fontSize={0.56}
          letterSpacing={0.05}
          color={darkMode ? "#ffffff" : "#111111"}
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
        >
          ROHIT DESHMUKH
        </Text>

        <ContactShadows position={[0, -1.55, 0]} opacity={0.5} blur={2.5} far={8} />
      </group>

      <Environment preset="studio" />
      <EffectComposer>
        <Bloom intensity={darkMode ? 0.9 : 0.45} luminanceThreshold={0.2} luminanceSmoothing={0.25} />
        {!reducedMotion && <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={1.8} />}
      </EffectComposer>
    </>
  );
}
