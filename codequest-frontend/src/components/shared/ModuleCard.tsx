
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon, LockIcon } from 'lucide-react';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  courseId: string;
  status: 'completed' | 'in-progress' | 'locked';
  xp: number;
  index: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  title,
  description,
  duration,
  courseId,
  status,
  xp,
  index
}) => {
  const isClickable = status !== 'locked';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`relative rounded-xl bg-white shadow-md hover:shadow-lg transition-all ${
        isClickable ? 'cursor-pointer hover:-translate-y-1' : 'opacity-75'
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-codequest-dark">{title}</h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
          </div>
          
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            status === 'completed' ? 'bg-green-100 text-green-600' :
            status === 'in-progress' ? 'bg-codequest-light text-codequest-purple' :
            'bg-gray-200 text-gray-500'
          }`}>
            {status === 'completed' ? (
              <CheckIcon size={18} />
            ) : status === 'locked' ? (
              <LockIcon size={18} />
            ) : (
              <span className="font-semibold text-sm">{index + 1}</span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" d="M12 6v6l4 2" />
            </svg>
            {duration}
            
            <div className="ml-4 flex items-center">
              <svg className="w-4 h-4 mr-1 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span>{xp} XP</span>
            </div>
          </div>
          
          {isClickable && (
            <Link
              to={`/cursos/${courseId}/modulo/${id}`}
              className="bg-codequest-purple hover:bg-opacity-90 text-white text-sm px-3 py-1 rounded-md transition-colors"
            >
              {status === 'completed' ? 'Revisar' : 'Continuar'}
            </Link>
          )}
        </div>
      </div>
      
      {status === 'in-progress' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-codequest-purple"></div>
      )}
      {status === 'completed' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-codequest-emerald"></div>
      )}
    </motion.div>
  );
};

export default ModuleCard;
