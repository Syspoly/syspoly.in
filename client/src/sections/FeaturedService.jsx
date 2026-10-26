import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Code, Smartphone, Server, Zap, ShieldCheck } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';

const capabilities = [
  { title: 'Web Applications', desc: 'Bespoke React, Next.js & Node.js cloud portals' },
  { title: 'Mobile Applications', desc: 'Native Kotlin & Swift iOS/Android smartphone apps' },
  { title: 'SaaS Platforms', desc: 'Multi-tenant cloud architectures with recurring billing' },
  { title: 'Enterprise Software', desc: 'Custom ERP, CRM and internal operational tools' },
  { title: 'API Integrations', desc: 'High-throughput microservices & payment gateways' }
];

const FeaturedService = () => {
  return (
    <section className="py-16 sm:py-20 relative bg-cover bg-center bg-no-repeat border-t border-slate-200 overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop')`
      }}
    >
      {/* Light gradient overlay for high text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-slate-50/90 backdrop-blur-[2px]"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600 animate-pulse" />
              Featured Solution
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Custom Software & <span className="text-gradient-electric">App Development</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We turn complex technical specifications into intuitive, robust digital products engineered for long-term scalability and business growth.
            </p>

            {/* Capability cards with staggered entrance animation */}
            <div className="space-y-3 pt-1">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/95 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all duration-300 shadow-sm"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{cap.title}</h4>
                    <p className="text-xs text-slate-500">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-2">
              <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Talk to an Expert
              </Button>
            </div>
          </motion.div>

          {/* Right Dashboard Visual with continuous float animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative glass-card rounded-2xl p-6 sm:p-8 border border-slate-200/90 bg-white/95 shadow-2xl space-y-6 backdrop-blur-md"
            >
              
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-200">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Syspoly App Hub</h4>
                    <span className="text-xs text-emerald-600 flex items-center gap-1 font-mono font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      Deployment Live
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-md border border-slate-200 font-bold">
                  v2.6.0-stable
                </span>
              </div>

              {/* Grid cards inside illustration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <div className="text-xs text-slate-500 font-medium">Mobile API Traffic</div>
                  <div className="text-lg font-bold text-slate-900">2.4M Req/Day</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <Server className="w-5 h-5 text-indigo-600" />
                  <div className="text-xs text-slate-500 font-medium">Database Latency</div>
                  <div className="text-lg font-bold text-slate-900">&lt; 14ms Avg</div>
                </div>
              </div>

              {/* Status bar */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-slate-800">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold">Auto-scaling ready across AWS & GCP</span>
                </div>
                <span className="font-mono text-blue-700 font-bold">100% SLA</span>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default FeaturedService;
