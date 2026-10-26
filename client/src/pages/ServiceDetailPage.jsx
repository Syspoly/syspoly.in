import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import Loader from '../components/Loader';
import CTASection from '../sections/CTASection';
import { getServiceBySlug } from '../services/api';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getServiceBySlug(slug)
      .then((res) => {
        if (res.data.success) {
          setService(res.data.data);
        } else {
          setError('Service not found');
        }
      })
      .catch((err) => {
        setError('Failed to load service details.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen pt-36 pb-20 text-center">
        <Container>
          <div className="glass-card rounded-2xl p-12 max-w-lg mx-auto bg-white border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Not Found</h2>
            <p className="text-slate-600 mb-6">{error || 'The requested service could not be located.'}</p>
            <Button to="/services" variant="primary" icon={ArrowLeft}>
              Back to Services
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${service.title} Services | System Polygon`}</title>
        <meta name="description" content={service.shortDescription} />
      </Helmet>

      <div className="pt-32 pb-20 space-y-16">
        <Container>
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link to="/" className="hover:text-electric-600">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-electric-600">Services</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{service.title}</span>
          </div>

          {/* Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-electric-500/10 text-electric-600 border border-electric-500/20">
                Service Overview
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {service.shortDescription}
              </p>

              <div className="pt-4 flex items-center gap-4">
                <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                  Request Proposal
                </Button>
              </div>
            </div>

            {/* Service Cover Image */}
            <div className="lg:col-span-5 relative">
              <div className="glass-card rounded-2xl p-2 border border-slate-200 bg-white shadow-xl overflow-hidden">
                <img
                  src={service.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'}
                  alt={service.title}
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Detailed Content & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-slate-200">
            
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Service Capabilities & Engineering Focus</h3>
                <p className="text-slate-700 leading-relaxed text-base whitespace-pre-line">
                  {service.description}
                </p>
              </div>

              {service.features && service.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Key Features & Deliverables</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="glass-card rounded-xl p-4 flex items-start gap-3 border border-slate-200 bg-white shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-electric-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-slate-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-md space-y-4">
                <h4 className="text-lg font-bold text-slate-900">Why Work With Syspoly?</h4>
                <ul className="space-y-3 text-xs font-semibold text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-600"></span>
                    17+ Years Industry Experience
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-600"></span>
                    Dedicated Project Manager
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-600"></span>
                    24/7 SLA & Maintenance Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-600"></span>
                    100% IP & Source Code Ownership
                  </li>
                </ul>

                <div className="pt-2">
                  <Button to="/contact" variant="primary" size="md" className="w-full">
                    Consult Our Engineers
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </Container>

        <CTASection />
      </div>
    </>
  );
};

export default ServiceDetailPage;
