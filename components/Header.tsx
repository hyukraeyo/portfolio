'use client';

import { useState, useEffect } from 'react';
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
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const currentTheme = resolvedTheme ?? theme ?? 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const handleOpenAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles.scrolled : styles.transparent
      }`}
    >
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            Portfolio
          </Link>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const isActive = item.href.startsWith('/')
                ? pathname === item.href
                : pathname === '/' && item.href.startsWith('#');
              return (
                <li key={item.href} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={styles.actions}>
            {user ? (
              <>
                <span className={styles.userEmail}>{user.email}</span>
                <button onClick={signOut} className={styles.authButton}>
                  로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={() => handleOpenAuthModal('login')}
                className={styles.authButton}
              >
                로그인
              </button>
            )}
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
            <button className={styles.menuButton} aria-label="메뉴">
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </header>
  );
}
