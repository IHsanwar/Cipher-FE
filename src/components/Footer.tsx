'use client';

import React from 'react';
import Image from 'next/image';

type FooterProps = {
  isDark: boolean;
};

const Footer = ({ isDark }: FooterProps) => {
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
};

export default Footer;
