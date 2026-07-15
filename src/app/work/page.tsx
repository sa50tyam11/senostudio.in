/**
 * app/work/page.tsx
 * ─────────────────────────────────────────────────────────────────
 * SENO Studio — Work page (/work)
 * ─────────────────────────────────────────────────────────────────
 */

'use client';

import React from 'react';
import { CaseStudiesSection } from '../../components/work/CaseStudiesSection';

const Work: React.FC = () => {
  return (
    <main id="work-main">
      <CaseStudiesSection />
    </main>
  );
};

export default Work;
