import { MetadataRoute } from 'next';
import { getPosts } from '@/app/actions/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/board`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // 동적 페이지 (게시글)
  let dynamicPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    dynamicPages = posts.map((post) => ({
      url: `${baseUrl}/board/${post.id}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Failed to generate sitemap for posts:', error);
  }

  return [...staticPages, ...dynamicPages];
}

