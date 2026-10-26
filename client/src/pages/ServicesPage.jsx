import React from 'react';
import SEO from '../components/SEO';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import ServicesGrid from '../sections/ServicesGrid';
import CTASection from '../sections/CTASection';

const ServicesPage = () => {
  return (
    <>
      <SEO
        page="services"
        defaultTitle="IT Services & Software Development | System Polygon Pvt. Ltd."
        defaultDescription="Explore Syspoly's full suite of software development services: Web Development, Android/iOS App Development, AI Solutions, Digital Marketing, SEO, and Cloud Applications."
        canonicalUrl="https://syspoly.in/services"
      />

      <div className="pt-28 pb-12">
        <Container>
          <SectionHeading
            badge="Full Suite Capabilities"
            title="Our IT Services & Technical Offerings"
            subtitle="We provide end-to-end digital capabilities designed to accelerate software engineering, operational efficiency, and revenue."
          />
        </Container>
        
        <ServicesGrid />
        <CTASection />
      </div>
    </>
  );
};

export default ServicesPage;
