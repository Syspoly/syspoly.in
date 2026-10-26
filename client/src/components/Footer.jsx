import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ArrowRight, ShieldCheck, Linkedin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Container from './Container';

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-slate-700 pt-16 pb-8 border-t border-slate-200 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="System Polygon Pvt. Ltd." className="h-12 w-auto object-contain" />
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              An experienced IT services & software development company providing web development, mobile applications, digital marketing, AI, and custom software solutions.
            </p>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0082C8] shrink-0 mt-0.5" />
                <span>32, Gajendra Nagar, Shobhawato ki Dhani, Opp. Victorian Palace, Pal Road, Jodhpur, Rajasthan, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#0082C8] shrink-0" />
                <a href="mailto:info@syspoly.in" className="hover:text-[#0082C8] transition-colors font-semibold">
                  info@syspoly.in
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#0082C8] shrink-0" />
                <a href="tel:+918561903387" className="hover:text-[#0082C8] transition-colors font-bold">
                  +91 8561903387
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#0082C8] hover:border-[#BAE6FD] transition-colors shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#0082C8] hover:border-[#BAE6FD] transition-colors shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#0082C8] hover:border-[#BAE6FD] transition-colors shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#0082C8] hover:border-[#BAE6FD] transition-colors shadow-sm">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#0082C8] hover:border-[#BAE6FD] transition-colors shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-slate-900 font-bold text-base mb-4 tracking-wide border-l-2 border-[#0082C8] pl-3">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
              <li><Link to="/services/website-development" className="hover:text-[#0082C8] transition-colors">Web Development</Link></li>
              <li><Link to="/services/android-app-development" className="hover:text-[#0082C8] transition-colors">Mobile App Development</Link></li>
              <li><Link to="/services/digital-marketing" className="hover:text-[#0082C8] transition-colors">Digital Marketing</Link></li>
              <li><Link to="/services/seo-content" className="hover:text-[#0082C8] transition-colors">SEO & Content</Link></li>
              <li><Link to="/services/ai-development" className="hover:text-[#0082C8] transition-colors">AI & Machine Learning</Link></li>
              <li><Link to="/services/business-automation" className="hover:text-[#0082C8] transition-colors">Business Automation</Link></li>
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div>
            <h4 className="text-slate-900 font-bold text-base mb-4 tracking-wide border-l-2 border-[#0082C8] pl-3">
              Industries
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
              <li><Link to="/services" className="hover:text-[#0082C8] transition-colors">Healthcare</Link></li>
              <li><Link to="/services" className="hover:text-[#0082C8] transition-colors">Finance & FinTech</Link></li>
              <li><Link to="/services" className="hover:text-[#0082C8] transition-colors">Real Estate</Link></li>
              <li><Link to="/services" className="hover:text-[#0082C8] transition-colors">E-commerce</Link></li>
              <li><Link to="/services" className="hover:text-[#0082C8] transition-colors">Travel & Tourism</Link></li>
              <li><Link to="/services" className="hover:text-[#0082C8] transition-colors">High-Growth Startups</Link></li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-slate-900 font-bold text-base mb-4 tracking-wide border-l-2 border-[#0082C8] pl-3">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 font-medium mb-6">
              <li><Link to="/about" className="hover:text-[#0082C8] transition-colors">About System Polygon</Link></li>
              <li><Link to="/projects" className="hover:text-[#0082C8] transition-colors">Project Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-[#0082C8] transition-colors">Contact Us</Link></li>
            </ul>

            <div className="pt-2">
              <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Tech Insights Newsletter
              </span>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-1.5">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0082C8] shadow-sm"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-[#0082C8] hover:bg-[#00529B] text-white shrink-0 transition-colors shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom copyright banner */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 System Polygon Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
            <Link to="/admin/login" className="flex items-center gap-1 text-slate-600 hover:text-[#0082C8] transition-colors font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
