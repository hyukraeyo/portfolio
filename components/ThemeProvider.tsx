'use client';

import { useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // 개발 환경에서 React instrumentation 오류 완화
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // React instrumentation 오류 무시
      const originalError = console.error;
      console.error = (...args) => {
        if (
          args[0] &&
          typeof args[0] === 'string' &&
          args[0].includes('React instrumentation encountered an error')
        ) {
          return;
        }
        originalError.apply(console, args);
      };
      
      return () => {
        console.error = originalError;
      };
    }
  }, []);
  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

