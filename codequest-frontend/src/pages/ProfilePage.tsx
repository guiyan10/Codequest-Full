import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ProfileStats from '@/components/shared/ProfileStats';
import Badge from '@/components/shared/Badge';
import LanguageCard from '@/components/shared/LanguageCard';
import { useAlertToast } from '@/components/ui/alert-toast';
import { LayoutDashboardIcon, BookIcon, UserRoundIcon, SettingsIcon, LogOutIcon, PencilIcon, CameraIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
  const navigate = useNavigate();
  const toast = useAlertToast();
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  // Dados simulados que não dependem do usuário
  const languages = [
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: '/javascript.svg',
      description: 'Aprenda a linguagem que move a web.',
      color: 'border-yellow-400',
      modules: 24,
      progress: 45
    },
    {
      id: 'python',
      name: 'Python',
      icon: '/python.svg',
      description: 'Desenvolva aplicações com uma das linguagens mais versáteis.',
      color: 'border-blue-500',
      modules: 20,
      progress: 10
    },
    {
      id: 'html-css',
      name: 'HTML & CSS',
      icon: '/html-css.svg',
      description: 'Crie websites responsivos e estilizados.',
      color: 'border-orange-500',
      modules: 18,
      progress: 75
    }
  ];
  
  const badges = [
    { name: 'Iniciante', icon: '/badges/novice.svg', unlocked: true, description: 'Completou seu primeiro módulo' },
    { name: 'Persistente', icon: '/badges/persistent.svg', unlocked: true, description: '7 dias seguidos de estudo' },
    { name: 'JavaScript', icon: '/badges/js.svg', unlocked: true, description: 'Completou o curso básico de JavaScript' },
    { name: 'Bug Hunter', icon: '/badges/bug.svg', unlocked: true, description: 'Corrigiu 10 bugs em desafios' },
    { name: 'HTML Mestre', icon: '/badges/html.svg', unlocked: false, description: 'Completou o curso avançado de HTML' },
    { name: 'Pythonista', icon: '/badges/python.svg', unlocked: false, description: 'Completou todos os módulos de Python' },
    { name: 'Constante', icon: '/badges/streak.svg', unlocked: true, description: 'Estudou por 10 dias consecutivos' },
    { name: 'Madrugador', icon: '/badges/early.svg', unlocked: true, description: 'Completou 5 lições antes das 7h' },
    { name: 'Determinado', icon: '/badges/determination.svg', unlocked: true, description: 'Completou 20 módulos' },
    { name: 'CSS Ninja', icon: '/badges/css.svg', unlocked: false, description: 'Dominou animações avançadas em CSS' },
    { name: 'Fullstack', icon: '/badges/fullstack.svg', unlocked: false, description: 'Completou cursos de front-end e back-end' },
    { name: 'Database', icon: '/badges/database.svg', unlocked: false, description: 'Completou o curso de MySQL' },
  ];

  // Sidebar navigation items
  const navigationItems = [
    { name: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Cursos', icon: <BookIcon className="w-5 h-5" />, path: '/cursos' },
    { name: 'Perfil', icon: <UserRoundIcon className="w-5 h-5" />, path: '/perfil', active: true },
    { name: 'Configurações', icon: <SettingsIcon className="w-5 h-5" />, path: '/configuracoes' },
  ];

  // Handle badge click
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

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  return (
    <div className="min-h-screen bg-codequest-background">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          {/* Sidebar */}
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
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-3 border-2 border-codequest-light"
                  />
                  <div>
                    <h3 className="font-medium text-codequest-dark">{user.name}</h3>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-codequest-purple rounded-full flex items-center justify-center text-white text-xs font-bold mr-1">
                        {user.level}
                      </div>
                      <span className="text-xs text-gray-500">Nível {user.level}</span>
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

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4 text-codequest-dark hover:text-codequest-purple p-2 rounded-md hover:bg-gray-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21M3 6H21M3 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </SidebarTrigger>
                <h1 className="text-xl font-bold text-codequest-dark">Perfil</h1>
              </div>
            </header>

            {/* Profile Content */}
            <div className="flex-1 overflow-auto">
              {/* Profile Header */}
              <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start">
                    <div className="relative mb-6 md:mb-0 md:mr-8">
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                        alt={user.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-codequest-light"
                      />
                      <button 
                        className="absolute bottom-0 right-0 bg-codequest-purple text-white rounded-full p-2"
                        onClick={() => toast.info({ title: 'Função em desenvolvimento', description: 'Em breve você poderá alterar sua foto de perfil' })}
                      >
                        <CameraIcon className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h1 className="text-3xl font-bold text-codequest-dark">{user.name}</h1>
                          <p className="text-gray-500 mt-1">{user.email}</p>
                        </div>
                        <button
                          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                          onClick={() => toast.info({ title: 'Função em desenvolvimento', description: 'Em breve você poderá editar seu perfil' })}
                        >
                          <PencilIcon className="w-4 h-4 mr-2" />
                          Editar Perfil
                        </button>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-gray-600">Estudante da plataforma CodeQuest</p>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-600 text-sm">Brasil</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-gray-600 text-sm">Membro desde 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="container mx-auto px-4 py-6">
                <ProfileStats stats={{
                  level: user.level,
                  xp: user.xp,
                  streak: 0,
                  completed: 0,
                  rank: 0
                }} />
              </div>
              
              {/* Profile Details */}
              <div className="container mx-auto px-4 py-6">
                <Tabs defaultValue="progress">
                  <TabsList>
                    <TabsTrigger value="progress" className="px-6">Progresso</TabsTrigger>
                    <TabsTrigger value="achievements" className="px-6">Conquistas</TabsTrigger>
                  </TabsList>

                  <TabsContent value="progress" className="pt-6">
                    <h3 className="text-xl font-bold text-codequest-dark mb-4">Cursos em Andamento</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {languages.map((language, index) => (
                        <LanguageCard 
                          key={language.id} 
                          language={language}
                          delay={index}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="achievements" className="pt-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-codequest-dark">Suas Conquistas</h3>
                        <div className="text-sm text-codequest-purple font-medium">
                          {badges.filter(b => b.unlocked).length} / {badges.length} desbloqueadas
                        </div>
                      </div>
                      
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
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ProfilePage;
