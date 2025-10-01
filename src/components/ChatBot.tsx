"use client"

import { useState } from "react";
import { MessageCircle, X, Send} from "lucide-react"
import {generateText} from "ai"
import { google } from "@ai-sdk/google";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me anything about Nigeria! 🇳🇬' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading]= useState(false)

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const {text} =await generateText({
        model:google("gemin-1.5-flash"),
        prompt:input,
      });
    
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: text
      },]);

    } catch(err) {
      console.error(err);
      setMessages((prev)=>[
        ...prev,
        {
          role: "assistant",
          content: " Sorry, I coudnt fetch an answer right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 flex items-center justify-center z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <div className="bg-green-600 text-white px-4 py-3 rounded-t-lg font-semibold">
            Ask About Nigeria
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm text-gray-500 italic">Thinking...</div>
            )}
          </div>
          
          <div className="p-4 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 border text-green-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
            title="send"
              onClick={handleSend}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot