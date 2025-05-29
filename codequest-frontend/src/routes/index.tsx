import ModulesPage from '@/pages/adm/ModulesPage';
import ModuleQuestionsPage from '@/pages/adm/ModuleQuestionsPage';

{
  path: '/adm/modulos',
  element: <ModulesPage />
},
{
  path: '/adm/modulos/:id',
  element: <ModuleQuestionsPage />
}, 