'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Download, Eye, Sparkles, X, 
  ChevronLeft, ChevronRight, Layout,
  Smartphone, Monitor, Box, ArrowRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/ThemeContext';

export default function DemoPage() {
  const { isDarkMode: isDark } = useTheme();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const photos = [
    {
      id: 1,
      title: "Antarmuka Dashboard Utama",
      description: "Pusat kendali Cipher AI dengan akses instan ke semua modul chat dan informasi event.",
      url: "/cipher_demo/1 tampilan awal.png",
      category: "Desktop UI",
      details: "Tampilan ini dirancang untuk memberikan gambaran cepat mengenai status asisten AI dan pintasan menuju fitur penting lainnya."
    },
    {
      id: 2,
      title: "Interaksi Chat Cerdas",
      description: "Percakapan natural dengan AI Assistant yang memahami konteks Pekan IT 2025.",
      url: "/cipher_demo/demo2.png",
      category: "AI Chat",
      details: "Sistem percakapan menggunakan GPT-4o untuk pemahaman bahasa yang superior dan respon yang sangat akurat."
    },
    {
      id: 3,
      title: "Responsivitas Mobile",
      description: "Optimasi penuh untuk perangkat seluler untuk pengunjung di lapangan.",
      url: "/cipher_demo/cipher-mobile.png",
      category: "Mobile App",
      details: "Setiap elemen antarmuka telah dikonfigurasi ulang secara otomatis agar tetap nyaman digunakan di layar kecil ponsel."
    },
    {
      id: 4,
      title: "Dark Mode yang Elegan",
      description: "Visual yang nyaman di mata dengan palet warna gelap yang telah dioptimalkan.",
      url: "/cipher_demo/dark mode.png",
      category: "System Theme",
      details: "Mode gelap kami menggunakan warna slate gelap yang mengurangi kelelahan mata tanpa mengorbankan kontras visual."
    }
  ];

  // Logic to prevent scroll when preview is open
  useEffect(() => {
    if (showPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPreview]);

  const nextPhoto = () => setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const closePreview = () => setShowPreview(false);

  return (
    <div className={`min-h-screen transition-all duration-700 selection:bg-red-500/30 ${
      isDark 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Photo Preview Modal - Simplified */}
      {showPreview && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={closePreview}
        >
          <div className="relative max-h-[90vh] max-w-7xl w-full animate-in zoom-in-95 duration-500" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[currentPhotoIndex].url}
              alt={photos[currentPhotoIndex].title}
              width={1920}
              height={1080}
              className="rounded-3xl shadow-2xl border border-white/10 object-contain mx-auto"
              priority
            />
          </div>
          
          <button 
            onClick={closePreview}
            className="absolute top-8 right-8 z-[1100] text-white bg-white/10 hover:bg-red-600 rounded-2xl p-4 backdrop-blur-md transition-all border border-white/10 hover:scale-110 active:scale-90 shadow-2xl"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* High Z-Index Navigation */}
      <div className="relative z-[100]">
        <Navigation forceShowBackground />
      </div>
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] transition-all duration-1000 ${
          isDark ? 'bg-red-900/10' : 'bg-red-100/30'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] transition-all duration-1000 ${
          isDark ? 'bg-blue-900/10' : 'bg-blue-50/20'
        }`} />
      </div>

      <main className="relative z-10 pt-32 pb-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className={`max-w-3xl mb-16 space-y-4 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/10 text-red-500 text-sm font-black tracking-widest uppercase border border-red-500/20">
              <Sparkles size={14} /> CIPHER SHOWCASE
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Eksplorasi Antarmuka <span className="text-red-600">Terpadu.</span>
            </h1>
            <p className={`text-lg font-medium opacity-60 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Gunakan navigasi di bawah untuk melihat detail setiap modul aplikasi Cipher.
            </p>
          </div>

          {/* Creative Slider Layout */}
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-24">
            
            {/* Gallery Section with Horizontal Slide Effect (8 Columns) */}
            <div className={`lg:col-span-8 space-y-8 transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              <div className="relative group overflow-visible">
                {/* Browser Shell */}
                <div className={`relative rounded-[2.5rem] overflow-hidden border transition-all duration-700 ${
                  isDark ? 'border-slate-800 bg-slate-900 shadow-2xl shadow-black/60' : 'border-slate-200 bg-white shadow-2xl shadow-slate-200'
                }`}>
                  <div className={`h-12 flex items-center px-6 gap-2 border-b ${
                    isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  {/* Horizontal Sliding Container */}
                  <div className="relative aspect-video w-full bg-slate-950 overflow-hidden cursor-zoom-in" onClick={() => setShowPreview(true)}>
                    <div 
                      className="flex h-full absolute inset-0 transition-transform duration-700 ease-in-out"
                      style={{ transform: `translateX(-${currentPhotoIndex * 100}%)` }}
                    >
                      {photos.map((p, i) => (
                        <div key={i} className="relative w-full h-full flex-shrink-0">
                          <Image 
                            src={p.url} 
                            alt={p.title}
                            fill
                            className="object-cover object-top"
                            priority={i === 0}
                          />
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Navigable Thumbnail Strip */}
                <div className="flex items-center gap-6 pt-10">
                  <button 
                    onClick={prevPhoto}
                    className={`p-4 rounded-2xl border transition-all ${
                      isDark ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white hover:border-red-500' : 'bg-white border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-500 shadow-sm'
                    }`}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} strokeWidth={2.5} />
                  </button>

                  <div className="flex-1 flex justify-center gap-4 overflow-x-auto no-scrollbar py-2">
                    {photos.map((p, i) => (
                      <button 
                        key={i} 
                        onClick={() => setCurrentPhotoIndex(i)}
                        className={`relative flex-shrink-0 w-32 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          currentPhotoIndex === i 
                            ? 'border-red-600 scale-105 shadow-lg' 
                            : isDark ? 'border-slate-800 opacity-40 hover:opacity-100' : 'border-white opacity-40 hover:opacity-100 shadow-sm'
                        }`}
                      >
                        <Image src={p.url} alt={p.title} fill className="object-cover" />
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={nextPhoto}
                    className={`p-4 rounded-2xl border transition-all ${
                      isDark ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white hover:border-red-500' : 'bg-white border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-500 shadow-sm'
                    }`}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Information (4 Columns) */}
            <div className={`lg:col-span-4 space-y-8 transition-all duration-1000 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              <div className={`p-8 rounded-[2.5rem] border transition-all duration-1000 ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-xl'
              }`}>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="text-xs font-black tracking-widest text-red-600 uppercase flex items-center gap-2">
                       <Box size={14} /> {photos[currentPhotoIndex].category}
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">{photos[currentPhotoIndex].title}</h2>
                    <p className={`text-lg leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {photos[currentPhotoIndex].description}
                    </p>
                  </div>

                  <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-800/30 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className="font-black text-xs uppercase tracking-widest opacity-50 mb-3">Arsitektur UI</h4>
                    <p className="text-sm leading-relaxed italic opacity-80">
                      "{photos[currentPhotoIndex].details}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <button className="flex items-center justify-center gap-3 py-4 bg-red-600 text-white rounded-2xl font-black shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95">
                      <Download size={18} /> Download Asset
                    </button>
                    <button 
                      onClick={() => setShowPreview(true)}
                      className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-black border transition-all active:scale-95 ${
                        isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Eye size={18} /> Lihat Detail Fitur
                    </button>
                  </div>

                  {/* Device Tags */}
                  <div className="flex gap-4 justify-center md:justify-start">
                    <div className={`p-3 rounded-2xl ${isDark ? 'bg-slate-800 text-red-400' : 'bg-red-50 text-red-600'}`}><Layout size={18} /></div>
                    <div className={`p-3 rounded-2xl ${isDark ? 'bg-slate-800 text-red-400' : 'bg-red-50 text-red-600'}`}><Monitor size={18} /></div>
                    <div className={`p-3 rounded-2xl ${isDark ? 'bg-slate-800 text-red-400' : 'bg-red-50 text-red-600'}`}><Smartphone size={18} /></div>
                  </div>
                </div>
              </div>

              {/* Next Preview Card */}
              <button 
                onClick={nextPhoto}
                className={`w-full p-6 rounded-3xl border border-dashed flex items-center justify-between group transition-all ${
                  isDark ? 'border-slate-700 hover:border-red-500/50 bg-slate-900/20' : 'border-slate-200 hover:border-red-500/50 bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center font-black">
                    <ChevronRight />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Berikutnya</div>
                    <div className="font-bold text-sm">Lihat Modul Lain</div>
                  </div>
                </div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}