'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';

const NAV_ITEMS = [
  { label: '기술', href: '#skills' },
  { label: '경력', href: '#experience' },
  { label: '취미', href: '#hobbies' },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Intersection Observer로 헤더가 뷰포트 상단에 닿는 순간 감지
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 헤더가 화면에서 사라지기 시작하면 sticky 모드 활성화
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 원래 위치의 헤더 (placeholder 역할도 함) */}
      <header ref={headerRef} className={styles.header}>
        <nav
          className={`${styles.nav} ${isSticky ? styles.hidden : ''}`}
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
      </header>

      {/* 하단에 고정되는 헤더 (sticky 모드) */}
      <AnimatePresence>
        {isSticky && (
          <motion.header
            className={styles.stickyHeader}
            initial={{ opacity: 0, y: 80, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 15,
              mass: 0.8,
            }}
          >
            <nav
              className={styles.stickyNav}
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
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
