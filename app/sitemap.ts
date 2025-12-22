import { MetadataRoute } from 'next';
import { SITE_METADATA } from '@/lib/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_METADATA.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
