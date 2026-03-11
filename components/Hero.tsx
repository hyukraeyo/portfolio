'use client';

import { m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import LogoAnimation from './animations/LogoAnimation';
import styles from './Hero.module.scss';

const LANDING_EASE = [0.22, 1, 0.36, 1] as const;
const LANDING_DURATION = 0.82;
const TEXT_REVEAL_DELAY = 260;

export default function Hero() {
  const [phase, setPhase] = useState<'intro' | 'landing' | 'settled'>('intro');
  const settleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, []);

  const handleLogoComplete = () => {
    setPhase((currentPhase) => {
      if (currentPhase !== 'intro') {
        return currentPhase;
      }

      settleTimerRef.current = window.setTimeout(() => {
        setPhase('settled');
      }, TEXT_REVEAL_DELAY);

      return 'landing';
    });
  };

  const isSettled = phase === 'settled';
  const usesSettledLayout = phase !== 'intro';

  return (
    <m.section
      layout
      className={styles.hero}
      aria-labelledby="hero-title"
      transition={{
        layout: { duration: LANDING_DURATION, ease: LANDING_EASE },
      }}
    >
      <m.div
        layout
        className={`${styles.content} ${usesSettledLayout ? styles.contentSettled : styles.contentIntro}`}
        transition={{
          layout: { duration: LANDING_DURATION, ease: LANDING_EASE },
        }}
      >
        <m.div
          layout
          className={styles.logoStage}
          animate={{ scale: usesSettledLayout ? 1 : 1.45 }}
          transition={{ duration: LANDING_DURATION, ease: LANDING_EASE }}
        >
          <div className={styles.logoWrapper}>
            <LogoAnimation onComplete={handleLogoComplete} />
          </div>
        </m.div>

        <m.div
          className={styles.textSection}
          initial={false}
          animate={{
            height: usesSettledLayout ? 'auto' : 0,
          }}
          style={{ pointerEvents: isSettled ? 'auto' : 'none' }}
          transition={{
            height: { duration: LANDING_DURATION, ease: LANDING_EASE },
          }}
        >
          <m.div
            className={styles.textContent}
            initial={false}
            animate={{
              opacity: isSettled ? 1 : 0,
              filter: isSettled ? 'blur(0px)' : 'blur(6px)',
            }}
            transition={{
              opacity: { duration: 0.35, delay: isSettled ? 0.1 : 0 },
              filter: { duration: 0.35, delay: isSettled ? 0.1 : 0 },
            }}
          >
            <h1 id="hero-title" className={styles.mainText}>
              안녕하세요,
              <br />
              프론트엔드
              <span className={styles.name}> 개발자</span>입니다.
            </h1>
            <div className={styles.subText}>
              다양한 기술로 웹 프론트엔드를 개발합니다.
              <br />
              함께 서비스를 만들고 성장시킬 곳을 찾고 있습니다.
            </div>
          </m.div>
        </m.div>
      </m.div>
    </m.section>
  );
}
