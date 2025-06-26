'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sun, 
  Moon, 
  Code, 
  BookOpen, 
  Lightbulb, 
  GraduationCap, 
  Send,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
// Types
interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

interface SearchSectionProps {
  isDark: boolean;
}

interface HeroSectionProps {
  isDark: boolean;
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

interface FeaturesSectionProps {
  isDark: boolean;
}

interface FooterProps {
  isDark: boolean;
}

// Navigation Component
const Navigation: React.FC<NavigationProps> = ({ isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const menuItems = ['Fitur', 'Demo', 'Tutorial', 'Kontak'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? isDark
          ? 'bg-slate-900/85 backdrop-blur-xl shadow-xl border-b border-slate-800/50' 
          : 'bg-white/85 backdrop-blur-xl shadow-xl border-b border-gray-100/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Cipher
              </span>
              <span className="text-xs text-red-500 font-medium -mt-1">
                Pekan IT 2025
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`relative transition-all duration-300 font-medium group ${
                  isDark 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className={`relative p-3 rounded-xl transition-all duration-300 group ${
                isDark 
                  ? 'bg-slate-800/50 text-yellow-400 hover:bg-slate-700/50 hover:text-yellow-300' 
                  : 'bg-gray-100/50 text-slate-600 hover:bg-gray-200/50 hover:text-slate-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" />
              )}
            </button>
            <button className="hidden md:block relative px-6 py-2.5 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
              <span className="relative z-10">Coba Gratis</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button 
              className="md:hidden p-2 rounded-lg transition-all duration-300"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-6 border-t transition-all duration-300 ${
            isDark ? 'border-slate-700/50 bg-slate-900/50' : 'border-gray-200/50 bg-white/50'
          } backdrop-blur-xl rounded-b-2xl`}>
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className={`transition-all duration-300 font-medium py-2 px-4 rounded-lg ${
                    isDark 
                      ? 'text-gray-300 hover:text-white hover:bg-slate-800/50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                >
                  {item}
                </a>
              ))}
              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Coba Gratis
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Animated Background
const AnimatedBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-red-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-red-500 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-red-300 rounded-full animate-pulse opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-1 h-1 bg-red-600 rounded-full animate-ping opacity-50"></div>
      
      {/* Gradient orbs */}
      <div className={`absolute top-1/4 -left-20 w-40 h-40 rounded-full blur-3xl opacity-20 animate-pulse ${
        isDark ? 'bg-red-500' : 'bg-red-400'
      }`}></div>
      <div className={`absolute bottom-1/4 -right-20 w-60 h-60 rounded-full blur-3xl opacity-15 animate-pulse ${
        isDark ? 'bg-red-600' : 'bg-red-300'
      }`}></div>
    </div>
  );
};

