import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ProtectedRoute } from '@/middleware/AuthMiddleware';
import Index from './pages/Index';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import ConfigPage from './pages/ConfigPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ModulePage from './pages/ModulePage';
import AdmDashboard from './pages/adm/AdmDashboard';
import AdmCoursesPage from './pages/adm/CoursesPage';
import AdmProfilePage from './pages/adm/ProfilePage';
import AdmConfigPage from './pages/adm/ConfigPage';
import ModulesPage from './pages/adm/ModulesPage';
import ModuleQuestionsPage from './pages/adm/ModuleQuestionsPage';
import Sobre from "./pages/Sobre";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Rotas para usuários normais */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/cursos" element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            } />
            <Route path="/cursos/:id" element={
              <ProtectedRoute>
                <CourseDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/cursos/:courseId/modulo/:moduleId" element={
              <ProtectedRoute>
                <ModulePage />
              </ProtectedRoute>
            } />
            <Route path="/perfil" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/configuracoes" element={
              <ProtectedRoute>
                <ConfigPage />
              </ProtectedRoute>
            } />

            {/* Rotas para administradores */}
            <Route path="/adm-dashboard" element={
              <ProtectedRoute requireAdmin>
                <AdmDashboard />
              </ProtectedRoute>
            } />
            <Route path="/adm/cursos" element={
              <ProtectedRoute requireAdmin>
                <AdmCoursesPage />
              </ProtectedRoute>
            } />
            <Route path="/adm/perfil" element={
              <ProtectedRoute requireAdmin>
                <AdmProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/adm/configuracoes" element={
              <ProtectedRoute requireAdmin>
                <AdmConfigPage />
              </ProtectedRoute>
            } />
            <Route path="/adm/modulos" element={
              <ProtectedRoute requireAdmin>
                <ModulesPage />
              </ProtectedRoute>
            } />
            <Route path="/adm/modulos/:id/questoes" element={
              <ProtectedRoute requireAdmin>
                <ModuleQuestionsPage />
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster position="top-right" />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
