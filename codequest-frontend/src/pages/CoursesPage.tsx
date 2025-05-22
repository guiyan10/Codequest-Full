import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import LanguageCard, { LanguageCardProps } from '@/components/shared/LanguageCard';
import { Input } from '@/components/ui/input';
import { LayoutDashboardIcon, BookIcon, UserRoundIcon, SettingsIcon, LogOutIcon, SearchIcon } from 'lucide-react';
import { coursesService, Course } from '@/services/courses';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Simulated user data
  const userData = {
    name: 'Ana Silva',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    level: 7
  };

  // Language categories
  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'frontend', label: 'Front-end' },
    { value: 'backend', label: 'Back-end' },
    { value: 'database', label: 'Banco de Dados' },
    { value: 'mobile', label: 'Mobile' },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const data = await coursesService.getAll();
        console.log('Fetched courses:', data); // Log fetched data
        setCourses(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar os cursos. Por favor, tente novamente.');
        console.error('Error fetching courses:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Sidebar navigation items
  const navigationItems = [
    { name: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Cursos', icon: <BookIcon className="w-5 h-5" />, path: '/cursos', active: true },
    { name: 'Perfil', icon: <UserRoundIcon className="w-5 h-5" />, path: '/perfil' },
    { name: 'Configurações', icon: <SettingsIcon className="w-5 h-5" />, path: '/configuracoes' },
  ];

  // Filter courses based on search term and selected category
  const filterCourses = (courses: Course[], category: string) => {
    console.log('Filtering courses with:', { searchTerm, category, coursesLength: courses.length }); // Log filtering parameters
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || course.category === category;
      return matchesSearch && matchesCategory;
    });
  };

  // Map course data to language card format
  const mapCourseToLanguageCard = (course: Course): LanguageCardProps['language'] => {
    let mappedStatus: 'draft' | 'published' | 'archived';
    
    switch (course.status) {
      case 'active':
        mappedStatus = 'published';
        break;
      case 'inactive':
        mappedStatus = 'archived';
        break;
      case 'draft':
      default: // Should only be 'draft' based on backend type, but include default for safety
        mappedStatus = 'draft';
        break;
    }

    return ({
      id: course.id.toString(),
      name: course.title,
      icon: `/icons/${course.category}.svg`,
      description: course.description,
      color: `border-${getCategoryColor(course.category)}`,
      modules: 0, // TODO: Add modules count when available
      progress: 0, // TODO: Add progress when available
      category: course.category,
      difficulty: course.difficulty_level,
      status: mappedStatus,
    });
  };

  // Helper function to get color based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'blue-400';
      case 'backend':
        return 'green-500';
      case 'database':
        return 'blue-700';
      case 'mobile':
        return 'cyan-500';
      default:
        return 'gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-codequest-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-codequest-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-codequest-dark font-medium">Carregando cursos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-codequest-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-codequest-dark font-medium">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-codequest-purple text-white hover:bg-opacity-90"
          >
            Tentar novamente
          </Button>
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
                <h1 className="text-xl font-bold text-codequest-dark">Cursos</h1>
              </div>
            </header>

            {/* Courses Content */}
            <div className="flex-1 overflow-auto p-6">
              {/* Search and Filter */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <h2 className="text-2xl font-bold text-codequest-dark mb-4 md:mb-0">Explore nossos cursos</h2>
                  <div className="relative w-full md:w-80">
                    <Input
                      type="text"
                      placeholder="Buscar cursos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Course Categories */}
              <div className="mb-8">
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    {categories.map(category => (
                      <TabsTrigger key={category.value} value={category.value}>
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {categories.map(category => (
                    <TabsContent key={category.value} value={category.value}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filterCourses(courses, category.value).map((course, index) => (
                          <LanguageCard
                            key={course.id}
                            language={mapCourseToLanguageCard(course)}
                            delay={index}
                          />
                        ))}
                      </div>
                      
                      {filterCourses(courses, category.value).length === 0 && (
                        <div className="text-center py-12">
                          <div className="text-codequest-purple mb-4">
                            <SearchIcon className="w-12 h-12 mx-auto opacity-50" />
                          </div>
                          <h3 className="text-lg font-medium text-codequest-dark mb-2">Nenhum curso encontrado</h3>
                          <p className="text-gray-500">Tente ajustar sua busca ou filtrar por outra categoria.</p>
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CoursesPage;
