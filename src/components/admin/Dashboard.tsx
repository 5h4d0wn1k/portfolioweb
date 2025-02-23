import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, GraduationCap, Award, Code } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardCard {
  title: string;
  count: number;
  icon: React.ElementType;
  href: string;
}

export default function Dashboard() {
  const [stats, setStats] = React.useState({
    projects: 0,
    experience: 0,
    education: 0,
    skills: 0,
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchStats() {
      const [
        { count: projectCount },
        { count: experienceCount },
        { count: educationCount },
        { count: skillsCount },
      ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('experiences').select('*', { count: 'exact', head: true }),
        supabase.from('education').select('*', { count: 'exact', head: true }),
        supabase.from('skills').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        projects: projectCount || 0,
        experience: experienceCount || 0,
        education: educationCount || 0,
        skills: skillsCount || 0,
      });
    }

    fetchStats();
  }, []);

  const cards: DashboardCard[] = [
    { title: 'Projects', count: stats.projects, icon: Code, href: '/admin/projects' },
    { title: 'Experience', count: stats.experience, icon: Briefcase, href: '/admin/experience' },
    { title: 'Education', count: stats.education, icon: GraduationCap, href: '/admin/education' },
    { title: 'Skills', count: stats.skills, icon: Award, href: '/admin/skills' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              onClick={() => navigate(card.href)}
              className="p-6 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-primary" />
                <span className="text-3xl font-bold">{card.count}</span>
              </div>
              <h3 className="text-lg font-medium text-left">{card.title}</h3>
            </button>
          );
        })}
      </div>
    </div>
  );
}