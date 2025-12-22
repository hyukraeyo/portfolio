import { Code2, Gauge, Users, Layers, Accessibility } from 'lucide-react';

export const COMPETENCIES_DATA = [
  {
    title: '주도적인 아키텍처 설계',
    description:
      'Vue.js 레거시 시스템을 Next.js 기반의 모던 아키텍처로 성공적으로 마이그레이션한 경험이 있습니다. TypeScript와 Zustand를 도입하여 유지보수성을 높이고, 확장 가능한 코드베이스를 설계합니다.',
    icon: Layers,
  },
  {
    title: '성능 및 웹 접근성 최적화',
    description:
      'Lighthouse 성능 최적화로 페이지 로딩 속도를 20% 이상 단축했으며, WCAG 2.1 AA 기준을 준수하여 웹 접근성 인증을 획득했습니다. 모든 사용자를 고려한 포용적인 웹 경험을 제공합니다.',
    icon: Accessibility,
  },
  {
    title: '시스템 주도 협업',
    description:
      'Storybook을 도입하여 공통 컴포넌트 라이브러리를 구축하고 디자인 시스템을 문서화했습니다. 이를 통해 디자인팀과의 싱크를 맞추고 개발 생산성을 높이는 효율적인 협업 문화를 주도합니다.',
    icon: Users,
  },
];
