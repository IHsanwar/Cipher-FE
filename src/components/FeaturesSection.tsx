'use client';

import React from 'react';
import { Code, BookOpen, Lightbulb } from 'lucide-react';

type FeaturesSectionProps = {
  isDark: boolean;
};

const FeaturesSection = ({ isDark }: FeaturesSectionProps) => {
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
      description: "Solusi kreatif untuk masalah teknis dengan pendekatan yang sistematis and inovatif."
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden transition-all duration-500 bg-transparent">
      {/* Subtle Section Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[40%] left-[20%] w-[30%] h-[30%] rounded-full blur-[70px] transition-all duration-1000 ${
          isDark ? 'bg-orange-900/10' : 'bg-orange-50/30'
        }`} />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group relative p-10 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                isDark 
                  ? 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-900/60 hover:border-red-500/30 shadow-2xl shadow-black/20' 
                  : 'bg-white/80 backdrop-blur-md border-slate-200/50 hover:bg-white shadow-xl hover:shadow-2xl hover:border-red-200/50'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                isDark ? 'bg-slate-700 text-red-400' : 'bg-red-50 text-red-600'
              }`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
