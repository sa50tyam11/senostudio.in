import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '../components/shared/SmoothScroll';
import { Preloader } from '../components/shared/Preloader';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  metadataBase: new URL('https://senostudio.in'),
  title: 'SENO Studio | Digital Engineering',
  description: 'Web design & engineering for fast-moving founders. We do not just build websites. We engineer digital empires.',
  openGraph: {
    title: 'SENO Studio',
    description: 'Web design & engineering for fast-moving founders.',
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
