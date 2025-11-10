/**
 * 성능 모니터링 유틸리티
 * Web Vitals 및 성능 메트릭 수집을 위한 헬퍼 함수
 */

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
}

/**
 * Web Vitals 메트릭을 로깅합니다.
 * 프로덕션 환경에서는 분석 서비스로 전송할 수 있습니다.
 */
export function reportWebVitals(metric: WebVitalsMetric) {
  // 개발 환경에서만 콘솔에 출력
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
    });
  }

  // 프로덕션 환경에서는 분석 서비스로 전송
  // 예: Google Analytics, Vercel Analytics 등
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics 예시:
    // gtag('event', metric.name, {
    //   value: Math.round(metric.value),
    //   metric_id: metric.id,
    //   metric_value: metric.value,
    //   metric_delta: metric.delta,
    // });

    // Vercel Analytics 예시:
    // import { track } from '@vercel/analytics';
    // track(metric.name, {
    //   value: metric.value,
    //   rating: metric.rating,
    // });
  }
}

/**
 * 페이지 로드 시간을 측정합니다.
 */
export function measurePageLoad() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;

    if (navigation) {
      const metrics = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart,
      };

      if (process.env.NODE_ENV === 'development') {
        console.log('[Page Load Metrics]', metrics);
      }
    }
  });
}

/**
 * 이미지 로드 성능을 측정합니다.
 */
export function measureImageLoad(imageElement: HTMLImageElement) {
  return new Promise<number>((resolve) => {
    const startTime = performance.now();

    imageElement.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Image Load Time]', {
          src: imageElement.src,
          loadTime: `${loadTime.toFixed(2)}ms`,
        });
      }

      resolve(loadTime);
    });

    imageElement.addEventListener('error', () => {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Image Load Error]', imageElement.src);
      }
      resolve(-1);
    });
  });
}

