import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact SENO Studio — Hire a Creative Agency in India',
  description:
    'Ready to build something great? Contact SENO Studio — India\'s full-service creative agency for web development, branding, social media marketing, and video editing. Let\'s grow your brand together.',
  alternates: {
    canonical: 'https://senostudio.in/contact',
  },
  openGraph: {
    title: 'Contact SENO Studio — Hire a Creative Agency in India',
    description:
      'Get in touch with SENO Studio for website development, brand design, social media campaigns, or video editing. Serving startups and businesses all across India.',
    url: 'https://senostudio.in/contact',
    siteName: 'SENO Studio',
    images: [
      {
        url: '/seno-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact SENO Studio',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  keywords: [
    'contact SENO Studio',
    'hire creative agency India',
    'web development agency contact India',
    'get a website made India',
    'hire branding agency India',
    'social media agency contact India',
    'digital agency India contact',
    'SENO Studio contact',
    'start a project SENO',
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
