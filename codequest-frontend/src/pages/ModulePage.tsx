import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useAlertToast } from '@/components/ui/alert-toast';
import { LayoutDashboardIcon, BookIcon, UserRoundIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { coursesService, Module, Question } from '@/services/courses';
import { useAuth } from '@/hooks/useAuth';

const ModulePage = () => {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  const navigate = useNavigate();
  const toast = useAlertToast();
  const { user, logout } = useAuth();
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (courseId && moduleId) {
      loadModule(parseInt(courseId), parseInt(moduleId));
    }
  }, [courseId, moduleId]);

  const loadModule = async (courseId: number, moduleId: number) => {
    try {
      console.log('Loading module:', { courseId, moduleId });
      const moduleData = await coursesService.getModule(courseId, moduleId);
      console.log('Module data received:', moduleData);
      
      if (moduleData) {
        // Garantir que as questões e opções estejam no formato correto
        const formattedModule = {
          ...moduleData,
          questions: moduleData.questions?.map(question => ({
            ...question,
            options: question.options || []
          })) || []
        };
        
        console.log('Formatted module:', formattedModule);
        setModule(formattedModule);
      } else {
        toast.error('Módulo não encontrado');
        navigate(`/cursos/${courseId}`);
      }
    } catch (error) {
      console.error('Error loading module:', error);
      toast.error('Erro ao carregar módulo');
      navigate(`/cursos/${courseId}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    if (!module) return;

    try {
      let correctAnswers = 0;
      for (const question of module.questions) {
        const correctOption = question.options.find(option => option.is_correct);
        if (correctOption && answers[question.id] === correctOption.option_text) {
          correctAnswers++;
        }
      }

      const score = (correctAnswers / module.questions.length) * 100;
      if (score >= 70) {
        await coursesService.completeModule(module.id);
        toast.success('Parabéns! Você completou o módulo!');
        navigate(`/cursos/${courseId}`);
      } else {
        toast.error('Você precisa acertar pelo menos 70% das questões para completar o módulo.');
      }
    } catch (error) {
      toast.error('Erro ao enviar respostas');
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
          <p className="mt-4 text-codequest-dark font-medium">Carregando módulo...</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-codequest-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-codequest-dark font-medium">Módulo não encontrado</p>
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
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {/* Module Header */}
            <div className="bg-white border-b border-gray-200">
              <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between">
                  <div>
                    <Link to={`/cursos/${courseId}`} className="text-gray-500 hover:text-codequest-purple mb-2 inline-block">
                      ← Voltar ao curso
                    </Link>
                    <h1 className="text-3xl font-bold text-codequest-dark">{module.title}</h1>
                    <div className="flex items-center text-sm mt-1">
                      <span className="text-gray-500">Duração: {module.duration}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-gray-500">XP: {module.xp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module Content */}
            <div className="container mx-auto px-4 py-8">
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-6">{module.description}</p>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {module.questions && module.questions.length > 0 ? (
                  module.questions.map((question, index) => (
                    <Card key={question.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Questão {index + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{question.question_text}</p>
                        <RadioGroup
                          value={answers[question.id]}
                          onValueChange={(value) => handleAnswerChange(question.id, value)}
                          disabled={submitted}
                        >
                          {question.options && question.options.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.option_text} id={`option-${option.id}`} />
                              <Label htmlFor={`option-${option.id}`}>{option.option_text}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Este módulo ainda não possui questões.</p>
                  </div>
                )}

                {module.questions && module.questions.length > 0 && (
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleSubmit}
                      disabled={submitted}
                      className="bg-codequest-purple hover:bg-codequest-purple/90 text-white"
                    >
                      Enviar Respostas
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ModulePage; 