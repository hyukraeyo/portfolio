import { Project } from '@/types';

export function generateStructuredData(projects: Project[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Portfolio | 프론트엔드 개발자',
    description: '프론트엔드 개발자 포트폴리오 - Next.js, React, TypeScript를 활용한 현대적인 웹 애플리케이션 개발',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/board?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '프론트엔드 개발자',
    jobTitle: 'Frontend Developer',
    description: '프론트엔드 개발자 포트폴리오',
    url: baseUrl,
    sameAs: [
      'https://github.com',
      'https://linkedin.com',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Web Development',
    ],
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
        keywords: project.technologies.join(', '),
      },
    })),
  };

  return {
    website: websiteSchema,
    person: personSchema,
    portfolio: portfolioSchema,
  };
}

