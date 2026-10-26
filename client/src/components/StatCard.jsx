import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Calendar, Users, Star, Award } from 'lucide-react';

const iconMap = {
  CheckCircle2,
  Calendar,
  Users,
  Star,
  Award
};

const StatCard = ({ stat, index = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const targetNumber = parseInt(stat.value, 10) || 0;
  const IconComponent = iconMap[stat.icon] || Award;

  useEffect(() => {
    if (!isInView || targetNumber === 0) return;

    let start = 0;
    const duration = 1600; // ms
    const increment = Math.ceil(targetNumber / (duration / 20));

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [isInView, targetNumber]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 border border-slate-200 bg-white hover:border-blue-400 transition-all group shadow-sm hover:shadow-md"
    >
      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
        <IconComponent className="w-5 h-5" />
      </div>

      <div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center leading-none">
          <span>{count}</span>
          <span className="text-blue-600">{stat.suffix || '+'}</span>
        </div>
        <p className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
          {stat.title}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;
