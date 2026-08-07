"use-client"

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { certifications } from "@/data/site";

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

export default function CertificationSection() {
   return  (
   <section id="certifications" className="page-section">
        <SectionHeader
          label="Credentials"
          title="Certifications"
          subtitle="Focused learning"
        />

        <motion.div 
        className="card-grid certification-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px"}}
        >
          {certifications.map((cert) => (
            <motion.article 
                key={cert.title} 
                className="zed-card certification-card"
                variants={itemVariants}
            >
              <p className="card-date">{cert.date}</p>
              <h3>{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p>{cert.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>)
}