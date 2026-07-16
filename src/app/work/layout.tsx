import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work & Portfolio — SENO Studio | Creative Projects India',
  description:
    'Browse SENO Studio\'s portfolio of high-performance websites, brand identities, social media campaigns, and video projects delivered for clients across India. See what we can build for you.',
  alternates: {
    canonical: 'https://senostudio.in/work',
  },
  openGraph: {
    title: 'Our Work & Portfolio | SENO Studio',
    description:
      'From stunning website launches to viral social campaigns — explore SENO Studio\'s work for startups and brands across India.',
    url: 'https://senostudio.in/work',
    siteName: 'SENO Studio',
    images: [
      {
        url: '/seno-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'SENO Studio Portfolio',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  keywords: [
    'SENO Studio portfolio',
    'web design portfolio India',
    'creative agency portfolio India',
    'brand design case studies India',
    'website projects India',
    'digital agency work India',
    'SENO Studio projects',
    'best web design work India',
  ],
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
