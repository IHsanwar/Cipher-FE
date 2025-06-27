'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"], // pilih sesuai kebutuhan
  variable: "--font-poppins", // bisa juga langsung pakai className
});


type NavigationProps = {
  isDark: boolean;
  toggleTheme: () => void;
};

const Navigation = ({ isDark, toggleTheme }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg flex items-center justify-center">
                      <Image src="/cipher-logo.png" alt="Cipher Logo" width={80} height={80} />
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
            <Link href="/chat" className="hidden md:block relative px-6 py-2.5 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
              <span className="relative z-10">Coba Gratis</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <button 
              className="md:hidden p-2 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              <Link href="/chat" className="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
                Coba Gratis
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export type SearchSectionProps = {
  isDark: boolean;
};
const SearchSection = ({ isDark }: SearchSectionProps) => {
  const [query, setQuery] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const placeholders = [
    'Bagaimana cara mengambil nomor antrian raport?',
    'Berikan Denah Pekan IT 2025...',
    'Apa saja project Pekan IT Divisi RPL?',
    'Apa fitur unggulan Cipher?',
    'Siapa saja guru-guru yang ada di SMK Plus Pelita Nusantara?',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto relative">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-all duration-500"></div>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholders[currentPlaceholder]}
            className={`w-full px-6 py-5 text-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-500 backdrop-blur-xl border-2 shadow-2xl pr-20 ${
              isDark 
                ? 'bg-slate-800/90 border-slate-700/50 text-white placeholder-gray-400 focus:bg-slate-800/95' 
                : 'bg-white/90 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:bg-white/95'
            }`}
          />
          
          <Link href="/chat" className="absolute right-3 top-3 bottom-3 px-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-xl hover:from-red-600 hover:to-red-800 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 group/btn">
            <Send className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
            <span className="hidden sm:block">Tanya</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Hero Section
const HeroSection = ( ({ isDark }: SearchSectionProps ) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={`relative pt-28 pb-20 px-6 overflow-hidden transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-red-500 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-red-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-red-600 rounded-full animate-ping opacity-50"></div>
        
        <div className={`absolute top-1/4 -left-20 w-40 h-40 rounded-full blur-3xl opacity-20 animate-pulse ${
          isDark ? 'bg-red-500' : 'bg-red-400'
        }`}></div>
        <div className={`absolute bottom-1/4 -right-20 w-60 h-60 rounded-full blur-3xl opacity-15 animate-pulse ${
          isDark ? 'bg-red-600' : 'bg-red-300'
        }`}></div>
      </div>
      
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
          <span> PEKAN IT 2025</span>
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
          <p className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-10 transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            AI Assistant for{' '}
            <span className="relative inline-block">
              <span className="text-red-500">Pekan IT</span>
             
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
          <Link href="/chat" className="group relative px-8 py-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-2xl text-lg font-semibold flex items-center gap-3 justify-center shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              <GraduationCap className="w-6 h-6" />
              Mulai Bertanya
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
});


// Features Section
const FeaturesSection = ({ isDark }: SearchSectionProps) => {
  const features = [
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
            Apa itu{' '}
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
            Asisten AI di Pekan IT Devaccto RPL yang membantu menjawab pertanyaan tentang event, memberikan penjelasan tentang projek yang ditampilkan, dan memberikan panduan mengenai pengambilan nomor antrian raport.
          </p>
        </div>
        
      </div>
    </section>
  );
};

// Footer
const Footer = (({ isDark }: SearchSectionProps ) => {
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
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg flex items-center justify-center">
                            <Image src="/cipher-logo.png" alt="Cipher Logo" width={80} height={80} />
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
          © 2025 Cipher.
        </div>
      </div>
    </footer>
  );
});

// Main Component
const CipherLandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
