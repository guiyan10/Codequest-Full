
import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({ name, icon, unlocked, description, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative flex flex-col items-center"
      onClick={onClick}
    >
      <div 
        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer
          ${unlocked 
            ? 'bg-gradient-to-br from-codequest-purple to-codequest-emerald shadow-lg' 
            : 'bg-gray-300 grayscale'
          }`}
      >
        <img 
          src={icon} 
          alt={name} 
          className="w-10 h-10 md:w-12 md:h-12" 
        />
        {!unlocked && (
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9" />
            </svg>
          </div>
        )}
      </div>
      <p className="mt-2 text-sm font-medium text-center">
        {name}
      </p>
    </motion.div>
  );
};

export default Badge;
