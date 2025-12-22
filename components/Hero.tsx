import FadeIn from './animations/FadeIn';
import LogoAnimation from './animations/LogoAnimation';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <LogoAnimation />
        </div>

        <div className={styles.textSection}>
          <FadeIn delay={0.2} direction="up">
            <h1 id="hero-title" className={styles.mainText}>
              안녕하세요,
              <br />
              프론트엔드 개발자
              <br />
              <span className={styles.name}>조혁래</span>입니다.
            </h1>
            <div className={styles.subText}>
              다양한 기술로 웹 프론트엔드를 개발합니다.
              <br />
              함께 서비스를 만들고 성장시킬 곳을 찾고 있습니다.
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
