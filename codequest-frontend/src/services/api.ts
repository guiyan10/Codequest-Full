import axios from 'axios';
import { toast } from 'sonner';

// Create an Axios instance with custom configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response || {};

    // Handle different error statuses
    switch (status) {
      case 401:
        toast.error('Sessão expirada. Por favor, faça login novamente.');
        localStorage.removeItem('token');
        window.location.href = '/auth';
        break;
      case 403:
        toast.error('Você não tem permissão para acessar este recurso.');
        break;
      case 404:
        toast.error('Recurso não encontrado.');
        break;
      case 422:
        const validationErrors = error.response.data.errors;
        if (validationErrors) {
          Object.values(validationErrors).forEach((errorMsg: any) => {
            toast.error(errorMsg[0]);
          });
        } else {
          toast.error('Dados inválidos. Verifique os campos e tente novamente.');
        }
        break;
      case 500:
        toast.error('Erro no servidor. Tente novamente mais tarde.');
        break;
      default:
        toast.error('Ocorreu um erro. Tente novamente.');
    }

    return Promise.reject(error);
  }
);

// API Functions for Authentication
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/api/login', { email, password }),
  
  register: (name: string, email: string, password: string) => 
    api.post('/api/register', { name, email, password }),
  
  forgotPassword: (email: string) => 
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, email: string, password: string, password_confirmation: string) => 
    api.post('/auth/reset-password', { token, email, password, password_confirmation }),
  
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  
  me: () => 
    api.get('/api/user'),
};

// API Functions for Courses
export const coursesAPI = {
  getAll: () => 
    api.get('/courses'),
  
  getOne: (id: string) => 
    api.get(`/courses/${id}`),
  
  getModules: (courseId: string) => 
    api.get(`/courses/${courseId}/modules`),
  
  getModule: (courseId: string, moduleId: string) => 
    api.get(`/courses/${courseId}/modules/${moduleId}`),

  completeModule: (courseId: string, moduleId: string) => 
    api.post(`/courses/${courseId}/modules/${moduleId}/complete`),
};

// API Functions for User Profile
export const userAPI = {
  getProfile: () => 
    api.get('/profile'),
  
  updateProfile: (data: any) => 
    api.post('/profile', data),
  
  getProgress: () => 
    api.get('/profile/progress'),
  
  getBadges: () => 
    api.get('/profile/badges'),
  
  getRanking: () => 
    api.get('/ranking'),
};

export default api;
