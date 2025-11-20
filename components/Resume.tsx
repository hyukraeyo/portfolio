import styles from './Resume.module.scss';

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

export default function Resume() {
  return (
    <section className={styles.resume} id="resume">
      <div className={styles.container}>
        {/* Education Column */}
        <div className={styles.column}>
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

        {/* Experience Column (Orange Card) */}
        <div className={styles.column}>
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
            
            {/* Soft Skills Tags inside the card as per design */}
            <div className={styles.softSkills}>
              <span className={styles.tag}>#Creativity</span>
              <span className={styles.tag}>#Communication</span>
              <span className={styles.tag}>#Detail-oriented</span>
              <span className={styles.tag}>#Adaptability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
