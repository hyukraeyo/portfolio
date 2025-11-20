import styles from './Skills.module.scss';

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <div className={styles.bgText}>RESUME</div>
      
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Technical skills</h2>
        
        <div className={styles.grid}>
          {/* Software Skills */}
          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>Software Skills</h3>
            <div className={styles.softwareGrid}>
              <div className={styles.softwareItem}>Ps</div>
              <div className={styles.softwareItem}>Ai</div>
              <div className={styles.softwareItem}>Id</div>
              <div className={styles.softwareItem}>Xd</div>
              <div className={styles.softwareItem}>Pr</div>
            </div>
          </div>

          {/* Coding Skills */}
          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>Coding skills</h3>
            <div className={styles.codingContent}>
              <p className={styles.codingIntro}>Basic knowledge of:</p>
              <div className={styles.codingGrid}>
                <span>HTML</span>
                <span>PHP</span>
                <span>CSS</span>
                <span>SQL</span>
                <span>JavaScript</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tags */}
        <div className={styles.tags}>
          <span className={styles.tag}>Packaging</span>
          <span className={styles.tag}>Visual design</span>
          <span className={styles.tag}>UI/UX design</span>
          <span className={styles.tag}>User Research</span>
        </div>
      </div>
    </section>
  );
}
