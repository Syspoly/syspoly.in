import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="glass-card rounded-2xl p-7 flex flex-col justify-between h-full relative overflow-hidden bg-white border border-slate-200 shadow-lg">
      <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-50" />

      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < (testimonial.rating || 5)
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200'
              }`}
            />
          ))}
        </div>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
          "{testimonial.message}"
        </p>
      </div>

      <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
        <img
          src={
            testimonial.image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              testimonial.clientName
            )}&background=2563eb&color=fff`
          }
          alt={testimonial.clientName}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/30"
        />
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{testimonial.clientName}</h4>
          <p className="text-xs text-slate-500">
            {testimonial.designation}, <span className="text-blue-600 font-semibold">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
