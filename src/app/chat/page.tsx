'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import Image from 'next/image';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface SurveyData {
  nama: string;
  instansi: string;
  tampilan_produk: string;
  tampilan_stand: string;
  penjelasan_produk: string;
  hiburan: string;
  kritik_saran: string;
}

interface ApiResponse {
  reply_html: string;
  reply: string;
  debug?: unknown;
}

export default function ChatAssistant() {
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLImageElement;
    if (target.tagName === 'IMG') {
      setModalImageUrl(target.src);
    }
  };


  
  const handleClearChat = async () => {
  try {
    // panggil backend untuk hapus sesi
    await fetch("http://127.0.0.1:5000/api/clear-session", {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error("Failed to clear session:", err);
  } finally {
    // bersihkan state lokal ⇒ tidak lagi append pesan lama
    setMessages([]);          // kosongkan array message
    setShowTemplates(true);   // kalau ingin tampilkan template awal lagi
  }
};


  const [showTemplates, setShowTemplates] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hai! apa ada yang bisa dibantu?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-resize textarea function
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      
      // Calculate the new height based on content
      const scrollHeight = textarea.scrollHeight;
      const minHeight = 56; // Minimum height (same as original)
      const maxHeight = 200; // Maximum height before scrolling
      
      // Set the height, but constrain it between min and max
      const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
      textarea.style.height = `${newHeight}px`;
      
      // Enable/disable scrolling based on content
      if (scrollHeight > maxHeight) {
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    }
  };

  // Handle input change with auto-resize
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    setTimeout(adjustTextareaHeight, 0);
  };
  useEffect(() => {
    const handleUnload = () => {
      navigator.sendBeacon(
        "http://cipher.ihsanwd10.my.id/api/clear-session",
        ""
      );
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);


  useEffect(() => {
    const links = document.querySelectorAll('.chat-bubble a');
    links.forEach(link => {
      link.classList.add(
        'inline-flex', 'items-center', 'gap-1',
        'text-blue-500', 'hover:underline'
      );
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');

      // Tambahkan ikon eksternal
      if (!link.querySelector('.external-icon')) {
        const icon = document.createElement('span');
        icon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14" />
</svg>
`;

        icon.classList.add('external-icon', 'text-xs');
        link.appendChild(icon);
      }
    });
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset textarea height when input is cleared
  useEffect(() => {
    if (inputMessage === '') {
      adjustTextareaHeight();
    }
  }, [inputMessage]);

  const handleTemplateClick = (text: string) => {
    setShowTemplates(false); // sembunyikan setelah klik
    handleSendMessage(text); // langsung kirim tanpa isi input box
  };

  // Create a centralized API function with proper session handling
  const API_BASE = 'http://127.0.0.1:5000';

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const defaultOptions: RequestInit = {
      credentials: 'include', // Always include cookies/session
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, defaultOptions);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      throw error;
    }
  };

  // Updated handleSendMessage function
  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText !== undefined ? messageText : inputMessage;
    if (!textToSend.trim()) return;
    if (showTemplates) setShowTemplates(false);
    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Reset textarea height after clearing input
    setTimeout(adjustTextareaHeight, 0);

    try {
      // Use the centralized API call function
      const data = await apiCall('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: textToSend })
      }) as ApiResponse;

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.reply_html,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

      // Debug session info
      console.log("🔍 Session Debug:", data.debug);
      console.log("📝 Bot reply content:", data.reply);

      // Handle survey payload extraction
      let extractedPayload: SurveyData | null = null;
      const payloadMatch = data.reply.match(/```json([\s\S]*?)```/);
      if (payloadMatch) {
        const jsonRaw = payloadMatch[1].trim();
        extractedPayload = JSON.parse(jsonRaw) as SurveyData;

        // Send survey data
        await apiCall('/api/kirim-survey', {
          method: 'POST',
          body: JSON.stringify(extractedPayload)
        });

        console.log("✅ Survey data sent via payload block.");
      }

      // Alternative survey sending
      if (data.reply.includes("#SEND_SURVEY:OK") && extractedPayload) {
        await apiCall('/api/kirim-survey', {
          method: 'POST',
          body: JSON.stringify(extractedPayload)
        });

        console.log("✅ Survey data sent via #SEND_SURVEY:OK tag.");
      }

    } catch (err) {
      console.error("❌ Error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        text: "⚠️ Error: " + errorMessage,
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`h-screen flex transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 to-gray-100'
    }`}>

      {modalImageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setModalImageUrl(null)}>
          <Image
            src={modalImageUrl}
            alt="Preview"
            width={800}
            height={600}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg border border-white object-contain"
          />
          <button
            className="absolute top-6 right-6 text-white bg-black/50 hover:bg-black/80 rounded-full p-2"
            onClick={() => setModalImageUrl(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Modern Sidebar */}
      <div className={`w-80 hidden lg:flex flex-col backdrop-blur-xl border-r transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}>
        {/* Logo Section */}
        <div className="p-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg flex items-center justify-center">
                <Image src="/cipher-logo.png" alt="Cipher Logo" width={80} height={80} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className={`text-xl font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Cipher Assistant
              </h1>
              <p className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Cifera 1.0.0
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-6">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Chat</span>
            </button>
            
          </div>
        </div>
        {/* Bottom Section */}
        <div className="p-6">
          <div className={`p-4 rounded-2xl backdrop-blur-sm ${
            isDarkMode ? 'bg-slate-800/50' : 'bg-gray-100/50'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  User
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Online
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`backdrop-blur-xl border-b transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-900/90 border-slate-700/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className="h-20 px-8 flex items-center justify-between">
            {/* Mobile Logo */}
            <div className="flex items-center space-x-4 lg:hidden">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <div>
                <h1 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Cipher Assistant
                </h1>
              </div>
            </div>

            {/* Center Title */}
            <div className="hidden lg:block">
              <h2 className={`text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Cipher Assistant
              </h2>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
               Yours Truly, Event AI Assistant!
              </p>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-3">
              <button className={`p-3 rounded-2xl transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-3 rounded-2xl transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                    : 'bg-slate-800/20 text-slate-600 hover:bg-slate-800/30'
                }`}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom duration-300`}
              >
                <div className={`flex items-start space-x-3 max-w-2xl ${
                  message.isBot ? '' : 'flex-row-reverse space-x-reverse'
                }`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot
                      ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg'
                      : isDarkMode 
                        ? 'bg-slate-700' 
                        : 'bg-gray-200'
                  }`}>
                    {message.isBot ? (
                      <Image src="/cipher-logo.png" alt="Cipher Logo" width={80} height={80} />
                    ) : (
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        U
                      </span>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`px-6 py-4 rounded-3xl backdrop-blur-sm shadow-sm transition-all duration-200 ${
                            message.isBot
                              ? isDarkMode
                                ? 'bg-slate-800/80 text-white border border-slate-700/50 hover:bg-slate-800/90'
                                : 'bg-white/90 text-gray-900 border border-gray-200/50 hover:bg-white/95'
                              : 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl'
                          }`}>
                            <div
                            className={` chat-bubble
                              prose prose-sm max-w-none leading-relaxed
                              relative group
                              [&_img]:cursor-zoom-in
                              [&_img]:rounded-lg [&_img]:shadow-md [&_img]:max-h-[400px] [&_img]:object-contain
                              ${message.isBot 
                                ? isDarkMode 
                                  ? 'prose-invert prose-slate' 
                                  : 'prose-gray'
                                : 'prose-red prose-invert'
                              }
                              prose-headings:mb-3 prose-headings:mt-4 prose-headings:font-semibold
                              prose-p:mb-3 prose-p:mt-0 prose-p:leading-relaxed
                              prose-ul:my-2 prose-ol:my-2 prose-li:my-1
                              prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                              ${isDarkMode ? 'prose-code:bg-white prose-code:bg-opacity-10' : 'prose-code:bg-gray-800 prose-code:bg-opacity-10'}
                              prose-pre:bg-gray-900 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
                              prose-table:border-collapse prose-th:border prose-td:border prose-th:p-2 prose-td:p-2
                              prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline
                            `}
                            dangerouslySetInnerHTML={{ __html: message.text }}
                            onClick={handleImageClick}
                          />
                    

                    <div className={`text-xs mt-2 ${
                      message.isBot
                        ? isDarkMode ? 'text-gray-400' : 'text-gray-500'
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
            ))}
            
            {showTemplates && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-8 py-6">
                {[
                  "Apa fungsi Cipher?",
                  "Apa saja projek Pekan IT kali ini?",
                  "Siapa perancang program AI Assistant ini?",
                  "Bagaimana cara menggunakan Cipher?",
                ].map((template, index) => (
                  <button
                    key={index}
                    onClick={() => handleTemplateClick(template)}
                    className={`p-6  cursor-pointer rounded-2xl text-sm font-semibold text-left shadow-md transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-slate-800 text-white hover:bg-slate-700'
                        : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {template}
                  </button>
                ))}
              </div>
            )}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom duration-300">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                  <div className={`px-6 py-4 rounded-3xl backdrop-blur-sm ${
                    isDarkMode
                      ? 'bg-slate-800/80 border border-slate-700/50'
                      : 'bg-white/90 border border-gray-200/50'
                  }`}>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
       

        {/* Input Area */}
        <div className={`backdrop-blur-xl border-t transition-all duration-300 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-700/50' : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-end space-x-4">
              {/* Quick Actions */}
              <div className="flex space-x-2">
              <button
  onClick={handleClearChat}
  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
    isDarkMode
      ? "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
  }`}
  title="Clear chat"
>
  {/* icon sederhana refresh/rotate */}
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 0019 5M19 19A9 9 0 005 5" />
  </svg>
</button>


              </div>
                
              {/* Input Field */}
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  rows={1}
                  className={`w-full px-6 py-4 rounded-3xl border-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200 backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-slate-800/80 border-slate-700 text-white placeholder-gray-400' 
                      : 'bg-white/90 border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
                  style={{
                    minHeight: '56px',
                    height: '56px', // Default height
                    lineHeight: '1.5'
                  }}
                />
              </div>

              {/* Send Button */}
              <button onClick={() => handleSendMessage()} disabled={!inputMessage.trim() || isTyping}
                className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between mt-4 px-2">
              <div className={`text-xs flex items-center space-x-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>AI Assistant is online</span>
              </div>
              
              <div className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}