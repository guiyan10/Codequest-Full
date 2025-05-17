import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./middleware/AuthMiddleware";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import AdmDashboard from "./pages/adm/AdmDashboard";
import AdmCoursesPage from "./pages/adm/CoursesPage";
import AdmProfilePage from "./pages/adm/ProfilePage";
import AdmConfigPage from "./pages/adm/ConfigPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cursos" 
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cursos/:courseId" 
            element={
              <ProtectedRoute>
                <CourseDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Rotas Administrativas */}
          <Route 
            path="/adm-dashboard" 
            element={
              <ProtectedRoute requireAdmin>
                <AdmDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adm/cursos" 
            element={
              <ProtectedRoute requireAdmin>
                <AdmCoursesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adm/perfil" 
            element={
              <ProtectedRoute requireAdmin>
                <AdmProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adm/configuracoes" 
            element={
              <ProtectedRoute requireAdmin>
                <AdmConfigPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
