'use client';

import { CORE_COMPETENCIES } from '@/lib/data/competencies';
import FadeIn from './animations/FadeIn';
import styles from './CoreCompetencies.module.scss';
import BlurRevealContainer, { BlurRevealItem } from './animations/BlurReveal';

export default function CoreCompetencies() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <FadeIn direction="up" delay={0.2} className={styles.header}>
          <span className={styles.subTitle}>CORE COMPETENCIES</span>
          <h2 className={styles.title}>핵심 가치와 역량</h2>
        </FadeIn>

        <div className={styles.grid}>
          {CORE_COMPETENCIES.map((item, index) => {
            const Icon = item.icon;
            // 인덱스에 따른 테마 클래스 선택
            const themeClass = [
              styles.themeBlue,
              styles.themeGreen,
              styles.themeYellow,
            ][index];

            return (
              <FadeIn
                key={index}
                direction="up"
                delay={0.3 + index * 0.1}
                className={styles.cardWrapper}
              >
                <div className={`${styles.card} ${themeClass}`}>
                  {/* 상단: 키워드 & 아이콘 */}
                  <div className={styles.cardHeader}>
                    <span className={styles.keyword}>
                      <span className={styles.firstChar}>
                        {item.keyword.charAt(0)}
                      </span>
                      {item.keyword.slice(1)}.
                    </span>
                    <div className={styles.iconWrapper}>
                      <Icon strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* 중단: 타이틀 & 철학 */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>

                    {/* 테크 태그 */}
                    <div className={styles.techTags}>
                      {item.techs.map((tech, i) => (
                        <span key={i} className={styles.techTag}>
                          #{tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 하단: 구체적 경험 (구분선으로 분리) */}
                  <div className={styles.cardFooter}>
                    <ul className={styles.detailsList}>
                      {item.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
