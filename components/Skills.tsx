'use client';

import { TECHNICAL_SKILLS } from '@/lib/data/skills';
import BlurRevealContainer, { BlurRevealItem } from './animations/BlurReveal';
import FadeIn from './animations/FadeIn';
import styles from './Skills.module.scss';

export default function Skills() {
  return (
    <section className={styles.section} id="skills">
      <div className={styles.container}>
        <FadeIn direction="up" delay={0.2} className={styles.header}>
          <span className={styles.subTitle}>TECHNICAL SKILLS</span>
          <h2 className={styles.title}>기술 스택</h2>
        </FadeIn>
        <BlurRevealContainer className={styles.grid} delay={0.1}>
          {TECHNICAL_SKILLS.map((skill: string, index: number) => (
            <BlurRevealItem key={index} className={styles.item}>
              {skill}
            </BlurRevealItem>
          ))}
        </BlurRevealContainer>
      </div>
    </section>
  );
}
