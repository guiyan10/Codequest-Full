import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import LanguageCard from '@/components/shared/LanguageCard';
import Badge from '@/components/shared/Badge';
import ProfileStats from '@/components/shared/ProfileStats';
import ProgressCard from '@/components/shared/ProgressCard';
import { useAlertToast } from '@/components/ui/alert-toast';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboardIcon, BookIcon, UserRoundIcon, SettingsIcon, LogOutIcon, PlayIcon, AwardIcon, TrophyIcon, MedalIcon } from 'lucide-react';
import { coursesService } from '@/services/courses';

const Dashboard = () => {
  const toast = useAlertToast();
  const navigate = useNavigate();
  const { user, loading, logout, updateUser } = useAuth();
  
  const [userProgress, setUserProgress] = useState({
    total_courses: 0,
    completed_courses_count: 0,
    total_modules: 0,
    completed_modules_count: 0,
  });
  const [isProgressLoading, setIsProgressLoading] = useState(true);

  const languages = [
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: '/js.png',
      description: 'Aprenda a linguagem que move a web.',
      color: 'border-yellow-400',
      modules: 50,
      progress: 45
    },
    {
      id: 'python',
      name: 'Python',
      icon: '/Python.png',
      description: 'Desenvolva aplicações com uma das linguagens mais versáteis.',
      color: 'border-blue-500',
      modules: 20,
      progress: 10
    },
    {
      id: 'html-css',
      name: 'HTML & CSS',
      icon: '/html.png',
      description: 'Crie websites responsivos e estilizados.',
      color: 'border-orange-500',
      modules: 18,
      progress: 75
    },
    {
      id: 'mysql',
      name: 'MySQL',
      icon: '/mysql.png',
      description: 'Gerencie bancos de dados relacionais.',
      color: 'border-blue-700',
      modules: 16,
      progress: 0
    }
  ];
  
  const badges = [
    { name: 'Iniciante', icon: '/iniciante.png', unlocked: true, description: 'Completou seu primeiro módulo' },
    { name: 'Persistente', icon: '/Persistente.png', unlocked: true, description: '7 dias seguidos de estudo' },
    { name: 'JavaScript', icon: '/js.png', unlocked: true, description: 'Completou o curso básico de JavaScript' },
    { name: 'Bug Hunter', icon: '/bughunter.png', unlocked: true, description: 'Corrigiu 10 bugs em desafios' },
    { name: 'HTML Mestre', icon: '/mestre.png', unlocked: false, description: 'Completou o curso avançado de HTML' },
    { name: 'Pythonista', icon: '/Python.png', unlocked: false, description: 'Completou todos os módulos de Python' },
  ];

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        toast.success({
          title: `Bem-vindo de volta, ${user.name}!`,
          description: 'Continue sua jornada de aprendizado.'
        });
      }, 1000);
    }
  }, [user]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        setIsProgressLoading(true);
        const data = await coursesService.getUserProgress();
        if (data) {
          setUserProgress({
            total_courses: data.total_courses,
            completed_courses_count: data.completed_courses_count,
            total_modules: data.total_modules,
            completed_modules_count: data.completed_modules_count,
          });
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      } finally {
        setIsProgressLoading(false);
      }
    };

    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const dynamicProgressData = [
    {
      title: 'Cursos',
      value: userProgress.completed_courses_count,
      max: userProgress.total_courses,
      icon: <BookIcon className="text-white w-5 h-5" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Módulos',
      value: userProgress.completed_modules_count,
      max: userProgress.total_modules,
      icon: <PlayIcon className="text-white w-5 h-5" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Conquistas',
      value: badges.filter(badge => badge.unlocked).length,
      max: badges.length,
      icon: <AwardIcon className="text-white w-5 h-5" />,
      color: 'bg-codequest-emerald'
    },
  ];

  const navigationItems = [
    { name: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, path: '/dashboard', active: true },
    { name: 'Cursos', icon: <BookIcon className="w-5 h-5" />, path: '/cursos' },
    { name: 'Perfil', icon: <UserRoundIcon className="w-5 h-5" />, path: '/perfil' },
    { name: 'Configurações', icon: <SettingsIcon className="w-5 h-5" />, path: '/configuracoes' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (loading || isProgressLoading) {
    return (
        <div className="min-h-screen bg-codequest-background flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-codequest-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-codequest-dark font-medium">Carregando dashboard...</p>
            </div>
        </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  console.log("User object in Dashboard before ProfileStats:", user);

  const handleBadgeClick = (badge: any) => {
    if (badge.unlocked) {
      toast.info({
        title: badge.name,
        description: badge.description
      });
    } else {
      toast.info({
        title: 'Conquista bloqueada',
        description: 'Continue sua jornada para desbloquear esta conquista'
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-codequest-background">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar className="bg-white border-r border-gray-200">
            <SidebarHeader className="p-4 border-b">
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-br from-codequest-purple to-codequest-emerald rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">&lt;/&gt;</span>
                </div>
                <span className="font-bold text-lg text-codequest-dark">CodeQuest</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="py-4">
              <div className="px-3 py-2">
                <div className="flex items-center px-2 py-3 mb-2">
                  <img
                    src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-3 border-2 border-codequest-light"
                  />
                  <div>
                    <h3 className="font-medium text-codequest-dark">{user.name}</h3>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-codequest-purple rounded-full flex items-center justify-center text-white text-xs font-bold mr-1">
                        {user.xp}
                      </div>
                      <span className="text-xs text-gray-500">XP</span>
                    </div>
                  </div>
                </div>
                
                <nav className="mt-6 space-y-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        item.active
                          ? 'bg-codequest-purple text-white'
                          : 'text-gray-600 hover:bg-codequest-light hover:text-codequest-dark'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-auto pt-4">
                  <Button
                    variant="outline"
                    className="w-full border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 justify-start"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </div>
            </SidebarContent>
          </Sidebar>

          <div className="flex-1 flex flex-col">
            <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4 text-codequest-dark hover:text-codequest-purple p-2 rounded-md hover:bg-gray-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21M3 6H21M3 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </SidebarTrigger>
                <h1 className="text-xl font-bold text-codequest-dark">Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white mr-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-semibold">{user.xp} XP</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center text-white mr-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-semibold">{user.level} dias</span>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-auto p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-codequest-dark mb-2">Olá, {user.name}!</h2>
                <p className="text-gray-600">Continue de onde parou e mantenha sua sequência de estudos.</p>
              </div>

              <div className="mb-8">
                <ProfileStats stats={{
                  level: user.level || 0,
                  xp: user.xp || 0,
                  streak: 0,
                  completed: userProgress.completed_modules_count || 0,
                  rank: 0
                }} />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-codequest-dark mb-4">Seu Progresso</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dynamicProgressData.map((item, index) => (
                    <ProgressCard
                      key={index}
                      title={item.title}
                      value={item.value}
                      max={item.max}
                      icon={item.icon}
                      color={item.color}
                      delay={index}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-codequest-dark">Seus Cursos</h3>
                  <Link to="/cursos" className="text-codequest-purple hover:underline font-medium text-sm flex items-center">
                    Ver todos
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {languages.map((language, index) => (
                    <LanguageCard 
                      key={language.id} 
                      language={language}
                      delay={index}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-codequest-dark">Suas Conquistas</h3>
                  <Link to="/conquistas" className="text-codequest-purple hover:underline font-medium text-sm flex items-center">
                    Ver todas
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                <motion.div 
                  className="bg-white rounded-xl p-6 shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                    {badges.map((badge, index) => (
                      <Badge
                        key={index}
                        name={badge.name}
                        icon={badge.icon}
                        unlocked={badge.unlocked}
                        description={badge.description}
                        onClick={() => handleBadgeClick(badge)}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
