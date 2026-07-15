import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '../components/shared/SmoothScroll';
import { Preloader } from '../components/shared/Preloader';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  title: 'SENO Studio',
  description: 'Web design & engineering for fast-moving founders.',
};

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
        </SmoothScroll>
      </body>
    </html>
  );
}
