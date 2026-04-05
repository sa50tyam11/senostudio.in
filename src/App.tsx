import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import AboutUsSection from './components/ui/about-us-section';
import { SocialProof } from './components/SocialProof';
import { ProcessSection } from './components/ProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { StatsSection } from './components/StatsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { Testimonials, CtaSection } from './components/CtaSection';
import HoverFooter from './components/HoverFooter';

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-emerald-500/30 selection:text-white">
      {/* GLOBAL CINEMATIC VIDEO BACKGROUND */}
      <div className="fixed inset-0 -z-50">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover saturate-[1.2] contrast-[1.1] brightness-[1.1] opacity-40"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/60" /> {/* Master dimming overlay */}
      </div>

      <Navbar />
      <main>
        <HeroSection />
        <AboutUsSection />
        <SocialProof />
        <ProcessSection />
        <ServicesSection />
        <StatsSection />
        <PortfolioSection />
        <FeaturesGrid />
        <Testimonials />
        <CtaSection />
      </main>
      <HoverFooter />
    </div>
  );
}

export default App;
