'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import styles from './Marquee.module.scss';

interface MarqueeProps {
  children: ReactNode[];
  direction?: 'left' | 'right';
  speed?: number; // 초 단위 (낮을수록 빠름)
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  direction = 'left',
  speed = 30,
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);

  // 무한 스크롤을 위해 children을 3번 반복
  const duplicatedChildren = useMemo(
    () => [...children, ...children, ...children],
    [children]
  );

  // 애니메이션 시작
  useEffect(() => {
    controls.start({
      x: direction === 'left' ? '-33.333%' : '0%',
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        },
      },
    });
  }, [controls, direction, speed]);

  // pause/resume 처리
  useEffect(() => {
    if (isPaused) {
      controls.stop();
    } else {
      controls.start({
        x: direction === 'left' ? '-33.333%' : '0%',
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        },
      });
    }
  }, [isPaused, controls, direction, speed]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div
      className={`${styles.marqueeContainer} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={styles.marqueeTrack}
        animate={controls}
        initial={{ x: direction === 'left' ? '0%' : '-33.333%' }}
      >
        {duplicatedChildren.map((child, index) => (
          <div key={index} className={styles.marqueeItem}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
