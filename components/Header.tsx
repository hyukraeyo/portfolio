'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import ThemeToggle from './ThemeToggle';

// ============================================
// 상수 정의
// ============================================
const NAV_ITEMS = [
  { label: '역량', href: '#competencies' },
  { label: '기술', href: '#skills' },
  { label: '경력', href: '#experience' },
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

// 초기 페이드인 애니메이션 설정
const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// ============================================
// 메인 컴포넌트
// ============================================
export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isTopHidden, setIsTopHidden] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const rafRef = useRef<number | null>(null);

  // 화면에 보이는지 감지
  const isInView = useInView(headerRef, { once: true, amount: 0.5 });

  // 초기 페이드인 애니메이션이 완료되면 상태 업데이트
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

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
          initial="hidden"
          animate={
            hasAnimated
              ? {
                  opacity: isTopHidden ? 0 : 1,
                  y: isTopHidden ? -80 : 0,
                  scale: isTopHidden ? 0.5 : 1,
                }
              : isInView
                ? 'visible'
                : 'hidden'
          }
          variants={FADE_IN_VARIANTS}
          transition={BOUNCY_SPRING_CONFIG}
          style={{
            pointerEvents: isTopHidden ? 'none' : 'auto',
            visibility: isTopHidden ? 'hidden' : 'visible',
          }}
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={isCompact ? styles.stickyNav : styles.nav}
      role="navigation"
      aria-label="주요 내비게이션"
    >
      <button
        className={styles.dots}
        onClick={scrollToTop}
        aria-label="홈으로 이동"
      >
        <span className={styles.dotBlue} />
        <span className={styles.dotGreen} />
        <span className={styles.dotYellow} />
      </button>
      <ul className={styles.navLinks}>
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.themeToggleWrapper}>
        <ThemeToggle />
      </div>
    </nav>
  );
});
