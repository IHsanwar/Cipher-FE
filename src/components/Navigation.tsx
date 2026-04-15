'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

type NavigationProps = {
  isDark?: boolean;
  toggleTheme?: () => void;
  forceShowBackground?: boolean;
};

const Navigation = ({ forceShowBackground = false }: NavigationProps) => {
  const { isDarkMode: isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const menuItems = [
    { name: 'Fitur', href: '/fitur' },
    { name: 'Demo', href: '/demo' },
    { name: 'Tutorial', href: '/tutorial' },
    { name: 'Kontak', href: '/kontak' },
  ];

  const pathname = usePathname();
  const showBg = isScrolled || forceShowBackground;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      showBg 
        ? isDark
          ? 'bg-slate-900/85 backdrop-blur-xl shadow-xl border-b border-slate-800/50' 
          : 'bg-white/85 backdrop-blur-xl shadow-xl border-b border-gray-100/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group/logo cursor-pointer relative z-10">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 group-hover/logo:scale-105 group-hover/logo:rotate-3">
                <Image src="/cipher-logo.png" alt="Cipher Logo" width={80} height={80} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse group-hover/logo:animate-ping"></div>
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-xl font-bold leading-tight transition-colors ${
                isDark ? 'text-white group-hover/logo:text-red-400' : 'text-gray-900 group-hover/logo:text-red-600'
              }`}>
                Cipher
              </span>
              <span className="text-[10px] text-red-500 font-black uppercase tracking-widest -mt-0.5">
                Pekan IT 2025
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative transition-all duration-300 font-bold text-sm tracking-wide group ${
                    isActive
                      ? 'text-red-600'
                      : isDark 
                        ? 'text-slate-400 hover:text-white' 
                        : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              );
            })}
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
            <div className="flex flex-col space-y-2 px-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={`transition-all duration-300 font-bold py-3 px-4 rounded-xl flex items-center justify-between ${
                      isActive
                        ? 'text-red-600 bg-red-500/5'
                        : isDark 
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
                  </Link>
                );
              })}
              <Link href="/chat" className="mt-4 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-black shadow-lg hover:shadow-xl transition-all duration-300 text-center uppercase tracking-widest text-xs">
                Coba Gratis
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
