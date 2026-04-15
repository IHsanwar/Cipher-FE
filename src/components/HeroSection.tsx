'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Sparkles } from 'lucide-react';
import SearchSection from './SearchSection';

type HeroSectionProps = {
  isDark: boolean;
};

const HeroSection = ({ isDark }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-28 pb-20 px-6 overflow-hidden transition-all duration-500 bg-transparent">
      {/* Subtle Internal Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <div className={`mb-10 transition-all duration-1000 delay-400 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <SearchSection isDark={isDark} />
        </div>

        {/* Suggested Prompts (Shortcuts) */}
        <div className={`mb-16 flex flex-wrap justify-center gap-3 transition-all duration-1000 delay-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {[
            'Ambil antrian raport?',
            'Proyek Pekan IT 2025?',
            'Siapa perancang Cipher?',
            'Lokasi stan & denah?',
          ].map((prompt, i) => (
            <Link 
              key={i}
              href={`/chat?q=${encodeURIComponent(prompt)}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105 active:scale-95 ${
                isDark 
                  ? 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:text-red-400 hover:border-red-500/50 hover:bg-slate-800' 
                  : 'bg-white/60 border-gray-200/50 text-gray-600 hover:text-red-600 hover:border-red-500/50 shadow-sm hover:shadow-md'
              } backdrop-blur-md`}
            >
              {prompt}
            </Link>
          ))}
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
};

export default HeroSection;
