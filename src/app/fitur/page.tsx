'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  Zap, MessageSquare, ClipboardCheck, Map, 
  Shield, Cpu, RefreshCw, Smartphone, 
  Code2, Globe, Sparkles, Layout, Database
} from 'lucide-react';

const FeaturesPage = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Intelligent Assistant",
      tag: "CORE AI",
      description: "Percakapan natural dengan AI yang dilatih khusus dengan konteks Pekan IT 2025 untuk jawaban akurat.",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Queue & Location",
      tag: "NAVIGATION",
      description: "Ambil nomor antrian raport secara digital dan temukan lokasi stan dengan panduan denah interaktif.",
      gradient: "from-red-600 to-orange-500"
    },
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Smart Survey",
      tag: "FEEDBACK",
      description: "Beri masukan Anda langsung melalui chat. AI akan mengonversi percakapan Anda menjadi data survei.",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Ultra Fast SSE",
      tag: "SPEED",
      description: "Respons instan tanpa loading lama menggunakan teknologi Server-Sent Events untuk pengalaman mulus.",
      gradient: "from-yellow-500 to-orange-400"
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Premium Interface",
      tag: "UX/UI",
      description: "Desain glassmorphism yang terinspirasi dari estetika futuristik Apple dengan transisi yang halus.",
      gradient: "from-purple-500 to-indigo-400"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Safe Processing",
      tag: "SECURITY",
      description: "Keamanan data tingkat tinggi untuk setiap pesan yang Anda kirimkan melalui infrastruktur terenkripsi.",
      gradient: "from-teal-500 to-emerald-400"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 selection:bg-red-500/30 ${
      isDarkMode 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="relative z-[100]">
        <Navigation forceShowBackground />
      </div>
      
      {/* Background Ambient Orbs - Optimized blur for rendering speed */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[80px] transition-all duration-1000 ${
          isDarkMode ? 'bg-red-900/20' : 'bg-red-100/50'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[90px] transition-all duration-1000 ${
          isDarkMode ? 'bg-blue-900/10' : 'bg-blue-50/40'
        }`} />
        <div className={`absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full blur-[70px] transition-all duration-1000 ${
          isDarkMode ? 'bg-orange-900/10' : 'bg-orange-50/30'
        }`} />
      </div>

      <main className="relative z-10 pt-28 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Hero Header */}
          <div className={`max-w-4xl mx-auto text-center mb-24 space-y-8 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-bold tracking-wider border border-red-500/20">
              <Sparkles size={16} /> CIPHER CAPABILITIES
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
              Satu Aplikasi.<br />
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-orange-600 bg-clip-text text-transparent">
                Tanpa Batas.
              </span>
            </h1>
            <p className={`text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Eksplorasi ekosistem Cipher yang memadukan kecerdasan buatan dengan kemudahan akses informasi event secara real-time.
            </p>
          </div>

          {/* Features Premium Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40 transition-all duration-1000 delay-300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative p-10 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                  isDarkMode 
                    ? 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-900/60 hover:border-red-500/30 shadow-2xl shadow-black/20' 
                    : 'bg-white/80 backdrop-blur-md border-slate-200/50 hover:bg-white shadow-xl hover:shadow-2xl hover:border-red-200/50'
                }`}
              >
                {/* Decorative Gradient Blob */}
                <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-br ${feature.gradient}`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                    isDarkMode ? 'bg-slate-800 text-red-400' : 'bg-red-50 text-red-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="text-xs font-black tracking-widest text-red-500 mb-2 opacity-60">
                    {feature.tag}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className={`text-lg leading-relaxed font-medium ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Tech Showcase */}
          <div className={`p-16 rounded-[4rem] text-center relative overflow-hidden transition-all duration-1000 delay-500 border transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          } ${
            isDarkMode 
              ? 'bg-slate-900/40 border-slate-800/50' 
              : 'bg-white/60 backdrop-blur-xl border-white shadow-2xl'
          }`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
            <h2 className="text-3xl font-black mb-16 tracking-tight">Modern Stack Architecture</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-center">
              {[
                { icon: Code2, name: "Next.js 15" },
                { icon: Cpu, name: "GPT-4o API" },
                { icon: RefreshCw, name: "Flask SSE" },
                { icon: Globe, name: "Edge Web" }
              ].map((tech, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group cursor-default">
                  <div className={`p-5 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white ${
                    isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <tech.icon size={32} />
                  </div>
                  <span className="font-bold text-sm tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer isDark={isDarkMode} />
    </div>
  );
};

export default FeaturesPage;
