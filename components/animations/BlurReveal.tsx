'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlurRevealContainerProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
}

export default function BlurRevealContainer({
  children,
  delay = 0,
  staggerDelay = 0.02, // 매우 빠른 스태거
  className = '',
}: BlurRevealContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-30px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface BlurRevealItemProps {
  children: ReactNode;
  className?: string;
}

export function BlurRevealItem({
  children,
  className = '',
}: BlurRevealItemProps) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          filter: 'blur(8px)',
          y: 8,
        },
        show: {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1], // 부드러운 이징
          },
        },
      }}
      whileHover={{
        y: -3,
        transition: { duration: 0.2 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
