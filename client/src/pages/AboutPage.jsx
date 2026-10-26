import React from 'react';
import { ShieldCheck, Target, Eye, Heart, Award } from 'lucide-react';
import SEO from '../components/SEO';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import StatsSection from '../sections/StatsSection';
import ProcessTimeline from '../sections/ProcessTimeline';
import TechnologiesGrid from '../sections/TechnologiesGrid';
import CTASection from '../sections/CTASection';

const values = [
  { title: 'Technical Excellence', desc: 'We maintain zero tolerance for sloppy code, ensuring security and high performance across every release.', icon: ShieldCheck },
  { title: 'Client Centricity', desc: 'We align our engineering goals directly with your commercial KPIs and long-term business roadmap.', icon: Target },
  { title: 'Transparent Integrity', desc: 'No hidden fees, no opaque deadlines. You receive direct communication, daily git updates, and clear timelines.', icon: Eye },
  { title: 'Continuous Innovation', desc: 'We continuously integrate modern technology stacks including Generative AI, modern cloud, and microservices.', icon: Heart }
];

const AboutPage = () => {
  return (
    <>
      <SEO
        page="about"
        defaultTitle="About Us | System Polygon Pvt. Ltd."
        defaultDescription="Learn about System Polygon Pvt. Ltd. - an experienced IT services & software development company providing web development, mobile app development, digital marketing, and custom software solutions."
        canonicalUrl="https://syspoly.in/about"
      />

      <div className="pt-28 pb-12 space-y-20">
        {/* About Hero */}
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-electric-500/10 text-electric-600 border border-electric-500/20">
              About System Polygon Pvt. Ltd.
            </span>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Engineering Digital Excellence <br />
              <span className="text-gradient-electric">With Proven Track Record</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              System Polygon Pvt. Ltd. is an experienced IT services and software development company providing web development, mobile app development, digital marketing, and custom software solutions to clients around the globe.
            </p>
          </div>
        </Container>

        {/* Story, Mission & Vision */}
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Story */}
            <div className="glass-card rounded-2xl p-7 border border-slate-200 bg-white shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center text-electric-600">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Story</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Founded with a passion for robust software craftsmanship, System Polygon has expanded over 17+ years into a premier technology partner delivering 600+ projects for startups and enterprises.
              </p>
            </div>

            {/* Mission */}
            <div className="glass-card rounded-2xl p-7 border border-slate-200 bg-white shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-violetAccent-500/10 border border-violetAccent-500/20 flex items-center justify-center text-violetAccent-600">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To empower businesses with scalable, high-performance software applications, intelligent AI algorithms, and high-ROI digital marketing strategies.
              </p>
            </div>

            {/* Vision */}
            <div className="glass-card rounded-2xl p-7 border border-slate-200 bg-white shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be the world’s most trusted full-stack technical innovation agency, known for quality, integrity, zero-downtime reliability, and client success.
              </p>
            </div>

          </div>
        </Container>

        {/* Our Values */}
        <section className="py-16 bg-white border-y border-slate-200">
          <Container>
            <SectionHeading
              badge="Core Principles"
              title="Our Core Values"
              subtitle="The foundational standards that guide every line of code we write and every client relationship we foster."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-3">
                  <val.icon className="w-6 h-6 text-electric-600" />
                  <h4 className="text-lg font-bold text-slate-900">{val.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Process & Stats */}
        <StatsSection />
        <ProcessTimeline />
        <TechnologiesGrid />
        <CTASection />
      </div>
    </>
  );
};

export default AboutPage;
