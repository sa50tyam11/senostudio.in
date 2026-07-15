import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Pricing | SENO Studio',
  description: 'From Interface Engineering to Full-Stack Builds. Explore our service offerings, process, and transparent pricing tiers.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
