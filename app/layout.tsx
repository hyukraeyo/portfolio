import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  openGraph: {
    title: "Portfolio | 프론트엔드 개발자",
    description: "프론트엔드 개발자 포트폴리오",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | 프론트엔드 개발자",
    description: "프론트엔드 개발자 포트폴리오",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

