'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, Maximize, Video, ArrowLeft, ArrowRight, Download, Eye } from 'lucide-react';
import { Sun, Moon, Menu, X } from 'lucide-react';
export default function DemoPage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('photo');
  

const menuItems = ['Fitur', 'Demo', 'Tutorial', 'Kontak'];

const [isDark, setIsDark] = useState(false);
const [isMenuOpen, setIsMenuOpen] = useState(false);

// Optional: Tambahkan dark mode toggle jika kamu mau
const toggleTheme = () => setIsDark(!isDark);
  const videos = [
    {
      id: 1,
      title: "Cipher AI Assistant - Overview",
      description: "Mengenal lebih dekat dengan Cipher AI Assistant dan fitur-fitur unggulannya",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop",
      duration: "2:30"
    },
    {
      id: 2,
      title: "Tutorial Penggunaan",
      description: "Panduan langkah demi langkah menggunakan Cipher untuk kebutuhan sehari-hari",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop",
      duration: "5:15"
    },
    {
      id: 3,
      title: "Fitur Pencarian Cerdas",
      description: "Demonstrasi kemampuan pencarian dan analisis data yang canggih",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
      duration: "3:45"
    }
  ];

  const photos = [
    {
      id: 1,
      title: "Interface Awal Chat",
      description: "Tampilan awal Cipher AI Assistant dengan beberapa rekomendasi tempalte chat",
      url: "/cipher_demo/1 tampilan awal.png",
      category: "Interface"
    },
    {
      id: 2,
      title: "Chat Interface",
      description: "Antarmuka percakapan yang intuitif dan responsif",
      url: "/cipher_demo/demo2.png",
      category: "Interface"
    },
    {
      id: 3,
      title: "Mobile View",
      description: "Tampilan mobile yang optimal untuk penggunaan di smartphone",
      url: "/cipher_demo/cipher-mobile.png",
      category: "Mobile"
    },
    
    {
      id: 4,
      title: "Dark Mode dan Tampilan Preview Gambar",
      description: "Mode gelap untuk kenyamanan penggunaan di malam hari dan menampilkan gambar dengan jelas",
      url: "/cipher_demo/dark mode.png",
      category: "Interface"
    }
  ];

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleMute = () => {
    setIsVideoMuted(!isVideoMuted);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className={`w-full fixed top-0 z-50 shadow-sm backdrop-blur-md ${isDark ? 'bg-slate-900/80' : 'bg-white/70'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="relative">
         <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg flex items-center justify-center">
                       <Image src="/cipher-logo.png" alt="Cipher Logo" width={80} height={80} />
                     </div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex flex-col">
          <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Cipher
          </span>
          <span className="text-xs text-red-500 font-medium -mt-1">
            Pekan IT 2025
          </span>
        </div>
      </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`relative transition-all duration-300 font-medium group ${
                  isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDark
                  ? 'bg-slate-800/50 text-yellow-400 hover:bg-slate-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-all duration-300"
            >
              {isMenuOpen
                ? <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-600'}`} />
                : <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-600'}`} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden py-6 px-4 border-t ${isDark ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-white'}`}>
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`py-2 px-4 rounded-lg ${
                  isDark
                    ? 'text-gray-300 hover:text-white hover:bg-slate-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full text-red-600 text-sm font-medium mb-4">
           
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lihat <span className="text-red-600">Cipher</span> Beraksi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Jelajahi kemampuan penuh Cipher AI Assistant melalui video demo dan screenshot aplikasi
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-lg">
            
             </div>
             </div>
        {/* Photo Gallery Section */}
        {activeTab === 'photo' && (
          <div className="space-y-8">
            {/* Main Photo Display */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto">
              <div className="relative aspect-video bg-gray-100">
                <img 
                  src={photos[currentPhotoIndex].url} 
                  alt={photos[currentPhotoIndex].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Photo Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={prevPhoto}
                      className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                      {photos[currentPhotoIndex].category}
                    </span>
                    <button className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Photo Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {photos[currentPhotoIndex].title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {photos[currentPhotoIndex].description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Screenshot {currentPhotoIndex + 1} dari {photos.length}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                      {photos[currentPhotoIndex].category}
                    </span>
                  </div>
                  <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Photo Gallery Grid */}
            
          </div>
        )}

       
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold">Cipher</span>
            </div>
            <p className="text-gray-400">
              © 2025 Cipher AI Assistant. Pekan IT 2025 - SMK Plus Pelita Nusantara
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}