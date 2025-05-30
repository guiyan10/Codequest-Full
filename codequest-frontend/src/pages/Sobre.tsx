import React from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Sobre o CodeQuest
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transformando o aprendizado de programação em uma jornada interativa e envolvente
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa Missão
              </h2>
              <p className="text-gray-600 leading-relaxed">
                No CodeQuest, nossa missão é democratizar o acesso ao conhecimento de programação,
                tornando o aprendizado mais acessível, interativo e eficiente. Acreditamos que
                todos devem ter a oportunidade de desenvolver habilidades tecnológicas que são
                essenciais no mundo atual.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="mr-2">✨</span>
                  Inovação constante
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🎯</span>
                  Excelência no ensino
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🤝</span>
                  Comunidade colaborativa
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🚀</span>
                  Crescimento contínuo
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            O que nos torna únicos
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Nossa Equipe
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Comece sua jornada de aprendizado hoje
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de estudantes que já estão transformando suas carreiras com o CodeQuest
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Começar Agora
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const features = [
  {
    icon: "📚",
    title: "Conteúdo Abrangente",
    description: "Cursos completos e atualizados sobre as principais tecnologias do mercado."
  },
  {
    icon: "🎮",
    title: "Aprendizado Interativo",
    description: "Exercícios práticos e projetos reais para consolidar seu conhecimento."
  },
  {
    icon: "🏆",
    title: "Certificações",
    description: "Certificados reconhecidos para validar suas habilidades e conhecimentos."
  }
];

const team = [
  {
    name: "João Silva",
    role: "CEO & Fundador",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Maria Santos",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Pedro Oliveira",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Ana Costa",
    role: "Head of Education",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

export default About; 
