import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Web Dev, Branding, Social Media & Video | SENO Studio',
  description:
    'SENO Studio offers end-to-end creative services across India: custom web development, brand identity design, social media marketing, content creation, and video editing. One agency. Every solution.',
  alternates: {
    canonical: 'https://senostudio.in/services',
  },
  openGraph: {
    title: 'Services — Web Dev, Branding, Social Media & Video | SENO Studio',
    description:
      'From blazing-fast websites to bold brand identities, scroll-stopping social media content, and cinematic video edits — SENO Studio is your all-in-one creative partner across India.',
    url: 'https://senostudio.in/services',
    siteName: 'SENO Studio',
    images: [
      {
        url: '/seno-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'SENO Studio Services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  keywords: [
    'web development services India',
    'brand identity design India',
    'social media marketing services India',
    'video editing services India',
    'creative agency services India',
    'digital marketing services India',
    'logo design India',
    'content creation agency India',
    'reels creation India',
    'startup web design India',
    'SENO Studio services',
    'affordable creative agency India',
    'full stack web development India',
  ],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
