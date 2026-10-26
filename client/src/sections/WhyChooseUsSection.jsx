import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users2, ShieldAlert, Handshake } from 'lucide-react';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';

const whyUsCards = [
  {
    num: '01',
    title: 'Business-Focused Solutions',
    description: 'We prioritize measurable commercial outcomes, high conversion rate optimization, and operational ROI.',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop'
  },
  {
    num: '02',
    title: 'Experienced Senior Engineers',
    description: '17+ years of hands-on software development experience across complex enterprise web, cloud & mobile architectures.',
    icon: Users2,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop'
  },
  {
    num: '03',
    title: 'Scalable & Secure Systems',
    description: 'Cloud-native multi-tenant infrastructure built with zero-trust security standards, auto-scaling, and low-latency databases.',
    icon: ShieldAlert,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop'
  },
  {
    num: '04',
    title: 'Long-Term Partnership',
    description: 'Continuous 24/7 server monitoring, performance telemetry tuning, and ongoing iterative feature upgrades.',
    icon: Handshake,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop'
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 sm:py-20 relative bg-slate-50 border-t border-slate-200">
      <Container>
        <SectionHeading
          badge="Why System Polygon"
          title="Technology That Works for Your Business"
          subtitle="We bridge the gap between complex software engineering and high-converting commercial execution."
          titleClassName="text-2xl sm:text-3xl font-extrabold"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsCards.map((card, idx) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Image header container */}
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                  {/* Icon badge */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 border border-slate-200 flex items-center justify-center text-blue-600 shadow-md backdrop-blur-md">
                    <card.icon className="w-5 h-5" />
                  </div>

                  {/* Number tag */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-lg bg-white/90 border border-slate-200 text-xs font-mono font-bold text-slate-800 backdrop-blur-md shadow-sm">
                    {card.num}
                  </div>
                </div>

                {/* Body content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>Enterprise Standard</span>
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUsSection;
