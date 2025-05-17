import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAlertToast } from '@/components/ui/alert-toast';
import { LayoutDashboardIcon, BookIcon, UserRoundIcon, SettingsIcon, LogOutIcon, CameraIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
  const navigate = useNavigate();
  const toast = useAlertToast();
  const { user, loading, logout, isAdmin } = useAuth();

  // Sidebar navigation items
  const navigationItems = [
    { name: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, path: '/adm-dashboard' },
    { name: 'Cursos', icon: <BookIcon className="w-5 h-5" />, path: '/adm/cursos' },
    { name: 'Perfil', icon: <UserRoundIcon className="w-5 h-5" />, path: '/adm/perfil', active: true },
    { name: 'Configurações', icon: <SettingsIcon className="w-5 h-5" />, path: '/adm/configuracoes' },
  ];

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || !isAdmin()) {
    return null; // O ProtectedRoute já vai redirecionar
  }

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
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
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
            {/* Header */}
            <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4 text-codequest-dark hover:text-codequest-purple p-2 rounded-md hover:bg-gray-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21M3 6H21M3 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </SidebarTrigger>
                <h1 className="text-xl font-bold text-codequest-dark">Perfil do Administrador</h1>
              </div>
            </header>

            {/* Profile Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  {/* Avatar Section */}
                  <div className="relative">
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                      alt={user.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-codequest-light"
                    />
                    <button 
                      className="absolute bottom-0 right-0 bg-codequest-purple text-white rounded-full p-2"
                      onClick={() => toast.info({ title: 'Função em desenvolvimento', description: 'Em breve você poderá alterar sua foto de perfil' })}
                    >
                      <CameraIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1">
                    <div className="text-center md:text-left">
                      <h2 className="text-2xl font-bold text-codequest-dark">{user.name}</h2>
                      <p className="text-gray-500">{user.email}</p>
                      <div className="mt-2 inline-flex items-center bg-codequest-purple/10 px-3 py-1 rounded-full">
                        <span className="text-codequest-purple font-medium">Administrador</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600">Nível</h4>
                        <p className="text-2xl font-bold text-codequest-purple">{user.level}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600">XP</h4>
                        <p className="text-2xl font-bold text-codequest-purple">{user.xp}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600">Status</h4>
                        <p className="text-2xl font-bold text-green-500">Ativo</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600">Tipo</h4>
                        <p className="text-2xl font-bold text-codequest-purple">Admin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ProfilePage;
