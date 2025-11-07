'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { createPost, updatePost, getPost } from '@/app/actions/posts';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import styles from './write.module.scss';

export default function WritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [loadingPost, setLoadingPost] = useState(false);

  // 편집 모드인지 확인 및 기존 게시글 로드
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setIsEditMode(true);
      setPostId(id);
      setLoadingPost(true);
      getPost(id)
        .then((post) => {
          setTitle(post.title);
          setContent(post.content);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
        })
        .finally(() => {
          setLoadingPost(false);
        });
    }
  }, [searchParams]);

  if (loadingPost) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>게시글을 불러오는 중...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.authRequired}>
          <p>게시글을 작성하려면 로그인이 필요합니다.</p>
          <Button onClick={() => router.push('/')}>홈으로 가기</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode && postId) {
        await updatePost(postId, title, content, user?.id);
      } else {
        await createPost(title, content, user?.id);
      }
      router.push('/board');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시글 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>
          {isEditMode ? '게시글 수정' : '게시글 작성'}
        </h1>
        <p className={styles.pageDescription}>
          {isEditMode 
            ? '게시글을 수정할 수 있습니다.' 
            : '새로운 게시글을 작성해보세요.'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && (
          <div className={styles.error}>
            <svg
              className={styles.errorIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        <FormField
          label="제목"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="게시글 제목을 입력하세요"
          required
        />

        <div className={styles.field}>
          <label htmlFor="content" className={styles.label}>
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            placeholder="게시글 내용을 입력하세요&#10;&#10;여러 줄로 작성할 수 있습니다."
            rows={20}
            required
          />
          <p className={styles.helpText}>
            {content.length}자 작성됨
          </p>
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            disabled={loading}
          >
            취소
          </Button>
          <Button
            type="submit"
            loading={loading}
            loadingText={isEditMode ? '수정 중...' : '작성 중...'}
            disabled={!title.trim() || !content.trim()}
          >
            {isEditMode ? '수정하기' : '작성하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}

