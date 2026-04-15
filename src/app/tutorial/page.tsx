'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  MessageSquare, MapPin, Send, CheckCircle2, 
  ArrowRight, Sparkles, MousePointer2, Info,
  ExternalLink, ChevronRight
} from 'lucide-react';

const TutorialPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      title: "Mulai Akses Cipher",
      badge: "Langkah 01",
      description: "Buka platform melalui URL resmi atau scan QR Code yang tersedia di setiap stan Pekan IT 2025.",
      tip: "Gunakan kamera HP untuk scan QR Code lebih cepat dan praktis.",
      icon: <MousePointer2 className="w-6 h-6" />,
      image: "/cipher_demo/1 tampilan awal.png"
    },
    {
      title: "Berdiskusi dengan AI",
      badge: "Langkah 02",
      description: "Ketik pertanyaan Anda secara natural atau pilih salah satu template pertanyaan untuk respon instan.",
      tip: "AI kami mengerti bahasa sehari-hari, Anda bisa bertanya dengan santai.",
      icon: <MessageSquare className="w-6 h-6" />,
      image: "/cipher_demo/demo1.png"
    },
    {
      title: "Cek Lokasi & Antrian",
      badge: "Langkah 03",
      description: "Tanyakan mengenai 'denah lokasi' atau 'nomor antrian' untuk mendapatkan panduan visual otomatis.",
      tip: "Peta lokasi stan akan ditampilkan langsung dalam chat Anda.",
      icon: <MapPin className="w-6 h-6" />,
      image: "/cipher_demo/langkah langkah mengambil no raport serta denah.png"
    },
    {
      title: "Feedback Melalui Chat",
      badge: "Langkah 04",
      description: "Kirim survei kepuasan cukup dengan mengobrol. AI akan mencatat feedback Anda secara otomatis.",
      tip: "Bantu kami meningkatkan kualitas event dengan memberikan saran terbaik.",
      icon: <Send className="w-6 h-6" />,
      image: "/cipher_demo/demo2.png"
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
      
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-0 right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-all duration-1000 ${
          isDarkMode ? 'bg-red-900/10' : 'bg-red-100/40'
        }`} />
        <div className={`absolute bottom-0 left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-all duration-1000 ${
          isDarkMode ? 'bg-blue-900/10' : 'bg-blue-50/30'
        }`} />
      </div>

      <main className="relative z-10 pt-28 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header Section */}
          <div className={`max-w-4xl mx-auto text-center mb-32 space-y-6 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-black tracking-widest border border-red-500/20 uppercase">
              <Sparkles size={14} /> User Guide
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              Panduan <span className="text-red-600">Lengkap</span><br />
              Penggunaan Cipher
            </h1>
            <p className={`text-xl font-medium leading-relaxed max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Ikuti alur sederhana di bawah ini untuk menguasai segala fitur cerdas yang ditawarkan oleh Cipher AI Assistant.
            </p>
          </div>

          {/* Timeline Steps */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className={`absolute left-[27px] lg:left-1/2 top-0 bottom-0 w-1 hidden md:block transition-all duration-1000 ${
              isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
            } ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

            <div className="space-y-48">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-16 lg:gap-24 transition-all duration-1000 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  {/* Timeline Badge (Desktop) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 hidden lg:flex flex-col items-center z-20">
                    <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black shadow-xl shadow-red-500/40 border-4 border-white dark:border-slate-900 transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                      <span className="-rotate-45">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 space-y-8 w-full pt-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-red-500 font-black tracking-widest text-sm uppercase">
                        <ChevronRight size={18} /> {step.badge}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                        {step.title}
                      </h2>
                      <p className={`text-xl font-medium leading-relaxed ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {step.description}
                      </p>
                    </div>

                    {/* Pro Tip Box */}
                    <div className={`p-6 rounded-2xl border flex gap-4 items-start ${
                      isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <div className="p-2 bg-red-500 text-white rounded-lg mt-0.5">
                        <Info size={16} />
                      </div>
                      <div>
                        <div className="font-black text-xs tracking-widest text-red-600 uppercase mb-1">Cepat & Mudah</div>
                        <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          {step.tip}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-green-500 font-black">
                      <CheckCircle2 size={24} /> 
                      <span className="tracking-tight">Fitur tersedia dan aktif</span>
                    </div>
                  </div>

                  {/* Image Column with Browser Frame Mockup */}
                  <div className="flex-1 w-full relative group">
                    <div className={`relative w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02] border ${
                      isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                    }`}>
                      {/* Browser Title Bar */}
                      <div className={`w-full h-8 flex items-center px-4 gap-1.5 border-b ${
                        isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-gray-100 border-gray-200'
                      }`}>
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <div className={`ml-4 h-4 w-1/2 rounded bg-opacity-20 ${
                          isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
                        }`}></div>
                      </div>
                      
                      {/* Screen Content - Changed to aspect-video (16:9) to match screenshots */}
                      <div className="relative aspect-video w-full bg-white">
                        <Image 
                          src={step.image} 
                          alt={step.title} 
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      
                      {/* Action Overlay */}
                      <div className="absolute inset-x-0 bottom-0 top-8 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 cursor-pointer">
                        <div className="bg-white text-red-600 p-4 rounded-full shadow-2xl transform scale-50 group-hover:scale-100 transition-transform">
                          <ExternalLink size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className={`mt-52 text-center pb-20 transition-all duration-1000 delay-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className={`p-16 rounded-[4rem] relative overflow-hidden group border ${
              isDarkMode 
                ? 'bg-slate-900/60 border-slate-800 shadow-2xl shadow-black/40' 
                : 'bg-white border-slate-200 shadow-2xl shadow-slate-200'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Selesaikan Tugas Lebih Cepat<br />
                  <span className="text-red-600 font-black">Bersama Cipher AI</span>
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <a 
                    href="/chat" 
                    className="w-full md:w-auto px-10 py-5 bg-red-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-red-600/30 hover:bg-red-700 hover:scale-105 transition-all flex items-center justify-center gap-3"
                  >
                    Mulai Sekarang <ArrowRight size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer isDark={isDarkMode} />
    </div>
  );
};

export default TutorialPage;
