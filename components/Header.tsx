'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import ThemeToggle from './ThemeToggle';

// ============================================
// 상수 정의
// ============================================
const NAV_ITEMS = [
  { label: '역량', href: '/#competencies' },
  { label: '기술', href: '/#skills' },
  { label: '경력', href: '/#experience' },
  { label: '보드', href: '/board' },
] as const;

// 헤더 전환 임계값 (px)
const SCROLL_THRESHOLD = 20;

// top variant에서 하단 고정으로 전환되는 스크롤 임계값 (px)
const TOP_VARIANT_SCROLL_THRESHOLD = 100;

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
// 타입 정의
// ============================================
interface HeaderProps {
  /**
   * 헤더 표시 모드
   * - 'default': 기본 동작 (메인 페이지용) - Hero 아래에 위치하며, 스크롤 시 하단 고정
   * - 'top': 상단 시작 (게시판용) - 처음에 상단에 표시되고, 스크롤 시 하단 고정으로 전환
   */
  variant?: 'default' | 'top';
}

// ============================================
// 메인 컴포넌트
// ============================================
export default function Header({ variant = 'default' }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isTopHidden, setIsTopHidden] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(variant === 'top'); // top variant는 즉시 표시
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
      if (variant === 'top') {
        // top variant: 스크롤 위치 기반으로 전환
        const scrollY = window.scrollY;
        setIsTopHidden(scrollY > TOP_VARIANT_SCROLL_THRESHOLD);
      } else {
        // default variant: 헤더 위치 기반으로 전환
        const header = headerRef.current;
        if (!header) return;

        const rect = header.getBoundingClientRect();
        setIsTopHidden(rect.top <= SCROLL_THRESHOLD);
      }
    });
  }, [variant]);

  // pathname 변경 시 상태 즉시 초기화 및 스크롤 리셋
  useLayoutEffect(() => {
    // variant가 'top'인 경우(게시판 등)에만 강제로 스크롤을 최상단으로 리셋
    // 메인 페이지(default variant)로 이동 시에는 앵커 스크롤 등을 방해하지 않도록 리셋하지 않음
    if (variant === 'top') {
      window.scrollTo(0, 0);
      setIsTopHidden(false);
    }
  }, [pathname, variant]);

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 초기 상태 체크 (약간의 지연으로 ScrollToTop 완료 보장)
    const timer = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, pathname]);

  return (
    <>
      {/* 상단 헤더 - 숨겨져도 높이 유지 */}
      <div ref={headerRef} className={styles.headerWrapper}>
        <motion.header
          key={`header-${pathname}`}
          className={styles.header}
          initial={variant === 'top' ? { opacity: 1, y: 0, scale: 1 } : 'hidden'}
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
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  const handleLogoClick = () => {
    if (isMainPage) {
      // 메인 페이지에서는 스크롤 상단으로
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // 다른 페이지에서는 메인으로 이동
      window.location.href = '/';
    }
  };

  // 해시 링크 클릭 핸들러 (최적화됨)
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes('#')) return;

    const [basePath, hash] = href.split('#');
    // 현재 페이지 경로 확인 (pathname이 null일 수 있으므로 방어 코드)
    const currentPath = pathname || '/';
    const targetPath = basePath || '/';

    // 같은 페이지 내 이동인 경우에만 부드러운 스크롤 직접 처리
    if (currentPath === targetPath) {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    } else {
      // 다른 페이지로 이동하는 경우:
      // Next.js Link의 SPA 이동 시 앵커 스크롤이 실패하는 경우를 방지하기 위해
      // window.location.href를 사용하여 확실하게 이동 처리
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <nav
      className={isCompact ? styles.stickyNav : styles.nav}
      role="navigation"
      aria-label="주요 내비게이션"
    >
      <button
        className={styles.dots}
        onClick={handleLogoClick}
        aria-label="홈으로 이동"
      >
        <span className={styles.dotBlue} />
        <span className={styles.dotGreen} />
        <span className={styles.dotYellow} />
      </button>
      <ul className={styles.navLinks}>
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={styles.navLink}
              onClick={(e) => handleAnchorClick(e, item.href)}
            >
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
