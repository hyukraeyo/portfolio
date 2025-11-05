import { Project, Skill, SocialLink, Experience } from '@/types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 'expert', category: 'frontend' },
  { name: 'Next.js', level: 'expert', category: 'frontend' },
  { name: 'TypeScript', level: 'advanced', category: 'frontend' },
  { name: 'JavaScript', level: 'expert', category: 'frontend' },
  { name: 'HTML/CSS', level: 'expert', category: 'frontend' },
  { name: 'Tailwind CSS', level: 'advanced', category: 'frontend' },
  { name: 'Vue.js', level: 'intermediate', category: 'frontend' },
  
  // Tools
  { name: 'Git', level: 'advanced', category: 'tools' },
  { name: 'VS Code', level: 'advanced', category: 'tools' },
  { name: 'Figma', level: 'intermediate', category: 'tools' },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: '풀스택 이커머스 플랫폼',
    longDescription: 'Next.js와 TypeScript를 활용한 현대적인 이커머스 플랫폼. 서버 컴포넌트와 서버 액션을 활용하여 최적화된 성능을 제공합니다.',
    image: '/project1.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Dashboard Analytics',
    description: '실시간 데이터 분석 대시보드',
    longDescription: 'React와 Chart.js를 활용한 인터랙티브한 데이터 시각화 대시보드.',
    image: '/project2.jpg',
    technologies: ['React', 'TypeScript', 'Chart.js', 'Material-UI'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '3',
    title: 'Task Management App',
    description: '협업을 위한 태스크 관리 애플리케이션',
    longDescription: '실시간 협업 기능이 있는 태스크 관리 앱. WebSocket을 활용한 실시간 업데이트.',
    image: '/project3.jpg',
    technologies: ['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    featured: false,
  },
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'Email', url: 'mailto:your@email.com', icon: 'email' },
];

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Tech Company',
    position: 'Frontend Developer',
    period: '2022 - Present',
    description: [
      'Next.js 기반 웹 애플리케이션 개발 및 유지보수',
      '성능 최적화 및 사용자 경험 개선',
      '팀과 협업하여 프로젝트 기획 및 구현',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
];

