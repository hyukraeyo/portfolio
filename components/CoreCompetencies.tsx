'use client';

import { COMPETENCIES_DATA } from '@/lib/data/competencies';
import { motion } from 'framer-motion';
import styles from './CoreCompetencies.module.scss';
import FadeIn from './animations/FadeIn';

export default function CoreCompetencies() {
  return (
    <section className={styles.section} id="competencies">
      <div className={styles.container}>
        <FadeIn direction="up" className={styles.header}>
          <span className={styles.subTitle}>Check Point</span>
          <h2 className={styles.title}>
            핵심 역량
            <br />
            유연하게 소통하고 견고하게 개발합니다.
          </h2>
        </FadeIn>

        <div className={styles.grid}>
          {COMPETENCIES_DATA.map((item, index) => (
            <FadeIn
              key={index}
              direction="up"
              delay={index * 0.1}
              className={styles.cardWrapper}
            >
              <div className={styles.card}>
                <div className={styles.iconWrapper}>
                  <item.icon />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
