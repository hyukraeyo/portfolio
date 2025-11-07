'use server';

import { createClient } from '@/lib/supabase/server';

export async function checkSupabaseConnection() {
  try {
    const supabase = await createClient();
    
    // 환경 변수 확인
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!url || !key) {
      return {
        connected: false,
        error: '환경 변수가 설정되지 않았습니다. .env.local 파일을 확인하세요.',
        url: url ? '설정됨' : '없음',
        key: key ? '설정됨' : '없음',
      };
    }

    // 간단한 연결 테스트 (posts 테이블 조회)
    const { data, error } = await supabase
      .from('posts')
      .select('id')
      .limit(1);

    if (error) {
      return {
        connected: false,
        error: error.message,
        url: '설정됨',
        key: '설정됨',
      };
    }

    // 세션 확인
    const { data: { session } } = await supabase.auth.getSession();

    return {
      connected: true,
      error: null,
      url: '설정됨',
      key: '설정됨',
      hasSession: !!session,
      userId: session?.user?.id || null,
    };
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '설정됨' : '없음',
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '설정됨' : '없음',
    };
  }
}

