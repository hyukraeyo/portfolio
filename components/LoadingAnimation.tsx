'use client';

import { m } from 'framer-motion';
import styles from '@/app/loading.module.scss'; // 스타일 재사용

const bounceTransition = {
  y: {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeOut' as const,
  },
};

export default function LoadingAnimation() {
  return (
    <div className={styles.container}>
      {[0, 1, 2].map((index) => (
        <m.div
          key={index}
          className={styles.circle}
          initial={{ y: 0 }}
          animate={{ y: '-100%' }} // 위로 튀어오르는 느낌 (또는 아래로 떨어지는 느낌을 원하면 양수로)
          // "떨어지는 느낌"을 원하면 초기값을 -y로 하고 animate를 0으로 할 수도 있음.
          // 여기서는 "줄줄이 떨어지는" = 순차적인 바운스로 해석하여 구현.
          transition={{
            ...bounceTransition.y,
            delay: index * 0.15, // 순차적 딜레이
          }}
        />
      ))}
    </div>
  );
}
