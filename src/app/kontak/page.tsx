'use client';

import React, { useState, useEffect } from 'react';
import { 
  Send, Mail, Phone, Globe, Sparkles, 
  MapPin, MessageSquare, MessageCircle, Instagram, Linkedin 
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/ThemeContext';

const ContactPage = () => {
  const { isDarkMode: isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Pesan berhasil dikirim! Tim Cipher akan segera menghubungi Anda.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className={`min-h-screen transition-all duration-700 selection:bg-red-500/30 ${
      isDark 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="relative z-[100]">
        <Navigation forceShowBackground />
      </div>
      
      {/* Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[20%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] transition-all duration-1000 ${
          isDark ? 'bg-red-900/10' : 'bg-red-50/50'
        }`} />
        <div className={`absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] transition-all duration-1000 ${
          isDark ? 'bg-blue-900/10' : 'bg-blue-50/40'
        }`} />
      </div>

      <main className="relative z-10 pt-28 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className={`max-w-3xl mx-auto text-center mb-20 space-y-6 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-black tracking-widest border border-red-500/20 uppercase">
              <Sparkles size={14} /> DUKUNGAN PELANGGAN
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Hubungi <span className="text-red-600">Kami</span>
            </h1>
            <p className={`text-xl font-medium leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Ada pertanyaan atau butuh bantuan lebih lanjut? Tim kami siap membantu Anda memaksimalkan pengalaman bersama Cipher AI.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Form Section */}
            <div className={`lg:col-span-3 transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              <form 
                onSubmit={handleSubmit} 
                className={`p-10 rounded-[2.5rem] border transition-all duration-500 space-y-6 ${
                  isDark 
                    ? 'bg-slate-900/40 border-slate-800 shadow-2xl shadow-black/20' 
                    : 'bg-white border-slate-200 shadow-xl'
                }`}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black tracking-widest uppercase opacity-60 ml-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="Masukkan nama Anda" 
                      required 
                      className={`w-full p-4 rounded-2xl border bg-transparent transition-all outline-none focus:ring-2 focus:ring-red-500/50 ${
                        isDark ? 'border-slate-700 focus:border-red-500' : 'border-slate-200 focus:border-red-500'
                      }`} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black tracking-widest uppercase opacity-60 ml-1">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="email@example.com" 
                      required 
                      className={`w-full p-4 rounded-2xl border bg-transparent transition-all outline-none focus:ring-2 focus:ring-red-500/50 ${
                        isDark ? 'border-slate-700 focus:border-red-500' : 'border-slate-200 focus:border-red-500'
                      }`} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-black tracking-widest uppercase opacity-60 ml-1">Subjek</label>
                  <input 
                    type="text" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleInputChange} 
                    placeholder="Apa hal yang ingin Anda tanyakan?" 
                    className={`w-full p-4 rounded-2xl border bg-transparent transition-all outline-none focus:ring-2 focus:ring-red-500/50 ${
                      isDark ? 'border-slate-700 focus:border-red-500' : 'border-slate-200 focus:border-red-500'
                    }`} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black tracking-widest uppercase opacity-60 ml-1">Pesan</label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    placeholder="Tulis pesan Anda di sini..." 
                    rows={5} 
                    className={`w-full p-4 rounded-2xl border bg-transparent transition-all outline-none focus:ring-2 focus:ring-red-500/50 resize-none ${
                      isDark ? 'border-slate-700 focus:border-red-500' : 'border-slate-200 focus:border-red-500'
                    }`}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-red-600 text-white p-5 rounded-2xl font-black text-lg shadow-xl shadow-red-600/30 hover:bg-red-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  <Send size={20} /> Kirim Pesan Sekarang
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div className={`lg:col-span-2 space-y-8 transition-all duration-1000 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              {[
                { 
                  icon: <Mail className="text-red-500" />, 
                  title: "Email", 
                  content: "ihsanwar77@gmail.com",
                  sub: "Dapatkan balasan dalam 24 jam"
                },
                { 
                  icon: <Phone className="text-red-500" />, 
                  title: "Telepon", 
                  content: "+62 812-9308-0153",
                  sub: "Tersedia jam 08:00 - 17:00"
                },
                { 
                  icon: <Globe className="text-red-500" />, 
                  title: "Website", 
                  content: "ihsanwd10.my.id",
                  sub: "Kunjungi portfolio pengembang"
                }
              ].map((info, i) => (
                <div 
                  key={i}
                  className={`p-8 rounded-3xl border transition-all duration-500 flex gap-6 items-center ${
                    isDark 
                      ? 'bg-slate-900/30 border-slate-800/50 hover:bg-slate-900/50' 
                      : 'bg-white border-slate-100 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-red-50'}`}>
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs font-black tracking-widest text-red-500 uppercase mb-1">{info.title}</div>
                    <div className="text-xl font-bold mb-1">{info.content}</div>
                    <div className={`text-sm opacity-60 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {info.sub}
                    </div>
                  </div>
                </div>
              ))}

              <div className={`p-8 rounded-[2rem] border transition-all duration-500 text-center ${
                isDark ? 'bg-red-600/10 border-red-500/20' : 'bg-red-500 text-white'
              }`}>
                <h3 className="text-xl font-bold mb-4">Ikuti Kami di Media Sosial</h3>
                <div className="flex justify-center gap-6">
                  <a href="#" className="p-3 bg-white/10 rounded-xl hover:scale-110 transition-all text-white"><Instagram /></a>
                  <a href="#" className="p-3 bg-white/10 rounded-xl hover:scale-110 transition-all text-white"><Linkedin /></a>
                  <a href="#" className="p-3 bg-white/10 rounded-xl hover:scale-110 transition-all text-white"><MessageCircle /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
};

export default ContactPage;
