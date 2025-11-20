import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { generateStructuredData } from "@/lib/utils/structured-data";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

// ITC Clearface와 유사한 스타일의 Google Fonts
// Cormorant Garamond는 ITC Clearface와 유사한 우아한 세리프 폰트입니다
// 웹폰트로 바로 사용 가능합니다
const clearface = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-clearface",
});

// 참고: 실제 ITC Clearface 폰트 파일이 있다면 아래 주석을 해제하고 사용하세요
// const clearfaceLocal = localFont({
//   src: [
//     {
//       path: "public/fonts/ITC-Clearface-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "public/fonts/ITC-Clearface-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   variable: "--font-clearface",
//   display: "swap",
//   fallback: ["serif"],
// });

export const metadata: Metadata = {
  title: "Portfolio | 프론트엔드 개발자",
  description: "프론트엔드 개발자 포트폴리오 - Next.js, React, TypeScript를 활용한 현대적인 웹 애플리케이션 개발",
  keywords: ["포트폴리오", "프론트엔드", "웹 개발자", "Next.js", "React", "TypeScript"],
  authors: [{ name: "프론트엔드 개발자" }],
  creator: "프론트엔드 개발자",
  openGraph: {
    title: "Portfolio | 프론트엔드 개발자",
    description: "프론트엔드 개발자 포트폴리오 - Next.js, React, TypeScript를 활용한 현대적인 웹 애플리케이션 개발",
    type: "website",
    locale: "ko_KR",
    siteName: "Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | 프론트엔드 개발자",
    description: "프론트엔드 개발자 포트폴리오",
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
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData([]); // Pass empty array or update utility
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable} ${clearface.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        )}
        <link rel="canonical" href={siteUrl} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">본문으로 건너뛰기</a>
        <Script
          id="structured-data-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.website) }}
        />
        <Script
          id="structured-data-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.person) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
          {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

