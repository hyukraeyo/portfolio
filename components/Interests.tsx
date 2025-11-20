import styles from './Interests.module.scss';

export default function Interests() {
  return (
    <section className={styles.interests} id="interests">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Activities Section */}
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>Activities</h2>
            <div className={styles.activitiesList}>
              <div className={styles.activityItem}>
                <div className={styles.marker}>✦</div>
                <div className={styles.activityContent}>
                  <span className={styles.activityYear}>2020</span>
                  <h3 className={styles.activityTitle}>&lsquo;Danang Tui&rsquo; 2 exhibition</h3>
                  <p className={styles.activityDesc}>Artist of miniature art</p>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.marker}>✦</div>
                <div className={styles.activityContent}>
                  <span className={styles.activityYear}>2019</span>
                  <h3 className={styles.activityTitle}>Danang Robodnic contest</h3>
                  <p className={styles.activityDesc}>Volunteer designer and producer of promotional materials</p>
                </div>
              </div>
            </div>
          </div>

          {/* Language Section */}
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>Language</h2>
            <div className={styles.languageList}>
              <div className={styles.languageItem}>
                <h3 className={styles.langName}>English</h3>
                <span className={styles.langLevel}>Fluent</span>
              </div>
              <div className={styles.languageItem}>
                <h3 className={styles.langName}>French</h3>
                <span className={styles.langLevel}>Intermediate</span>
              </div>
              <div className={styles.languageItem}>
                <h3 className={styles.langName}>Vietnamese</h3>
                <span className={styles.langLevel}>Native</span>
              </div>
            </div>
          </div>

          {/* Hobbies Section */}
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>Hobbies & Interests</h2>
            <div className={styles.hobbiesGrid}>
              <div className={styles.hobbyItem}>
                <div className={styles.iconWrapper}>🎵</div>
                <span className={styles.hobbyName}>Classical<br/>Funky/Gypsy Jazz</span>
              </div>
              <div className={styles.hobbyItem}>
                <div className={styles.iconWrapper}>🧶</div>
                <span className={styles.hobbyName}>Crochet<br/>Knitting</span>
              </div>
              <div className={styles.hobbyItem}>
                <div className={styles.iconWrapper}>🎨</div>
                <span className={styles.hobbyName}>Digital art<br/>Miniature craft</span>
              </div>
              <div className={styles.hobbyItem}>
                <div className={styles.iconWrapper}>🐾</div>
                <span className={styles.hobbyName}>Cat, cat<br/>and cat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
