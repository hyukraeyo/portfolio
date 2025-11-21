export interface AcademicItem {
  period: string;
  title: string;
  subtitle: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  subtitle: string;
}

export const ACADEMIC_DATA: AcademicItem[] = [
  {
    period: '2014.03 - 2016.02',
    title: '한국IT직업전문학교',
    subtitle: '웹디자인학과',
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    period: '2022.06 - 재직중',
    title: '(주)디플루이드',
    subtitle: 'Frontend Developer',
  },
  {
    period: '2021.02 - 2021.09',
    title: '주식회사 쏠쏠',
    subtitle: 'Frontend Developer · 8개월',
  },
  {
    period: '2018.11 - 2020.12',
    title: '주식회사 알디엠케인',
    subtitle: 'Frontend Developer · 2년 2개월',
  },
  {
    period: '2015.11 - 2017.02',
    title: '유엔제컴퍼니주식회사',
    subtitle: 'Frontend Developer · 1년 4개월',
  },
  {
    period: '2018.07 - 2018.10',
    title: '프리랜서',
    subtitle: '4개월',
  },
  {
    period: '2018.04 - 2018.07',
    title: '기본좋은커뮤니케이션',
    subtitle: '4개월',
  },
];

export const SOFT_SKILLS = [
  '#문제해결능력',
  '#원활한커뮤니케이션',
  '#주도적인학습',
  '#사용자중심사고',
];

export const TECHNICAL_SKILLS = {
  software: [
    'HTML5',
    'CSS3',
    'jQuery',
    'Adobe\nPhotoshop',
    'Adobe\nIllustrator',
    'HTML',
  ],
  coding: [
    'Git',
    'React',
    'Vue.JS',
    'GitHub',
    'CSS',
    'Node.js',
    'TypeScript',
    'React.js',
    'Next.js',
    'JavaScript',
  ],
  tags: ['Web Performance', 'Accessibility', 'Responsive Design', 'SEO'],
};
