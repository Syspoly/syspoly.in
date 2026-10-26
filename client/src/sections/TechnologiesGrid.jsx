import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import { getTechnologies } from '../services/api';

const defaultTechs = [
  { name: 'React.js', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'MongoDB', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'TypeScript', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Python', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PostgreSQL', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'WordPress', category: 'CMS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
  { name: 'Android / Kotlin', category: 'Mobile', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { name: 'iOS / Swift', category: 'Mobile', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { name: 'AWS Cloud', category: 'Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' }
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'CMS', 'Mobile', 'Cloud'];

const TechnologiesGrid = () => {
  const [techs, setTechs] = useState(defaultTechs);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    getTechnologies()
      .then((res) => {
        if (res.data.success && res.data.data.length > 0) {
          setTechs(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredTechs = activeCategory === 'All'
    ? techs
    : techs.filter(t => t.category === activeCategory);

  return (
    <section className="py-16 sm:py-20 relative bg-slate-50 border-t border-slate-200">
      <Container>
        <SectionHeading
          badge="Tech Ecosystem"
          title="Modern Technologies & Frameworks"
          subtitle="We leverage battle-tested programming languages, frameworks, databases, and cloud services to build future-proof solutions."
          titleClassName="text-2xl sm:text-3xl font-extrabold"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#0082C8] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid with pop-out scale hover animations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {filteredTechs.map((tech, idx) => (
            <motion.div
              key={tech._id || idx}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.08, y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 border border-slate-200 bg-white group shadow-sm hover:shadow-xl hover:border-[#0082C8]/40 transition-all cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: [0, -6, 6, 0] }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 flex items-center justify-center p-1"
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-full h-full object-contain filter drop-shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg';
                  }}
                />
              </motion.div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0082C8] transition-colors">
                  {tech.name}
                </h4>
                <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">
                  {tech.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TechnologiesGrid;
