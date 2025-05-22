import api from './api';

export interface Course {
  id: number;
  title: string;
  description: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
  status: 'draft' | 'active' | 'inactive';
  language_id?: number | null;
  category: 'frontend' | 'backend' | 'database' | 'mobile';
  created_at?: string;
  updated_at?: string;
}

export interface CreateCourseData {
  title: string;
  description: string;
  difficulty_level: string;
  status: string;
  language_id?: number | null;
  category: string;
}

export const coursesService = {
  // Get all courses
  getAll: async () => {
    try {
      const response = await api.get('/api/courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get a single course
  getOne: async (id: number) => {
    try {
      const response = await api.get(`/api/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      throw error;
    }
  },

  // Create a new course
  create: async (data: CreateCourseData) => {
    try {
      const response = await api.post('/api/courses', data);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  // Update a course
  update: async (id: number, data: Partial<CreateCourseData>) => {
    try {
      const response = await api.put(`/api/courses/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating course ${id}:`, error);
      throw error;
    }
  },

  // Delete a course
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/api/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting course ${id}:`, error);
      throw error;
    }
  },

  // Get all languages
  getLanguages: async () => {
    try {
      const response = await api.get('/api/languages');
      return response.data;
    } catch (error) {
      console.error('Error fetching languages:', error);
      throw error;
    }
  }
}; 