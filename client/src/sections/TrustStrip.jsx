import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Home,
  Globe,
  Compass,
  Factory,
  Cpu,
  Activity,
  Truck,
  Zap,
  Rocket
} from 'lucide-react';
import Container from '../components/Container';

const partners = [
  { name: 'Vanguard Capital', icon: Building2 },
  { name: 'Apex Housing Solutions', icon: Home },
  { name: 'LuxeLiving Direct', icon: Globe },
  { name: 'Wanderlust Global', icon: Compass },
  { name: 'Precision Manufacturing', icon: Factory },
  { name: 'Digital Horizons', icon: Cpu },
  { name: 'HealthPulse AI', icon: Activity },
  { name: 'OmniLogistics', icon: Truck },
  { name: 'Quantum Robotics', icon: Zap },
  { name: 'AeroSpace Next', icon: Rocket }
];

// Duplicate for continuous seamless marquee loop
const marqueeList = [...partners, ...partners];

const TrustStrip = () => {
  return (
    <section className="py-10 bg-white border-y border-slate-200 relative overflow-hidden">
      <Container>
        <p className="text-center text-[11px] uppercase tracking-widest text-slate-500 font-mono font-bold mb-6">
          Trusted by high-growth startups & global enterprise leaders
        </p>
      </Container>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left & Right Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 25,
            repeat: Infinity
          }}
          className="flex items-center gap-4 sm:gap-6 whitespace-nowrap"
        >
          {marqueeList.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs font-bold text-slate-700 tracking-wide hover:border-blue-500/40 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all duration-300 cursor-default shrink-0"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{item.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStrip;
