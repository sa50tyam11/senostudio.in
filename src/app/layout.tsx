import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '../components/shared/SmoothScroll';
import { Preloader } from '../components/shared/Preloader';
import { Navbar } from '../components/Navbar';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://senostudio.in'),

  // ─── Primary Title & Description ───────────────────────────────────────────
  title: {
    default: 'SENO Studio — Creative Agency India | Web, Brand, Social & Video',
    template: '%s | SENO Studio',
  },
  description:
    'SENO Studio is India\'s creative powerhouse — web development, brand identity, social media marketing, and video editing. Startups to enterprises, we build digital presence that grows with you. Serving all of India.',

  // ─── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: 'https://senostudio.in',
  },

  // ─── SEO Keywords (competitor-researched) ──────────────────────────────────
  keywords: [
    // Brand name variations (critical for "SENO" autocomplete)
    'SENO Studio',
    'SENO',
    'senostudio',
    'senostudio.in',
    'SENO creative agency',
    'SENO web development',
    'SENO Studio India',
    // Web development
    'web development company India',
    'best web development agency India',
    'website design company India',
    'custom website development India',
    'Next.js development India',
    'React website development India',
    'startup website design India',
    'affordable web development India',
    'SEO friendly website design India',
    'high performance website India',
    // Branding
    'brand identity design India',
    'logo design agency India',
    'branding agency India',
    'brand design studio India',
    'creative branding agency India',
    // Social media
    'social media marketing agency India',
    'social media management India',
    'Instagram marketing agency India',
    'content marketing agency India',
    'digital marketing company India',
    // Video editing
    'video editing agency India',
    'video production company India',
    'reels editing agency India',
    'YouTube video editing India',
    'cinematic video editing India',
    // Full-service / competitors’ gaps
    'full service creative agency India',
    'full service digital agency India',
    'creative studio India',
    'digital studio India',
    'growth agency India',
    'one stop digital agency India',
  ],

  // ─── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ─── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    title: 'SENO Studio — Creative Agency India | Web, Brand, Social & Video',
    description:
      'Web development • Brand identity • Social media marketing • Video editing — all under one roof. India\'s creative studio for startups, founders, and businesses ready to grow.',
    url: 'https://senostudio.in',
    siteName: 'SENO Studio',
    images: [
      {
        url: '/seno-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'SENO Studio — Creative Agency India',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },

  // ─── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'SENO Studio — Where Brands Come Alive',
    description: 'Websites • Brands • Social media • Video. One studio. All of India.',
    images: ['/seno-logo.jpg'],
    site: '@senostudio',
    creator: '@senostudio',
  },

  // ─── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: '/seno-logo.jpg',
    shortcut: '/seno-logo.jpg',
    apple: '/seno-logo.jpg',
  },

  // ─── Google Search Console Verification ────────────────────────────────────
  verification: {
    google: 'PGRVMf0A5nTeiAmygn-917XwkSWKe8FjD2MWexa61p0',
  },

  // ─── Category ──────────────────────────────────────────────────────────────
  category: 'Creative Agency',
};

// ─── JSON-LD Structured Data (helps Google know SENO = SENO Studio) ──────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SENO Studio',
  alternateName: ['SENO', 'senostudio', 'SENO Creative Agency'],
  url: 'https://senostudio.in',
  logo: 'https://senostudio.in/seno-logo.jpg',
  image: 'https://senostudio.in/seno-logo.jpg',
  description:
    'SENO Studio is a full-service creative agency in India offering web development, brand identity design, social media marketing, and video editing services.',
  foundingDate: '2024',
  areaServed: 'IN',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://senostudio.in/contact',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://www.instagram.com/senostudio',
    'https://www.linkedin.com/company/senostudio',
    'https://twitter.com/senostudio',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'SENO Studio Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Editing' } },
    ],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SENO Studio',
  alternateName: 'SENO',
  url: 'https://senostudio.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://senostudio.in/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

import HoverFooter from '../components/HoverFooter';
import { WhatsAppWidget } from '../components/shared/WhatsAppWidget';
import { FloatingNav } from '../components/shared/FloatingNav';
import { ClientPreloader } from '../components/shared/Preloader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD: Organization schema — teaches Google that "SENO" = SENO Studio */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* JSON-LD: WebSite schema — enables Google Sitelinks Search Box */}
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">
        <SmoothScroll>
          <ClientPreloader />
          <FloatingNav />
          {children}
          <HoverFooter />
          <WhatsAppWidget />
        </SmoothScroll>
      </body>
    </html>
  );
}
