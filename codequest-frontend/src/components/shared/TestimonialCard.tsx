
import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  quote: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, image, quote, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all flex flex-col h-full"
    >
      <div className="text-codequest-purple mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.33333 18.6667C11.1743 18.6667 12.6667 17.1743 12.6667 15.3333C12.6667 13.4924 11.1743 12 9.33333 12C7.49238 12 6 13.4924 6 15.3333C6 17.1743 7.49238 18.6667 9.33333 18.6667Z" fill="currentColor"/>
          <path d="M22.6667 18.6667C24.5076 18.6667 26 17.1743 26 15.3333C26 13.4924 24.5076 12 22.6667 12C20.8257 12 19.3333 13.4924 19.3333 15.3333C19.3333 17.1743 20.8257 18.6667 22.6667 18.6667Z" fill="currentColor"/>
          <path d="M9.33333 18.6667C7.49238 18.6667 6 20.1591 6 22L6 24L12.6667 24L12.6667 22C12.6667 20.1591 11.1743 18.6667 9.33333 18.6667Z" fill="currentColor"/>
          <path d="M22.6667 18.6667C20.8257 18.6667 19.3333 20.1591 19.3333 22L19.3333 24L26 24L26 22C26 20.1591 24.5076 18.6667 22.6667 18.6667Z" fill="currentColor"/>
        </svg>
      </div>
      <p className="text-gray-700 mb-6 flex-grow italic">{quote}</p>
      <div className="flex items-center mt-4">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover border-2 border-codequest-light" 
        />
        <div className="ml-4">
          <p className="font-semibold text-codequest-dark">{name}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
