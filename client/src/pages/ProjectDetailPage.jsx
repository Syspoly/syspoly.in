import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink, CheckCircle2, Award, Zap, Layers } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import Loader from '../components/Loader';
import CTASection from '../sections/CTASection';
import { getProjectBySlug } from '../services/api';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getProjectBySlug(slug)
      .then((res) => {
        if (res.data.success) {
          setProject(res.data.data);
        } else {
          setError('Project case study not found');
        }
      })
      .catch(() => {
        setError('Failed to load project details.');
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

  if (error || !project) {
    return (
      <div className="min-h-screen pt-36 pb-20 text-center">
        <Container>
          <div className="glass-card rounded-2xl p-12 max-w-lg mx-auto bg-white border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Project Not Found</h2>
            <p className="text-slate-600 mb-6">{error || 'The requested project could not be found.'}</p>
            <Button to="/projects" variant="primary" icon={ArrowLeft}>
              Back to Portfolio
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${project.title} - Case Study | System Polygon`}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="pt-32 pb-20 space-y-16">
        <Container>
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link to="/" className="hover:text-electric-600">Home</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-electric-600">Projects</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{project.title}</span>
          </div>

          {/* Header */}
          <div className="max-w-4xl space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-electric-500/10 text-electric-600 border border-electric-500/20">
                {project.category}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Industry: {project.industry}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              {project.description}
            </p>
          </div>

          {/* Hero Banner Image */}
          <div className="glass-card rounded-2xl p-2 border border-slate-200 bg-white shadow-xl overflow-hidden mb-12">
            <img
              src={project.image}
              alt={project.title}
              className="w-full max-h-[500px] object-cover rounded-xl"
            />
          </div>

          {/* Quick Details Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl glass-card bg-white border border-slate-200 shadow-sm mb-16">
            <div>
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Client</div>
              <div className="text-sm font-bold text-slate-900">{project.client}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Category</div>
              <div className="text-sm font-bold text-electric-600">{project.category}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Industry</div>
              <div className="text-sm font-bold text-slate-900">{project.industry}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Live URL</div>
              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-electric-600 hover:underline flex items-center gap-1"
                >
                  Visit App <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-sm font-bold text-slate-500">Enterprise Private</span>
              )}
            </div>
          </div>

          {/* Challenge, Solution & Results */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            
            <div className="lg:col-span-8 space-y-10">
              
              {/* Challenge */}
              {project.challenge && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-lg">
                    <Zap className="w-5 h-5" />
                    <h3>The Technical Challenge</h3>
                  </div>
                  <p className="text-slate-700 text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    {project.challenge}
                  </p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-electric-600 font-bold text-lg">
                    <Layers className="w-5 h-5" />
                    <h3>Our Engineered Solution</h3>
                  </div>
                  <p className="text-slate-700 text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Impact & Results */}
              {project.results && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg">
                    <Award className="w-5 h-5" />
                    <h3>Business Impact & Measurable Results</h3>
                  </div>
                  <p className="text-emerald-950 font-medium text-base leading-relaxed bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                    {project.results}
                  </p>
                </div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-4 pt-6">
                  <h3 className="text-xl font-bold text-slate-900">Project Screens & Interface Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="glass-card rounded-xl overflow-hidden border border-slate-200 h-48 bg-white">
                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar Technologies */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-md space-y-5">
                <h4 className="text-lg font-bold text-slate-900">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-electric-600" />
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-4 text-center">
                  <h5 className="text-sm font-bold text-slate-900">Want to build something similar?</h5>
                  <Button to="/contact" variant="primary" size="md" className="w-full">
                    Start Your Project
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

export default ProjectDetailPage;
