import { Activity, BookOpen, Coffee, Laptop } from 'lucide-react';

export const INTERESTS_DATA = {
  hobbies: [
    {
      icon: <Laptop size={32} strokeWidth={1.5} />,
      name: '사이드 프로젝트',
      description: '새로운 기술 실험',
    },
    {
      icon: <BookOpen size={32} strokeWidth={1.5} />,
      name: '기술 블로그',
      description: '학습 내용 기록',
    },
    {
      icon: <Activity size={32} strokeWidth={1.5} />,
      name: '러닝',
      description: '체력 관리',
    },
    {
      icon: <Coffee size={32} strokeWidth={1.5} />,
      name: '카페 투어',
      description: '코딩하기 좋은 곳 찾기',
    },
  ],
};
