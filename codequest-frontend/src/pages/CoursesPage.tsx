
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import LanguageCard from '@/components/shared/LanguageCard';
import { Input } from '@/components/ui/input';
import { LayoutDashboardIcon, BookIcon, UserRoundIcon, SettingsIcon, LogOutIcon, SearchIcon } from 'lucide-react';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
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

  // Simulated courses data
  const allLanguages = [
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: '/javascript.svg',
      description: 'Aprenda a linguagem que move a web. Do básico ao avançado com ES6+.',
      color: 'border-yellow-400',
      modules: 24,
      progress: 45,
      category: 'frontend'
    },
    {
      id: 'python',
      name: 'Python',
      icon: '/python.svg',
      description: 'Desenvolva aplicações com uma das linguagens mais versáteis e populares.',
      color: 'border-blue-500',
      modules: 20,
      progress: 10,
      category: 'backend'
    },
    {
      id: 'html-css',
      name: 'HTML & CSS',
      icon: '/html-css.svg',
      description: 'Crie websites responsivos com HTML5 e estilize com CSS3 moderno.',
      color: 'border-orange-500',
      modules: 18,
      progress: 75,
      category: 'frontend'
    },
    {
      id: 'mysql',
      name: 'MySQL',
      icon: '/mysql.svg',
      description: 'Gerencie bancos de dados relacionais com o sistema mais usado do mundo.',
      color: 'border-blue-700',
      modules: 16,
      category: 'database'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: '/nodejs.svg',
      description: 'Construa aplicações back-end escaláveis com JavaScript no servidor.',
      color: 'border-green-500',
      modules: 22,
      category: 'backend'
    },
    {
      id: 'react',
      name: 'React',
      icon: '/react.svg',
      description: 'Crie interfaces de usuário modernas e reativas com a biblioteca do Facebook.',
      color: 'border-blue-400',
      modules: 20,
      category: 'frontend'
    },
    {
      id: 'php',
      name: 'PHP',
      icon: '/php.svg',
      description: 'Desenvolva aplicações web do lado do servidor com a linguagem que potencia a web.',
      color: 'border-purple-500',
      modules: 19,
      category: 'backend'
    },
    {
      id: 'flutter',
      name: 'Flutter',
      icon: '/flutter.svg',
      description: 'Crie apps nativos para Android e iOS com uma única base de código.',
      color: 'border-cyan-500',
      modules: 24,
      category: 'mobile'
    }
  ];

  // Sidebar navigation items
  const navigationItems = [
    { name: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Cursos', icon: <BookIcon className="w-5 h-5" />, path: '/cursos', active: true },
    { name: 'Perfil', icon: <UserRoundIcon className="w-5 h-5" />, path: '/perfil' },
    { name: 'Configurações', icon: <SettingsIcon className="w-5 h-5" />, path: '/configuracoes' },
  ];

  // Filter languages based on search term and selected category
  const filterLanguages = (languages: any[], category: string) => {
    return languages.filter(language => {
      const matchesSearch = language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           language.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || language.category === category;
      return matchesSearch && matchesCategory;
    });
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
                        {filterLanguages(allLanguages, category.value).map((language, index) => (
                          <LanguageCard
                            key={language.id}
                            language={language}
                            delay={index}
                          />
                        ))}
                      </div>
                      
                      {filterLanguages(allLanguages, category.value).length === 0 && (
                        <div className="text-center py-12">
                          <div className="text-codequest-purple mb-4">
                            <SearchIcon className="w-12 h-12 mx-auto opacity-50" />
                          </div>
                          <h3 className="text-xl font-medium mb-2">Nenhum curso encontrado</h3>
                          <p className="text-gray-500">Tente ajustar sua busca ou filtros</p>
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
