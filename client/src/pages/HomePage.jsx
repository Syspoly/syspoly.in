import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SEO from '../components/SEO';
import HeroSection from '../sections/HeroSection';
import TrustStrip from '../sections/TrustStrip';
import StatsSection from '../sections/StatsSection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import ServicesGrid from '../sections/ServicesGrid';
import FeaturedService from '../sections/FeaturedService';
import TechnologiesGrid from '../sections/TechnologiesGrid';
import IndustriesSection from '../sections/IndustriesSection';
import PortfolioSection from '../sections/PortfolioSection';
import ProcessTimeline from '../sections/ProcessTimeline';
import TestimonialsCarousel from '../sections/TestimonialsCarousel';
import CTASection from '../sections/CTASection';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <SEO
        page="home"
        defaultTitle="Syspoly | System Polygon Pvt. Ltd. - IT Services & Software Development"
        defaultDescription="System Polygon Pvt. Ltd. delivers high-performance website development, mobile apps, AI engineering, digital marketing, and enterprise software solutions."
        canonicalUrl="https://syspoly.in/"
      />

      {/* Top Reading Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00529B] via-[#0082C8] to-[#00A3E0] z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="space-y-0 overflow-hidden">
        <HeroSection />
        <TrustStrip />
        <StatsSection />
        <WhyChooseUsSection />
        <ServicesGrid />
        <FeaturedService />
        <TechnologiesGrid />
        <IndustriesSection />
        <PortfolioSection />
        <ProcessTimeline />
        <TestimonialsCarousel />
        <CTASection />
      </div>
    </>
  );
};

export default HomePage;
