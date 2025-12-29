'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectMetadata } from '@/lib/utils/markdown-parser';
import styles from './page.module.scss';

interface BoardGridProps {
  projects: ProjectMetadata[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BoardGrid({ projects }: BoardGridProps) {
  return (
    <motion.div
      className={styles.grid}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={item}>
          <Link href={`/board/${project.id}`} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              <span className={styles.period}>{project.period}</span>
            </div>
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.techStack}>
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className={styles.tag}>
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
