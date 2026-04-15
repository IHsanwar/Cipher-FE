'use client';

import React from 'react';
import Image from 'next/image';
import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
  isDarkMode: boolean;
  onImageClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MessageBubble = ({ message, isDarkMode, onImageClick }: MessageBubbleProps) => {
  return (
    <div
      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom duration-500`}
    >
      <div className={`flex items-start space-x-4 max-w-[85%] md:max-w-2xl ${
        message.isBot ? '' : 'flex-row-reverse space-x-reverse'
      }`}>
        {/* Avatar Container */}
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg relative z-10 transition-transform duration-300 hover:scale-110 ${
          message.isBot
            ? 'bg-gradient-to-br from-red-500 to-red-600'
            : isDarkMode 
              ? 'bg-slate-800 border border-slate-700' 
              : 'bg-white border border-gray-100'
        }`}>
          {message.isBot ? (
            <div className="relative w-8 h-8">
              <Image src="/cipher-logo.png" alt="Cipher Logo" fill className="object-contain" />
            </div>
          ) : (
            <span className={`text-sm font-black ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              U
            </span>
          )}
        </div>

        {/* Message Bubble Container */}
        <div className="flex flex-col space-y-2">
          <div className={`px-6 py-4 rounded-[2rem] backdrop-blur-xl transition-all duration-300 relative group overflow-hidden ${
            message.isBot
              ? isDarkMode
                ? 'bg-slate-900/40 text-slate-100 border border-slate-800/60 shadow-xl hover:bg-slate-900/60'
                : 'bg-white/70 text-slate-900 border border-gray-100 shadow-xl hover:bg-white/90'
              : 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white shadow-2xl shadow-red-500/10 hover:shadow-red-500/20'
          } ${
            message.isBot ? 'rounded-tl-lg' : 'rounded-tr-lg'
          }`}>
            {/* Glossy Overlay for Bot Bubble */}
            {message.isBot && <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />}

            {message.isBot && !message.text ? (
              <div className="flex space-x-2 py-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
              </div>
            ) : (
              <div
                className={`chat-bubble prose prose-sm max-w-none leading-relaxed relative z-10 [&_img]:cursor-zoom-in [&_img]:rounded-2xl [&_img]:shadow-2xl [&_img]:my-4 [&_img]:max-h-[400px] [&_img]:object-contain ${
                  message.isBot 
                    ? isDarkMode 
                      ? 'prose-invert prose-slate' 
                      : 'prose-gray'
                    : 'prose-red prose-invert'
                } prose-headings:mb-3 prose-headings:mt-4 prose-headings:font-black prose-p:mb-3 prose-p:mt-0 prose-p:leading-relaxed prose-strong:font-black prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:text-[13px] ${
                  isDarkMode ? 'prose-code:bg-white/10' : 'prose-code:bg-black/5'
                } prose-pre:bg-slate-950/80 prose-pre:backdrop-blur-md prose-pre:rounded-2xl prose-pre:p-6 prose-pre:border prose-pre:border-white/5 prose-a:text-red-400 hover:prose-a:text-red-300 prose-a:font-bold prose-a:no-underline hover:prose-a:underline`}
                dangerouslySetInnerHTML={{ __html: message.text }}
                onClick={onImageClick}
              />
            )}
            
            <div className={`text-[10px] font-black uppercase tracking-widest mt-3 opacity-60 text-right ${
              message.isBot
                ? isDarkMode ? 'text-slate-500' : 'text-slate-400'
                : 'text-red-100'
            }`}>
              {message.timestamp.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
