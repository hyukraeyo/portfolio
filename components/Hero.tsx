import { HERO_DATA } from '@/lib/data/home';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgTextWrapper}>
        <div className={`${styles.bgTextRow} ${styles.textFront}`}>
          {HERO_DATA.topText}
        </div>
        {HERO_DATA.bottomText.map((text, index) => (
          <div key={index} className={`${styles.bgTextRow} ${styles.textBack}`}>
            {text}
          </div>
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.imageSection}>
          <div className={styles.orangeSquare}></div>
          <div className={styles.star1}>✦</div>
          <div className={styles.star2}>✦</div>
        </div>

        <div className={styles.infoSection}>
          {HERO_DATA.socialLinks.map((link, index) => (
            <div key={index} className={styles.infoItem}>
              {link.label}: {link.value}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomDesc}>
        <div className={styles.inner}>
          {HERO_DATA.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>

      <a href="#about" className={styles.scrollIndicator}>
        Scroll down
      </a>
    </section>
  );
}
