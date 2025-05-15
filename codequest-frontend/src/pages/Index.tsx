
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FeatureCard from '@/components/shared/FeatureCard';
import TestimonialCard from '@/components/shared/TestimonialCard';
import { useAlertToast } from '@/components/ui/alert-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { BookIcon, TrophyIcon, UserRoundIcon, LayoutDashboardIcon, FileCodeIcon, AwardIcon } from 'lucide-react';

const Index = () => {
  const toast = useAlertToast();
  
  // Show welcome toast on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      setTimeout(() => {
        toast.success({
          title: 'Bem-vindo ao CodeQuest!',
          description: 'Comece sua jornada de aprendizado em programação hoje mesmo.'
        });
      }, 1500);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  // Programming languages
  const languages = [
    { name: 'JavaScript', icon: '/javascript.svg' },
    { name: 'Python', icon: '/python.svg' },
    { name: 'HTML & CSS', icon: '/html-css.svg' },
    { name: 'MySQL', icon: '/mysql.svg' },
    { name: 'PHP', icon: '/php.svg' },
    { name: 'Java', icon: '/java.svg' },
  ];

  // Features
  const features = [
    {
      title: 'Aprendizado Gamificado',
      description: 'Ganhe XP, desbloqueie conquistas e suba de nível enquanto aprende programação de forma divertida.',
      icon: <TrophyIcon className="w-6 h-6" />
    },
    {
      title: 'Aulas Interativas',
      description: 'Conteúdo prático com exercícios imersivos e desafios que simulam problemas reais de programação.',
      icon: <BookIcon className="w-6 h-6" />
    },
    {
      title: 'Perfil Personalizado',
      description: 'Acompanhe seu progresso, visualize suas conquistas e veja seu ranking na comunidade.',
      icon: <UserRoundIcon className="w-6 h-6" />
    },
    {
      title: 'Dashboard Intuitivo',
      description: 'Interface clara e objetiva que mostra exatamente onde você parou e o que deve fazer em seguida.',
      icon: <LayoutDashboardIcon className="w-6 h-6" />
    },
    {
      title: 'Projetos Práticos',
      description: 'Crie projetos reais que podem ser adicionados ao seu portfólio profissional.',
      icon: <FileCodeIcon className="w-6 h-6" />
    },
    {
      title: 'Conquistas e Medalhas',
      description: 'Desbloqueie medalhas exclusivas ao dominar conceitos e completar desafios.',
      icon: <AwardIcon className="w-6 h-6" />
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'Estudante de Engenharia',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
      quote: 'O CodeQuest transformou minha forma de aprender programação. A abordagem gamificada me mantém motivado e os desafios são realmente divertidos!'
    },
    {
      name: 'Julia Torres',
      role: 'Designer UX',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      quote: 'Comecei do zero e hoje consigo criar meus próprios sites. A plataforma torna o aprendizado de HTML e CSS muito mais intuitivo.'
    },
    {
      name: 'Pedro Almeida',
      role: 'Desenvolvedor Front-end',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
      quote: 'Os projetos práticos do CodeQuest me ajudaram a construir um portfólio sólido e conseguir meu primeiro emprego como desenvolvedor.'
    }
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-codequest-background to-codequest-light/30">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 mb-10 md:mb-0 md:pr-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Aprenda a programar como em um <span className="gradient-text">jogo</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Transforme seu aprendizado em uma jornada épica. Ganhe XP, desbloqueie conquistas e domine a arte da programação.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/auth?register=true">
                    <Button className="btn-primary text-base px-8 py-3 w-full sm:w-auto">
                      Comece Agora
                    </Button>
                  </Link>
                  <Link to="/cursos">
                    <Button variant="outline" className="btn-outline text-base px-8 py-3 w-full sm:w-auto">
                      Ver Cursos
                    </Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="w-full h-[400px] bg-gradient-to-br from-codequest-purple to-codequest-emerald rounded-lg overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center px-6">
                      <div className="glass-effect w-full max-w-md p-6 text-left">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h3 className="text-lg font-bold text-codequest-dark">Nível 5 Alcançado!</h3>
                            <p className="text-sm text-gray-600">+250 XP</p>
                          </div>
                          <div className="w-12 h-12 bg-codequest-purple rounded-full flex items-center justify-center text-white font-bold text-xl">
                            5
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progresso para o próximo nível</span>
                            <span>250/1000 XP</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-codequest-purple h-2 rounded-full" style={{ width: "25%" }}></div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-codequest-purple/10 rounded-lg border border-codequest-purple/20 mb-4">
                          <h4 className="font-medium mb-2">Conquista Desbloqueada!</h4>
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-codequest-purple to-codequest-emerald rounded-full flex items-center justify-center mr-3">
                              <AwardIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">Mestre do JavaScript</p>
                              <p className="text-xs text-gray-600">Completou todos os módulos básicos</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-codequest-purple text-white hover:bg-opacity-90">
                          Continuar Aprendendo
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-yellow-300 rounded-lg rotate-12 flex items-center justify-center shadow-lg animate-float">
                    <span className="text-2xl font-bold">JS</span>
                  </div>
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-blue-400 rounded-lg -rotate-12 flex items-center justify-center shadow-lg animate-bounce-slight">
                    <span className="text-xl font-bold">&lt;/&gt;</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Domine as linguagens mais demandadas</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Aprenda as linguagens de programação mais populares do mercado e destaque-se profissionalmente.
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {languages.map((lang, index) => (
                  <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                    <motion.div 
                      className="h-32 flex flex-col items-center justify-center bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 m-2 hover:-translate-y-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-16 h-16 mb-2 flex items-center justify-center">
                        <img src={lang.icon} alt={lang.name} className="w-12 h-12" />
                      </div>
                      <p className="font-medium text-codequest-dark">{lang.name}</p>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-codequest-light/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Por que escolher o CodeQuest?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nossa plataforma foi desenvolvida para tornar o aprendizado de programação uma experiência envolvente e motivadora.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  delay={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Uma jornada simples em três passos para transformar você em um programador de sucesso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Escolha seu caminho',
                  description: 'Selecione a linguagem ou tecnologia que deseja aprender e comece sua jornada.'
                },
                {
                  step: '02',
                  title: 'Aprenda com desafios',
                  description: 'Complete módulos interativos, participe de quizzes e resolva problemas reais.'
                },
                {
                  step: '03',
                  title: 'Acompanhe seu progresso',
                  description: 'Visualize suas conquistas, suba de nível e compare seu desempenho com outros usuários.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative pl-12 md:pl-0 md:text-center"
                >
                  <div className="flex md:justify-center mb-4">
                    <div className="absolute left-0 md:relative md:left-auto w-10 h-10 rounded-full bg-codequest-purple text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-codequest-dark mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-5 left-full w-full h-0.5 bg-gray-200">
                      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-3 h-3 bg-codequest-purple rounded-full"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-codequest-light/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">O que dizem nossos alunos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Veja como o CodeQuest está transformando a jornada de aprendizado de programação.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  role={testimonial.role}
                  image={testimonial.image}
                  quote={testimonial.quote}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-codequest-dark text-white">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Pronto para começar sua jornada?</h2>
                <p className="text-gray-300 max-w-2xl">
                  Junte-se a milhares de estudantes que estão aprendendo programação de forma divertida e eficiente. Crie sua conta gratuitamente e comece agora mesmo!
                </p>
              </div>
              <div className="md:w-1/3 text-center md:text-right">
                <Link to="/auth?register=true">
                  <Button className="bg-codequest-emerald hover:bg-opacity-90 text-white px-8 py-3 text-lg">
                    Criar Conta Gratuita
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
