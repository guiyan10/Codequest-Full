import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { PlusIcon, PencilIcon, TrashIcon, BookOpenIcon, UsersIcon, LayoutDashboardIcon, UserRoundIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { modulesService, Module, CreateModuleData } from '@/services/modules';
import { coursesService } from '@/services/courses';
import { useAuth } from '@/hooks/useAuth';

export default function ModulesPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [newModule, setNewModule] = useState<Partial<CreateModuleData>>({
    title: '',
    description: '',
    content: '',
    order_index: 0,
    course_id: 0,
    duration: '',
    xp: 0,
    questions: []
  });

  const navigationItems = [
    { name: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, path: '/adm-dashboard' },
    { name: 'Cursos', icon: <BookOpenIcon className="w-5 h-5" />, path: '/adm/cursos' },
    { name: 'Módulos', icon: <BookOpenIcon className="w-5 h-5" />, path: '/adm/modulos', active: true },
    { name: 'Perfil', icon: <UserRoundIcon className="w-5 h-5" />, path: '/adm/perfil' },
    { name: 'Configurações', icon: <SettingsIcon className="w-5 h-5" />, path: '/adm/configuracoes' },
  ];

  useEffect(() => {
    loadModules();
    loadCourses();
  }, []);

  const loadModules = async () => {
    try {
      const data = await modulesService.getAll();
      setModules(data);
    } catch (error) {
      toast.error('Erro ao carregar módulos');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const data = await coursesService.getAll();
      setCourses(data);
    } catch (error) {
      toast.error('Erro ao carregar cursos');
    }
  };

  const handleCreateModule = async () => {
    try {
      if (!newModule.course_id || !newModule.title || !newModule.description || !newModule.content) {
        toast.error('Preencha todos os campos obrigatórios');
        return;
      }

      await modulesService.create(newModule as CreateModuleData);
      toast.success('Módulo criado com sucesso!');
      setIsModalOpen(false);
      setNewModule({
        title: '',
        description: '',
        content: '',
        order_index: 0,
        course_id: 0,
        duration: '',
        xp: 0,
        questions: []
      });
      loadModules();
    } catch (error) {
      toast.error('Erro ao criar módulo');
    }
  };

  const handleEditModule = async () => {
    try {
      if (!editingModule) return;

      await modulesService.update(editingModule.id, {
        title: editingModule.title,
        description: editingModule.description,
        content: editingModule.content,
        order: editingModule.order,
        course_id: editingModule.course_id,
        questions: editingModule.questions
      });

      toast.success('Módulo atualizado com sucesso!');
      setIsEditModalOpen(false);
      setEditingModule(null);
      loadModules();
    } catch (error) {
      toast.error('Erro ao atualizar módulo');
    }
  };

  const handleDeleteModule = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este módulo?')) return;

    try {
      await modulesService.delete(id);
      toast.success('Módulo excluído com sucesso!');
      loadModules();
    } catch (error) {
      toast.error('Erro ao excluir módulo');
    }
  };

  const openEditModal = (module: Module) => {
    setEditingModule(module);
    setIsEditModalOpen(true);
  };

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
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
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
                  onClick={handleLogout}
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Sair
                </Button>
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
                <h1 className="text-xl font-bold text-codequest-dark">Módulos</h1>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-codequest-purple hover:bg-codequest-purple/90 text-white"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Novo Módulo
              </Button>
            </header>

            {/* Modules Content */}
            <div className="flex-1 overflow-auto p-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {modules.map((module) => (
                    <Card key={module.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex justify-between items-start">
                          <span>{module.title}</span>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditModal(module)}
                            >
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteModule(module.id)}
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardTitle>
                        <CardDescription>
                          {courses.find(c => c.id === module.course_id)?.title || 'Curso não encontrado'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 line-clamp-2">{module.description}</p>
                        <div className="mt-4">
                          <span className="text-xs text-gray-500">
                            {module.questions.length} questões
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => navigate(`/adm/modulos/${module.id}/questoes`)}
                        >
                          Gerenciar Questões
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de Criação */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Módulo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="course">Curso</Label>
                <Select
                  value={newModule.course_id?.toString()}
                  onValueChange={(value) => setNewModule({ ...newModule, course_id: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newModule.title}
                  onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newModule.description}
                  onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  value={newModule.content}
                  onChange={(e) => setNewModule({ ...newModule, content: e.target.value })}
                  className="h-32"
                />
              </div>
              <div>
                <Label htmlFor="order">Ordem</Label>
                <Input
                  id="order"
                  type="number"
                  value={newModule.order_index}
                  onChange={(e) => setNewModule({ ...newModule, order_index: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="duration">Duração</Label>
                <Input
                  id="duration"
                  value={newModule.duration}
                  onChange={(e) => setNewModule({ ...newModule, duration: e.target.value })}
                  placeholder="Ex: 2 horas"
                />
              </div>
              <div>
                <Label htmlFor="xp">XP</Label>
                <Input
                  id="xp"
                  type="number"
                  value={newModule.xp}
                  onChange={(e) => setNewModule({ ...newModule, xp: parseInt(e.target.value) })}
                  placeholder="Pontos de experiência"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateModule}>Criar Módulo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Edição */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Módulo</DialogTitle>
            </DialogHeader>
            {editingModule && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-course">Curso</Label>
                  <Select
                    value={editingModule.course_id.toString()}
                    onValueChange={(value) => setEditingModule({ ...editingModule, course_id: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-title">Título</Label>
                  <Input
                    id="edit-title"
                    value={editingModule.title}
                    onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Descrição</Label>
                  <Textarea
                    id="edit-description"
                    value={editingModule.description}
                    onChange={(e) => setEditingModule({ ...editingModule, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-content">Conteúdo</Label>
                  <Textarea
                    id="edit-content"
                    value={editingModule.content}
                    onChange={(e) => setEditingModule({ ...editingModule, content: e.target.value })}
                    className="h-32"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-order">Ordem</Label>
                  <Input
                    id="edit-order"
                    type="number"
                    value={editingModule.order}
                    onChange={(e) => setEditingModule({ ...editingModule, order: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditModule}>Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarProvider>
    </div>
  );
} 