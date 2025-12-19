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
          '모노레포 기반 Nuxt → Next.js 점진적 마이그레이션 진행',
          'shadcn/ui 커스텀 및 Storybook 기반 공통 컴포넌트 라이브러리 구축',
          'Nuxt 기존 프로젝트 운영 및 개발 작업 병행',
        ],
      },
      {
        name: '교보생명 웹 접근성 개선',
        period: '2023.11 ~ 2023.12',
        role: '프론트엔드 개발',
        client: '교보',
        description: [
          '웹 접근성 마크 갱신을 위한 접근성 고도화 작업',
          'Vue, jQuery 기반 레거시 시스템 접근성 개선',
        ],
      },
      {
        name: '미래에셋생명 사이버창구 개선 구축',
        period: '2023.08 ~ 2023.11',
        role: '프론트엔드 개발',
        client: '미래에셋생명',
        description: ['jQuery 기반 사이버창구 전 페이지 UI/UX 리뉴얼'],
      },
      {
        name: '위믹스 3.0 퍼블리싱',
        period: '2023.04 ~ 2023.07',
        role: '프론트엔드 개발',
        client: '피엑스디',
      },
      {
        name: 'KBS 뉴스홈페이지 연간운영',
        period: '2023.01 ~ 2023.03',
        role: '프론트엔드 개발',
        client: '한국방송공사',
      },
      {
        name: '컬러버스 아이템 빌더 개발',
        period: '2022.11 ~ 2022.12',
        role: '프론트엔드 개발',
        client: '컬러버스',
      },
      {
        name: '마이데이터 데이터잇 프로젝트',
        period: '2022.09 ~ 2022.11',
        role: '프론트엔드 개발',
        client: '아롬정보기술',
      },
      {
        name: '삼성SDS 안전관리 앱 개발',
        period: '2022.07 ~ 2022.08',
        role: '프론트엔드 개발',
        client: '삼성SDS',
      },
      {
        name: '신한 MIZI 앱 구축',
        period: '2022.01 ~ 2022.06',
        role: '프론트엔드 개발',
        client: '신한금융',
        description: ['React Native 기반 앱 개발'],
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
    title: '유엔제컴퍼니 주식회사',
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

export const TECHNICAL_SKILLS = [
  // Frontend Core
  'React',
  'Next.js',
  'Vue.js',
  'TypeScript',
  'JavaScript',
  'HTML5',
  'SCSS',
  // Tools & Libraries
  'Git',
  'GitHub',
  'Figma',
  'Tailwind CSS',
  'React Query',
  'Zustand',
  'Node.js',
  'Vercel',
  'Storybook',
  'Jira',
];
