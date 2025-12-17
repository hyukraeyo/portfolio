'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';

// ============================================
// 상수 정의
// ============================================
const NAV_ITEMS = [
  { label: '경력', href: '#experience' },
  { label: '기술', href: '#skills' },
  { label: '취미', href: '#hobbies' },
] as const;

// 헤더 전환 임계값 (px)
const SCROLL_THRESHOLD = 20;

// 애니메이션 설정
const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 20,
};

const BOUNCY_SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 15,
  mass: 0.8,
};

// ============================================
// 메인 컴포넌트
// ============================================
export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isTopHidden, setIsTopHidden] = useState(false);
  const rafRef = useRef<number | null>(null);

  // 스크롤 핸들러 (requestAnimationFrame으로 최적화)
  const handleScroll = useCallback(() => {
    // 이전 RAF 취소
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const header = headerRef.current;
      if (!header) return;

      const rect = header.getBoundingClientRect();
      setIsTopHidden(rect.top <= SCROLL_THRESHOLD);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 상태 체크

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <>
      {/* 상단 헤더 - 숨겨져도 높이 유지 */}
      <div ref={headerRef} className={styles.headerWrapper}>
        <motion.header
          className={styles.header}
          initial={false}
          animate={{
            opacity: isTopHidden ? 0 : 1,
            y: isTopHidden ? -30 : 0,
            scale: isTopHidden ? 0.8 : 1,
          }}
          transition={SPRING_CONFIG}
          style={{ pointerEvents: isTopHidden ? 'none' : 'auto' }}
          aria-hidden={isTopHidden}
        >
          <Nav />
        </motion.header>
      </div>

      {/* 하단 고정 헤더 */}
      <AnimatePresence>
        {isTopHidden && (
          <motion.header
            className={styles.stickyHeader}
            initial={{ opacity: 0, y: 80, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.5 }}
            transition={BOUNCY_SPRING_CONFIG}
          >
            <Nav isCompact />
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// Nav 컴포넌트 (메모이제이션)
// ============================================
interface NavProps {
  isCompact?: boolean;
}

const Nav = memo(function Nav({ isCompact = false }: NavProps) {
  return (
    <nav
      className={isCompact ? styles.stickyNav : styles.nav}
      role="navigation"
      aria-label="주요 내비게이션"
    >
      <div className={styles.dots} aria-hidden="true">
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
});
