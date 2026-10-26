import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, ShieldCheck, Terminal, Layers, Cpu, Activity, CheckCircle } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] pt-36 pb-24 flex items-center overflow-hidden bg-white bg-grid-pattern">
      {/* Background soft ambient lighting mesh blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-50/70 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-indigo-50/60 rounded-full blur-[130px] pointer-events-none"></div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-50 text-[#0082C8] border border-blue-200 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#0082C8] animate-pulse" />
              <span>Next-Gen Enterprise IT & Software Engineering</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]"
            >
              Build Digital Products <br className="hidden sm:inline" />
              That Move Your <span className="text-gradient-electric">Business Forward</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal"
            >
              We design and develop high-performance websites, mobile apps and intelligent digital solutions that help businesses scale globally.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Start Your Project
              </Button>
              <Button to="/projects" variant="secondary" size="lg">
                Explore Our Work
              </Button>
            </motion.div>

            {/* Trust highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs font-bold text-slate-600"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4.5 h-4.5 text-[#0082C8] shrink-0" />
                <span>Clean Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
                <span>AI-Ready Platforms</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Technology Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Floating Pill Badge Top Right */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-4 z-20 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-xl text-xs font-bold text-slate-800"
              >
                <CheckCircle className="w-4 h-4 text-[#0082C8]" />
                <span>Full-Stack MERN & Cloud</span>
              </motion.div>

              {/* Floating Pill Badge Bottom Left */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-4 z-20 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-xl text-xs font-bold text-slate-800"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>99.99% Enterprise SLA</span>
              </motion.div>

              {/* Modern Code/Dashboard Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 bg-white shadow-2xl space-y-5"
              >
                
                {/* Code Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#0082C8]" />
                    syspoly-stack.config.ts
                  </span>
                </div>

                {/* Floating Metric 1 */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0082C8] flex items-center justify-center border border-blue-200">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Uptime & SLA</div>
                      <div className="text-sm font-bold text-slate-900">99.99% Enterprise Uptime</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Active
                  </span>
                </div>

                {/* Floating Metric 2 */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Performance Score</div>
                      <div className="text-sm font-bold text-slate-900">Lighthouse 98 / 100</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#0082C8] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 font-bold">Optimized</span>
                </div>

                {/* Code Snippet preview */}
                <div className="p-4 rounded-xl bg-slate-900 font-mono text-xs text-slate-200 space-y-1.5 border border-slate-800 shadow-xl">
                  <div className="text-slate-400">// Syspoly Production Pipeline</div>
                  <div><span className="text-violet-400">const</span> <span className="text-blue-300">app</span> = <span className="text-amber-300">createEnterpriseApp</span>({'({'})</div>
                  <div className="pl-4 text-emerald-400">stack: <span className="text-slate-200">['React', 'Node.js', 'MongoDB', 'Cloud']</span>,</div>
                  <div className="pl-4 text-emerald-400">scalability: <span className="text-slate-200">'Unlimited'</span>,</div>
                  <div className="pl-4 text-emerald-400">security: <span className="text-slate-200">'Zero-Trust'</span></div>
                  <div>{'})'};</div>
                </div>

              </motion.div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
