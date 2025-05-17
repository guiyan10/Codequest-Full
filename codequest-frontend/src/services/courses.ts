import api from './api';

export interface Course {
  id: number;
  title: string;
  description: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  status: 'active' | 'inactive' | 'draft';
  language_id: number;
  category: 'frontend' | 'backend' | 'database' | 'mobile';
  created_at?: string;
  updated_at?: string;
}

export interface CreateCourseData {
  title: string;
  description: string;
  difficulty_level: string;
  status: string;
  language_id: string;
  category: string;
}

export const coursesService = {
  // Get all courses
  getAll: async () => {
    const response = await api.get('/api/courses');
    return response.data;
  },

  // Get a single course
  getOne: async (id: number) => {
    const response = await api.get(`/api/courses/${id}`);
    return response.data;
  },

  // Create a new course
  create: async (data: CreateCourseData) => {
    const response = await api.post('/api/courses', data);
    return response.data;
  },

  // Update a course
  update: async (id: number, data: Partial<CreateCourseData>) => {
    const response = await api.put(`/api/courses/${id}`, data);
    return response.data;
  },

  // Delete a course
  delete: async (id: number) => {
    const response = await api.delete(`/api/courses/${id}`);
    return response.data;
  },

  // Get all languages
  getLanguages: async () => {
    const response = await api.get('/api/languages');
    return response.data;
  }
}; 