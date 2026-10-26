import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  DollarSign,
  Home,
  ShoppingCart,
  GraduationCap,
  Compass,
  Factory,
  Truck,
  Coffee,
  Rocket,
  Building2
} from 'lucide-react';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import { getIndustries } from '../services/api';

const iconMap = {
  Activity,
  DollarSign,
  Home,
  ShoppingCart,
  GraduationCap,
  Compass,
  Factory,
  Truck,
  Coffee,
  Rocket,
  Building2
};

const industryImages = {
  'Healthcare & HealthTech': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop',
  'Finance & FinTech': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop',
  'Real Estate & PropTech': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop',
  'E-commerce & Retail': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600&auto=format&fit=crop',
  'Education & EdTech': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
  'Travel & Tourism': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop',
  'Manufacturing': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
  'High-Growth Startups': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop'
};

const defaultIndustries = [
  { title: 'Healthcare & HealthTech', description: 'HIPAA-compliant telemedicine platforms, EHR integrations, patient portals, and AI diagnostics.', icon: 'Activity' },
  { title: 'Finance & FinTech', description: 'Secure digital banking gateways, algorithmic trading dashboards, and fraud prevention engines.', icon: 'DollarSign' },
  { title: 'Real Estate & PropTech', description: 'Virtual property tours, tenant CRM suites, automated lease management, and valuation portals.', icon: 'Home' },
  { title: 'E-commerce & Retail', description: 'Headless storefronts, personalized AI recommendation engines, and omnichannel inventory syncing.', icon: 'ShoppingCart' },
  { title: 'Education & EdTech', description: 'Interactive virtual classrooms, LMS courseware engines, adaptive testing, and gamified learning.', icon: 'GraduationCap' },
  { title: 'Travel & Tourism', description: 'Flight/hotel booking aggregators, dynamic itinerary planners, and localized audio tour guides.', icon: 'Compass' },
  { title: 'Manufacturing', description: 'Industry 4.0 IoT telemetry, supply chain tracking, predictive machine maintenance, and ERP.', icon: 'Factory' },
  { title: 'High-Growth Startups', description: 'Rapid MVP engineering, scalable multi-tenant SaaS foundation, and investor pitch prototyping.', icon: 'Rocket' }
];

const IndustriesSection = () => {
  const [industries, setIndustries] = useState(defaultIndustries);

  useEffect(() => {
    getIndustries()
      .then((res) => {
        if (res.data.success && res.data.data.length > 0) {
          setIndustries(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="industries" className="py-16 sm:py-20 relative bg-white border-t border-slate-200">
      <Container>
        <SectionHeading
          badge="Domain Expertise"
          title="Tailored Solutions Across Industries"
          subtitle="We deep-dive into industry specific compliance, workflows, and customer expectations to build domain-dominant digital products."
          titleClassName="text-2xl sm:text-3xl font-extrabold"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => {
            const IconComponent = iconMap[ind.icon] || Building2;
            const bgImg = ind.image || industryImages[ind.title] || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop';

            return (
              <motion.div
                key={ind._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 relative"
              >
                <div>
                  {/* Top Image header container */}
                  <div className="relative h-40 overflow-hidden bg-slate-100">
                    <img
                      src={bgImg}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                    {/* Icon Overlay Badge */}
                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 border border-slate-200 flex items-center justify-center text-blue-600 shadow-md backdrop-blur-md">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Domain pill */}
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-lg bg-white/90 border border-slate-200 text-xs font-mono font-bold text-slate-800 backdrop-blur-md shadow-sm">
                      Domain 0{idx + 1}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {ind.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {ind.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Industry Ready</span>
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default IndustriesSection;
