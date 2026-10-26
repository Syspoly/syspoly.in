import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SEO from '../components/SEO';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { submitContact } from '../services/api';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters long')
});

const servicesOptions = [
  'Website Development',
  'Android App Development',
  'iOS App Development',
  'Digital Marketing',
  'SEO & Content',
  'AI & Machine Learning',
  'Data Analytics',
  'Business Automation',
  'IoT Solutions',
  'Cloud Applications',
  'Other'
];

const budgetOptions = [
  'Under $5,000',
  '$5,000 - $15,000',
  '$15,000 - $35,000',
  '$35,000+',
  'Flexible / Open'
];

const ContactPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: 'Website Development',
      budget: 'Flexible / Open'
    }
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setToast(null);
    try {
      const res = await submitContact(data);
      if (res.data.success) {
        setToast({
          type: 'success',
          message: res.data.message || 'Thank you! Your enquiry has been submitted successfully.'
        });
        reset();
      } else {
        setToast({
          type: 'error',
          message: res.data.message || 'Failed to submit form.'
        });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: err.response?.data?.message || 'Server error. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        page="contact"
        defaultTitle="Contact Us | System Polygon Pvt. Ltd."
        defaultDescription="Get in touch with System Polygon Pvt. Ltd. Location: Jodhpur, Rajasthan, India. Email: info@syspoly.in, Phone: +91 8561903387. Available 24x7 for project inquiries."
        canonicalUrl="https://syspoly.in/contact"
      />

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="pt-28 pb-20">
        <Container>
          <SectionHeading
            badge="Get In Touch"
            title="Let's Talk About Your Project"
            subtitle="Send us your requirements or schedule a consultation call with our solution architects."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-8 glass-card rounded-3xl p-8 border border-slate-800 bg-[#0B0F19]/90 shadow-2xl">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">System Polygon Pvt. Ltd.</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We are available 24x7 to assist you with technical inquiries, cost estimates, and custom software development proposals.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">Headquarters</h4>
                    <p className="text-sm font-semibold text-white mt-1 leading-relaxed">
                      32, Gajendra Nagar, Shobhawato ki Dhani,<br />
                      Opp. Victorian Palace, Pal Road,<br />
                      Jodhpur, Rajasthan, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">Email Address</h4>
                    <a href="mailto:info@syspoly.in" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors mt-1 block">
                      info@syspoly.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">Direct Phone / WhatsApp</h4>
                    <a href="tel:+918561903387" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors mt-1 block">
                      +91 8561903387
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">Working Hours</h4>
                    <p className="text-sm font-semibold text-white mt-1">
                      24 x 7 Continuous Operational Support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 border border-slate-700/80 bg-[#0B0F19]/90 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register('name')}
                      className={`w-full bg-[#070A11] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.name ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      {...register('email')}
                      className={`w-full bg-[#070A11] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.email ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register('phone')}
                      className={`w-full bg-[#070A11] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.phone ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      {...register('company')}
                      className="w-full bg-[#070A11] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Service Required *
                    </label>
                    <select
                      {...register('service')}
                      className="w-full bg-[#070A11] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      {servicesOptions.map((svc) => (
                        <option key={svc} value={svc} className="bg-[#0B0F19] text-white">
                          {svc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Estimated Budget
                    </label>
                    <select
                      {...register('budget')}
                      className="w-full bg-[#070A11] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      {budgetOptions.map((b) => (
                        <option key={b} value={b} className="bg-[#0B0F19] text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Project Details & Scope *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project requirements, goals, and timelines..."
                    {...register('message')}
                    className={`w-full bg-[#070A11] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      errors.message ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={submitting}
                  className="w-full"
                  icon={submitting ? null : Send}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Loader size="sm" /> Submitting...
                    </span>
                  ) : (
                    'Submit Project Enquiry'
                  )}
                </Button>

              </form>
            </div>

          </div>
        </Container>
      </div>
    </>
  );
};

export default ContactPage;
