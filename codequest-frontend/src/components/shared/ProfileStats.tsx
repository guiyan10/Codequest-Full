
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';

interface ProfileStatsProps {
  stats: {
    level: number;
    xp: number;
    streak: number;
    completed: number;
    rank: number;
  };
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <StatsCard 
        title="Nível" 
        value={stats.level} 
        icon={<LevelIcon />} 
        color="bg-gradient-to-r from-codequest-purple to-purple-400" 
        delay={0}
      />
      <StatsCard 
        title="XP" 
        value={stats.xp} 
        icon={<XPIcon />} 
        color="bg-gradient-to-r from-yellow-400 to-amber-500" 
        delay={1}
      />
      <StatsCard 
        title="Dias Seguidos" 
        value={stats.streak} 
        icon={<StreakIcon />} 
        color="bg-gradient-to-r from-red-400 to-red-500" 
        delay={2}
      />
      <StatsCard 
        title="Módulos" 
        value={stats.completed} 
        icon={<CompletedIcon />} 
        color="bg-gradient-to-r from-codequest-emerald to-teal-400" 
        delay={3}
      />
      <StatsCard 
        title="Ranking" 
        value={stats.rank} 
        icon={<RankIcon />} 
        color="bg-gradient-to-r from-blue-500 to-blue-400" 
        delay={4}
        prefix="#"
      />
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  delay: number;
  prefix?: string;
  suffix?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, delay, prefix = '', suffix = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
    >
      <div className="flex items-center mb-2">
        <div className={`w-8 h-8 ${color} rounded-md flex items-center justify-center text-white`}>
          {icon}
        </div>
        <h3 className="ml-2 text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <AnimatedNumber 
        value={value} 
        className="text-2xl font-bold text-codequest-dark" 
        prefix={prefix}
        suffix={suffix}
      />
    </motion.div>
  );
};

// Icons for stats cards
const LevelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.2"/>
  </svg>
);

const XPIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.2"/>
  </svg>
);

const StreakIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CompletedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RankIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.2"/>
    <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default ProfileStats;
