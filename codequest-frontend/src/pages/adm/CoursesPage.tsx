import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import LanguageCard from '@/components/shared/LanguageCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PlusIcon, LayoutDashboardIcon, BookIcon, UserRoundIcon, SettingsIcon, LogOutIcon, SearchIcon } from 'lucide-react';
import { toast } from 'sonner';
import { coursesService, Course, CreateCourseData } from '@/services/courses';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>([]);
  const [newCourse, setNewCourse] = useState<CreateCourseData>({
    title: '',
    description: '',
    difficulty_level: '',
    status: 'draft',
    category: ''
  });
  
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
    { name: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, path: '/adm-dashboard' },
    { name: 'Cursos', icon: <BookIcon className="w-5 h-5" />, path: '/adm/cursos', active: true },
    { name: 'Perfil', icon: <UserRoundIcon className="w-5 h-5" />, path: '/adm/perfil' },
    { name: 'Configurações', icon: <SettingsIcon className="w-5 h-5" />, path: '/adm/configuracoes' },
  ];

  // Mock data for languages
  const availableLanguages = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'PHP' },
    { id: 4, name: 'Java' },
    { id: 5, name: 'C#' }
  ];

  // Mock data for difficulty levels
  const difficultyLevels = [
    { value: 'easy', label: 'Fácil' },
    { value: 'medium', label: 'Médio' },
    { value: 'hard', label: 'Difícil' }
  ];

  // Mock data for status
  const statusOptions = [
    { value: 'draft', label: 'Rascunho' },
    { value: 'published', label: 'Publicado' },
    { value: 'archived', label: 'Arquivado' }
  ];

  // Mock data for categories
  const categoryOptions = [
    { value: 'frontend', label: 'Front-end' },
    { value: 'backend', label: 'Back-end' },
    { value: 'database', label: 'Banco de Dados' },
    { value: 'mobile', label: 'Mobile' }
  ];

  // Carregar cursos e linguagens ao montar o componente
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Iniciando carregamento dos dados...');
        const [coursesData, languagesData] = await Promise.all([
          coursesService.getAll(),
          coursesService.getLanguages()
        ]);
        console.log('Dados carregados:', { courses: coursesData, languages: languagesData });
        setCourses(coursesData);
        setLanguages(languagesData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar dados. Tente novamente.');
      }
    };

    loadData();
  }, []);

  const handleAddCourse = async () => {
    try {
      setIsLoading(true);
      const response = await coursesService.create(newCourse);
      
      // Atualizar a lista de cursos
      setCourses(prev => [...prev, response.data]);
      
      toast.success('Curso criado com sucesso!');
      
      // Reset form and close modal
      setNewCourse({
        title: '',
        description: '',
        difficulty_level: '',
        status: 'draft',
        category: ''
      });
      setIsAddCourseModalOpen(false);
    } catch (error: any) {
      console.error('Error adding course:', error);
      if (error.response?.data?.errors) {
        // Exibir erros de validação
        Object.values(error.response.data.errors).forEach((messages: any) => {
          messages.forEach((message: string) => {
            toast.error(message);
          });
        });
      } else {
        toast.error('Erro ao criar curso. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Filter courses based on search term and selected category
  const filterCourses = (courses: Course[], category: string) => {
    console.log('Filtrando cursos:', { courses, category, searchTerm });
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || course.category === category;
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
              <Button
                onClick={() => setIsAddCourseModalOpen(true)}
                className="bg-codequest-purple hover:bg-codequest-purple/90 text-white"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Novo Curso
              </Button>
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
                          <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                              <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-codequest-purple to-codequest-emerald`}>
                                      <span className="text-white font-bold text-sm">&lt;/&gt;</span>
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-codequest-dark">{course.title}</h3>
                                      <p className="text-sm text-gray-500">{course.category}</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      course.difficulty_level === 'easy' ? 'bg-green-100 text-green-800' :
                                      course.difficulty_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {course.difficulty_level === 'easy' ? 'Fácil' :
                                       course.difficulty_level === 'medium' ? 'Médio' : 'Difícil'}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      course.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                                      course.status === 'active' ? 'bg-green-100 text-green-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {course.status === 'draft' ? 'Rascunho' :
                                       course.status === 'active' ? 'Publicado' : 'Arquivado'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {filterCourses(courses, category.value).length === 0 && (
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

        {/* Add Course Modal */}
        <Dialog open={isAddCourseModalOpen} onOpenChange={setIsAddCourseModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-codequest-dark">Adicionar Novo Curso</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título do Curso</Label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="Digite o título do curso"
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Digite a descrição do curso"
                  className="min-h-[100px]"
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="difficulty">Nível de Dificuldade</Label>
                  <Select
                    value={newCourse.difficulty_level}
                    onValueChange={(value) => setNewCourse({ ...newCourse, difficulty_level: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newCourse.status}
                    onValueChange={(value) => setNewCourse({ ...newCourse, status: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Temporariamente comentado para testes
                <div className="grid gap-2">
                  <Label htmlFor="language">Linguagem (Opcional)</Label>
                  <Select
                    value={newCourse.language_id}
                    onValueChange={(value) => setNewCourse({ ...newCourse, language_id: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a linguagem" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.id} value={language.id.toString()}>
                          {language.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                */}

                <div className="grid gap-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={newCourse.category}
                    onValueChange={(value) => setNewCourse({ ...newCourse, category: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddCourseModalOpen(false)}
                className="mr-2"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddCourse}
                className="bg-codequest-purple hover:bg-codequest-purple/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Criando...' : 'Criar Curso'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarProvider>
    </div>
  );
};

export default CoursesPage;
