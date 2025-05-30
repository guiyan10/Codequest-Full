import ModulesPage from '@/pages/adm/ModulesPage';
import ModuleQuestionsPage from '@/pages/adm/ModuleQuestionsPage';
import About from '@/pages/Sobre';

export const routes = [
  {
    path: '/adm/modulos',
    element: <ModulesPage />
  },
  {
    path: '/adm/modulos/:id',
    element: <ModuleQuestionsPage />
  },
  {
    path: '/sobre',
    element: <About />
  }
]; 