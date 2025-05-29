import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { PlusIcon, PencilIcon, TrashIcon, BookOpenIcon, UsersIcon, LayoutDashboardIcon, UserRoundIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { modulesService, Module, Question } from '@/services/modules';
import { useAuth } from '@/hooks/useAuth';

export default function ModuleQuestionsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [module, setModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    question_text: '',
    question_type: 'multiple_choice',
    points: 1,
    order_index: 0,
    options: [
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false }
    ]
  });

  const navigationItems = [
    { name: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, path: '/adm-dashboard' },
    { name: 'Cursos', icon: <BookOpenIcon className="w-5 h-5" />, path: '/adm/cursos' },
    { name: 'Módulos', icon: <BookOpenIcon className="w-5 h-5" />, path: '/adm/modulos', active: true },
    { name: 'Perfil', icon: <UserRoundIcon className="w-5 h-5" />, path: '/adm/perfil' },
    { name: 'Configurações', icon: <SettingsIcon className="w-5 h-5" />, path: '/adm/configuracoes' },
  ];

  useEffect(() => {
    if (id) {
      loadModule(parseInt(id));
    }
  }, [id]);

  const loadModule = async (moduleId: number) => {
    try {
      const data = await modulesService.getOne(moduleId);
      setModule(data);
    } catch (error) {
      toast.error('Erro ao carregar módulo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateQuestion = async () => {
    try {
      if (!module) return;

      if (!newQuestion.question_text || !newQuestion.options.some(option => option.is_correct)) {
        toast.error('Preencha todos os campos obrigatórios e selecione uma resposta correta');
        return;
      }

      if (newQuestion.options.some(option => !option.option_text)) {
        toast.error('Preencha todas as opções');
        return;
      }

      const question = await modulesService.createQuestion(module.id, {
        question_text: newQuestion.question_text,
        question_type: newQuestion.question_type,
        points: newQuestion.points,
        order_index: newQuestion.order_index,
        options: newQuestion.options
      });

      // Recarregar o módulo para obter a lista atualizada de questões
      await loadModule(module.id);
      
      toast.success('Questão criada com sucesso!');
      setIsModalOpen(false);
      setNewQuestion({
        question_text: '',
        question_type: 'multiple_choice',
        points: 1,
        order_index: 0,
        options: [
          { option_text: '', is_correct: false },
          { option_text: '', is_correct: false },
          { option_text: '', is_correct: false },
          { option_text: '', is_correct: false }
        ]
      });
    } catch (error) {
      console.error('Erro ao criar questão:', error);
      toast.error('Erro ao criar questão');
    }
  };

  const handleEditQuestion = async () => {
    try {
      if (!module || !editingQuestion) return;

      await modulesService.updateQuestion(module.id, editingQuestion.id, {
        question_text: editingQuestion.question_text,
        question_type: editingQuestion.question_type,
        points: editingQuestion.points,
        order_index: editingQuestion.order_index,
        options: editingQuestion.options
      });

      // Recarregar o módulo para obter a lista atualizada de questões
      await loadModule(module.id);
      
      toast.success('Questão atualizada com sucesso!');
      setIsEditModalOpen(false);
      setEditingQuestion(null);
    } catch (error) {
      console.error('Erro ao atualizar questão:', error);
      toast.error('Erro ao atualizar questão');
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (!module) return;
    if (!confirm('Tem certeza que deseja excluir esta questão?')) return;

    try {
      await modulesService.deleteQuestion(module.id, questionId);
      
      // Recarregar o módulo para obter a lista atualizada de questões
      await loadModule(module.id);
      
      toast.success('Questão excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir questão');
    }
  };

  const openEditModal = (question: Question) => {
    setEditingQuestion(question);
    setIsEditModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (isLoading) {
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
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </SidebarContent>
            </Sidebar>

            <div className="flex-1 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    );
  }

  if (!module) {
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
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </SidebarContent>
            </Sidebar>

            <div className="flex-1 flex justify-center items-center">
              <p className="text-gray-500">Módulo não encontrado</p>
            </div>
          </div>
        </SidebarProvider>
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
                <div>
                  <h1 className="text-xl font-bold text-codequest-dark">{module.title}</h1>
                  <p className="text-gray-500">Gerenciar Questões</p>
                </div>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-codequest-purple hover:bg-codequest-purple/90 text-white"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Nova Questão
              </Button>
            </header>

            {/* Questions Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-1 gap-6">
                {module.questions.map((question) => (
                  <Card key={question.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>{question.question_text}</span>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditModal(question)}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteQuestion(question.id)}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label>Opções:</Label>
                          <div className="mt-2 space-y-2">
                            {question.options.map((option, index) => (
                              <div
                                key={index}
                                className={`p-2 rounded ${
                                  option.is_correct
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100'
                                }`}
                              >
                                {option.option_text}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Explicação:</Label>
                          <p className="mt-2 text-sm text-gray-600">{question.explanation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Criação */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Questão</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="question">Pergunta</Label>
                <Textarea
                  id="question"
                  value={newQuestion.question_text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question_text: e.target.value })}
                />
              </div>
              <div>
                <Label>Opções</Label>
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="mt-2">
                    <Input
                      value={option.option_text}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[index] = { ...option, option_text: e.target.value };
                        setNewQuestion({ ...newQuestion, options: newOptions });
                      }}
                      placeholder={`Opção ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div>
                <Label htmlFor="correct-answer">Resposta Correta</Label>
                <Select
                  value={newQuestion.options.find(o => o.is_correct)?.option_text || ''}
                  onValueChange={(value) => {
                    const newOptions = [...newQuestion.options];
                    newOptions.forEach(o => {
                      if (o.option_text === value) {
                        o.is_correct = true;
                      } else {
                        o.is_correct = false;
                      }
                    });
                    setNewQuestion({ ...newQuestion, options: newOptions });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a resposta correta" />
                  </SelectTrigger>
                  <SelectContent>
                    {newQuestion.options.map((option, index) => (
                      option.option_text && (
                        <SelectItem key={index} value={option.option_text}>
                          {option.option_text}
                        </SelectItem>
                      )
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="explanation">Explicação</Label>
                <Textarea
                  id="explanation"
                  value={newQuestion.explanation}
                  onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateQuestion}>Criar Questão</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Edição */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Questão</DialogTitle>
            </DialogHeader>
            {editingQuestion && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-question">Pergunta</Label>
                  <Textarea
                    id="edit-question"
                    value={editingQuestion.question_text}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, question_text: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Opções</Label>
                  {editingQuestion.options.map((option, index) => (
                    <div key={index} className="mt-2">
                      <Input
                        value={option.option_text}
                        onChange={(e) => {
                          const newOptions = [...editingQuestion.options];
                          newOptions[index] = { ...option, option_text: e.target.value };
                          setEditingQuestion({ ...editingQuestion, options: newOptions });
                        }}
                        placeholder={`Opção ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <Label htmlFor="edit-correct-answer">Resposta Correta</Label>
                  <Select
                    value={editingQuestion.options.find(o => o.is_correct)?.option_text || ''}
                    onValueChange={(value) => {
                      const newOptions = [...editingQuestion.options];
                      newOptions.forEach(o => {
                        if (o.option_text === value) {
                          o.is_correct = true;
                        } else {
                          o.is_correct = false;
                        }
                      });
                      setEditingQuestion({ ...editingQuestion, options: newOptions });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a resposta correta" />
                    </SelectTrigger>
                    <SelectContent>
                      {editingQuestion.options.map((option, index) => (
                        option.option_text && (
                          <SelectItem key={index} value={option.option_text}>
                            {option.option_text}
                          </SelectItem>
                        )
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-explanation">Explicação</Label>
                  <Textarea
                    id="edit-explanation"
                    value={editingQuestion.explanation}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditQuestion}>Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarProvider>
    </div>
  );
} 