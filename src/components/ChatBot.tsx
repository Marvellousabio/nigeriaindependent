"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";


const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your Nigeria culture expert! 🇳🇬 Ask me about Nigerian history, culture, food, music, travel tips, or current events. I can also help with translations and recommendations!"
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Add event listener for starting AI chat
    const handleStartAIChat = (event: CustomEvent<{ message?: string }>) => {
      setIsOpen(true);
      if (event.detail?.message) {
        // Simulate user message
        const userMessage = { role: "user", content: event.detail.message };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        // Send to API
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: event.detail.message }),
        })
          .then((res) => res.json())
          .then((data) => {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: data.text },
            ]);
          })
          .catch((err) => {
            console.error(err);
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: "⚠️ Sorry, something went wrong." },
            ]);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };

    window.addEventListener('startAIChat', handleStartAIChat as EventListener);

    return () => {
      window.removeEventListener('startAIChat', handleStartAIChat as EventListener);
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Server error");
      }

      
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Sorry, something went wrong." },
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
            Nigeria Culture Assistant
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
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
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about Nigeria's culture, history, food..."
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

export default ChatBot;
