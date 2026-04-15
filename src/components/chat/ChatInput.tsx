'use client';

import React, { useRef, useEffect, KeyboardEvent } from 'react';
import { Send, RotateCcw } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  handleSendMessage: () => void;
  handleClearChat: () => void;
  isTyping: boolean;
  isDarkMode: boolean;
}

const ChatInput = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleClearChat,
  isTyping,
  isDarkMode
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const minHeight = 56;
      const maxHeight = 200;
      const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage]);

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`backdrop-blur-3xl border-t transition-all duration-700 relative z-20 ${
      isDarkMode ? 'bg-slate-950/80 border-slate-800/60 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]' : 'bg-white/70 border-gray-200/60 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]'
    }`}>
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="flex items-stretch space-x-3 md:space-x-4">
          {/* Clear Session Button */}
          <button
            onClick={handleClearChat}
            className={`w-14 min-h-[56px] rounded-2xl flex items-center justify-center transition-all duration-300 group border ${
              isDarkMode
                ? "bg-slate-900/50 border-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white"
                : "bg-white border-gray-100 text-slate-500 hover:bg-slate-50 hover:text-red-600 shadow-sm"
            }`}
            title="Clear Chat History"
          >
            <RotateCcw size={22} className="transition-transform group-hover:-rotate-180 duration-500" />
          </button>

          {/* Input Area Overlay */}
          <div className="flex-1 relative group">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Berikan perintah atau tanya sesuatu..."
              rows={1}
              className={`w-full px-6 py-4 rounded-[1.5rem] border-2 resize-none focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 backdrop-blur-md text-sm md:text-base ${
                isDarkMode 
                  ? 'bg-slate-900/50 border-slate-800 text-white placeholder-slate-500' 
                  : 'bg-white/80 border-gray-100 text-slate-900 placeholder-slate-400 shadow-inner'
              }`}
              style={{
                minHeight: '56px',
                height: '56px',
                lineHeight: '1.6'
              }}
            />
          </div>

          {/* Send Button */}
          <button 
            onClick={handleSendMessage} 
            disabled={!inputMessage.trim() || isTyping}
            className="w-14 min-h-[56px] bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white rounded-2xl disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed transition-all duration-300 shadow-2xl shadow-red-500/20 hover:shadow-red-500/40 transform hover:scale-110 active:scale-90 flex items-center justify-center group/send"
          >
            <Send size={22} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between mt-5 px-3">
          <div className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center space-x-2 ${
            isDarkMode ? 'text-slate-500' : 'text-slate-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isTyping ? 'bg-orange-500 animate-bounce' : 'bg-green-500 animate-pulse'}`}></div>
            <span>{isTyping ? 'Cipher is thinking...' : 'Cipher Engine v1.0 • Ready'}</span>
          </div>
          
          <div className={`hidden sm:block text-[10px] font-black uppercase tracking-[0.2em] ${
            isDarkMode ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Shift+Enter for newline
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
