import api from './api';

export interface Module {
  id: number;
  title: string;
  description: string;
  content: string;
  order_index: number;
  course_id: number;
  questions: Array<{
    id: number;
    question_text: string;
    question_type: string;
    points: number;
    order_index: number;
    options: Array<{
      id: number;
      option_text: string;
      is_correct: boolean;
    }>;
  }>;
}

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
  modules?: Module[];
  language: {
    id: number;
    name: string;
    icon: string;
  };
}

export interface Question {
  id: number;
  question_text: string;
  question_type: string;
  points: number;
  order_index: number;
  module_id: number;
  options: Array<{
    id: number;
    option_text: string;
    is_correct: boolean;
  }>;
}

export interface AnswerOption {
  id: number;
  option_text: string;
  is_correct: boolean;
  question_id: number;
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

  // Get course modules
  getModules: async (courseId: number) => {
    try {
      const response = await api.get(`/api/courses/${courseId}/modules`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching modules for course ${courseId}:`, error);
      throw error;
    }
  },

  // Get a specific module
  getModule: async (courseId: number, moduleId: number) => {
    try {
      const response = await api.get(`/api/courses/${courseId}/modules/${moduleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching module:', error);
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
  },

  // Complete a module
  completeModule: async (moduleId: number) => {
    try {
      const response = await api.post(`/api/modules/${moduleId}/complete`);
      return response.data;
    } catch (error) {
      console.error('Error completing module:', error);
      throw error;
    }
  }
}; 