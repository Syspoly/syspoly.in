import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import { Skeleton } from '../components/Loader';
import { getProjects } from '../services/api';

const categories = ['All', 'Web', 'Mobile', 'E-commerce', 'SaaS', 'UI/UX', 'Digital Marketing'];

const defaultProjects = [
  {
    _id: 'proj-1',
    title: 'Next-Gen E-commerce Storefront',
    slug: 'ecommerce-platform',
    category: 'E-commerce',
    client: 'LuxeLiving Direct',
    industry: 'E-commerce',
    description: 'Headless e-commerce storefront with sub-second page loads, 3D product customizer, and localized global checkout.',
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop',
    projectUrl: 'https://syspoly.in/demo/ecommerce',
    isPublished: true
  },
  {
    _id: 'proj-2',
    title: 'Property Management SaaS Platform',
    slug: 'property-management',
    category: 'SaaS',
    client: 'Apex Housing Solutions',
    industry: 'Real Estate',
    description: 'An all-in-one multi-tenant SaaS application managing tenant onboarding, rent collection, auto-maintenance requests, and financial reporting.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
    projectUrl: 'https://syspoly.in/demo/property-management',
    isPublished: true
  },
  {
    _id: 'proj-3',
    title: 'Fintech Wealth & Advisory Engine',
    slug: 'finance-services',
    category: 'Web',
    client: 'Vanguard Capital Partners',
    industry: 'Finance',
    description: 'High-security financial advisor hub offering automated portfolio rebalancing, risk scoring, and real-time market data streaming.',
    technologies: ['React', 'Express.js', 'PostgreSQL', 'Chart.js', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000&auto=format&fit=crop',
    projectUrl: 'https://syspoly.in/demo/finance',
    isPublished: true
  },
  {
    _id: 'proj-4',
    title: 'Global Travel & Tourism Platform',
    slug: 'travel-tourism-platform',
    category: 'Mobile',
    client: 'Wanderlust Adventures',
    industry: 'Travel & Tourism',
    description: 'Cross-platform mobile application giving travelers offline GPS maps, dynamic itinerary generation, and instant hotel/flight bookings.',
    technologies: ['Flutter', 'Node.js', 'MongoDB', 'Mapbox SDK', 'GraphQL'],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop',
    projectUrl: 'https://syspoly.in/demo/travel',
    isPublished: true
  },
  {
    _id: 'proj-5',
    title: 'Industrial Business Automation System',
    slug: 'business-automation-system',
    category: 'SaaS',
    client: 'Precision Tech Manufacturing',
    industry: 'Manufacturing',
    description: 'Enterprise ERP and automated floor production dashboard linking IoT assembly sensors directly to inventory billing.',
    technologies: ['React', 'Python', 'PostgreSQL', 'Docker', 'MQTT'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    projectUrl: 'https://syspoly.in/demo/automation',
    isPublished: true
  },
  {
    _id: 'proj-6',
    title: 'Wix Studio Enterprise Customization Suite',
    slug: 'wix-studio',
    category: 'UI/UX',
    client: 'Digital Horizons Agency',
    industry: 'Digital Marketing',
    description: 'Custom full-stack web extensions and fluid UI design system for enterprise agency scale.',
    technologies: ['React', 'JavaScript', 'CSS3', 'REST API', 'Figma'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    projectUrl: 'https://syspoly.in/demo/wix-studio',
    isPublished: true
  }
];

const PortfolioSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getProjects(activeCategory)
      .then((res) => {
        if (!isMounted) return;
        if (res.data?.success && Array.isArray(res.data.data)) {
          setProjects(res.data.data);
        } else {
          // Filter fallback data if API returns empty
          const filtered = activeCategory === 'All'
            ? defaultProjects
            : defaultProjects.filter((p) => p.category === activeCategory);
          setProjects(filtered);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch projects, using fallback:', err);
        if (!isMounted) return;
        const filtered = activeCategory === 'All'
          ? defaultProjects
          : defaultProjects.filter((p) => p.category === activeCategory);
        setProjects(filtered);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  return (
    <section id="portfolio" className="py-20 sm:py-24 relative bg-slate-50 border-t border-slate-200">
      <Container>
        <SectionHeading
          badge="Case Studies"
          title="Selected Work & Engineering Milestones"
          subtitle="Explore how we built high-impact custom software, mobile apps and digital platforms for our global client partners."
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 h-80 space-y-4 bg-white border border-slate-200">
                <Skeleton className="w-full h-44 rounded-xl" />
                <Skeleton className="w-2/3 h-6" />
                <Skeleton className="w-full h-12" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-2xl bg-white border border-slate-200">
            <p className="text-slate-500 text-sm">No projects found for category "{activeCategory}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <ProjectCard key={proj._id || proj.slug} project={proj} index={idx} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default PortfolioSection;
