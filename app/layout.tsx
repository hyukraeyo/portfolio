import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import { Rammetto_One } from 'next/font/google';

import { SITE_METADATA } from '@/lib/data/site';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import MotionProvider from '@/lib/context/MotionProvider';
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

const sbAggro = localFont({
  src: [
    {
      path: '../public/fonts/SBAggroL.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SBAggroM.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/SBAggroB.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-aggro',
});

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

  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: {
    canonical: SITE_METADATA.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData([]);

  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${rammettoOne.variable} ${sbAggro.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body suppressHydrationWarning>
        <ThemeProvider>
          <MotionProvider>
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
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
