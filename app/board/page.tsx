import { Suspense } from 'react';
import { getPosts } from '@/app/actions/posts';
import PostCard from '@/components/PostCard';
import WriteButton from '@/components/WriteButton';
import styles from './board.module.scss';
import Loading from '@/app/loading';

async function PostList() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className={styles.emptyTitle}>아직 작성된 게시글이 없습니다</h2>
        <p className={styles.emptyDescription}>
          첫 번째 게시글을 작성해보세요!
        </p>
        <div className={styles.emptyAction}>
          <WriteButton />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default async function BoardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>게시판</h1>
        <WriteButton />
      </div>
      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </div>
  );
}

