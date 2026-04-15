'use client';

import { useState, useCallback } from 'react';
import { Message } from '@/types/chat';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:5000';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hai! apa ada yang bisa dibantu?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const apiCall = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    const defaultOptions: RequestInit = {
      credentials: 'include',
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
  }, []);

  const parseSSEBuffer = (buffer: string) => {
    const events: any[] = [];
    const parts = buffer.split('\n\n');
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i].trim();
      if (!part) continue;
      const lines = part.split('\n');
      let dataLines: string[] = [];
      for (const line of lines) {
        if (line.startsWith('data:')) {
          dataLines.push(line.replace(/^data:\s?/, ''));
        }
      }
      if (dataLines.length) {
        const dataStr = dataLines.join('\n');
        try {
          events.push(JSON.parse(dataStr));
        } catch (e) {
          // ignore
        }
      }
    }
    return events;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const botId = Date.now() + 1;
      const botMessage: Message = {
        id: botId,
        text: '',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';

      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const events = parseSSEBuffer(buffer);
          const lastDoubleNL = buffer.lastIndexOf('\n\n');
          if (lastDoubleNL !== -1) {
            buffer = buffer.slice(lastDoubleNL + 2);
          }

          for (const ev of events) {
            if (ev.error) throw new Error(ev.error);
            if (ev.token) {
              setMessages(prev => prev.map(m => m.id === botId ? { ...m, text: (m.text || '') + ev.token } : m));
            } else if (ev.final) {
              setMessages(prev => prev.map(m => m.id === botId ? { ...m, text: ev.reply_html } : m));
              // Survey logic
              if (ev.reply && ev.reply.match(/```json/)) {
                const payloadMatch = ev.reply.match(/```json([\s\S]*?)```/);
                if (payloadMatch) {
                  const jsonRaw = payloadMatch[1].trim();
                  try {
                    const extractedPayload = JSON.parse(jsonRaw);
                    await apiCall('/api/kirim-survey', { method: 'POST', body: JSON.stringify(extractedPayload) });
                  } catch (e) {
                    console.error('Failed to parse survey payload', e);
                  }
                }
              }
            }
          }
        }
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

  const clearChat = async () => {
    try {
      await apiCall("/api/clear-session", { method: "POST" });
    } catch (err) {
      console.error("Failed to clear session:", err);
    } finally {
      setMessages([{
        id: Date.now(),
        text: "Hai! apa ada yang bisa dibantu?",
        isBot: true,
        timestamp: new Date()
      }]);
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat
  };
};
