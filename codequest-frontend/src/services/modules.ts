import api from './api';

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

export interface Module {
  id: number;
  course_id: number;
  title: string;
  description: string;
  content: string;
  order_index: number;
  questions: Question[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateModuleData {
  course_id: number;
  title: string;
  description: string;
  content: string;
  order_index: number;
  duration: string;
  xp: number;
}

export interface CreateQuestionData {
  question_text: string;
  question_type: string;
  points: number;
  order_index: number;
  options: Array<{
    option_text: string;
    is_correct: boolean;
  }>;
}

export interface UserAnswerData {
  question_id: number;
  answer: string;
}

export interface AnswerResponse {
  status: string;
  is_correct: boolean;
  correct_answer: string;
  points: number;
  user_answer: string;
}

export interface ModuleCompletionResponse {
  status: string;
  message: string;
  xp_earned: number;
  total_xp: number;
  current_level: number;
}

export const modulesService = {
  // Get all modules
  getAll: async () => {
    try {
      const response = await api.get('/api/modules');
      return response.data;
    } catch (error) {
      console.error('Error fetching modules:', error);
      throw error;
    }
  },

  // Get modules by course
  getByCourse: async (courseId: number) => {
    try {
      const response = await api.get(`/api/courses/${courseId}/modules`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching modules for course ${courseId}:`, error);
      throw error;
    }
  },

  // Get a single module
  getOne: async (id: number) => {
    try {
      const response = await api.get(`/api/modules/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching module ${id}:`, error);
      throw error;
    }
  },

  // Create a new module
  create: async (data: CreateModuleData) => {
    try {
      const response = await api.post('/api/modules', data);
      return response.data;
    } catch (error) {
      console.error('Error creating module:', error);
      throw error;
    }
  },

  // Update a module
  update: async (id: number, data: Partial<CreateModuleData>) => {
    try {
      const response = await api.put(`/api/modules/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating module ${id}:`, error);
      throw error;
    }
  },

  // Delete a module
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/api/modules/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting module ${id}:`, error);
      throw error;
    }
  },

  // Submit quiz answer
  submitAnswer: async (moduleId: number, questionId: number, answer: string): Promise<AnswerResponse> => {
    try {
      const response = await api.post(`/api/modules/${moduleId}/questions/${questionId}/answer`, {
        answer
      });
      return response.data;
    } catch (error) {
      console.error(`Error submitting answer for question ${questionId}:`, error);
      throw error;
    }
  },

  // Complete module
  completeModule: async (moduleId: number, answers: UserAnswerData[]): Promise<ModuleCompletionResponse> => {
    try {
      const response = await api.post(`/api/modules/${moduleId}/complete`, { answers });
      return response.data;
    } catch (error) {
      console.error(`Error completing module ${moduleId}:`, error);
      throw error;
    }
  },

  // Create a new question
  createQuestion: async (moduleId: number, data: CreateQuestionData) => {
    try {
      const response = await api.post(`/api/modules/${moduleId}/questions`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating question:', error);
      throw error;
    }
  },

  // Update a question
  updateQuestion: async (moduleId: number, questionId: number, data: CreateQuestionData) => {
    try {
      const response = await api.put(`/api/modules/${moduleId}/questions/${questionId}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating question ${questionId}:`, error);
      throw error;
    }
  },

  // Delete a question
  deleteQuestion: async (moduleId: number, questionId: number) => {
    try {
      const response = await api.delete(`/api/modules/${moduleId}/questions/${questionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting question ${questionId}:`, error);
      throw error;
    }
  },

  // Get user answers for a completed module
  getUserModuleAnswers: async (moduleId: number) => {
    try {
      const response = await api.get(`/api/modules/${moduleId}/answers`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user answers for module ${moduleId}:`, error);
      throw error;
    }
  }
}; 