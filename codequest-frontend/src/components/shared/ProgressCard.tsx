
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressCardProps {
  title: string;
  value: number;
  max: number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ title, value, max, icon, color, delay = 0 }) => {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-codequest-dark">{title}</h3>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">{value} de {max}</span>
          <span className="font-medium">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${color}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressCard;
