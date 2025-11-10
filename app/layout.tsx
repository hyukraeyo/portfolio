import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { generateStructuredData } from "@/lib/utils/structured-data";
import { projects } from "@/lib/data";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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
    // OG 이미지 추가 시 사용
    // images: [
    //   {
    //     url: '/og-image.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Portfolio',
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | 프론트엔드 개발자",
    description: "프론트엔드 개발자 포트폴리오",
    // Twitter 이미지 추가 시 사용
    // images: ['/og-image.jpg'],
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
    // Google Search Console 등 검증 코드 추가 시 사용
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData(projects);

  return (
    <html lang="ko" className={inter.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
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
        <Script
          id="structured-data-portfolio"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.portfolio) }}
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

