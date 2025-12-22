import { PROJECT_DESCRIPTIONS } from './projectDescriptions';
import type { ExperienceItem, ProjectItem } from '@/types/resume';

// 타입 re-export (기존 코드 호환성)
export type { ExperienceItem, ProjectItem };

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    period: '2022.06 - 재직중',
    title: '(주)디플루이드',
    subtitle: 'Frontend Developer',
    projects: [
      {
        name: '유플러스 고객 편의성 증대 개발 체계 구축',
        period: '2024.01 ~ 2025.08',
        role: '프론트엔드 개발',
        client: '유플러스',
        description: [
          'Vue.js(Nuxt) 기반 레거시 시스템을 Next.js로 마이그레이션 및 성능 최적화',
          'TypeScript, Zustand, TanStack Query 도입으로 모던 프론트엔드 아키텍처 구축',
          'CSR/SSR 하이브리드 렌더링 전략 적용으로 페이지 로딩 속도 20% 개선',
          'Storybook 기반 공통 컴포넌트 라이브러리 구축 및 디자인 시스템 문서화',
        ],
        detailedDescription: PROJECT_DESCRIPTIONS.uplus,
      },
      {
        name: '삼성서울병원 구강암 극복하기 2차',
        period: '2023.11 ~ 2024.01',
        role: '프론트엔드 개발',
        client: '삼성서울병원',
        description: [
          'OAuth 2.0 활용 소셜 로그인(카카오/네이버/애플/구글) 구현으로 접근성 확대',
          'Redux Toolkit 및 Axios 인터셉터 도입으로 상태 관리 및 통신 성능 최적화',
          '개인 맞춤형 알림 및 건강 관리 기능(예약/약물 일정) 개발',
          '접근성 표준(WCAG) 준수 UI/UX 구현으로 고령층 환자 사용성 개선',
        ],
        detailedDescription: PROJECT_DESCRIPTIONS.samsung_hospital,
      },
      {
        name: '교보생명 웹 접근성 개선',
        period: '2023.11 ~ 2023.12',
        role: '프론트엔드 개발',
        client: '교보',
        description: [
          'WCAG 2.1 AA 기준 준수 및 웹 접근성 인증 획득을 위한 전반적인 코드 리팩토링',
          '스크린 리더(ARIA) 대응 및 키보드 내비게이션 접근성 최적화',
          '색약/저시력 사용자를 위한 명도 대비 개선 및 시맨틱 마크업 강화',
          'QA 및 디자이너 협업을 통한 다양한 보조 기술(Screen Reader) 호환성 검증',
        ],
        detailedDescription: PROJECT_DESCRIPTIONS.kyobo,
      },
      {
        name: '미래에셋생명 사이버창구 개선 구축',
        period: '2023.08 ~ 2023.11',
        role: '프론트엔드 개발',
        client: '미래에셋생명',
        description: [
          'jQuery 기반 PC/Mobile 사용자 인터페이스(UI) 최적화 및 디바이스별 UX 제공',
          '기존 코드 리팩토링 및 동적 플러그인 커스터마이징을 통한 성능 개선',
          '기획/디자인 팀과의 긴밀한 협업으로 요구사항 반영 및 접근성 강화',
        ],
        detailedDescription: PROJECT_DESCRIPTIONS.mirae,
      },
      {
        name: '위믹스 3.0 퍼블리싱',
        period: '2023.04 ~ 2023.07',
        role: '프론트엔드 개발',
        client: '피엑스디',
        description: [
          'React, TypeScript, Storybook을 활용한 신규 메뉴 개발 및 컴포넌트 모듈화',
          'Axios 인터셉터 최적화를 통한 안정적인 비동기 데이터 처리 및 API 연동',
          '디자이너/기획자와의 긴밀한 협업으로 UI/UX 개선 및 사용자 접근성 강화',
        ],
        detailedDescription: PROJECT_DESCRIPTIONS.wemix,
      },
      {
        name: 'KBS 뉴스홈페이지 연간운영',
        period: '2023.01 ~ 2023.03',
        role: '프론트엔드 개발',
        client: '한국방송공사',
        description: [
          'jQuery 활용 기존 홈페이지 UX/UI 리뉴얼 및 동적 콘텐츠 최적화',
          'React 기반 관리자 대시보드 구축 및 통계 데이터 시각화',
          '운영 업무 효율화를 위한 데이터 필터링/검색 기능 구현',
        ],
        detailedDescription: PROJECT_DESCRIPTIONS.kbs,
      },
      {
        name: '컬러버스 아이템 빌더 개발',
        period: '2022.11 ~ 2022.12',
        role: '프론트엔드 개발',
        client: '컬러버스',
        description: [
          'React 기반의 웹 아이템 저작 도구(Item Builder) UI 개발 및 기능 구현',
          '다양한 아이템 파츠 조합 시 실시간 렌더링 최적화 및 상태 관리 구조 설계',
          '직관적인 사용자 편집 경험을 위한 인터페이스 및 툴바 컴포넌트 고도화',
        ],
        detailedDescription: PROJECT_DESCRIPTIONS.colorverse,
      },
      {
        name: '마이데이터 데이터잇 프로젝트',
        period: '2022.09 ~ 2022.11',
        role: '프론트엔드 개발',
        client: '아롬정보기술',
        description: [
          'Vue.js와 TypeScript 기반의 데이터 관리 플랫폼 구축 및 컴포넌트 모듈화',
          'Figma 협업을 통한 직관적인 UI/UX 설계 및 반응형 인터페이스 구현',
          'Virtual Scroll 및 Intersection Observer 도입으로 대용량 데이터 렌더링 성능 최적화',
        ],
        detailedDescription: PROJECT_DESCRIPTIONS.mydata,
      },
      {
        name: '삼성SDS 안전관리 앱 개발',
        period: '2022.07 ~ 2022.08',
        role: '프론트엔드 개발',
        client: '삼성SDS',
        description: [
          'Vue.js를 활용한 안전 데이터 시각화 및 실시간 모니터링 UI 구현',
          'Jira 기반의 체계적인 이슈 관리 및 기획/디자인 팀과의 긴밀한 협업',
          '사용자 피드백을 반영한 내비게이션 구조 개선 및 UI/UX 최적화',
        ],
        detailedDescription: PROJECT_DESCRIPTIONS.samsung_sds,
      },
      {
        name: '신한 MIZI 앱 구축',
        period: '2022.01 ~ 2022.06',
        role: '프론트엔드 개발',
        client: '신한금융',
        description: ['React Native 기반 앱 개발'],
        detailedDescription: PROJECT_DESCRIPTIONS.shinhan,
      },
    ],
  },
  {
    period: '2021.02 - 2021.09',
    title: '주식회사 쏠쏠',
    subtitle: 'Publisher',
    projects: [
      {
        name: '쏠쏠 자사 플랫폼 개발',
        period: '2021.02 ~ 2021.09',
        role: '웹퍼블리싱',
        client: '쏠쏠',
      },
    ],
  },
  {
    period: '2018.11 - 2020.12',
    title: '주식회사 알디엠체인',
    subtitle: 'Publisher',
    projects: [
      {
        name: 'RDMChain 사이트 개발',
        period: '2018.11 ~ 2020.12',
        role: '웹퍼블리싱',
        client: '알디엠체인',
      },
    ],
  },
  {
    period: '2018.07 - 2018.10',
    title: '프리랜서',
    subtitle: 'Publisher',
    projects: [
      {
        name: '서울특별시 회의록 사이트 리뉴얼',
        period: '2018.09 ~ 2018.10',
        role: '웹퍼블리싱',
        client: '서울특별시',
      },
      {
        name: 'MyBuild 사이트 구축',
        period: '2018.07 ~ 2018.08',
        role: '웹퍼블리싱',
        client: '선영 법률사무소',
      },
    ],
  },
  {
    period: '2018.04 - 2018.07',
    title: '기본좋은커뮤니케이션',
    subtitle: 'Publisher',
    projects: [
      {
        name: '성균관대학교 사이트 리뉴얼',
        period: '2018.06 ~ 2018.07',
        role: '웹퍼블리싱',
        client: '성균관대학교',
      },
      {
        name: 'SK 코원 에너지 사이트 리뉴얼',
        period: '2018.05 ~ 2018.06',
        role: '웹퍼블리싱',
        client: 'SK 코원 에너지',
      },
      {
        name: 'KT 기가지니 사이트 유지보수',
        period: '2018.04 ~ 2018.05',
        role: '웹퍼블리싱',
        client: 'KT',
      },
    ],
  },
  {
    period: '2015.11 - 2017.02',
    title: '유엔씨컴퍼니 주식회사',
    subtitle: 'Publisher',
    projects: [
      {
        name: '더현대닷컴 중국 사이트 리뉴얼',
        period: '2016.01 ~ 2016.07',
        role: '웹퍼블리싱',
        client: '현대백화점',
      },
      {
        name: '사이트 개발 및 유지보수',
        period: '2015.11 ~ 2017.02',
        role: '웹퍼블리싱',
        client: '유엔씨컴퍼니',
      },
    ],
  },
];
