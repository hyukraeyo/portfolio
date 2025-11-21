import {
  ACADEMIC_DATA,
  EXPERIENCE_DATA,
  TECHNICAL_SKILLS,
} from '@/lib/data/resume';
import { INTRO_DATA } from '@/lib/data/home';
import styles from './ResumeGrid.module.scss';

export default function ResumeGrid() {
  return (
    <section className={styles.resumeGrid} id="resume">
      <div className={styles.container}>
        {/* Left Column: Education & Experience */}
        <div className={styles.leftColumn}>
          {/* Education Section */}
          <div className={styles.educationSection}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.list}>
              {ACADEMIC_DATA.map((item, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.marker}>✦</div>
                  <div className={styles.content}>
                    <span className={styles.period}>{item.period}</span>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.subtitle}>{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className={styles.educationSection}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className={styles.list}>
              {EXPERIENCE_DATA.map((item, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.marker}>✦</div>
                  <div className={styles.content}>
                    <span className={styles.period}>{item.period}</span>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.subtitle}>{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Technical Skills */}
        <div className={styles.rightColumn}>
          <div className={styles.bgTextWrapper}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={styles.bgText}>
                RESUME
              </div>
            ))}
          </div>

          <div className={styles.skillsContent}>
            <h2 className={styles.sectionTitleSkills}>Technical skills</h2>

            <div className={styles.skillsGrid}>
              {/* Software Skills */}
              <div className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>Software Skills</h3>
                <div className={styles.softwareGrid}>
                  {TECHNICAL_SKILLS.software.map((skill, index) => (
                    <div key={index} className={styles.softwareItem}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Coding Skills */}
              <div className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>Coding skills</h3>
                <div className={styles.codingContent}>
                  <div className={styles.codingGrid}>
                    {TECHNICAL_SKILLS.coding.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tags */}
            <div className={styles.tags}>
              {TECHNICAL_SKILLS.tags.map((tag, index) => (
                <span key={index} className={styles.pill}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
