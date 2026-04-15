'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ChatSidebarProps {
  isDarkMode: boolean;
}

const ChatSidebar = ({ isDarkMode }: ChatSidebarProps) => {
  return (
    <div className={`w-80 hidden lg:flex flex-col backdrop-blur-3xl border-r transition-all duration-700 relative z-30 ${
      isDarkMode 
        ? 'bg-slate-950/40 border-slate-800/60' 
        : 'bg-white/40 border-gray-200/60'
    }`}>
      {/* Brand Section (Clickable) */}
      <div className="p-10">
        <Link href="/" className="flex items-center space-x-4 group cursor-pointer">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Image src="/cipher-logo.png" alt="Cipher Logo" width={80} height={80} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="text-left">
            <h1 className={`text-xl font-black tracking-tight leading-tight transition-all duration-300 ${
              isDarkMode ? 'text-white group-hover:text-red-400' : 'text-slate-900 group-hover:text-red-600'
            }`}>
              Cipher Assistant
            </h1>
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] -mt-0.5 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              v1.0.0 Online
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation - Premium Menu */}
      <div className="flex-1 px-6">
        <div className="space-y-3">
          <div className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest ${
            isDarkMode ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Main Menu
          </div>
          <button className="w-full flex items-center justify-between space-x-3 px-5 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg shadow-red-500/20 transform scale-[1.02] transition-all hover:shadow-red-500/30">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Current Session</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
          </button>
        </div>
      </div>

      {/* Profile Tray - Glassmorphic */}
      <div className="p-8">
        <div className={`p-4 rounded-[2rem] border transition-all duration-500 ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800/60' : 'bg-white/60 border-gray-100 shadow-xl'
        }`}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-white text-lg font-black">U</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className={`text-sm font-black tracking-tight truncate ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Pekan IT Guest
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${
                  isDarkMode ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Authenticated
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
