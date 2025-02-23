import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Project, fetchProjectById, insertProject, updateProject } from '../../../lib/fetchData';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    tech_stack: [],
    category: '',
    start_date: '',
    end_date: null,
  });

  useEffect(() => {
    const loadProject = async () => {
      if (id) {
        try {
          setLoading(true);
          const project = await fetchProjectById(Number(id));
          setFormData(project);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load project');
        } finally {
          setLoading(false);
        }
      }
    };

    loadProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await updateProject(Number(id), formData);
      } else {
        await insertProject(formData);
      }
      navigate('/admin/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
      setLoading(false);
    }
  };

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techStack = e.target.value.split(',').map(tech => tech.trim());
    setFormData(prev => ({ ...prev, tech_stack: techStack }));
  };

  if (loading && id) {
    return <div className="p-4">Loading project...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {id ? 'Edit Project' : 'Create New Project'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Tech Stack (comma-separated)</label>
          <input
            type="text"
            value={formData.tech_stack.join(', ')}
            onChange={handleTechStackChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Category</label>
          <select
            value={formData.category}
            onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Web Development">Web Development</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Start Date</label>
          <input
            type="date"
            value={formData.start_date}
            onChange={e => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">End Date</label>
          <input
            type="date"
            value={formData.end_date || ''}
            onChange={e => setFormData(prev => ({ ...prev, end_date: e.target.value || null }))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Project'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;