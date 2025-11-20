import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React 관련 설정
  reactStrictMode: true, // React StrictMode 활성화 (권장)
  
  // 개발 모드에서 React DevTools 오류 방지
  devIndicators: {
    position: 'bottom-right',
  },
  
  // React 19 instrumentation 오류 완화
  experimental: {
    // 서버 액션 최적화
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // 웹팩 설정으로 React DevTools 오류 필터링
  webpack: (config, { dev }) => {
    if (dev) {
      // React instrumentation 오류 무시
      config.ignoreWarnings = [
        {
          module: /react-dom/,
          message: /React instrumentation/,
        },
        {
          module: /react-devtools/,
          message: /cleaning up async info/,
        },
      ];
    }
    return config;
  },
  
  // 이미지 최적화 설정
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // 외부 이미지 도메인 추가 시 사용
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'example.com',
    //   },
    // ],
  },
  
  // 압축 활성화
  compress: true,
  
  // 프로덕션 소스맵 비활성화 (보안 및 성능)
  productionBrowserSourceMaps: false,
  
  // 리다이렉트 및 리라이트 설정
  async redirects() {
    return [];
  },
  
  async rewrites() {
    return [];
  },
  
  // 헤더 설정 (보안 및 성능)
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production';
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "font-src 'self' data:",
      "frame-ancestors 'none'",
      "worker-src 'self' blob:",
    ].join('; ');
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), usb=(), fullscreen=(self)',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

