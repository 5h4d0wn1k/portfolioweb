import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Project as ProjectType, fetchProjects } from '../../lib/fetchData';
import { format } from 'date-fns';

interface ProjectCardProps {
  title: string;
  description: string;
  tech_stack: string[];
  category: string;
  start_date: string;
  end_date: string | null;
  github_url?: string;
  live_url?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech_stack,
  category,
  start_date,
  end_date,
  github_url,
  live_url,
}) => (
  <GlassCard className="p-6 h-full flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-bold">{title}</h3>
      <span className="text-sm text-foreground/70">
        {format(new Date(start_date), 'MMM yyyy')}
        {end_date && ` - ${format(new Date(end_date), 'MMM yyyy')}`}
      </span>
    </div>
    <p className="text-foreground/70 mb-4 flex-grow">{description}</p>
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tech_stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs rounded-full glass-gradient"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground/70">{category}</span>
        <div className="flex gap-4">
          {github_url && (
            <a
              href={github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
              title="View Source Code"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {live_url && (
            <a
              href={live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
              title="View Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  </GlassCard>
);

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        const sortedProjects = data.sort((a, b) => 
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );
        setProjects(sortedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Projects</h2>
          <div className="flex justify-center">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Projects</h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;