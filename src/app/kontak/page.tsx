'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Sun, Moon, Code, BookOpen, Lightbulb, GraduationCap, Send,
  Menu, X, Sparkles, Globe, Instagram, Linkedin, MessageCircle, Mail, Phone, MapPin
} from 'lucide-react';
import Link from 'next/link';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

type NavigationProps = {
  isDark: boolean;
  toggleTheme: () => void;
};

// ✅ Component: Navigation bar
const Navigation = ({ isDark, toggleTheme }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const menuItems = ['Fitur', 'Demo', 'Tutorial', 'Kontak'];

  return (
    <nav className={`w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl bg-white/80 shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg flex items-center justify-center">
              <Image src="/cipher-logo.png" alt="Cipher Logo" width={80} height={80} />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Cipher
            </span>
            <span className="text-xs text-red-500 font-medium -mt-1">Pekan IT 2025</span>
          </div>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`relative font-medium group transition-all ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button onClick={toggleTheme} className="p-3 rounded-xl group transition-all">
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>
          <Link href="/chat" className="hidden md:block px-6 py-2.5 bg-red-600 text-white rounded-xl font-medium shadow-lg hover:scale-105 transition-all">
            Coba Gratis
          </Link>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-6">
          {menuItems.map((item) => (
            <a key={item} href={`/${item.toLowerCase()}`} className="block py-2 text-sm">
              {item}
            </a>
          ))}
          <Link href="/chat" className="block mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-center">
            Coba Gratis
          </Link>
        </div>
      )}
    </nav>
  );
};

// ✅ Halaman utama: Kontak
export default function ContactPage() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

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
    alert('Pesan berhasil dikirim!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      {/* Navbar */}
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />

      {/* Form dan Konten */}
      <main className="max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">Hubungi Kami</h1>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama" required className="w-full p-3 border rounded" />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className="w-full p-3 border rounded" />
            <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subjek" className="w-full p-3 border rounded" />
            <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Pesan" rows={5} className="w-full p-3 border rounded"></textarea>
            <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2">
              <Send size={18} /> Kirim Pesan
            </button>
          </form>

          {/* Kontak Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-4 flex items-start gap-4">
              <Mail className="text-red-600" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>ihsanwar77@gmail.com</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 flex items-start gap-4">
              <Phone className="text-red-600" />
              <div>
                <h3 className="font-semibold">Telepon</h3>
                <p>+62 812-9308-0153</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 flex items-start gap-4">
              <Globe className="text-red-600" />
              <div>
                <h3 className="font-semibold">Website</h3>
                <a href="https://ihsanwd10.my.id" target="_blank" className="hover:text-blue-500">ihsanwd10.my.id</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
