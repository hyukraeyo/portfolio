import {
  ACADEMIC_DATA,
  EXPERIENCE_DATA,
  PROJECT_HISTORY,
  TECHNICAL_SKILLS,
} from '@/lib/data/resume';
import { calculateDuration } from '@/lib/utils/date';
import FadeIn from './animations/FadeIn';
import StaggerContainer, { StaggerItem } from './animations/StaggerContainer';
import styles from './ResumeGrid.module.scss';

export default function ResumeGrid() {
  return (
    <section className={styles.resumeGrid} id="resume">
      <div className={styles.container}>
        {/* Left Column: Education & Experience */}
        <div className={styles.leftColumn}>
          {/* Experience Section */}
          <div className={styles.experienceSection}>
            <FadeIn direction="up" delay={0.2}>
              <h2 className={styles.sectionTitle}>Experience</h2>
            </FadeIn>
            <StaggerContainer className={styles.list} delay={0.2}>
              {EXPERIENCE_DATA.map((item, index) => (
                <StaggerItem key={index} className={styles.item}>
                  <div className={styles.marker}>✦</div>
                  <div className={styles.content}>
                    <span className={styles.period}>{item.period}</span>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.subtitle}>
                      {item.subtitle}
                      {item.subtitle
                        ? ` · ${calculateDuration(item.period)}`
                        : calculateDuration(item.period)}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Right Column: Contact & Technical Skills */}
        <div className={styles.rightColumn}>
          <div className={styles.bgTextWrapper}>
            {Array.from({ length: 3 }).map((_, i) => (
              <FadeIn
                key={i}
                direction="left"
                delay={0.5 + i * 0.1}
                className={styles.bgText}
              >
                RESUME
              </FadeIn>
            ))}
          </div>

          <div className={styles.skillsContent}>
            <FadeIn direction="up" delay={0.3}>
              <h2 className={styles.sectionTitleSkills}>Technical skills</h2>
            </FadeIn>

            <StaggerContainer className={styles.skillsGrid} delay={0.4}>
              {/* Main Tech Stack */}
              <StaggerItem className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>Main Tech Stack</h3>
                <div className={styles.softwareGrid}>
                  {TECHNICAL_SKILLS.software.map((skill, index) => (
                    <div key={index} className={styles.softwareItem}>
                      {skill}
                    </div>
                  ))}
                </div>
              </StaggerItem>

              {/* Tools & Libraries */}
              <StaggerItem className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>Tools & Libraries</h3>
                <div className={styles.codingContent}>
                  <div className={styles.codingGrid}>
                    {TECHNICAL_SKILLS.coding.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Bottom Tags */}
            <StaggerContainer className={styles.tags} delay={0.6}>
              {TECHNICAL_SKILLS.tags.map((tag, index) => (
                <StaggerItem key={index} className={styles.pill}>
                  {tag}
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>

      {/* Project History Section (Hidden for now, data ready) */}
      {/* 
      <div className={styles.projectHistory}>
        {PROJECT_HISTORY.map(project => (
           ... 
        ))}
      </div> 
      */}
    </section>
  );
}
