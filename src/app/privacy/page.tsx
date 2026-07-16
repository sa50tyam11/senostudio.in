'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../../components/shared/SectionHeader';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#F7F6F0] pt-32 pb-24 px-6 md:px-10 selection:bg-[#6C63FF] selection:text-[#F7F6F0]">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl border border-[var(--border-light)] shadow-sm">
        <SectionHeader
          eyebrow="/ Legal"
          title="Privacy Policy"
          subtext="Effective Date: September 2024"
          className="mb-12"
        />

        <div className="space-y-8 text-[var(--color-ink)] font-body leading-relaxed">
          <section>
            <h2 className="text-2xl font-display italic font-semibold mb-4 text-[#6C63FF]">1. Information We Collect</h2>
            <p className="text-[var(--color-muted)]">
              When you contact SENO Web Studio via our inquiry forms or email, we collect personal information such as your name, email address, company name, and project details (including budget ranges). We only collect what is strictly necessary to understand your project and communicate effectively.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display italic font-semibold mb-4 text-[#6C63FF]">2. How We Use Your Data</h2>
            <p className="text-[var(--color-muted)]">
              The information you provide is used exclusively to:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-[var(--color-muted)] ml-4">
              <li>Respond to your inquiries and provide accurate project quotes.</li>
              <li>Deliver our web development, design, and automation services.</li>
              <li>Send important updates regarding your project.</li>
            </ul>
            <p className="mt-4 text-[var(--color-muted)]">
              <strong>We do not sell, rent, or share your personal data with third parties for marketing purposes.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display italic font-semibold mb-4 text-[#6C63FF]">3. Data Security & Protection</h2>
            <p className="text-[var(--color-muted)]">
              We implement strict industry-standard security measures to protect your personal information and project details against unauthorized access, alteration, disclosure, or destruction. Any sensitive information shared during the discovery phase remains strictly confidential between you and SENO Web Studio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display italic font-semibold mb-4 text-[#6C63FF]">4. Cookies and Analytics</h2>
            <p className="text-[var(--color-muted)]">
              Our website may use standard analytics tools to measure traffic and performance. This data is aggregated and anonymized, used solely to improve our website experience and performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display italic font-semibold mb-4 text-[#6C63FF]">5. Your Rights</h2>
            <p className="text-[var(--color-muted)]">
              You have the right to request access to the personal data we hold about you, or ask that we delete it. To exercise these rights, please contact us directly at <a href="mailto:senowebstudio@gmail.com" className="text-[#6C63FF] hover:underline">senowebstudio@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
