/**
 * 환경 변수 타입 정의 및 검증
 * Next.js 환경 변수 타입 안정성을 위한 유틸리티
 */

interface EnvConfig {
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
}

/**
 * 환경 변수를 검증하고 반환합니다.
 * 필수 환경 변수가 없으면 에러를 발생시킵니다.
 */
export function getEnvConfig(): EnvConfig {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL 환경 변수가 설정되지 않았습니다.');
  }

  if (!supabaseAnonKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY 환경 변수가 설정되지 않았습니다.');
  }

  return {
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey,
  };
}

/**
 * 개발 환경 여부를 확인합니다.
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * 프로덕션 환경 여부를 확인합니다.
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

