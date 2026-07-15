import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | SENO Studio',
  description: 'Ready to engineer your next digital empire? Get in touch with SENO Studio to start a project or request an MVP sprint.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
