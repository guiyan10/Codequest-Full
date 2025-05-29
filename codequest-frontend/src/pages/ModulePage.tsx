import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useAlertToast } from '@/components/ui/alert-toast';
import { LayoutDashboardIcon, BookIcon, UserRoundIcon, SettingsIcon, LogOutIcon, CheckCircleIcon } from 'lucide-react';
import { coursesService, Module, Question } from '@/services/courses';
import { modulesService, AnswerResponse } from '@/services/modules';
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
  const [answerResults, setAnswerResults] = useState<Record<number, AnswerResponse>>({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (courseId && moduleId) {
      const queryParams = new URLSearchParams(location.search);
      const mode = queryParams.get('mode');
      const reviewMode = mode === 'review';
      setIsReviewMode(reviewMode);

      loadModule(parseInt(courseId), parseInt(moduleId), reviewMode);
    }
  }, [courseId, moduleId, location.search]);

  const loadModule = async (courseId: number, moduleId: number, reviewMode: boolean) => {
    try {
      console.log('Loading module:', { courseId, moduleId, reviewMode });
      const moduleData = await coursesService.getModuleById(courseId, moduleId);
      console.log('Module data received:', moduleData);

      if (moduleData) {
        const formattedModule = {
          ...moduleData,
          questions: moduleData.questions?.map(question => {
            console.log('Question data:', question);
            console.log('Question options:', question.options);
            return {
              ...question,
              options: question.options || []
            };
          }) || []
        };

        console.log('Formatted module with questions:', formattedModule);
        setModule(formattedModule);

        if (reviewMode) {
          // Load user answers for review mode
          const userAnswers = await modulesService.getUserModuleAnswers(moduleId);
          console.log('User answers for review:', userAnswers);

          const results: Record<number, AnswerResponse> = {};
          let calculatedTotalPoints = 0;

          userAnswers.forEach((answer: any) => {
              const question = formattedModule.questions.find(q => q.id === answer.module_question_id);
              if (question) {
                  const correctOption = question.options?.find(opt => opt.is_correct);
                  const isCorrect = correctOption?.option_text === answer.answer;
                  results[question.id] = {
                      status: isCorrect ? 'correct' : 'incorrect',
                      is_correct: isCorrect,
                      correct_answer: correctOption?.option_text || '',
                      points: isCorrect ? question.points : 0,
                      user_answer: answer.answer // Assuming answer has this property
                  };
                  if (isCorrect) {
                      calculatedTotalPoints += question.points;
                  }
              }
          });
          setAnswerResults(results);
          setTotalPoints(calculatedTotalPoints);
          setSubmitted(true); // Set submitted to true in review mode

        } else {
          // Normal mode: Initialize empty answers
          const initialAnswers: Record<number, string> = {};
          formattedModule.questions.forEach(q => {
              if (q.options && q.options.length > 0) {
                  initialAnswers[q.id] = '';
              }
          });
          setAnswers(initialAnswers);
          setSubmitted(false); // Ensure not submitted in normal mode initially
        }
      } else {
        toast.error({
          title: 'Erro',
          description: 'Módulo não encontrado'
        });
        navigate(`/cursos/${courseId}`);
      }
    } catch (error) {
      console.error('Error loading module:', error);
      toast.error({
        title: 'Erro',
        description: 'Erro ao carregar módulo'
      });
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
      let totalPointsEarned = 0;
      const answersToSubmit: { question_id: number; answer: string }[] = [];

      for (const question of module.questions) {
        const answer = answers[question.id];
        if (answer === undefined || answer === null || answer === '') {
          toast.error({
            title: 'Erro',
            description: 'Por favor, responda todas as questões'
          });
          return;
        }

        answersToSubmit.push({
            question_id: question.id,
            answer: answer
        });

        const correctOption = question.options?.find(opt => opt.is_correct);
        if (correctOption && answer === correctOption.option_text) {
            totalPointsEarned += question.points;
        }
      }

      setTotalPoints(totalPointsEarned);
      setSubmitted(true);

      const totalPossiblePoints = module.questions.reduce((sum, q) => sum + q.points, 0);
      const score = (totalPointsEarned / totalPossiblePoints) * 100;

      if (score >= 70) {
        try {
          const completionResult = await modulesService.completeModule(module.id, answersToSubmit);
          toast.success({
            title: 'Sucesso',
            description: `Parabéns! Você completou o módulo e ganhou ${completionResult.xp_earned} XP!`
          });
          navigate(`/cursos/${courseId}`);
        } catch (error) {
          console.error('Error completing module:', error);
          toast.error({
            title: 'Erro',
            description: 'Erro ao completar módulo'
          });
        }
      } else {
        toast.error({
          title: 'Erro',
          description: 'Você precisa acertar pelo menos 70% das questões para completar o módulo.'
        });
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
      toast.error({
        title: 'Erro',
        description: 'Erro ao enviar respostas'
      });
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
          <p className="mt-4 text-codequest-dark font-medium">{isReviewMode ? 'Carregando respostas...' : 'Carregando módulo...'}</p>
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
                  {isReviewMode && submitted && ( // Show score only in review mode after submission
                    <div className="text-right">
                      <p className={`text-xl font-bold ${totalPoints >= module.questions.reduce((sum, q) => sum + q.points, 0) * 0.7 ? 'text-green-600' : 'text-red-600'}`}>
                        {totalPoints} / {module.questions.reduce((sum, q) => sum + q.points, 0)} XP
                      </p>
                      <p className="text-sm text-gray-500">Pontuação</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Module Content */}
            <div className="container mx-auto px-4 py-8">
              <div className="prose max-w-none mb-8">
                {/* Render module content HTML safely */}
                <div dangerouslySetInnerHTML={{ __html: module.content }} />
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {module.questions.map((question, index) => {
                  const isCorrect = submitted && answerResults[question.id]?.is_correct;
                  const userAnswer = submitted ? answerResults[question.id]?.user_answer : answers[question.id];

                  return (
                    <Card key={question.id} className={submitted ? (isCorrect ? 'border-green-500' : 'border-red-500') : ''}>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-codequest-dark flex items-center">
                          Questão {index + 1}
                          {submitted && ( // Show check or cross icon after submission
                            isCorrect ? (
                              <CheckCircleIcon className="ml-2 w-5 h-5 text-green-500" />
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            )
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{question.question_text}</p>

                        {question.question_type === 'multiple_choice' && (
                          <div role="radiogroup" className="space-y-2 block">
                            {question.options && question.options.length > 0 ? (
                              question.options.map(option => {
                                const isChecked = isReviewMode 
                                  ? answerResults[question.id]?.correct_answer === option.option_text 
                                  : answers[question.id] === option.option_text;
                                const isCorrect = submitted && answerResults[question.id]?.is_correct && option.is_correct;
                                const isUserAnswerIncorrect = submitted && !answerResults[question.id]?.is_correct && answerResults[question.id]?.user_answer === option.option_text;

                                return (
                                  <div key={option.id} className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer min-h-[30px] ${isReviewMode ? '' : 'hover:bg-gray-50'}`}>
                                    <input
                                      type="radio"
                                      id={`question-${question.id}-option-${option.id}`}
                                      name={`question-${question.id}`}
                                      value={option.option_text}
                                      checked={isChecked}
                                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                      disabled={isReviewMode}
                                      className="border-gray-300 w-4 h-4 text-codequest-purple focus:ring-codequest-purple"
                                      style={{ display: 'block' }}
                                    />
                                    <label
                                      htmlFor={`question-${question.id}-option-${option.id}`}
                                      className={`flex-1 cursor-pointer text-gray-700 ${
                                        isReviewMode
                                          ? option.is_correct ? 'text-green-600 font-semibold' : ''
                                          : submitted
                                            ? isCorrect
                                              ? 'text-green-600 font-semibold'
                                              : isUserAnswerIncorrect
                                                ? 'text-red-600'
                                                : ''
                                            : ''
                                      }`}
                                      style={{ display: 'block' }}
                                    >
                                      {option.option_text}
                                    </label>
                                  </div>
                                );
                              })
                            ) : (
                              <p className="text-gray-500 italic">Nenhuma opção disponível</p>
                            )}
                          </div>
                        )}

                        {isReviewMode && question.explanation && (
                          <div className="mt-4 p-4 bg-gray-100 rounded-md text-gray-700 text-sm">
                            <h4 className="font-semibold mb-2">Explicação:</h4>
                            <p>{question.explanation}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {!isReviewMode && ( // Only show submit button if not in review mode
                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={handleSubmit}
                    disabled={submitted}
                    className="bg-codequest-purple hover:bg-codequest-purple/90 text-white"
                  >
                    {submitted ? 'Respostas Enviadas' : 'Enviar Respostas'}
                  </Button>
                </div>
              )}

              {isReviewMode && submitted && ( // Show score summary only in review mode after submission
                 <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-codequest-dark mb-4">Resultado</h3>
                  <p className="text-gray-600">
                      Você acertou {Object.values(answerResults).filter(r => r.is_correct).length} de {module.questions.length} questões.
                  </p>
                  <p className="text-gray-600">
                      Pontos obtidos: {totalPoints} de {module.questions.reduce((sum, q) => sum + q.points, 0)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ModulePage;