// React 19 개발 모드 설정
// 이 파일은 개발 환경에서 React instrumentation 오류를 완화합니다

if (process.env.NODE_ENV === 'development') {
  // React DevTools 오류 무시
  const originalError = console.error;
  console.error = (...args) => {
    if (
      args[0] &&
      typeof args[0] === 'string' &&
      args[0].includes('React instrumentation encountered an error')
    ) {
      // React instrumentation 오류는 무시
      return;
    }
    originalError.apply(console, args);
  };

  // React 19 StrictMode 경고 필터링
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      typeof args[0] === 'string' &&
      (args[0].includes('cleaning up async info') ||
       args[0].includes('Suspense boundary'))
    ) {
      // Suspense 관련 경고 무시
      return;
    }
    originalWarn.apply(console, args);
  };
}