'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import Link from 'next/link';
import AuthModal from './AuthModal';
import styles from './Header.module.scss';

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
  { href: '/board', label: 'Board' },
] as const;

const DELAY_BASE = 0.05;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const currentTheme = useMemo(
    () => resolvedTheme ?? theme ?? 'light',
    [resolvedTheme, theme]
  );

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }, [currentTheme, setTheme]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleOpenAuthModal = useCallback(
    (tab: 'login' | 'signup' = 'login') => {
      setAuthModalTab(tab);
      setAuthModalOpen(true);
      closeMobileMenu();
    },
    [closeMobileMenu]
  );

  const headerClassName = useMemo(
    () =>
      `${styles.header} ${
        isScrolled ? styles.scrolled : styles.transparent
      } ${isMobileMenuOpen ? styles.menuOpen : ''}`,
    [isScrolled, isMobileMenuOpen]
  );

  const navListClassName = useMemo(
    () => `${styles.navList} ${isMobileMenuOpen ? styles.mobileOpen : ''}`,
    [isMobileMenuOpen]
  );

  const isActiveLink = useCallback(
    (href: string) => pathname === '/' && href.startsWith('#'),
    [pathname]
  );

  const getItemStyle = useCallback(
    (index: number) =>
      isMobileMenuOpen
        ? ({ '--delay': `${index * DELAY_BASE}s` } as React.CSSProperties)
        : undefined,
    [isMobileMenuOpen]
  );

  const renderAuthButton = useCallback(
    (isMobile = false) => {
      if (user) {
        return (
          <>
            {isMobile ? (
              <span className={styles.mobileUserEmail}>{user.email}</span>
            ) : (
              <span className={styles.userEmail}>{user.email}</span>
            )}
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
    },
    [user, signOut, handleOpenAuthModal]
  );

  const mobileAuthDelay = useMemo(
    () => NAV_ITEMS.length * DELAY_BASE + 0.1,
    []
  );

  return (
    <>
      <header className={headerClassName}>
        <nav className={styles.nav}>
          <div className={styles.navContent}>
            <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
              Portfolio
            </Link>
            <ul className={navListClassName}>
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.href}
                  className={styles.navItem}
                  style={getItemStyle(index)}
                >
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      isActiveLink(item.href) ? styles.active : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li
                className={styles.mobileAuth}
                style={
                  isMobileMenuOpen
                    ? ({
                        '--delay': `${mobileAuthDelay}s`,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                {renderAuthButton(true)}
              </li>
            </ul>
            <div className={styles.actions}>
              {renderAuthButton()}
              <button
                className={styles.themeButton}
                onClick={toggleTheme}
                aria-label="다크모드 토글"
                disabled={!mounted}
              >
                <span className={styles.iconWrapper}>
                  <svg
                    className={`${styles.icon} ${styles.sunIcon}`}
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
                    className={`${styles.icon} ${styles.moonIcon}`}
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
                className={`${styles.menuButton} ${
                  isMobileMenuOpen ? styles.menuButtonOpen : ''
                }`}
                onClick={toggleMobileMenu}
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
        className={`${styles.mobileOverlay} ${
          isMobileMenuOpen ? styles.mobileOpen : ''
        }`}
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
