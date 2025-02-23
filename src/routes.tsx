import { RouteObject } from 'react-router-dom';
import PublicLayout from './App';
import AdminLayout from './components/admin/AdminLayout';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import ProjectList from './components/admin/projects/ProjectList';
import ProjectForm from './components/admin/projects/ProjectForm';
import ExperienceList from './components/admin/experience/ExperienceList';
import ExperienceForm from './components/admin/experience/ExperienceForm';
import EducationList from './components/admin/education/EducationList';
import EducationForm from './components/admin/education/EducationForm';
import ErrorBoundary from './components/error/ErrorBoundary';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/admin/login',
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'projects', element: <ProjectList /> },
      { path: 'projects/new', element: <ProjectForm /> },
      { path: 'projects/:id', element: <ProjectForm /> },
      { path: 'experience', element: <ExperienceList /> },
      { path: 'experience/new', element: <ExperienceForm /> },
      { path: 'experience/:id', element: <ExperienceForm /> },
      { path: 'education', element: <EducationList /> },
      { path: 'education/new', element: <EducationForm /> },
      { path: 'education/:id', element: <EducationForm /> },
    ],
  },
]; 