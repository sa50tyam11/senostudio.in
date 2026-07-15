import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // We don't want Google crawling our API routes
    },
    sitemap: 'https://senostudio.in/sitemap.xml',
  };
}
