import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface LanguageCardProps {
  language: {
    id: string;
    name: string;
    icon: string;
    description: string;
    color: string;
    modules: number;
    progress?: number;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    status: 'draft' | 'published' | 'archived';
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
      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 hover:-translate-y-1 ${language.color}`}
    >
      <div className="bg-white p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-codequest-light mr-4">
            <img src={language.icon} alt={language.name} className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-codequest-dark">{language.name}</h3>
        </div>
        
        <p className="text-gray-600 mb-5 text-sm h-12 line-clamp-2">{language.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(language.difficulty)}`}>
            {getDifficultyLabel(language.difficulty)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(language.status)}`}>
            {getStatusLabel(language.status)}
          </span>
        </div>

        {language.progress !== undefined ? (
          <div className="mb-4">
            <div className="flex justify-between mb-1 text-sm">
              <span>Progresso</span>
              <span className="font-medium">{language.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-codequest-purple" 
                style={{ width: `${language.progress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <span className="text-sm text-gray-500">{language.modules} módulos disponíveis</span>
          </div>
        )}

        <Link 
          to={`/cursos/${language.id}`} 
          className="block w-full text-center py-2 rounded-lg bg-codequest-purple text-white font-medium hover:bg-opacity-90 transition-colors"
        >
          {language.progress !== undefined && language.progress > 0 ? 'Continuar' : 'Começar'}
        </Link>
      </div>
    </motion.div>
  );
};

export default LanguageCard;
