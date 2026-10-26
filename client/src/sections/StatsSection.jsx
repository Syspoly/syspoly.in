import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import StatCard from '../components/StatCard';
import { getStatistics } from '../services/api';

const defaultStats = [
  { title: 'Projects Delivered', value: '600', suffix: '+', icon: 'CheckCircle2', order: 1 },
  { title: 'Years of Experience', value: '17', suffix: '+', icon: 'Calendar', order: 2 },
  { title: 'Technology Experts', value: '26', suffix: '+', icon: 'Users', order: 3 },
  { title: 'Client Reviews', value: '33', suffix: '+', icon: 'Star', order: 4 }
];

const StatsSection = () => {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    getStatistics()
      .then((res) => {
        if (res.data.success && res.data.data.length > 0) {
          setStats(res.data.data);
        }
      })
      .catch(() => {
        // Fallback to defaultStats silently
      });
  }, []);

  return (
    <section className="py-12 sm:py-16 relative bg-slate-50 border-y border-slate-200">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat._id || i} stat={stat} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
