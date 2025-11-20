'use client';

import { Suspense } from 'react';
import Loading from '@/app/loading';

interface ClientSuspenseProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * 클라이언트 사이드 Suspense 컴포넌트
 * React 19 instrumentation 오류를 줄이기 위한 래퍼
 */
export default function ClientSuspense({ 
  children, 
  fallback = <Loading /> 
}: ClientSuspenseProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}