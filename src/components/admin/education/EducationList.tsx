import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';
import { format } from 'date-fns';
import type { Education } from '../../../types';

export default function EducationList() {
  const [educations, setEducations] = React.useState<Education[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchEducations();
  }, []);

  async function fetchEducations() {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) {
      toast.error('Failed to fetch education entries');
      return;
    }

    setEducations(data || []);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this education entry?')) return;

    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete education entry');
      return;
    }

    toast.success('Education entry deleted successfully');
    fetchEducations();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Education</h1>
        <button
          onClick={() => navigate('/admin/education/new')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </button>
      </div>

      <div className="grid gap-6">
        {educations.map((education) => (
          <div
            key={education.id}
            className="p-6 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{education.institution}</h3>
                <p className="text-lg font-semibold text-foreground/80">
                  {education.degree} in {education.field}
                </p>
                <p className="text-sm text-foreground/60">
                  {format(new Date(education.startDate), 'MMM yyyy')} - 
                  {education.endDate 
                    ? format(new Date(education.endDate), 'MMM yyyy')
                    : 'Present'}
                </p>
                <p className="text-foreground/70 mt-2">Grade: {education.grade}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/education/${education.id}`)}
                  className="p-2 rounded-lg hover:bg-secondary/20 transition-colors"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(education.id)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}