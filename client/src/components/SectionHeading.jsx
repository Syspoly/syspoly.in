import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({
  badge,
  title,
  subtitle,
  centered = true,
  className = '',
  titleClassName = 'text-2xl sm:text-3xl lg:text-4xl'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-10 sm:mb-12 ${centered ? 'text-center' : 'text-left'} ${className}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 mb-3 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          {badge}
        </span>
      )}
      {title && (
        <h2 className={`font-extrabold text-slate-900 tracking-tight leading-tight ${titleClassName}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`mt-3 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
