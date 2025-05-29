import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LanguageCardProps {
  language: {
    id: string;
    name: string;
    icon: string;
    description: string;
    color: string;
    modules: number;
    progress: number;
    category?: string;
    difficulty?: string;
    status?: 'draft' | 'published' | 'archived';
  };
  delay?: number;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language, delay = 0 }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Fácil';
      case 'medium':
        return 'Médio';
      case 'hard':
        return 'Difícil';
      default:
        return difficulty;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'draft':
        return 'Rascunho';
      case 'archived':
        return 'Arquivado';
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
    >
      <Link to={`/cursos/${language.id}`} className="block p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-lg ${language.color} flex items-center justify-center mr-4`}>
            <img src={language.icon} alt={language.name} className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-semibold text-codequest-dark">{language.name}</h3>
            <p className="text-sm text-gray-500">{language.modules} módulos</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{language.description}</p>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Progresso</span>
            <span className="font-medium">{language.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-codequest-purple" 
              style={{ width: `${language.progress}%` }}
            ></div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default LanguageCard;
