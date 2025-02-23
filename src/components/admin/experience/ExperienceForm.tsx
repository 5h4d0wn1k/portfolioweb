import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';
import type { Experience } from '../../../types';

export default function ExperienceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Experience>();

  const fetchExperience = React.useCallback(async () => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast.error('Failed to fetch experience');
      return;
    }

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as keyof Experience, String(value || ''));
      });
    }
  }, [id, setValue]);

  React.useEffect(() => {
    if (id) {
      fetchExperience();
    }
  }, [id, fetchExperience]);

  async function onSubmit(data: Experience) {
    const { error } = id
      ? await supabase.from('experiences').update(data).eq('id', id)
      : await supabase.from('experiences').insert(data);

    if (error) {
      toast.error('Failed to save experience');
      return;
    }

    toast.success(`Experience ${id ? 'updated' : 'created'} successfully`);
    navigate('/admin/experience');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {id ? 'Edit Experience' : 'New Experience'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-2">Company</label>
          <input
            {...register('company', { required: 'Company is required' })}
            className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary text-black"
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Position</label>
          <input
            {...register('position', { required: 'Position is required' })}
            className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary text-black"
          />
          {errors.position && (
            <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary text-black"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            {...register('type', { required: 'Type is required' })}
            className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary text-black"
          >
            <option value="work">Work</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              {...register('startDate', { required: 'Start date is required' })}
              className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              {...register('endDate')}
              className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary text-black"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            {id ? 'Update Experience' : 'Create Experience'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/experience')}
            className="px-4 py-2 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}