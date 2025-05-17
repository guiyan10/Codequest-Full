import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAlertToast } from '@/components/ui/alert-toast';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { authAPI } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useAlertToast();
  const { login } = useAuth();
  
  // Get register param from URL
  const queryParams = new URLSearchParams(location.search);
  const showRegisterInitially = queryParams.get('register') === 'true';

  const [isLogin, setIsLogin] = useState(!showRegisterInitially);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Update URL when tab changes without page reload
    const newUrl = isLogin 
      ? '/auth' 
      : '/auth?register=true';
    
    window.history.replaceState(null, '', newUrl);
  }, [isLogin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear the error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (isLogin) {
      if (!formData.email) newErrors.email = 'O e-mail é obrigatório';
      if (!formData.password) newErrors.password = 'A senha é obrigatória';
    } else {
      if (!formData.name) newErrors.name = 'O nome é obrigatório';
      if (!formData.email) newErrors.email = 'O e-mail é obrigatório';
      if (!formData.password) newErrors.password = 'A senha é obrigatória';
      if (formData.password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = 'As senhas não coincidem';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        const response = await login(formData.email, formData.password);
        
        toast.success({ 
          title: 'Login realizado com sucesso!',
          description: 'Redirecionando...'
        });

        // Redireciona baseado no nível do usuário
        if (response.data.user.nivel === 'admin') {
          setTimeout(() => navigate('/adm-dashboard'), 1000);
        } else {
          setTimeout(() => navigate('/dashboard'), 1000);
        }
      } else {
        const response = await authAPI.register(
          formData.name, 
          formData.email, 
          formData.password
        );
        
        toast.success({ 
          title: 'Conta criada com sucesso!',
          description: 'Por favor, faça login para continuar.'
        });
        setIsLogin(true);
        setFormData({
          ...formData,
          password: '',
          password_confirmation: ''
        });
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error({ 
          title: 'Erro na autenticação',
          description: error.response.data.message
        });
      } else {
        toast.error({ 
          title: 'Erro na autenticação',
          description: 'Verifique suas credenciais e tente novamente.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-codequest-background to-codequest-light/30 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-gradient-to-br from-codequest-purple to-codequest-emerald rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">&lt;/&gt;</span>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-codequest-dark mb-2">
                {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
              </h1>
              <p className="text-gray-500">
                {isLogin 
                  ? 'Faça login para acessar sua jornada' 
                  : 'Comece sua jornada de aprendizado'
                }
              </p>
            </div>
            
            {/* Auth Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`w-1/2 py-3 text-center font-medium text-sm transition-colors ${
                  isLogin 
                    ? 'text-codequest-purple border-b-2 border-codequest-purple' 
                    : 'text-gray-500 hover:text-codequest-purple'
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`w-1/2 py-3 text-center font-medium text-sm transition-colors ${
                  !isLogin 
                    ? 'text-codequest-purple border-b-2 border-codequest-purple' 
                    : 'text-gray-500 hover:text-codequest-purple'
                }`}
                onClick={() => setIsLogin(false)}
              >
                Cadastro
              </button>
            </div>
            
            {/* Auth Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? 'login' : 'register'}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder={isLogin ? "Sua senha" : "Crie uma senha"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full ${errors.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar Senha
                    </label>
                    <Input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      placeholder="Confirme sua senha"
                      value={formData.password_confirmation}
                      onChange={handleInputChange}
                      className={`w-full ${errors.password_confirmation ? 'border-red-500' : ''}`}
                    />
                    {errors.password_confirmation && (
                      <p className="mt-1 text-sm text-red-500">{errors.password_confirmation}</p>
                    )}
                  </div>
                )}

                {isLogin && (
                  <div className="flex justify-end">
                    <a href="#" className="text-sm text-codequest-purple hover:underline">
                      Esqueceu a senha?
                    </a>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-codequest-purple hover:bg-opacity-90 text-white py-2 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </span>
                  ) : (
                    isLogin ? 'Entrar' : 'Criar Conta'
                  )}
                </Button>
              </motion.form>
            </AnimatePresence>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin 
                  ? 'Não tem uma conta?' 
                  : 'Já tem uma conta?'
                }
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="ml-1 text-codequest-purple hover:underline font-medium"
                >
                  {isLogin ? 'Cadastre-se' : 'Faça login'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default AuthPage;
