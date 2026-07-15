import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | SENO Studio',
  description: 'We are a digital product studio built for fast-moving founders. Learn about our philosophy, tech stack, and the founder behind SENO.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
