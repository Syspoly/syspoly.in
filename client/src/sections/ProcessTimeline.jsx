import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Palette, Code2, ShieldCheck, Rocket, HeartHandshake } from 'lucide-react';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'Requirements workshop, business goals definition, feasibility audit & tech stack selection.', icon: Search },
  { step: '02', title: 'Strategy', desc: 'Detailed technical roadmap, system architecture blueprint, milestones & API contract design.', icon: Compass },
  { step: '03', title: 'UI/UX Design', desc: 'Wireframing, interactive Figma prototypes, design system design tokens & accessibility checks.', icon: Palette },
  { step: '04', title: 'Development', desc: 'Agile sprint execution, clean code implementation, CI/CD pipeline setup & daily git commits.', icon: Code2 },
  { step: '05', title: 'Testing', desc: 'Automated unit tests, integration testing, cross-browser audits, security penetration & load testing.', icon: ShieldCheck },
  { step: '06', title: 'Launch', desc: 'Zero-downtime production deployment, DNS configuration, SSL certification & CDN caching.', icon: Rocket },
  { step: '07', title: 'Support & Growth', desc: '24/7 server monitoring, performance telemetry tuning, iterative feature additions & maintenance.', icon: HeartHandshake }
];

const ProcessTimeline = () => {
  return (
    <section className="py-20 sm:py-24 relative bg-white border-t border-slate-200 overflow-hidden">
      <Container>
        <SectionHeading
          badge="Our Engineering Process"
          title="From Idea to Scalable Digital Reality"
          subtitle="A battle-tested 7-step agile methodology that guarantees predictable delivery, high code quality, and zero launch surprises."
        />

        <div className="relative">
          {/* Vertical central line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-600 -translate-x-1/2 opacity-30"></div>

          <div className="space-y-8 sm:space-y-12">
            {processSteps.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`flex flex-col lg:flex-row items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Box */}
                  <div className="w-full lg:w-1/2 p-2 sm:p-4">
                    <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-200 bg-white shadow-sm relative">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold shrink-0">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
                            Phase {item.step}
                          </span>
                          <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed pl-14">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Circle Indicator */}
                  <div className="hidden lg:flex w-12 h-12 rounded-full bg-white border-2 border-blue-600 items-center justify-center text-blue-600 font-mono text-xs font-bold shadow-md z-10 my-4 shrink-0">
                    {item.step}
                  </div>

                  {/* Empty Spacer */}
                  <div className="hidden lg:block w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProcessTimeline;
