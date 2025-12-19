'use client';

import FadeIn from './animations/FadeIn';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <FadeIn direction="up">
          <h2 className={styles.title}>
            감사합니다
            <br />
            더 궁금한 점이 있다면
            <br />
            편하게 연락주세요
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <div className={styles.contactCard}>
            <div className={styles.contactItem}>
              <span className={styles.label}>전화번호</span>
              <a href="tel:010-7460-3737" className={styles.value}>
                010.7460.3737
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>이메일</span>
              <a href="mailto:hyukraeyo@gmail.com" className={styles.value}>
                hyukraeyo@gmail.com
              </a>
            </div>
            {/* Github link inferred from project context 'hyukraeyo' */}
            <div className={styles.contactItem}>
              <span className={styles.label}>Github</span>
              <a
                href="https://github.com/hyukraeyo"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.value}
              >
                @hyukraeyo
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.4}>
          <p className={styles.copyright}>
            © 2024 Jo Hyukrae. All rights reserved.
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
