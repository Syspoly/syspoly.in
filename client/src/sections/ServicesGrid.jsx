import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import { Skeleton } from '../components/Loader';
import { getServices } from '../services/api';

const defaultServices = [
  {
    title: 'Website Development',
    slug: 'website-development',
    shortDescription: 'High-performance bespoke web applications & corporate portals built with React, Node.js & modern full-stack architectures.',
    icon: 'Globe',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    features: ['React & Next.js Architecture', 'Custom Headless CMS', 'High Traffic Scalability', 'Enterprise Security & SSL', 'Core Web Vitals 90+ Score']
  },
  {
    title: 'Android App Development',
    slug: 'android-app-development',
    shortDescription: 'Native Kotlin & Flutter Android apps with sleek UI, offline syncing, and seamless device API integrations.',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    features: ['Native Kotlin & Flutter', 'Background Push Notifications', 'Biometric Authentication', 'Offline Data Storage', 'Play Store Optimization']
  },
  {
    title: 'iOS App Development',
    slug: 'ios-app-development',
    shortDescription: 'Premium Swift & iOS applications engineered for Apple ecosystem elegance, safety, and high user retention.',
    icon: 'Apple',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    features: ['Swift & SwiftUI Native', 'CoreData & Realm DB', 'Apple Pay Integration', 'TestFlight & App Store Publishing', 'Ultra-fluid 120Hz Animations']
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    shortDescription: 'Data-driven omnichannel marketing campaigns engineered to increase targeted customer acquisition and ROI.',
    icon: 'TrendingUp',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop',
    features: ['Google Ads & Meta Ads', 'Conversion Funnel Strategy', 'ROI Attribution Tracking', 'Audience Segmentation', 'Landing Page Optimization']
  },
  {
    title: 'SEO & Content',
    slug: 'seo-content',
    shortDescription: 'Technical search engine optimization and authority content strategies that dominate Google organic rankings.',
    icon: 'Search',
    image: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?q=80&w=800&auto=format&fit=crop',
    features: ['Technical SEO Audits', 'Keyword Intent Research', 'Authority Backlink Outreach', 'Schema & Structured Data', 'Organic Traffic Growth Reports']
  },
  {
    title: 'AI Development',
    slug: 'ai-development',
    shortDescription: 'Custom Large Language Model (LLM) integrations, intelligent conversational agents, and predictive AI pipelines.',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    features: ['LLM & GPT Integrations', 'RAG Vector Search', 'Workflow Automation', 'Predictive Analytics', 'Conversational AI Chatbots']
  }
];

const ServicesGrid = () => {
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getServices()
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setServices(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch services, using default list:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="py-16 sm:py-20 relative bg-white border-t border-slate-200">
      <Container>
        <SectionHeading
          badge="Core Capabilities"
          title="Everything You Need to Build, Grow & Scale"
          subtitle="Full-cycle software development, digital marketing and intelligent cloud solutions tailored for modern business."
          titleClassName="text-2xl sm:text-3xl font-extrabold"
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 h-80 space-y-4 bg-white border border-slate-200">
                <Skeleton className="w-full h-40 rounded-xl" />
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-full h-16" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <ServiceCard key={service._id || service.slug} service={service} index={idx} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ServicesGrid;
