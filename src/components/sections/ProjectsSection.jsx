"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/data/site";

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

export default function ProjectsSection() {
  return (
    <section id="projects" className="page-section">
      <SectionHeader
        label="Projects"
        title="Selected work"
        subtitle="Product builds across AI recruiting, ML search, and education platforms."
      />

      <motion.div
        className="card-grid project-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            className="zed-card project-card"
            variants={itemVariants}
          >
            <p className="card-date">{project.date}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="pill-wrap">
              {project.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
            <div className="card-links">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  Live
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
