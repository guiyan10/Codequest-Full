import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LockIcon, CheckCircleIcon, PlayCircleIcon } from 'lucide-react';

interface ModuleCardProps {
  id: number;
  title: string;
  description: string;
  duration: string;
  courseId: number;
  status: 'locked' | 'in-progress' | 'completed';
  xp: number;
  index: number;
  is_completed: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  title,
  description,
  duration,
  courseId,
  status,
  xp,
  index,
  is_completed,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'locked':
        return <LockIcon className="w-5 h-5 text-gray-400" />;
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <PlayCircleIcon className="w-5 h-5 text-codequest-purple" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'locked':
        return 'Bloqueado';
      case 'completed':
        return 'Concluído';
      case 'in-progress':
        return 'Em progresso';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'locked':
        return 'bg-gray-100 text-gray-500';
      case 'completed':
        return 'bg-green-50 text-green-600';
      case 'in-progress':
        return 'bg-codequest-light text-codequest-purple';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-xl p-6 shadow-sm border ${
        status === 'locked' ? 'border-gray-200' : 'border-codequest-purple'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-500">Módulo {index + 1}</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">{duration}</span>
          </div>
          <h3 className="text-lg font-semibold text-codequest-dark mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor()}`}>
              {getStatusIcon()}
              <span className="ml-1">{getStatusText()}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium text-codequest-purple">{xp}</span>
              <span className="ml-1">XP</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        {status !== 'locked' && (
          <Link
            to={status === 'completed' ? `/cursos/${courseId}/modulo/${id}?mode=review` : `/cursos/${courseId}/modulo/${id}`}
            className="text-codequest-purple hover:text-codequest-dark font-medium text-sm"
          >
            {status === 'completed' ? 'Revisar módulo' : 'Continuar módulo'} →
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default ModuleCard;
