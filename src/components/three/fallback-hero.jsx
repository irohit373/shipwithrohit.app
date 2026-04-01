"use client";

import { motion } from "framer-motion";

export function FallbackHero() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-transparent px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl border-2 border-black bg-white p-8 text-center dark:border-white dark:bg-black"
      >
        <p className="text-xs font-black uppercase tracking-widest text-black/50 dark:text-white/50">3D Storytelling</p>
        <h2 className="mt-3 text-4xl font-black uppercase tracking-tight">Rohit Deshmukh</h2>
        <p className="mt-4 font-bold leading-loose">
          Mobile and reduced-motion mode is active. Scroll through the narrative cards below for the full story flow.
        </p>
      </motion.div>
    </div>
  );
}
