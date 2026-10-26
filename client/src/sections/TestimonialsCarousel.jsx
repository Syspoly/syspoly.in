import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import TestimonialCard from '../components/TestimonialCard';
import { getTestimonials } from '../services/api';

const defaultTestimonials = [
  {
    clientName: 'Rajesh Sharma',
    company: 'Vanguard Capital Partners',
    designation: 'Managing Director',
    message: 'System Polygon transformed our digital infrastructure completely. Their engineering team built our FinTech advisory engine with incredible precision, scalability, and security.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    clientName: 'Sarah Jenkins',
    company: 'Apex Housing Solutions',
    designation: 'Chief Technology Officer',
    message: 'The property management SaaS platform delivered by Syspoly exceeded all expectations. Our tenant engagement went up immediately and operational expenses plummeted.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
  },
  {
    clientName: 'Vikram Mehta',
    company: 'LuxeLiving Direct',
    designation: 'Founder & CEO',
    message: 'Working with Syspoly felt like having an elite in-house development team. Their mastery of React, Node.js, and e-commerce conversion optimization is second to none.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  }
];

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getTestimonials()
      .then((res) => {
        if (res.data.success && res.data.data.length > 0) {
          setTestimonials(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 sm:py-24 relative bg-slate-50 border-t border-slate-200 overflow-hidden">
      <Container>
        <SectionHeading
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Real reviews from enterprise executives, startup founders, and agency partners across the globe."
        />

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[280px]"
            >
              {testimonials[currentIndex] && (
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-blue-600' : 'bg-slate-300'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-600 transition-colors shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-600 transition-colors shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsCarousel;
