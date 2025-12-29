import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import { Rammetto_One } from 'next/font/google';

import { generateStructuredData } from '@/lib/utils/structured-data';
import './globals.scss';

const pretendard = localFont({
  src: [
    {
      path: '../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
  preload: true,
});

const rammettoOne = Rammetto_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-rammetto-one',
});

import { SITE_METADATA } from '@/lib/data/site';
import { ThemeProvider } from '@/lib/context/ThemeContext';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: SITE_METADATA.author }],
  creator: SITE_METADATA.author,
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ig5bwjcdjq-J5t22SEhKa34Kdi-thM38v3zee_uTSVU',
  },
  // icons: {
  //   icon: '/favicon.svg',
  //   apple: '/favicon.svg',
  // },
  alternates: {
    canonical: SITE_METADATA.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData([]); // Pass empty array or update utility
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_METADATA.siteUrl;

  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${rammettoOne.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme) theme = supportDarkMode ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            본문으로 건너뛰기
          </a>
          <Script
            id="structured-data-website"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData.website),
            }}
          />
          <Script
            id="structured-data-person"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData.person),
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
