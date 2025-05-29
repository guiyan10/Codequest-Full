import api from './api';
import { User } from '@/hooks/useAuth';

export interface Module {
  id: number;
  title: string;
  description: string;
  content: string;
  order_index: number;
  course_id: number;
  duration: string;
  xp: number;
  questions: Array<{
    id: number;
    question_text: string;
    question_type: string;
    points: number;
    order_index: number;
    explanation?: string;
    options: Array<{
      id: number;
      option_text: string;
      is_correct: boolean;
    }>;
  }>;
  is_completed?: boolean;
  created_at?: string;
  updated_at?: string;
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
  total_modules?: number;
  completed_modules_count?: number;
  progress_percentage?: number;
}

export interface Question {
  id: number;
  question_text: string;
  question_type: string;
  points: number;
  order_index: number;
  module_id: number;
  explanation?: string;
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

export interface CreateModuleData {
  // ... existing code ...
}

export interface Language {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  modules: number; // Total modules
  progress: number; // Progress percentage
  category: string;
  difficulty: string;
  status: 'draft' | 'published' | 'archived';
}

// Interface for user progress data
export interface UserProgressData {
  total_courses: number;
  completed_courses_count: number;
  total_modules: number;
  completed_modules_count: number;
}

export const coursesService = {
  // Get all courses
  getAll: async (): Promise<Course[]> => {
    try {
      const response = await api.get('/api/courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get a specific course by ID
  getById: async (id: number): Promise<Course> => {
    try {
      const response = await api.get(`/api/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course with ID ${id}:`, error);
      throw error;
    }
  },

  // Get modules for a specific course
  getModulesByCourseId: async (courseId: number): Promise<any[]> => { // TODO: Define Module interface
    try {
      const response = await api.get(`/api/courses/${courseId}/modules`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching modules for course ID ${courseId}:`, error);
      throw error;
    }
  },

  // Get a specific module by course ID and module ID
  getModuleById: async (courseId: number, moduleId: number): Promise<any> => { // TODO: Define Module interface
    try {
      const response = await api.get(`/api/courses/${courseId}/modules/${moduleId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching module ${moduleId} for course ID ${courseId}:`, error);
      throw error;
    }
  },

  // New function to get user progress
  getUserProgress: async (): Promise<UserProgressData> => {
    try {
      const response = await api.get('/api/courses/user-progress');
      return response.data;
    } catch (error) {
      console.error('Error fetching user progress:', error);
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