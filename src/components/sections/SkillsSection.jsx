"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { skills, skillTape } from "@/data/site";

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

export default function SkillsSection() {
  return (
    <section id="skills" className="page-section">
      <SectionHeader
        label="Skills"
        title="Engineering stack"
        subtitle="A focused toolkit for product-grade web apps, APIs, deployment, and applied AI workflows."
      />

      <motion.div
        className="card-grid skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skills.map((group) => (
          <motion.article
            key={group.category}
            className="zed-card skill-card"
            variants={itemVariants}
          >
            <h3>{group.category}</h3>
            <div className="pill-wrap">
              {group.items.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="skill-tape"
        aria-label="Skills tape"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {[...skillTape, ...skillTape].map((skill, index) => (
          <span key={`${skill}-${index}`}>{skill}</span>
        ))}
      </motion.div>
    </section>
  );
}
