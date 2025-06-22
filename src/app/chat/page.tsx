'use client';

import { useState, useRef, useEffect, KeyboardEvent }from 'react';
import { useRouter } from 'next/navigation';
interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatAssistant() {
    const router = useRouter();
  const [showTemplates, setShowTemplates] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


const handleTemplateClick = (text: string) => {
  setShowTemplates(false); // sembunyikan setelah klik
  handleSendMessage(text); // langsung kirim tanpa isi input box
};



  const handleSetName = async () => {
    const username = prompt("Masukkan nama kamu:");
    if (!username) return alert("Nama tidak boleh kosong!");

    try {
      const res = await fetch('http://localhost:5000/api/setname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal set nama');

      const botMessage: Message = {
        id: Date.now(),
        text: data.message,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Terjadi kesalahan');
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText !== undefined ? messageText : inputMessage;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ message: textToSend })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Gagal dapat balasan');

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.reply_html,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        text: "⚠️ Error: " + (err.message || 'Terjadi kesalahan'),
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
                <img src="cipher-logo.png" alt="" />
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
                Cifera 0.4.0
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
            <button onClick={handleSetName} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-300 hover:bg-slate-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Set Name</span>
            </button>
            <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-300 hover:bg-slate-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span>Settings</span>
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
                      
                <img src="cipher-logo.png" alt="" />

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
                              className={`
                                prose prose-sm max-w-none leading-relaxed
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
                  onClick={() => window.location.reload()}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                <svg
                width={20}
                height={20}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className={`${false ? 'animate-spin' : ''} ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                             >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>

      </button>
                
              </div>
                
              {/* Input Field */}
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
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
                    maxHeight: '120px'
                  }}
                />
              </div>

              {/* Send Button */}
              <button onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
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