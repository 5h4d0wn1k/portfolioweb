import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Project, fetchProjects, deleteProject } from '../../../lib/fetchData';
import { format } from 'date-fns';
import { Pencil, Trash2, Plus } from 'lucide-react';

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await deleteProject(id);
      await loadProjects(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  if (loading) {
    return <div className="p-4">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link
          to="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(project.start_date), 'MMM yyyy')} -{' '}
                  {project.end_date
                    ? format(new Date(project.end_date), 'MMM yyyy')
                    : 'Present'}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/admin/projects/${project.id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-500">{project.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;