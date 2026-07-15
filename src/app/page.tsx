'use client';

import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { WhyUsSection } from '../components/home/WhyUsSection';

import { PricingSection } from '../components/home/PricingSection';
import { TechStackSection } from '../components/home/TechStackSection';
import { ClosingCTA } from '../components/shared/ClosingCTA';
import { DiagonalMarquee } from '../components/home/DiagonalMarquee';

const Home: React.FC = () => {
  return (
    <main id="home-main" className="relative">
      <div data-nav-theme="light">
        <Hero />
      </div>
      <div data-nav-theme="dark">
        <FeaturesSection />
      </div>
      
      <DiagonalMarquee />

      {/* Stacked PRD Layout */}
      <div data-nav-theme="light" className="relative z-10 w-full overflow-clip bg-[var(--color-electric-white)]">
        <ServicesSection />
        <ProcessSection />
        <WhyUsSection />

        <PricingSection />
        <TechStackSection />
        <div data-nav-theme="dark">
          <ClosingCTA />
        </div>
      </div>
    </main>
  );
};

export default Home;

