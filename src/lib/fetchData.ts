import { supabase } from './supabase';

// Types
export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  type: 'work' | 'volunteer';
  start_date: string;
  end_date: string | null;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  grade: string;
  start_date: string;
  end_date: string | null;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  category: string;
  start_date: string;
  end_date: string | null;
  github_url?: string;
  live_url?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

export interface Certification {
  id: number;
  name: string;
  issuing_organization: string;
  date_issued: string;
}

// Fetch Functions
export const fetchExperiences = async () => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) throw error;
  return data as Experience[];
};

export const fetchEducation = async () => {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) throw error;
  return data as Education[];
};

export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) throw error;
  return data as Project[];
};

export const fetchSkills = async () => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true });
  
  if (error) throw error;
  return data as Skill[];
};

export const fetchCertifications = async () => {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('date_issued', { ascending: false });
  
  if (error) throw error;
  return data as Certification[];
};

// Single Item Fetch Functions
export const fetchExperienceById = async (id: number) => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Experience;
};

export const fetchEducationById = async (id: number) => {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Education;
};

export const fetchProjectById = async (id: number) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Project;
};

// Insert Functions
export const insertExperience = async (experience: Omit<Experience, 'id'>) => {
  const { data, error } = await supabase
    .from('experiences')
    .insert([experience])
    .select()
    .single();
  
  if (error) throw error;
  return data as Experience;
};

export const insertEducation = async (education: Omit<Education, 'id'>) => {
  const { data, error } = await supabase
    .from('education')
    .insert([education])
    .select()
    .single();
  
  if (error) throw error;
  return data as Education;
};

export const insertProject = async (project: Omit<Project, 'id'>) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  
  if (error) throw error;
  return data as Project;
};

export const insertSkill = async (skill: Omit<Skill, 'id'>) => {
  const { data, error } = await supabase
    .from('skills')
    .insert([skill])
    .select()
    .single();
  
  if (error) throw error;
  return data as Skill;
};

export const insertCertification = async (certification: Omit<Certification, 'id'>) => {
  const { data, error } = await supabase
    .from('certifications')
    .insert([certification])
    .select()
    .single();
  
  if (error) throw error;
  return data as Certification;
};

// Update Functions
export const updateExperience = async (id: number, experience: Partial<Experience>) => {
  const { data, error } = await supabase
    .from('experiences')
    .update(experience)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Experience;
};

export const updateEducation = async (id: number, education: Partial<Education>) => {
  const { data, error } = await supabase
    .from('education')
    .update(education)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Education;
};

export const updateProject = async (id: number, project: Partial<Project>) => {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Project;
};

// Delete Functions
export const deleteExperience = async (id: number) => {
  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

export const deleteEducation = async (id: number) => {
  const { error } = await supabase
    .from('education')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

export const deleteProject = async (id: number) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}; 