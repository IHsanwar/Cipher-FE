'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sun, Moon, Home, Sparkles } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useTheme } from '@/context/ThemeContext';
import ChatSidebar from '@/components/chat/ChatSidebar';
import MessageBubble from '@/components/chat/MessageBubble';
import ChatInput from '@/components/chat/ChatInput';

function ChatInterface() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showTemplates, setShowTemplates] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [isBooted, setIsBooted] = useState(false);
  const [showBootFlash, setShowBootFlash] = useState(false);
  
  const searchParams = useSearchParams();
  const initialQueryProcessed = useRef(false);
  
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Start boot sequence
    const timer = setTimeout(() => {
      setIsBooted(true);
      setShowBootFlash(true);
      // Fade out flash after 600ms
      setTimeout(() => setShowBootFlash(false), 600);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle incoming query parameter
  useEffect(() => {
    const query = searchParams.get('q');
    if (query && !initialQueryProcessed.current && isBooted) {
      setInputMessage(query);
      initialQueryProcessed.current = true;
      // Optionally clean up URL without refreshing
      window.history.replaceState({}, '', '/chat');
    }
  }, [searchParams, isBooted]);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLImageElement;
    if (target.tagName === 'IMG') {
      setModalImageUrl(target.src);
    }
  };

  const onSendMessage = async (text?: string) => {
    const textToSend = text || inputMessage;
    if (!textToSend.trim()) return;
    
    if (showTemplates) setShowTemplates(false);
    setInputMessage('');
    await sendMessage(textToSend);
  };

  const onClearChat = async () => {
    await clearChat();
    setShowTemplates(true);
  };

  const templates = [
    "Apa fungsi Cipher?",
    "Apa saja projek Pekan IT kali ini?",
    "Siapa perancang program AI Assistant ini?",
    "Bagaimana cara menggunakan Cipher?",
  ];

  return (
    <div className={`h-screen flex overflow-hidden transition-all duration-700 selection:bg-red-500/30 relative ${
      isDarkMode 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      {/* AI Boot Red Flash Overlay */}
      {showBootFlash && (
        <div className="absolute inset-0 z-[2000] bg-red-600/5 pointer-events-none animate-pulse-fast backdrop-blur-[2px]" />
      )}

      {/* Background Ambient Orbs - Performance Optimized */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-5%] left-[10%] w-[45%] h-[45%] rounded-full blur-[90px] transition-all duration-1000 ${
          isDarkMode ? 'bg-red-900/10' : 'bg-red-100/40'
        }`} />
        <div className={`absolute bottom-[-5%] right-[10%] w-[50%] h-[50%] rounded-full blur-[100px] transition-all duration-1000 ${
          isDarkMode ? 'bg-blue-900/10' : 'bg-blue-50/30'
        }`} />
      </div>

      {/* Modal Image Preview */}
      {modalImageUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setModalImageUrl(null)}>
          <div className="relative max-h-[90vh] max-w-[90vw] animate-in zoom-in-95 duration-300">
            <Image
              src={modalImageUrl}
              alt="Preview"
              width={1200}
              height={800}
              className="rounded-2xl shadow-2xl border border-white/10 object-contain"
            />
          </div>
          <button className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-md transition-colors border border-white/10">
            ✕
          </button>
        </div>
      )}

      {/* Sidebar with Slide-in Animation */}
      <div className={`h-full transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) transform ${
        isBooted ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}>
        <ChatSidebar isDarkMode={isDarkMode} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
        {/* Header with Drop-down Animation */}
        <header className={`backdrop-blur-2xl border-b h-20 px-8 flex items-center justify-between transition-all duration-1000 delay-150 cubic-bezier(0.23, 1, 0.32, 1) z-20 transform ${
          isBooted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800/60' : 'bg-white/70 border-gray-200/60'
        }`}>
          {/* Brand Info */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="lg:hidden w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <span className="text-white font-black">C</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight text-red-600">Cipher Assistant</h2>
                <div className="hidden sm:flex px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-black text-red-500 tracking-widest uppercase items-center gap-1">
                  <Sparkles size={8} /> AI
                </div>
              </div>
              <p className={`text-xs font-medium tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Yours Truly, Event AI Assistant!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/" className={`p-3 rounded-2xl transition-all duration-300 group ${
              isDarkMode 
                ? 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/50' 
                : 'bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
            </Link>

            <button
              onClick={toggleTheme}
              className={`p-3 rounded-2xl transition-all duration-300 group ${
                isDarkMode 
                  ? 'bg-slate-900/50 text-yellow-400 hover:bg-slate-800 border border-slate-800/50' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 transition-transform group-hover:rotate-12" />
              ) : (
                <Moon className="w-5 h-5 transition-transform group-hover:rotate-12" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content Area with Zoom/Scale Animation */}
        <div className={`flex-1 overflow-y-auto no-scrollbar scroll-smooth transition-all duration-1000 delay-300 transform ${
          isBooted ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'
        }`}>
          <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
            {messages.map((message) => (
              <MessageBubble 
                key={message.id} 
                message={message} 
                isDarkMode={isDarkMode} 
                onImageClick={handleImageClick} 
              />
            ))}
            
            {showTemplates && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => onSendMessage(template)}
                    className={`group relative p-6 rounded-3xl text-sm font-bold text-left border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden ${
                      isDarkMode
                        ? 'bg-slate-900/40 border-slate-800/60 text-slate-200 hover:bg-slate-900/60 hover:border-red-500/30'
                        : 'bg-white/60 backdrop-blur-md border-gray-100 text-slate-700 hover:bg-white hover:border-red-200/50 shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="relative z-10">{template}</span>
                      <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Home size={16} className="rotate-45" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area with slide-up animation */}
        <div className={`transition-all duration-700 delay-500 transform ${
          isBooted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <ChatInput 
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={() => onSendMessage()}
            handleClearChat={onClearChat}
            isTyping={isTyping}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}

export default function ChatAssistant() {
  return (
    <Suspense fallback={
        <div className="h-screen w-full flex items-center justify-center bg-slate-950">
            <div className="relative">
                <div className="w-20 h-20 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-red-600 font-black">C</div>
            </div>
        </div>
    }>
      <ChatInterface />
    </Suspense>
  );
}