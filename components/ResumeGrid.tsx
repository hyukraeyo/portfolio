import styles from './ResumeGrid.module.scss';

const EDUCATION_DATA = [
  { period: "2022-2023", title: "Digital Campus, Montpellier", subtitle: "Digital Web & Project Management" },
  { period: "2021-2022", title: "IUT de Béziers", subtitle: "Commercialisation Technique" },
  { period: "2017-2020", title: "Economic University, Danang", subtitle: "International Business" },
];

const EXPERIENCE_DATA = [
  { period: "2022", title: "Marketing Intern", subtitle: "Social media content creator\nBi Ethic, Narbonne, France" },
  { period: "2021", title: "Freelancer", subtitle: "Consulted with clients, created logos, posters,\npresentations based on their requirements" },
  { period: "2020", title: "Graphic Designer", subtitle: "Designed promotional materials for events\nSonghan Incubator, Viet Nam" },
];

export default function ResumeGrid() {
  return (
    <section className={styles.resumeGrid} id="resume">
      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Education Section */}
          <div className={styles.educationSection}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.list}>
              {EDUCATION_DATA.map((item, index) => (
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

          {/* Experience Section (Orange Card) */}
          <div className={styles.experienceCard}>
            <h2 className={styles.cardTitle}>Experience</h2>
            <div className={styles.list}>
              {EXPERIENCE_DATA.map((item, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.markerWhite}>✦</div>
                  <div className={styles.content}>
                    <span className={styles.periodWhite}>{item.period}</span>
                    <h3 className={styles.itemTitleWhite}>{item.title}</h3>
                    <p className={styles.subtitleWhite}>{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.softSkills}>
              <span className={styles.tag}>#Creativity</span>
              <span className={styles.tag}>#Communication</span>
              <span className={styles.tag}>#Detail-oriented</span>
              <span className={styles.tag}>#Adaptability</span>
            </div>
          </div>
        </div>

        {/* Right Column: Technical Skills */}
        <div className={styles.rightColumn}>
          <div className={styles.bgText}>RESUME</div>
          <div className={styles.bgTextOverlay}>RESUME</div>
          
          <div className={styles.skillsContent}>
            <h2 className={styles.sectionTitleSkills}>Technical skills</h2>
            
            <div className={styles.skillsGrid}>
              {/* Software Skills */}
              <div className={styles.skillCategory}>
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
              <div className={styles.skillCategory}>
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
              <span className={styles.pill}>Packaging</span>
              <span className={styles.pill}>Visual design</span>
              <span className={styles.pill}>UI/UX design</span>
              <span className={styles.pill}>User Research</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
