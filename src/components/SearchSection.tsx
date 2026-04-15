'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';

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
  }, [placeholders.length]);

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
          
          <Link 
            href={`/chat?q=${encodeURIComponent(query || placeholders[currentPlaceholder])}`} 
            className="absolute right-3 top-3 bottom-3 px-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-xl hover:from-red-600 hover:to-red-800 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 group/btn"
          >
            <Send className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
            <span className="hidden sm:block">Tanya</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
