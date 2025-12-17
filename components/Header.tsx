'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';

const NAV_ITEMS = [
  { label: '경력', href: '#experience' },
  { label: '기술', href: '#skills' },
  { label: '취미', href: '#hobbies' },
];

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isTopHidden, setIsTopHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (!header) return;

      const rect = header.getBoundingClientRect();
      // 헤더가 화면 상단에 닿기 직전 (top이 20px 이하가 되면) 숨김
      setIsTopHidden(rect.top <= 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 헤더의 원래 위치를 잡아주는 wrapper */}
      <div ref={headerRef} className={styles.headerWrapper}>
        <AnimatePresence>
          {!isTopHidden && (
            <motion.header
              className={styles.header}
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -80, scale: 0.5 }}
              transition={{
                type: 'spring' as const,
                stiffness: 260,
                damping: 15,
                mass: 0.8,
              }}
            >
              <Nav />
            </motion.header>
          )}
        </AnimatePresence>
      </div>

      {/* 하단에 fixed 헤더 */}
      <AnimatePresence>
        {isTopHidden && (
          <motion.header
            className={styles.stickyHeader}
            initial={{ opacity: 0, y: 80, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.5 }}
            transition={{
              type: 'spring' as const,
              stiffness: 260,
              damping: 15,
              mass: 0.8,
            }}
          >
            <Nav isCompact />
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}

// Nav 컴포넌트 분리 (중복 제거)
function Nav({ isCompact = false }: { isCompact?: boolean }) {
  return (
    <nav
      className={isCompact ? styles.stickyNav : styles.nav}
      role="navigation"
      aria-label="주요 내비게이션"
    >
      <div className={styles.dots}>
        <span className={styles.dotBlue} />
        <span className={styles.dotGreen} />
        <span className={styles.dotYellow} />
      </div>
      <ul className={styles.navLinks}>
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
