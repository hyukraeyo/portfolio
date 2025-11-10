'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import Link from 'next/link';
import { cn } from '@/lib/utils/classNames';
import { throttle } from '@/lib/utils/throttle';
import styles from './Header.module.scss';

// AuthModal은 모달이므로 필요할 때만 로드 (동적 import)
const AuthModal = dynamic(() => import('./AuthModal'), {
  ssr: false, // 모달은 SSR 불필요
});

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
  { href: '/board', label: 'Board' },
] as const;

const SCROLL_THRESHOLD = 50;
const SCROLL_THROTTLE_MS = 100;
const DELAY_BASE = 0.05;
const MOBILE_AUTH_DELAY = NAV_ITEMS.length * DELAY_BASE + 0.1;

type AuthModalTab = 'login' | 'signup';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<AuthModalTab>('login');
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const currentTheme = resolvedTheme ?? theme ?? 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }, SCROLL_THROTTLE_MS);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOpenAuthModal = (tab: AuthModalTab = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
    closeMobileMenu();
  };

  const isActiveLink = (href: string) =>
    pathname === '/' && href.startsWith('#');

  const getItemDelay = (index: number): React.CSSProperties | undefined =>
    isMobileMenuOpen
      ? ({ '--delay': `${index * DELAY_BASE}s` } as React.CSSProperties)
      : undefined;

  const getMobileAuthDelay = (): React.CSSProperties | undefined =>
    isMobileMenuOpen
      ? ({ '--delay': `${MOBILE_AUTH_DELAY}s` } as React.CSSProperties)
      : undefined;

  const renderAuthSection = (isMobile = false) => {
    if (user) {
      return (
        <>
          <span
            className={isMobile ? styles.mobileUserEmail : styles.userEmail}
          >
            {user.email}
          </span>
          <button onClick={signOut} className={styles.authButton}>
            로그아웃
          </button>
        </>
      );
    }
    return (
      <button
        onClick={() => handleOpenAuthModal('login')}
        className={styles.authButton}
      >
        로그인
      </button>
    );
  };

  return (
    <>
      <header
        className={cn(
          styles.header,
          isScrolled ? styles.scrolled : styles.transparent,
          isMobileMenuOpen && styles.menuOpen
        )}
      >
        <nav className={styles.nav}>
          <div className={styles.navContent}>
            <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
              Portfolio
            </Link>
            <ul
              className={cn(
                styles.navList,
                isMobileMenuOpen && styles.mobileOpen
              )}
            >
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.href}
                  className={styles.navItem}
                  style={getItemDelay(index)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      styles.navLink,
                      isActiveLink(item.href) && styles.active
                    )}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className={styles.mobileAuth} style={getMobileAuthDelay()}>
                {renderAuthSection(true)}
              </li>
            </ul>
            <div className={styles.actions}>
              {renderAuthSection()}
              <button
                className={styles.themeButton}
                onClick={toggleTheme}
                aria-label="다크모드 토글"
                disabled={!mounted}
              >
                <span className={styles.iconWrapper}>
                  <svg
                    className={cn(styles.icon, styles.sunIcon)}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <svg
                    className={cn(styles.icon, styles.moonIcon)}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </span>
              </button>
              <button
                className={cn(
                  styles.menuButton,
                  isMobileMenuOpen && styles.menuButtonOpen
                )}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={isMobileMenuOpen}
              >
                <span className={styles.menuIcon}>
                  <span className={styles.menuLine}></span>
                  <span className={styles.menuLine}></span>
                  <span className={styles.menuLine}></span>
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div
        className={cn(
          styles.mobileOverlay,
          isMobileMenuOpen && styles.mobileOpen
        )}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </>
  );
}
