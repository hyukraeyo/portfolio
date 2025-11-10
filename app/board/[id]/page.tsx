import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getPost } from '@/app/actions/posts';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils/date';
import PostActions from '@/components/PostActions';
import styles from './[id].module.scss';

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const post = await getPost(id);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
    
    return {
      title: `${post.title} | 게시판`,
      description: post.content.slice(0, 160) || post.title,
      openGraph: {
        title: post.title,
        description: post.content.slice(0, 160) || post.title,
        type: 'article',
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
        url: `${baseUrl}/board/${id}`,
      },
      twitter: {
        card: 'summary',
        title: post.title,
        description: post.content.slice(0, 160) || post.title,
      },
    };
  } catch {
    return {
      title: '게시글을 찾을 수 없습니다',
    };
  }
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.content.slice(0, 160) || post.title,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    url: `${baseUrl}/board/${id}`,
  };

  return (
    <div className={styles.container}>
      <Script
        id={`structured-data-article-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
            <p key={`paragraph-${index}`}>{paragraph || '\u00A0'}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

