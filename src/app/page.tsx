'use client';

import { useTheme } from '@/context/ThemeContext';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';

const CipherLandingPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-700 selection:bg-red-500/30 ${
      isDarkMode 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Ambient Orbs - Performance Optimized */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[80px] transition-all duration-1000 ${
          isDarkMode ? 'bg-red-900/20' : 'bg-red-100/50'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[90px] transition-all duration-1000 ${
          isDarkMode ? 'bg-blue-900/10' : 'bg-blue-50/40'
        }`} />
      </div>

      <div className="relative z-[100]">
        <Navigation />
      </div>
      <main className="relative z-10">
        <HeroSection isDark={isDarkMode} />
        <FeaturesSection isDark={isDarkMode} />
      </main>
      <Footer isDark={isDarkMode} />
    </div>
  );
};

export default CipherLandingPage;
