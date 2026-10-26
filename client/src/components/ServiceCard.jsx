import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Smartphone, Apple, TrendingUp, Search, Cpu, BarChart3, Zap, Wifi, Cloud, ShoppingBag, Share2, Server, Code } from 'lucide-react';

const iconMap = {
  Globe,
  Smartphone,
  Apple,
  TrendingUp,
  Search,
  Cpu,
  BarChart3,
  Zap,
  Wifi,
  Cloud,
  ShoppingBag,
  Share2,
  Server,
  Code
};

const serviceImages = {
  'website-development': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
  'android-app-development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop',
  'ios-app-development': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop',
  'digital-marketing': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=600&auto=format&fit=crop',
  'seo-content': 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?q=80&w=600&auto=format&fit=crop',
  'ai-development': 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop',
  'data-analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
  'business-automation': 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
  'iot-solutions': 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
  'cloud-applications': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
  'marketplace-development': 'https://images.unsplash.com/photo-1556742049-0a67568d04e3?q=80&w=600&auto=format&fit=crop',
  'social-media-marketing': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop',
  'server-management': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop'
};

const ServiceCard = ({ service, index = 0 }) => {
  const IconComponent = iconMap[service.icon] || Code;
  const coverImage = service.image || serviceImages[service.slug] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 relative"
    >
      <div>
        {/* Card Header Image */}
        <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
          <img
            src={coverImage}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

          {/* Icon Badge Overlay */}
          <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 border border-slate-200 flex items-center justify-center text-blue-600 shadow-md backdrop-blur-md">
            <IconComponent className="w-5 h-5" />
          </div>

          {/* Number Pill Overlay */}
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-lg bg-white/90 border border-slate-200 text-xs font-mono font-bold text-slate-800 backdrop-blur-md shadow-sm">
            0{index + 1}
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
            {service.shortDescription || service.description}
          </p>

          {service.features && service.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {service.features.slice(0, 3).map((feat, i) => (
                <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                  {feat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="px-6 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-slate-900 group/link transition-colors"
        >
          Explore Service Scope
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
