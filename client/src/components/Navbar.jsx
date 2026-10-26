import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  Code,
  Smartphone,
  TrendingUp,
  Search,
  Cpu,
  Zap,
  Cloud,
  Building2,
  DollarSign,
  Home,
  ShoppingCart,
  GraduationCap,
  Compass,
  Factory,
  Rocket,
  ArrowRight
} from 'lucide-react';
import Button from './Button';

const servicesDropdown = [
  { name: 'Website Development', path: '/services/website-development', icon: Code, desc: 'High-performance web apps & corporate portals' },
  { name: 'App Development', path: '/services/android-app-development', icon: Smartphone, desc: 'Native Kotlin & iOS mobile apps' },
  { name: 'Digital Marketing', path: '/services/digital-marketing', icon: TrendingUp, desc: 'Targeted customer acquisition & high ROI' },
  { name: 'SEO & Content', path: '/services/seo-content', icon: Search, desc: 'Dominate organic search engine rankings' },
  { name: 'AI & Data Analytics', path: '/services/ai-development', icon: Cpu, desc: 'LLM agents & intelligent data pipelines' },
  { name: 'Business Automation', path: '/services/business-automation', icon: Zap, desc: 'RPA workflows & API middleware' },
  { name: 'Cloud & IoT', path: '/services/cloud-applications', icon: Cloud, desc: 'Cloud-native SaaS & telemetry platforms' }
];

const industriesDropdown = [
  { name: 'Healthcare & HealthTech', icon: Building2 },
  { name: 'Finance & FinTech', icon: DollarSign },
  { name: 'Real Estate & PropTech', icon: Home },
  { name: 'E-commerce & Retail', icon: ShoppingCart },
  { name: 'Education & EdTech', icon: GraduationCap },
  { name: 'Travel & Tourism', icon: Compass },
  { name: 'Manufacturing & Industry 4.0', icon: Factory },
  { name: 'High-Growth Startups', icon: Rocket }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official Syspoly Logo Image */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="System Polygon Pvt. Ltd."
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 px-4 py-1.5 rounded-full border border-slate-200">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                location.pathname === '/'
                  ? 'text-[#0082C8] bg-white shadow-sm border border-slate-200'
                  : 'text-slate-700 hover:text-[#0082C8] hover:bg-white/60'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  location.pathname.startsWith('/services')
                    ? 'text-[#0082C8] bg-white shadow-sm border border-slate-200'
                    : 'text-slate-700 hover:text-[#0082C8] hover:bg-white/60'
                }`}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-[#0082C8]' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-[440px] mt-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-300/60"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {servicesDropdown.map((svc) => (
                        <Link
                          key={svc.name}
                          to={svc.path}
                          className="flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-slate-50 group/item transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD] text-[#0082C8] group-hover/item:bg-[#0082C8] group-hover/item:text-white transition-colors">
                            <svc.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover/item:text-[#0082C8] transition-colors">
                              {svc.name}
                            </div>
                            <div className="text-xs text-slate-500 font-normal">
                              {svc.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex justify-between items-center px-2 text-xs">
                      <span className="text-slate-500">Need custom software architecture?</span>
                      <Link to="/services" className="text-[#0082C8] font-bold flex items-center gap-1 hover:underline">
                        View All Services <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('industries')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-700 hover:text-[#0082C8] hover:bg-white/60 transition-all"
              >
                Industries
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'industries' ? 'rotate-180 text-[#0082C8]' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'industries' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-80 mt-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-300/60"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {industriesDropdown.map((ind) => (
                        <Link
                          key={ind.name}
                          to="/#industries"
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#0082C8] text-xs font-semibold transition-colors"
                        >
                          <ind.icon className="w-4 h-4 text-[#0082C8]" />
                          {ind.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/projects"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                location.pathname.startsWith('/projects')
                  ? 'text-[#0082C8] bg-white shadow-sm border border-slate-200'
                  : 'text-slate-700 hover:text-[#0082C8] hover:bg-white/60'
              }`}
            >
              Projects
            </Link>

            <Link
              to="/about"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                location.pathname === '/about'
                  ? 'text-[#0082C8] bg-white shadow-sm border border-slate-200'
                  : 'text-slate-700 hover:text-[#0082C8] hover:bg-white/60'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                location.pathname === '/contact'
                  ? 'text-[#0082C8] bg-white shadow-sm border border-slate-200'
                  : 'text-slate-700 hover:text-[#0082C8] hover:bg-white/60'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button to="/contact" variant="primary" size="md" icon={ArrowRight}>
              Get Started
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-[#0082C8] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#0082C8]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col gap-2">
              <Link to="/" className="px-4 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-100">
                Home
              </Link>
              <div className="px-4 py-1.5 font-bold text-xs uppercase text-[#0082C8] tracking-wider">
                Services
              </div>
              <div className="pl-4 grid grid-cols-1 gap-1">
                {servicesDropdown.map((svc) => (
                  <Link key={svc.name} to={svc.path} className="flex items-center gap-2 py-2 text-sm text-slate-700 hover:text-[#0082C8]">
                    <svc.icon className="w-4 h-4 text-[#0082C8]" />
                    {svc.name}
                  </Link>
                ))}
              </div>
              <Link to="/projects" className="px-4 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-100">
                Projects
              </Link>
              <Link to="/about" className="px-4 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-100">
                About Us
              </Link>
              <Link to="/contact" className="px-4 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-100">
                Contact
              </Link>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <Button to="/contact" variant="primary" size="lg" className="w-full">
                  Start Your Project
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
