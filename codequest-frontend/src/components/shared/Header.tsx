
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface NavLink {
  name: string;
  path: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Cursos', path: '/cursos' },
  { name: 'Sobre', path: '/sobre' },
];

const authLinks: NavLink[] = [
  { name: 'Login', path: '/auth' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // This would be connected to your auth state in a real app

  // Check if user is on dashboard route to change header style
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (isDashboardRoute) {
    return null; // Don't show main header in dashboard as it will have its own
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-gradient-to-br from-codequest-purple to-codequest-emerald rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">&lt;/&gt;</span>
          </div>
          <span className="font-bold text-xl text-codequest-dark">CodeQuest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`font-medium hover:text-codequest-purple transition-colors ${
                location.pathname === link.path ? 'text-codequest-purple' : 'text-codequest-dark'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth/Profile Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <Link to="/dashboard">
              <Button className="btn-primary">Meu Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" className="border-codequest-purple text-codequest-purple hover:bg-codequest-purple hover:text-white">Entrar</Button>
              </Link>
              <Link to="/auth?register=true">
                <Button className="bg-codequest-purple text-white hover:bg-opacity-90">Cadastrar</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-codequest-dark" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && isMobile && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 flex flex-col space-y-4 md:hidden">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`font-medium hover:text-codequest-purple transition-colors ${
                location.pathname === link.path ? 'text-codequest-purple' : 'text-codequest-dark'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col space-y-2">
            {isLoggedIn ? (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full btn-primary">Meu Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-codequest-purple text-codequest-purple hover:bg-codequest-purple hover:text-white">Entrar</Button>
                </Link>
                <Link to="/auth?register=true" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-codequest-purple text-white hover:bg-opacity-90">Cadastrar</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
