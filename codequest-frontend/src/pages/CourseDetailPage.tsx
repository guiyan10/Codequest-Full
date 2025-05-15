
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAlertToast } from '@/components/ui/alert-toast';
import ModuleCard from '@/components/shared/ModuleCard';
import AnimatedNumber from '@/components/shared/AnimatedNumber';
import { LayoutDashboardIcon, BookIcon, UserRoundIcon, SettingsIcon, LogOutIcon, CheckIcon, BookOpenIcon, MessageSquareIcon, DownloadIcon, StarIcon } from 'lucide-react';

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const toast = useAlertToast();
  
  // Simulated user data
  const userData = {
    name: 'Ana Silva',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    level: 7
  };

  // Simulated course data
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simulated course data fetch
  useEffect(() => {
    // Simulate API call to fetch course data
    setTimeout(() => {
      const courseData = {
        id: courseId,
        name: courseId === 'javascript' ? 'JavaScript' :
              courseId === 'python' ? 'Python' :
              courseId === 'html-css' ? 'HTML & CSS' :
              'MySQL',
        icon: `/${courseId}.svg`,
        description: courseId === 'javascript' ? 'JavaScript é uma linguagem de programação interpretada estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma.' :
                    courseId === 'python' ? 'Python é uma linguagem de programação de alto nível, interpretada de script, imperativa, orientada a objetos, funcional, de tipagem dinâmica e forte.' :
                    courseId === 'html-css' ? 'HTML e CSS são as tecnologias fundamentais para construção de páginas web. HTML fornece a estrutura e CSS a apresentação visual.' :
                    'MySQL é um sistema de gerenciamento de banco de dados, que utiliza a linguagem SQL como interface.',
        instructor: 'Prof. Carlos Mendes',
        totalModules: 24,
        totalHours: 42,
        rating: 4.8,
        reviewCount: 1248,
        studentsCount: 15879,
        lastUpdate: '10/04/2023',
        progress: courseId === 'javascript' ? 45 :
                 courseId === 'python' ? 10 :
                 courseId === 'html-css' ? 75 : 0,
        completedModules: courseId === 'javascript' ? 11 :
                         courseId === 'python' ? 2 :
                         courseId === 'html-css' ? 12 : 0,
        categories: ['Desenvolvimento Web', 'Programação', 'Front-end'],
        what_will_learn: [
          'Fundamentos da linguagem de programação',
          'Estruturas de controle e condicionais',
          'Manipulação do DOM (para JavaScript/HTML)',
          'Programação orientada a objetos',
          'Trabalhar com APIs e requests',
          'Desenvolvimento de aplicações completas'
        ],
        modules: [
          {
            id: 'mod1',
            title: 'Introdução e Fundamentos',
            description: 'Aprenda os conceitos básicos e prepare seu ambiente de desenvolvimento.',
            duration: '2h 30min',
            status: 'completed',
            xp: 150
          },
          {
            id: 'mod2',
            title: 'Sintaxe e Tipos de Dados',
            description: 'Entenda os diferentes tipos de dados e como manipulá-los.',
            duration: '3h 15min',
            status: 'completed',
            xp: 180
          },
          {
            id: 'mod3',
            title: 'Estruturas de Controle',
            description: 'Domine condicionais, loops e controle de fluxo no código.',
            duration: '4h',
            status: 'completed',
            xp: 200
          },
          {
            id: 'mod4',
            title: 'Funções e Escopo',
            description: 'Aprenda a criar e utilizar funções para organizar seu código.',
            duration: '3h 45min',
            status: 'in-progress',
            xp: 220
          },
          {
            id: 'mod5',
            title: 'Arrays e Objetos',
            description: 'Trabalhe com coleções de dados e estruturas complexas.',
            duration: '4h 30min',
            status: 'locked',
            xp: 250
          },
          {
            id: 'mod6',
            title: 'Programação Orientada a Objetos',
            description: 'Compreenda os princípios de OOP e como aplicá-los.',
            duration: '5h',
            status: 'locked',
            xp: 300
          }
        ]
      };
      
      setCourse(courseData);
      setLoading(false);
    }, 1000);
  }, [courseId]);

  // Sidebar navigation items
  const navigationItems = [
    { name: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Cursos', icon: <BookIcon className="w-5 h-5" />, path: '/cursos', active: true },
    { name: 'Perfil', icon: <UserRoundIcon className="w-5 h-5" />, path: '/perfil' },
    { name: 'Configurações', icon: <SettingsIcon className="w-5 h-5" />, path: '/configuracoes' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-codequest-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-codequest-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-codequest-dark font-medium">Carregando curso...</p>
        </div>
      </div>
    );
  }

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
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-10 h-10 rounded-full mr-3 border-2 border-codequest-light"
                  />
                  <div>
                    <h3 className="font-medium text-codequest-dark">{userData.name}</h3>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-codequest-purple rounded-full flex items-center justify-center text-white text-xs font-bold mr-1">
                        {userData.level}
                      </div>
                      <span className="text-xs text-gray-500">Nível {userData.level}</span>
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
                <div className="flex items-center">
                  <Link to="/cursos" className="text-gray-500 hover:text-codequest-purple">Cursos</Link>
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="font-medium text-codequest-dark">{course.name}</span>
                </div>
              </div>
            </header>

            {/* Course Content */}
            <div className="flex-1 overflow-auto">
              {/* Course Header */}
              <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                  <div className="flex flex-col lg:flex-row items-start">
                    <div className="lg:w-2/3 pr-0 lg:pr-8">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 mr-4 rounded-lg bg-codequest-light flex items-center justify-center">
                          <img src={course.icon} alt={course.name} className="w-10 h-10" />
                        </div>
                        <div>
                          <h1 className="text-3xl font-bold text-codequest-dark">{course.name}</h1>
                          <div className="flex items-center text-sm mt-1">
                            <span className="text-gray-500">Por {course.instructor}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-gray-500">Última atualização: {course.lastUpdate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6">
                        {course.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {course.categories.map((category: string) => (
                          <span 
                            key={category}
                            className="px-3 py-1 bg-codequest-light text-codequest-purple rounded-full text-sm font-medium"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="lg:w-1/3 w-full mt-6 lg:mt-0">
                      <div className="bg-codequest-light/50 rounded-xl p-6">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-codequest-purple mb-1">
                              <BookIcon className="w-5 h-5 mx-auto" />
                            </div>
                            <div className="font-bold text-xl">
                              {course.totalModules}
                            </div>
                            <div className="text-sm text-gray-500">Módulos</div>
                          </div>
                          <div className="text-center">
                            <div className="text-codequest-purple mb-1">
                              <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                <path strokeWidth="2" d="M12 6v6l4 2" />
                              </svg>
                            </div>
                            <div className="font-bold text-xl">
                              {course.totalHours}h
                            </div>
                            <div className="text-sm text-gray-500">Duração</div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Seu progresso</span>
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="mt-2 text-sm text-gray-500 text-center">
                            <AnimatedNumber value={course.completedModules} /> de {course.totalModules} módulos completados
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-codequest-purple text-white"
                          onClick={() => {
                            const nextModule = course.modules.find((m: any) => m.status === 'in-progress');
                            if (nextModule) {
                              toast.success({ title: 'Continuando do último módulo', description: nextModule.title });
                            } else {
                              toast.info({ title: 'Iniciando curso', description: 'Bem-vindo ao curso de ' + course.name });
                            }
                          }}
                        >
                          {course.progress > 0 ? 'Continuar Curso' : 'Iniciar Curso'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="container mx-auto px-4 py-8">
                <Tabs defaultValue="modules">
                  <TabsList>
                    <TabsTrigger value="modules" className="px-6">Módulos</TabsTrigger>
                    <TabsTrigger value="about" className="px-6">Sobre o Curso</TabsTrigger>
                    <TabsTrigger value="resources" className="px-6">Recursos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="modules" className="pt-6">
                    <div className="grid gap-6">
                      {course.modules.map((module: any, index: number) => (
                        <ModuleCard
                          key={module.id}
                          id={module.id}
                          title={module.title}
                          description={module.description}
                          duration={module.duration}
                          courseId={course.id}
                          status={module.status}
                          xp={module.xp}
                          index={index}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="about" className="pt-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h2 className="text-xl font-bold mb-4 text-codequest-dark">Sobre este curso</h2>
                      <p className="text-gray-600 mb-8">
                        {course.description} Este curso foi projetado para levar você do básico ao avançado,
                        com exercícios práticos e projetos reais que ajudarão você a consolidar seu conhecimento
                        e construir um portfólio impressionante.
                      </p>
                      
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-codequest-dark">O que você vai aprender</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {course.what_will_learn.map((item: string, index: number) => (
                            <div key={index} className="flex items-start">
                              <div className="mt-1 mr-3 text-codequest-emerald">
                                <CheckIcon className="w-5 h-5" />
                              </div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center bg-codequest-light/30 rounded-lg p-4">
                          <div className="w-12 h-12 rounded-full bg-codequest-purple/10 flex items-center justify-center text-codequest-purple mb-2">
                            <BookOpenIcon className="w-6 h-6" />
                          </div>
                          <div className="text-xl font-bold">
                            <AnimatedNumber value={course.studentsCount} />+
                          </div>
                          <p className="text-gray-500 text-sm">Estudantes</p>
                        </div>
                        
                        <div className="flex flex-col items-center bg-codequest-light/30 rounded-lg p-4">
                          <div className="w-12 h-12 rounded-full bg-codequest-purple/10 flex items-center justify-center text-codequest-purple mb-2">
                            <MessageSquareIcon className="w-6 h-6" />
                          </div>
                          <div className="text-xl font-bold">
                            <AnimatedNumber value={course.reviewCount} />+
                          </div>
                          <p className="text-gray-500 text-sm">Avaliações</p>
                        </div>
                        
                        <div className="flex flex-col items-center bg-codequest-light/30 rounded-lg p-4">
                          <div className="w-12 h-12 rounded-full bg-codequest-purple/10 flex items-center justify-center text-codequest-purple mb-2">
                            <StarIcon className="w-6 h-6" />
                          </div>
                          <div className="text-xl font-bold">
                            {course.rating}
                          </div>
                          <p className="text-gray-500 text-sm">Avaliação média</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="resources" className="pt-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h2 className="text-xl font-bold mb-4 text-codequest-dark">Recursos do Curso</h2>
                      <p className="text-gray-600 mb-6">
                        Aqui você encontra recursos adicionais para complementar seu aprendizado.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: 'Guia de Referência Rápida', size: '1.2 MB', type: 'PDF' },
                          { name: 'Arquivos de Exercícios', size: '4.5 MB', type: 'ZIP' },
                          { name: 'Slides das Aulas', size: '3.8 MB', type: 'PDF' },
                          { name: 'Código-fonte de Exemplos', size: '2.7 MB', type: 'ZIP' }
                        ].map((resource, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-md bg-codequest-purple/10 flex items-center justify-center text-codequest-purple mr-3">
                                <DownloadIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-medium text-codequest-dark">{resource.name}</p>
                                <p className="text-sm text-gray-500">{resource.size} • {resource.type}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="border-codequest-purple text-codequest-purple hover:bg-codequest-purple hover:text-white">
                              Download
                            </Button>
                          </div>
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

export default CourseDetailPage;
