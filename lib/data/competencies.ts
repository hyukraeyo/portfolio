import { Code, Users, Zap } from 'lucide-react';

export const CORE_COMPETENCIES = [
  {
    keyword: 'CODE',
    title: '지속 가능한 코드와 아키텍처',
    description:
      '코드는 작성하는 시간보다 읽히는 시간이 훨씬 깁니다. 당장의 구현보다 미래의 유지보수성을 고려하며, 동료가 쉽게 이해하고 확장할 수 있는 명확하고 견고한 코드를 지향합니다.',
    techs: ['Architecture', 'Refactoring', 'Maintainability'],
    details: [
      'Vue.js 레거시 시스템을 Next.js 기반의 모던 아키텍처로 성공적으로 마이그레이션',
      'TypeScript와 Zustand를 도입하여 유지보수성을 높이고, 확장 가능한 코드베이스 설계',
      '관심사 분리(SoC) 원칙을 적용하여 비즈니스 로직과 UI 로직을 명확히 분리',
    ],
    icon: Code,
  },
  {
    keyword: 'USER',
    title: '사용자를 위한 성능과 접근성',
    description:
      '기술은 결국 사용자를 위해 존재합니다. 0.1초의 로딩 시간 단축, 1px의 어긋남 없는 UI를 위해 집요하게 고민하며, 모든 사용자가 차별 없이 서비스를 누릴 수 있도록 접근성을 준수합니다.',
    techs: ['Performance', 'Accessibility', 'UX Optimization'],
    details: [
      'Lighthouse 성능 최적화로 페이지 로딩 속도를 20% 이상 단축 (LCP, CLS 개선)',
      'WCAG 2.1 AA 기준을 준수하여 웹 접근성 인증 획득 및 포용적인 웹 경험 제공',
      '사용자 행동 데이터를 기반으로 UX 병목 구간을 식별하고 개선',
    ],
    icon: Zap,
  },
  {
    keyword: 'TEAM',
    title: '동료와 함께 만드는 시너지',
    description:
      '최고의 서비스는 뛰어난 개인보다 훌륭한 팀에서 나옵니다. 적극적인 소통과 지식 공유를 통해 팀의 성장을 도모하며, 개발 생산성을 높이는 효율적인 협업 문화를 주도합니다.',
    techs: ['Communication', 'Design System', 'DevOps'],
    details: [
      'Storybook을 도입하여 공통 컴포넌트 라이브러리를 구축하고 디자인 시스템 문서화',
      '디자인팀/기획팀과의 싱크를 맞춰 커뮤니케이션 비용을 줄이고 개발 생산성 향상',
      '코드 리뷰 문화를 정착시키고 테크 세미나를 주최하여 팀 내 기술 역량 상향 평준화',
    ],
    icon: Users,
  },
];
