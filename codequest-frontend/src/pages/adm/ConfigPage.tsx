import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ConfigPage = () => {
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || !isAdmin()) {
    return null; // O ProtectedRoute já vai redirecionar
  }

  return (
    <div className="min-h-screen bg-codequest-background p-8">
      <h1 className="text-2xl font-bold text-codequest-dark mb-6">Configurações do Sistema</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">Página em construção...</p>
      </div>
    </div>
  );
};

export default ConfigPage;
