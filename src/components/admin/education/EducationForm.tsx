import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';
import type { Education } from '../../../types';

export default function EducationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Education>();

  const fetchEducation = React.useCallback(async () => {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast.error('Failed to fetch education');
      return;
    }

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key as keyof Education, value as string);
        }
      });
    }
  }, [id, setValue]);

  React.useEffect(() => {
    if (id) {
      fetchEducation();
    }
  }, [id, fetchEducation]);

  async function onSubmit(data: Education) {
    // Format dates properly
    const formattedData = {
      ...data,
      start_date: data.startDate ? new Date(data.startDate).toISOString() : null,
      end_date: data.endDate ? new Date(data.endDate).toISOString() : null,
    };

    const { error } = id
      ? await supabase.from('education').update(formattedData).eq('id', id)
      : await supabase.from('education').insert(formattedData);

    if (error) {
      console.error('Supabase error:', error); // Add error logging
      toast.error('Failed to save education');
      return;
    }

    toast.success(`Education ${id ? 'updated' : 'created'} successfully`);
    navigate('/admin/education');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {id ? 'Edit Education' : 'New Education'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-2">Institution</label>
          <input
            {...register('institution', { required: 'Institution is required' })}
            className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary text-black"
          />
          {errors.institution && (
            <p className="text-red-500 text-sm mt-1">{errors.institution.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Degree</label>
          <input
            {...register('degree', { required: 'Degree is required' })}
            className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary text-black"
          />
          {errors.degree && (
            <p className="text-red-500 text-sm mt-1">{errors.degree.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Field of Study</label>
          <input
            {...register('field', { required: 'Field is required' })}
            className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary text-black"
          />
          {errors.field && (
            <p className="text-red-500 text-sm mt-1">{errors.field.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Grade</label>
          <input
            {...register('grade', { required: 'Grade is required' })}
            className="w-full px-4 py-2 rounded-lg bg-secondary/5 border border-secondary text-black"
          />
          {errors.grade && (
            <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>
          )}
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
            {id ? 'Update Education' : 'Create Education'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/education')}
            className="px-4 py-2 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}