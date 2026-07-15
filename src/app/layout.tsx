import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '../components/shared/SmoothScroll';
import { Preloader } from '../components/shared/Preloader';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  metadataBase: new URL('https://senostudio.in'),
  title: 'SENO Studio | Best Web Development Company in Bihar',
  description: 'Startup website development, AI automation, digital marketing, and SEO friendly website design services near me. SENO Studio builds high-performance websites.',
  openGraph: {
    title: 'SENO Studio | Best Web Development Company in Bihar',
    description: 'Startup website development, AI automation, digital marketing, and SEO friendly website design services.',
    url: 'https://senostudio.in',
    siteName: 'SENO Studio',
    images: [
      {
        url: '/seno-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'SENO Studio Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SENO Studio',
    description: 'Web design & engineering for fast-moving founders.',
    images: ['/seno-logo.jpg'],
  },
  icons: {
    icon: '/seno-logo.jpg',
    shortcut: '/seno-logo.jpg',
    apple: '/seno-logo.jpg',
  },
  verification: {
    google: 'PGRVMf0A5nTeiAmygn-917XwkSWKe8FjD2MWexa61p0',
  },
};

import HoverFooter from '../components/HoverFooter';
import { WhatsAppWidget } from '../components/shared/WhatsAppWidget';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll>
          <Preloader />
          <Navbar />
          {children}
          <HoverFooter />
          <WhatsAppWidget />
        </SmoothScroll>
      </body>
    </html>
  );
}
