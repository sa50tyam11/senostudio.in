'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../../components/shared/SectionHeader';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#F7F6F0] pt-32 pb-24 px-6 md:px-10 selection:bg-[#6C63FF] selection:text-[#F7F6F0]">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl border border-[var(--border-light)] shadow-sm">
        <SectionHeader
          eyebrow="/ Legal"
          title="Terms & Security"
          subtext="Effective Date: September 2024"
          className="mb-12"
        />

        <div className="space-y-8 text-[var(--color-ink)] font-body leading-relaxed">
          <section>
            <h2 className="text-2xl font-display italic font-semibold mb-4 text-[#6C63FF]">1. Intellectual Property & Site Protection</h2>
            <p className="text-[var(--color-muted)] mb-4">
              <strong>All content on this website (senostudio.in) is the exclusive intellectual property of SENO Web Studio.</strong>
            </p>
            <p className="text-[var(--color-muted)]">
              This includes, but is not limited to, the custom source code, UI/UX design, graphics, text, animations, micro-interactions, branding, and layouts. 
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-[var(--color-muted)] ml-4">
              <li>You may not scrape, clone, copy, or redistribute any part of this website.</li>
              <li>Unauthorized use of our proprietary code or design assets is strictly prohibited and protected under copyright law.</li>
              <li>SENO Web Studio actively monitors for unauthorized clones of our site architecture and design.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display italic font-semibold mb-4 text-[#6C63FF]">2. Client Confidentiality (NDA)</h2>
            <p className="text-[var(--color-muted)]">
              We treat all client inquiries with the highest level of confidentiality. Any ideas, business plans, or proprietary information you share with us through our contact forms or discovery calls will remain entirely secure and will not be disclosed to third parties without your explicit consent. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display italic font-semibold mb-4 text-[#6C63FF]">3. Project Engagements</h2>
            <p className="text-[var(--color-muted)]">
              By engaging with SENO Web Studio for a project (e.g., Spark, Current, or Grid tiers), a separate, detailed Master Services Agreement (MSA) and Statement of Work (SOW) will be provided. Those documents will supersede these general website terms regarding deliverables, timelines, and payment structures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display italic font-semibold mb-4 text-[#6C63FF]">4. Limitation of Liability</h2>
            <p className="text-[var(--color-muted)]">
              While we strive to provide the highest quality of work, SENO Web Studio is not liable for any indirect, incidental, or consequential damages arising from the use of our website or services before a formal contract is signed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display italic font-semibold mb-4 text-[#6C63FF]">5. Contact Us</h2>
            <p className="text-[var(--color-muted)]">
              For any questions regarding these terms, intellectual property, or security, please contact us at <a href="mailto:senowebstudio@gmail.com" className="text-[#6C63FF] hover:underline">senowebstudio@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
