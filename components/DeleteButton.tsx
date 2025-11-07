'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/app/actions/posts';
import Button from '@/components/ui/Button';
import styles from './DeleteButton.module.scss';

interface DeleteButtonProps {
  postId: string;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setLoading(true);
    try {
      await deletePost(postId);
      router.push('/board');
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : '게시글 삭제에 실패했습니다.');
      setShowConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  if (showConfirm) {
    return (
      <div className={styles.confirm}>
        <span className={styles.confirmText}>정말 삭제하시겠습니까?</span>
        <div className={styles.confirmActions}>
          <Button
            variant="secondary"
            onClick={() => setShowConfirm(false)}
            disabled={loading}
          >
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleDelete}
            loading={loading}
            loadingText="삭제 중..."
          >
            삭제
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="secondary"
      onClick={handleDelete}
      className={styles.deleteButton}
    >
      삭제
    </Button>
  );
}

