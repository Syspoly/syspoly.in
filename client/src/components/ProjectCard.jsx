import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card glass-card-hover rounded-2xl overflow-hidden group flex flex-col justify-between border border-slate-200 bg-white shadow-sm"
    >
      {/* Image container */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
        
        {/* Category Pill */}
        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-white/90 text-blue-600 border border-slate-200 backdrop-blur-md shadow-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-slate-500 font-semibold mb-1.5 flex items-center justify-between">
            <span>Client: {project.client || 'Enterprise'}</span>
            <span>{project.industry}</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech pills */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-mono font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-slate-900 group/link transition-colors"
          >
            View Case Study
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>

          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors"
              title="Live Link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
