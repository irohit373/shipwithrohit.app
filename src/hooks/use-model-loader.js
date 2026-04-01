"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

export function useModelLoader(path) {
  const gltf = useGLTF(path);

  const model = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [gltf.scene]);

  return { model };
}
