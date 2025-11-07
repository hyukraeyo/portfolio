'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import styles from './WriteButton.module.scss';

export default function WriteButton() {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      // 로그인 모달을 열거나 로그인 페이지로 이동
      // 여기서는 간단하게 알림을 표시하고 홈으로 이동
      alert('게시글을 작성하려면 로그인이 필요합니다.');
      router.push('/');
    }
  };

  return (
    <Link 
      href="/board/write" 
      className={styles.writeButton}
      onClick={handleClick}
    >
      <svg 
        className={styles.icon}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 4v16m8-8H4" 
        />
      </svg>
      글쓰기
    </Link>
  );
}

