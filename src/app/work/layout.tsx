import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | SENO Studio',
  description: 'Explore the high-performance digital products, MVP sprints, and web experiences engineered by SENO Studio.',
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
