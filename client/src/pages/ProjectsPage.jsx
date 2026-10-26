import React from 'react';
import SEO from '../components/SEO';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import PortfolioSection from '../sections/PortfolioSection';
import CTASection from '../sections/CTASection';

const ProjectsPage = () => {
  return (
    <>
      <SEO
        page="projects"
        defaultTitle="Projects & Portfolio Case Studies | System Polygon Pvt. Ltd."
        defaultDescription="Browse Syspoly's completed software projects, SaaS platforms, mobile applications, e-commerce storefronts, and enterprise automation case studies."
        canonicalUrl="https://syspoly.in/projects"
      />

      <div className="pt-28 pb-12">
        <Container>
          <SectionHeading
            badge="Engineering Showcase"
            title="Our Portfolio & Case Studies"
            subtitle="Explore how we deliver custom web, mobile, SaaS and cloud engineering solutions for clients worldwide."
          />
        </Container>
        
        <PortfolioSection />
        <CTASection />
      </div>
    </>
  );
};

export default ProjectsPage;
