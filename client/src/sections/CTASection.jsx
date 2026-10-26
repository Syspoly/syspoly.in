import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';

const CTASection = () => {
  return (
    <section className="py-20 sm:py-24 relative bg-white overflow-hidden border-t border-slate-200">
      {/* Background ambient pulse glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-transparent to-indigo-50/70 pointer-events-none"
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card rounded-3xl p-8 sm:p-14 border border-slate-200 bg-white shadow-2xl text-center max-w-4xl mx-auto overflow-hidden"
        >
          {/* Subtle badge */}
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-50 text-[#0082C8] border border-blue-200 mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0082C8] animate-pulse" />
            <span>Ready to accelerate your technical growth?</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Have an Idea? <span className="text-gradient-electric">Let's Build It.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Tell us about your project and our experts will help you turn your idea into a scalable digital product.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Start a Conversation
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button href="tel:+918561903387" variant="secondary" size="lg" icon={PhoneCall}>
                Call Us: +91 8561903387
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTASection;