// Search Component
const SearchSection: React.FC<SearchSectionProps> = ({ isDark }) => {
  const [query, setQuery] = useState<string>('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const placeholders = [
    'Jelaskan konsep OOP dalam Java...',
    'Cara membuat responsive design?',
    'Apa itu database normalization?',
    'Bagaimana algoritma sorting bekerja?',
    'Explain REST API untuk pemula...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(e.target.value.length > 0);
  }, []);

  const handleSubmit = useCallback(() => {
    console.log('Search query:', query);
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto relative">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-all duration-500"></div>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder={placeholders[currentPlaceholder]}
            className={`w-full px-6 py-5 text-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-500 backdrop-blur-xl border-2 shadow-2xl ${
              isDark 
                ? 'bg-slate-800/90 border-slate-700/50 text-white placeholder-gray-400 focus:bg-slate-800/95' 
                : 'bg-white/90 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:bg-white/95'
            } ${isTyping ? 'pr-20' : 'pr-32'}`}
          />
          
          <Link href="/chat">
          <button 
            className="absolute right-3 top-3 bottom-3 px-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-xl hover:from-red-600 hover:to-red-800 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 group/btn"
          >
            <Send className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
            <span className="hidden sm:block">Tanya</span>
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

// Hero Section
const HeroSection: React.FC<HeroSectionProps> = ({ isDark }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={`relative pt-28 pb-20 px-6 overflow-hidden transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      <AnimatedBackground isDark={isDark} />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 text-sm font-medium backdrop-blur-xl shadow-lg transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        } ${
          isDark 
            ? 'bg-slate-800/50 text-red-400 border border-red-500/20' 
            : 'bg-white/80 text-red-600 border border-red-200/50'
        }`}>
          <div className="relative">
            <Sparkles className="w-4 h-4" />
            <div className="absolute inset-0 animate-ping">
              <Sparkles className="w-4 h-4 opacity-75" />
            </div>
          </div>
          <span>🎓 PEKAN IT 2025</span>
        </div>

        {/* Title */}
        <div className={`transition-all duration-1000 delay-200 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-6 transition-colors ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent animate-pulse">
                Cipher
              </span>
            </span>
          </h1>
          <p className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-4 transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            AI Assistant Khusus{' '}
            <span className="relative inline-block">
              <span className="text-red-500">Pekan IT</span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-600"></div>
            </span>
          </p>
        </div>

        {/* Search */}
        <div className={`mb-16 transition-all duration-1000 delay-400 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <SearchSection isDark={isDark} />
        </div>

        {/* Description */}
        <div className={`transition-all duration-1000 delay-600 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className={`text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed transition-colors ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Mau tahu apa aja yang seru di Pekan IT SMK Plus Pelita Nusantara?
          <br className="hidden md:block" />
          Tanya aja ke <span className="relative inline-block text-red-500 font-semibold">Cipher Assistant AI</span> — asisten digital yang siap bantu kamu cari info acara, lokasi, dan semua yang kamu butuhkan. Praktis dan cepat!
        </p>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/chat">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-2xl text-lg font-semibold flex items-center gap-3 justify-center shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              <GraduationCap className="w-6 h-6" />
              Mulai Bertanya
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature Card
const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, isDark }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div 
      className={`group relative p-8 rounded-2xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-xl overflow-hidden ${
        isDark 
          ? 'bg-slate-800/60 border-slate-700/30 hover:bg-slate-800/80 hover:border-slate-600/50' 
          : 'bg-white/80 border-gray-200/30 hover:bg-white/90 hover:border-gray-300/50'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-red-600/5 to-red-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
          isHovered 
            ? 'bg-gradient-to-br from-red-500 to-red-600 text-white transform scale-110' 
            : isDark 
              ? 'bg-red-500/20 text-red-400' 
              : 'bg-red-50 text-red-500'
        }`}>
          {icon}
        </div>
        
        <h3 className={`text-xl font-bold mb-4 transition-colors ${
          isDark ? 'text-white group-hover:text-red-300' : 'text-gray-900 group-hover:text-red-600'
        }`}>
          {title}
        </h3>
        
        <p className={`leading-relaxed transition-colors ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
};

// Features Section
const FeaturesSection: React.FC<FeaturesSectionProps> = ({ isDark }) => {
  const features: Omit<FeatureProps, 'isDark'>[] = [
    {
      icon: <Code className="w-7 h-7" />,
      title: "Code Assistant",
      description: "Bantuan debug dan penjelasan kode yang mudah dipahami untuk semua level programming dengan AI yang cerdas."
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "Tugas Sekolah",
      description: "Panduan mengerjakan tugas IT dengan penjelasan step-by-step yang jelas dan mudah diikuti siswa."
    },
    {
      icon: <Lightbulb className="w-7 h-7" />,
      title: "Problem Solving",
      description: "Solusi kreatif untuk masalah teknis dengan pendekatan yang sistematis dan inovatif."
    },
  ];

  return (
    <section className={`py-20 px-6 relative overflow-hidden transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50'
    }`}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-10 ${
          isDark ? 'bg-red-500' : 'bg-red-400'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl opacity-10 ${
          isDark ? 'bg-red-600' : 'bg-red-300'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-black mb-6 transition-colors ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Kenapa Pilih{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                Cipher
              </span>
              <div className="absolute -top-1 -right-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </span>
            ?
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Dibangun khusus untuk siswa Indonesia, Cipher Assistant AI memahami kebutuhan pelajar dan siap membantu kamu menelusuri semua informasi di Pekan IT SMK Plus Pelita Nusantara.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={`feature-${index}`} {...feature} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer: React.FC<FooterProps> = ({ isDark }) => {
  const footerLinks = [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Support', href: '#' }
  ];

  return (
    <footer className={`py-16 px-6 border-t transition-all duration-500 ${
      isDark 
        ? 'bg-slate-900 border-slate-800/50' 
        : 'bg-white border-gray-200/50'
    }`}>
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col items-start">
            <span className={`text-2xl font-bold transition-colors ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Cipher
            </span>
            <span className="text-sm text-red-500 font-medium -mt-1">
              Pekan IT 2025
            </span>
          </div>
        </div>
        
        <p className={`mb-8 text-lg transition-colors ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          AI Assistant Khusus Pekan IT SMK Plus Pelita Nusantara
        </p>
        
        <div className={`flex justify-center space-x-8 text-sm mb-8 transition-colors ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {footerLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="hover:text-red-500 transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <div className={`text-sm transition-colors ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          © 2025 Cipher. Made with ❤️ for Participant Pekan IT.
        </div>
      </div>
    </footer>
  );
};

// Main Component
const CipherLandingPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900'
    }`}>
      <Navigation isDark={isDarkMode} toggleTheme={toggleTheme} />
      <HeroSection isDark={isDarkMode} />
      <FeaturesSection isDark={isDarkMode} />
      <Footer isDark={isDarkMode} />
    </div>
  );
};

export default CipherLandingPage;