"use client";

import React, { useState, useEffect } from 'react';
import { Send, Bot, MessageCircle, Image, ChefHat, Languages, Music, MapPin, HelpCircle, Trash2 } from 'lucide-react';
import Header from '@/components/Header';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your Nigeria culture expert! 🇳🇬 Ask me about Nigerian history, culture, food, music, travel tips, or current events. I can also help with translations, image generation, recipes, and more!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('ai-chat-messages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages).map((msg: { role: 'user' | 'assistant'; content: string; timestamp: string }) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(parsed);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('ai-chat-messages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Server error');
      }

      const data = await res.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        role: 'assistant',
        content: '⚠️ Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    let prompt = '';
    switch (action) {
      case 'translate':
        prompt = 'Help me translate text between English and Nigerian languages. What would you like to translate?';
        break;
      case 'image':
        prompt = 'I can generate images for you. Describe what you\'d like to see - perhaps Nigerian culture, landmarks, or traditional scenes?';
        break;
      case 'recipe':
        prompt = 'I can help you generate Nigerian recipes. What type of dish are you interested in? (e.g., jollof rice, egusi soup, suya)';
        break;
      case 'music':
        prompt = 'Tell me about Nigerian music recommendations. What genre or artist are you interested in?';
        break;
      case 'travel':
        prompt = 'I can provide travel recommendations for Nigeria. Where are you planning to visit or what type of experience are you looking for?';
        break;
      case 'quiz':
        prompt = 'Let\'s test your knowledge of Nigerian culture! Would you like me to generate a quiz for you?';
        break;
      default:
        return;
    }
    handleSend(prompt);
  };

  const clearHistory = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hi! I\'m your Nigeria culture expert! 🇳🇬 Ask me about Nigerian history, culture, food, music, travel tips, or current events. I can also help with translations, image generation, recipes, and more!',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white px-6 py-4 flex items-center justify-between mt-10">
            <div className="flex items-center gap-3">
              <Bot size={24} />
              <h1 className="text-xl font-bold">AI Assistant</h1>
            </div>
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 px-3 py-1 bg-green-700 hover:bg-green-800 rounded-lg transition-colors"
              title="Clear chat history"
            >
              <Trash2 size={16} />
              Clear
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 dark:bg-secondary-700 px-6 py-4 border-b">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickAction('translate')}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <Languages size={16} />
                Translate
              </button>
              <button
                onClick={() => handleQuickAction('image')}
                className="flex items-center gap-2 px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
              >
                <Image size={16} />
                Generate Image
              </button>
              <button
                onClick={() => handleQuickAction('recipe')}
                className="flex items-center gap-2 px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
              >
                <ChefHat size={16} />
                Recipe
              </button>
              <button
                onClick={() => handleQuickAction('music')}
                className="flex items-center gap-2 px-3 py-2 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
              >
                <Music size={16} />
                Music
              </button>
              <button
                onClick={() => handleQuickAction('travel')}
                className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              >
                <MapPin size={16} />
                Travel
              </button>
              <button
                onClick={() => handleQuickAction('quiz')}
                className="flex items-center gap-2 px-3 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
              >
                <HelpCircle size={16} />
                Quiz
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-secondary-700 text-gray-800'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <div className={`text-xs mt-2 ${msg.role === 'user' ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-secondary-700 px-4 py-3 rounded-lg max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                    <span className="text-gray-600 dark:text-gray-400">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t bg-gray-50 dark:bg-secondary-700">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about Nigeria..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-secondary-800 text-gray-800"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                <Send size={18} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;