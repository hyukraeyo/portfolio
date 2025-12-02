import Image from 'next/image';
import { HERO_DATA } from '@/lib/data/home';
import FadeIn from './animations/FadeIn';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgTextWrapper}>
        <FadeIn
          direction="down"
          delay={0.2}
          className={styles.textFrontWrapper}
        >
          <div className={`${styles.bgTextRow} ${styles.textFront}`}>
            {HERO_DATA.topText}
          </div>
        </FadeIn>
        {HERO_DATA.bottomText.map((text, index) => (
          <FadeIn
            key={index}
            direction="up"
            delay={0.3 + index * 0.1}
            className={styles.textBackWrapper}
          >
            <div className={`${styles.bgTextRow} ${styles.textBack}`}>
              {text}
            </div>
          </FadeIn>
        ))}
      </div>

      <div className={styles.container}>
        <FadeIn delay={0.5} className={styles.imageSection}>
          <div className={styles.profileImageWrapper}>
            <Image
              src="/images/me.png"
              alt="Profile"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
          <div className={styles.star1}>✦</div>
          <div className={styles.star2}>✦</div>
        </FadeIn>

        <div className={styles.infoSection}>
          {HERO_DATA.socialLinks.map((link, index) => (
            <FadeIn
              key={index}
              direction="left"
              delay={0.8 + index * 0.1}
              className={styles.infoItem}
            >
              {link.label}: {link.value}
            </FadeIn>
          ))}
        </div>
      </div>

      <div className={styles.bottomDesc}>
        <FadeIn delay={1.2} direction="up">
          <div className={styles.inner}>
            {HERO_DATA.description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </FadeIn>
      </div>

      <FadeIn
        delay={1.5}
        direction="up"
        className={styles.scrollIndicatorWrapper}
        fullWidth
        viewport={{ once: true, margin: '0px' }}
      >
        <a href="#about" className={styles.scrollIndicator}>
          Scroll down
        </a>
      </FadeIn>
    </section>
  );
}
