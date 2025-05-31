import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LockIcon, CheckCircleIcon, PlayCircleIcon, ArrowRightIcon, BookOpenIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  progress?: number;
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
  progress = 0,
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

  const getButtonColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-cyan-600 hover:bg-cyan-700';
      case 'in-progress':
        return 'bg-codequest-purple hover:bg-codequest-purple/90';
      default:
        return 'bg-gray-400 hover:bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all ${
        status === 'locked' ? 'border border-gray-200' : 'border border-codequest-purple'
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
          
          {/* Progress Bar */}
          {status !== 'locked' && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Progresso</span>
                <span className="font-medium">{status === 'completed' ? '100%' : `${progress}%`}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    status === 'completed' ? 'bg-cyan-600' : 'bg-codequest-purple'
                  }`}
                  style={{ width: `${status === 'completed' ? '100' : progress}%` }}
                ></div>
              </div>
            </div>
          )}

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

      {/* Action Button */}
      <div className="mt-6">
        {status !== 'locked' ? (
          <Link to={status === 'completed' ? `/cursos/${courseId}/modulo/${id}?mode=review` : `/cursos/${courseId}/modulo/${id}`}>
            <Button 
              className={`w-full ${getButtonColor()}`}
            >
              {status === 'completed' ? (
                <>
                  <BookOpenIcon className="w-4 h-4 mr-2" />
                  Revisar Módulo
                </>
              ) : (
                <>
                  <PlayCircleIcon className="w-4 h-4 mr-2" />
                  {progress > 0 ? 'Continuar Módulo' : 'Começar Módulo'}
                </>
              )}
            </Button>
          </Link>
        ) : (
          <Button 
            className="w-full bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
            disabled
          >
            <LockIcon className="w-4 h-4 mr-2" />
            Módulo Bloqueado
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ModuleCard;
