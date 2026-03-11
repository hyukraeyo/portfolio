'use client';

import { AnimatePresence, m } from 'framer-motion';
import styles from './ExpandButton.module.scss';

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  collapsedLabel: React.ReactNode;
  expandedLabel: React.ReactNode;
  showIcon?: boolean;
  className?: string;
  pulse?: boolean;
}

export default function ExpandButton({
  isExpanded,
  onClick,
  collapsedLabel,
  expandedLabel,
  showIcon = false,
  className = '',
  pulse = false,
}: ExpandButtonProps) {
  return (
    <m.button
      className={`${styles.button} ${isExpanded ? styles.expanded : ''} ${
        pulse ? styles.pulse : ''
      } ${className}`}
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      initial="idle"
      animate="idle"
      variants={{
        idle: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={isExpanded ? 'expanded' : 'collapsed'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {isExpanded ? (
            <>
              {expandedLabel}
              {showIcon && (
                <m.svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  initial={{ rotate: 0 }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    y: {
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <path
                    d="M6 2.5L2 6.5L3.4 7.9L6 5.3L8.6 7.9L10 6.5L6 2.5Z"
                    fill="currentColor"
                  />
                </m.svg>
              )}
            </>
          ) : (
            <>
              {collapsedLabel}
              {showIcon && (
                <m.svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  initial={{ rotate: 0 }}
                  animate={{ y: [0, 2, 0] }}
                  transition={{
                    y: {
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <path
                    d="M6 9.5L2 5.5L3.4 4.1L6 6.7L8.6 4.1L10 5.5L6 9.5Z"
                    fill="currentColor"
                  />
                </m.svg>
              )}
            </>
          )}
        </m.span>
      </AnimatePresence>
    </m.button>
  );
}
