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
import { coursesService, Course, Module } from '@/services/courses';
import { useAuth } from '@/hooks/useAuth';

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const toast = useAlertToast();
  const { user, logout } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCourse(parseInt(id));
    }
  }, [id]);

  const loadCourse = async (courseId: number) => {
    try {
      const [courseData, modulesData] = await Promise.all([
        coursesService.getOne(courseId),
        coursesService.getModules(courseId)
      ]);
      setCourse(courseData);
      setModules(modulesData);
    } catch (error) {
      toast.error('Erro ao carregar curso');
    } finally {
      setLoading(false);
    }
  };

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

  if (!course) {
    return (
      <div className="min-h-screen bg-codequest-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-codequest-dark font-medium">Curso não encontrado</p>
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
                    src={user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || '')}
                    alt={user?.name || 'Usuário'}
                    className="w-10 h-10 rounded-full mr-3 border-2 border-codequest-light"
                  />
                  <div>
                    <h3 className="font-medium text-codequest-dark">{user?.name || 'Carregando...'}</h3>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-codequest-purple rounded-full flex items-center justify-center text-white text-xs font-bold mr-1">
                        {user?.level || 0}
                      </div>
                      <span className="text-xs text-gray-500">Nível {user?.level || 0}</span>
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
                
                <Button
                  variant="outline"
                  className="w-full border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 justify-start mt-4"
                  onClick={() => logout()}
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {/* Course Header */}
            <div className="bg-white border-b border-gray-200">
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row items-start">
                  <div className="lg:w-2/3 pr-0 lg:pr-8">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 mr-4 rounded-lg bg-codequest-light flex items-center justify-center">
                        <img src={`/icons/${course.category}.svg`} alt={course.title} className="w-10 h-10" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-codequest-dark">{course.title}</h1>
                        <div className="flex items-center text-sm mt-1">
                          <span className="text-gray-500">Nível: {course.difficulty_level}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-gray-500">Categoria: {course.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      {course.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-codequest-light text-codequest-purple rounded-full text-sm font-medium">
                        {course.category}
                      </span>
                      <span className="px-3 py-1 bg-codequest-light text-codequest-purple rounded-full text-sm font-medium">
                        {course.difficulty_level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="container mx-auto px-4 py-8">
              <Tabs defaultValue="modules">
                <TabsList>
                  <TabsTrigger value="modules" className="px-6">Módulos</TabsTrigger>
                  <TabsTrigger value="about" className="px-6">Sobre o Curso</TabsTrigger>
                </TabsList>

                <TabsContent value="modules" className="pt-6">
                  <div className="grid gap-6">
                    {modules.map((module, index) => (
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
                      {course.description}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CourseDetailPage;
