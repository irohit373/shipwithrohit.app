"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { journey } from "@/data/site";

const timelineVariants = {
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="page-section">
      <SectionHeader
        label="Experience"
        title="Experience & education"
        subtitle="A timeline of internships, engineering education, and production-focused learning."
      />

      <motion.div
        className="timeline"
        variants={timelineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {journey.map((item) => (
          <motion.article
            key={`${item.period}-${item.role}`}
            className="timeline-item"
            variants={itemVariants}
          >
            <p className="timeline-period">{item.period}</p>
            <h3>{item.role}</h3>
            <p className="timeline-org">{item.org}</p>
            <p>{item.detail}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
