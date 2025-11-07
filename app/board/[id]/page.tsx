import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPost } from '@/app/actions/posts';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils/date';
import PostActions from '@/components/PostActions';
import styles from './[id].module.scss';

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

async function PostActionButtons({ postId, authorId }: { postId: string; authorId: string }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user || user.id !== authorId) return null;

  return <PostActions postId={postId} />;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  
  let post;
  try {
    post = await getPost(id);
  } catch (error) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/board" className={styles.backLink}>
          목록으로
        </Link>
        <PostActionButtons postId={id} authorId={post.author_id} />
      </div>
      
      <article className={styles.post}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <span className={styles.date}>
            작성일: {formatDate(post.created_at, { includeTime: true })}
          </span>
          {post.updated_at !== post.created_at && (
            <span className={styles.updated}>
              수정일: {formatDate(post.updated_at, { includeTime: true })}
            </span>
          )}
        </div>
        <div className={styles.content}>
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph || '\u00A0'}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

