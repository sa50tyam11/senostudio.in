import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About SENO Studio — India\'s Creative Agency | Our Story & Team',
  description:
    'Meet the team behind SENO Studio — India\'s full-service creative agency. We build high-performance websites, craft brand identities, run social media campaigns, and produce cinematic videos for startups and businesses across India.',
  alternates: {
    canonical: 'https://senostudio.in/about',
  },
  openGraph: {
    title: 'About SENO Studio — India\'s Creative Agency',
    description:
      'Learn the story, philosophy, and team behind SENO Studio — a creative powerhouse serving startups and businesses all across India.',
    url: 'https://senostudio.in/about',
    siteName: 'SENO Studio',
    images: [
      {
        url: '/seno-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'SENO Studio — About Us',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  keywords: [
    'SENO Studio about',
    'SENO Studio team',
    'creative agency India team',
    'web development studio India',
    'who is SENO Studio',
    'SENO Studio founder',
    'digital creative agency India',
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
