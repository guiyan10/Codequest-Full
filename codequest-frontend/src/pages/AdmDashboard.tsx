import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { LayoutDashboardIcon, BookIcon, UserRoundIcon, SettingsIcon, LogOutIcon, TrendingUpIcon, AlertCircleIcon, UsersIcon, BookOpenIcon, AwardIcon, StarIcon, TrophyIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';

// Tipos para os dados
interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  activeUsers: number;
  completedCourses: number;
  revenue: number;
  userGrowth: number;
}

interface CourseStats {
  id: string;
  name: string;
  enrollments: number;
  completionRate: number;
  rating: number;
  revenue: number;
}

interface UserActivity {
  period: string;
  newUsers: number;
  activeUsers: number;
}

interface PerformanceMetric {
  metric: string;
  value: string;
  trend: 'up' | 'down';
  change: string;
}

interface ActivityItem {
  type: 'user_joined' | 'course_completed' | 'new_rating' | 'achievement' | 'course_started';
  user: string;
  course?: string;
  rating?: number;
  achievement?: string;
  time: string;
}

const AdmDashboard = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  
  // Estados para armazenar os dados
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1250,
    totalCourses: 24,
    activeUsers: 876,
    completedCourses: 2150,
    revenue: 45750,
    userGrowth: 23
  });

  const [topCourses, setTopCourses] = useState<CourseStats[]>([
    {
      id: '1',
      name: 'JavaScript Avançado',
      enrollments: 450,
      completionRate: 78,
      rating: 4.8,
      revenue: 12500
    },
    {
      id: '2',
      name: 'Python para Iniciantes',
      enrollments: 380,
      completionRate: 85,
      rating: 4.9,
      revenue: 10200
    },
    {
      id: '3',
      name: 'React & Next.js',
      enrollments: 320,
      completionRate: 72,
      rating: 4.7,
      revenue: 9800
    },
    {
      id: '4',
      name: 'Banco de Dados SQL',
      enrollments: 290,
      completionRate: 80,
      rating: 4.6,
      revenue: 8500
    },
    {
      id: '5',
      name: 'HTML & CSS Masterclass',
      enrollments: 275,
      completionRate: 90,
      rating: 4.8,
      revenue: 7200
    }
  ]);

  const [userActivity, setUserActivity] = useState<UserActivity[]>([
    { period: 'Jan', newUsers: 120, activeUsers: 450 },
    { period: 'Fev', newUsers: 150, activeUsers: 520 },
    { period: 'Mar', newUsers: 180, activeUsers: 580 },
    { period: 'Abr', newUsers: 220, activeUsers: 650 },
    { period: 'Mai', newUsers: 250, activeUsers: 720 },
    { period: 'Jun', newUsers: 280, activeUsers: 800 }
  ]);

  // Dados para o gráfico de distribuição de cursos
  const courseDistribution = [
    { name: 'Frontend', value: 35 },
    { name: 'Backend', value: 30 },
    { name: 'Mobile', value: 20 },
    { name: 'DevOps', value: 15 }
  ];

  const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444'];

  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Dados adicionais para o dashboard
  const recentActivities: ActivityItem[] = [
    { type: 'user_joined', user: 'Maria Silva', time: '5 minutos atrás' },
    { type: 'course_completed', user: 'João Santos', course: 'JavaScript Avançado', time: '15 minutos atrás' },
    { type: 'new_rating', user: 'Ana Oliveira', course: 'Python para Iniciantes', rating: 5, time: '30 minutos atrás' },
    { type: 'achievement', user: 'Carlos Lima', achievement: 'Bug Hunter', time: '1 hora atrás' },
    { type: 'course_started', user: 'Pedro Costa', course: 'React & Next.js', time: '2 horas atrás' },
  ];

  const performanceMetrics: PerformanceMetric[] = [
    { metric: 'Média de Conclusão', value: '82%', trend: 'up', change: '3.2%' },
    { metric: 'Satisfação Geral', value: '4.8/5.0', trend: 'up', change: '0.3' },
    { metric: 'Taxa de Engajamento', value: '76%', trend: 'down', change: '1.5%' },
    { metric: 'Tempo Médio de Estudo', value: '45min', trend: 'up', change: '5min' },
  ];

  // Efeito para carregar dados da API (simulado por enquanto)
  useEffect(() => {
    // Aqui você faria as chamadas para sua API
    // const fetchData = async () => {
    //   const response = await fetch('/api/admin/dashboard');
    //   const data = await response.json();
    //   setStats(data.stats);
    //   setTopCourses(data.topCourses);
    //   setUserActivity(data.userActivity);
    // };
    // fetchData();
  }, []);

  // Sidebar navigation items
  const navigationItems = [
    { name: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Cursos', icon: <BookIcon className="w-5 h-5" />, path: '/cursos' },
    { name: 'Perfil', icon: <UserRoundIcon className="w-5 h-5" />, path: '/perfil' },
    { name: 'Configurações', icon: <SettingsIcon className="w-5 h-5" />, path: '/configuracoes' },
    { name: 'Adm-Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, path: '/adm-dashboard', active: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  const renderTrendIcon = (trend: 'up' | 'down') => {
    if (trend === 'up') {
      return <TrendingUpIcon className="w-4 h-4 text-green-500" />;
    }
    return <AlertCircleIcon className="w-4 h-4 text-red-500" />;
  };

  const renderActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'user_joined':
        return <UsersIcon className="w-5 h-5 text-blue-500" />;
      case 'course_completed':
        return <AwardIcon className="w-5 h-5 text-green-500" />;
      case 'new_rating':
        return <StarIcon className="w-5 h-5 text-yellow-500" />;
      case 'achievement':
        return <TrophyIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <BookOpenIcon className="w-5 h-5 text-indigo-500" />;
    }
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
                    src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)}
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
            <header className="bg-white p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <SidebarTrigger className="mr-4 text-codequest-dark hover:text-codequest-purple p-2 rounded-md hover:bg-gray-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 12H21M3 6H21M3 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </SidebarTrigger>
                  <div>
                    <h1 className="text-xl font-bold text-codequest-dark">Dashboard Administrativo</h1>
                    <p className="text-sm text-gray-500">Bem-vindo de volta, {user.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Últimas 24 horas</SelectItem>
                      <SelectItem value="7d">Últimos 7 dias</SelectItem>
                      <SelectItem value="30d">Últimos 30 dias</SelectItem>
                      <SelectItem value="90d">Últimos 90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Última atualização: {new Date().toLocaleString()}
                  </div>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-auto p-6">
              {/* Cards de Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-indigo-100">Total de Usuários</p>
                          <h3 className="text-3xl font-bold mt-2">{stats.totalUsers}</h3>
                          <div className="flex items-center mt-2 text-indigo-100">
                            <TrendingUpIcon className="w-4 h-4 mr-1" />
                            <span>+{stats.userGrowth}% este mês</span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                          <UsersIcon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Total de Cursos</p>
                          <h3 className="text-3xl font-bold mt-2">{stats.totalCourses}</h3>
                          <p className="mt-2 text-green-100">Ativos na plataforma</p>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                          <BookOpenIcon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Usuários Ativos</p>
                          <h3 className="text-3xl font-bold mt-2">{stats.activeUsers}</h3>
                          <p className="mt-2 text-orange-100">Últimos 30 dias</p>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                          <TrendingUpIcon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Cursos Completados</p>
                          <h3 className="text-3xl font-bold mt-2">{stats.completedCourses}</h3>
                          <p className="mt-2 text-purple-100">Total acumulado</p>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                          <AwardIcon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">{metric.metric}</p>
                        {renderTrendIcon(metric.trend)}
                      </div>
                      <div className="flex items-baseline">
                        <h4 className="text-2xl font-bold text-gray-900">{metric.value}</h4>
                        <span className={`ml-2 text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {metric.trend === 'up' ? '+' : '-'}{metric.change}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Gráfico de Pizza com Design Melhorado */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Distribuição de Cursos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={courseDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {courseDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Gráfico de Barras com Design Melhorado */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Atividade de Usuários
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userActivity}>
                          <XAxis dataKey="period" />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              border: 'none',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                          <Legend />
                          <Bar dataKey="newUsers" name="Novos Usuários" fill="#6366f1" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="activeUsers" name="Usuários Ativos" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tabela de Cursos Mais Acessados */}
                <Card className="lg:col-span-2 bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Cursos Mais Acessados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Curso</TableHead>
                            <TableHead className="text-right">Inscrições</TableHead>
                            <TableHead className="text-right">Taxa de Conclusão</TableHead>
                            <TableHead className="text-right">Avaliação</TableHead>
                            <TableHead className="text-right">Receita</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topCourses.map((course) => (
                            <TableRow key={course.id}>
                              <TableCell className="font-medium">{course.name}</TableCell>
                              <TableCell className="text-right">{course.enrollments}</TableCell>
                              <TableCell className="text-right">
                                <Badge variant={course.completionRate >= 80 ? "default" : "secondary"}>
                                  {course.completionRate}%
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end">
                                  <span className="text-yellow-500 mr-1">★</span>
                                  {course.rating}
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                R$ {course.revenue.toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Atividades Recentes */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Atividades Recentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            {renderActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.user}
                              {activity.course && <span className="text-gray-500"> em {activity.course}</span>}
                            </p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdmDashboard; 