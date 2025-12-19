import { Project } from '@/types';
import { SITE_METADATA } from '@/lib/data/site';

export function generateStructuredData(projects: Project[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_METADATA.siteUrl;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/projects?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_METADATA.author,
    jobTitle: 'Frontend Developer',
    description: SITE_METADATA.description,
    url: baseUrl,
    sameAs: [
      SITE_METADATA.social.github,
      SITE_METADATA.social.linkedin,
      SITE_METADATA.social.blog,
    ].filter((url) => !url.includes('username')), // placeholder 제외
    knowsAbout: SITE_METADATA.keywords,
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '프로젝트 포트폴리오',
    description: '개발한 프로젝트 목록',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: project.liveUrl || project.githubUrl,
        image: project.image,
        keywords: (project.tech_stack || []).join(', '),
      },
    })),
  };

  return {
    website: websiteSchema,
    person: personSchema,
    portfolio: portfolioSchema,
  };
}
