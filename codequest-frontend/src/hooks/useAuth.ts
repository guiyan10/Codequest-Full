import { useState, useEffect } from 'react';
import { authAPI } from '@/services/api';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  level: number;
  xp: number;
  nivel: 'admin' | 'user';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await authAPI.me();
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('token', token);
        setUser(user);
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAdmin = () => {
    return user?.nivel === 'admin';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return { 
    user, 
    loading, 
    login,
    logout,
    isAdmin,
    isAuthenticated
  };
}; 