import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Shield } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Experience as ExperienceType, fetchExperiences } from '../../lib/fetchData';
import { format } from 'date-fns';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await fetchExperiences();
        setExperiences(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load experiences');
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-secondary/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Experience</h2>
          <div className="flex justify-center">
            <div className="animate-pulse">Loading experiences...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-20 bg-secondary/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Experience</h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Experience</h2>

          <div className="space-y-8">
            {experiences.map((exp) => (
              <GlassCard key={exp.id} className="p-8">
                <div className="flex items-start gap-4">
                  {exp.type === 'work' ? (
                    <Briefcase className="w-8 h-8 text-primary flex-shrink-0" />
                  ) : (
                    <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{exp.company}</h3>
                      <span className="text-sm text-foreground/70">
                        {exp.start_date ? format(new Date(exp.start_date), 'MMM yyyy') : 'N/A'} - {' '}
                        {exp.end_date ? format(new Date(exp.end_date), 'MMM yyyy') : 'Present'}
                      </span>
                    </div>
                    <p className="text-lg font-semibold mb-2">{exp.position}</p>
                    <p className="text-foreground/70">{exp.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;