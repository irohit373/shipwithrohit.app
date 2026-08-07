"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { aboutContent, highlights } from "@/data/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutSection() {
  return (
    <section id="about" className="page-section">
      <SectionHeader
        label="About"
        title="Practical software, shipped with intent."
        subtitle={aboutContent.subtitle}
      />

      <motion.div
        className="about-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="about-copy">
          {aboutContent.paragraphs.map((paragraph) => (
            <motion.p key={paragraph.slice(0, 32)} variants={itemVariants}>
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* <motion.div className="highlight-panel" variants={itemVariants}>
          {highlights.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </motion.div> */}
      </motion.div>
    </section>
  );
}
