"use client";

import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

const VisitorPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    interests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has already visited
    const visited = localStorage.getItem('hasVisitedNigeriaSite');
    if (!visited) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setHasVisited(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('hasVisitedNigeriaSite', 'true');
        localStorage.setItem('visitorId', data.visitorId);
        setIsOpen(false);

        // Redirect to AI chat section
        const chatSection = document.getElementById('chat-section');
        if (chatSection) {
          chatSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Trigger AI chat with personalized message
        setTimeout(() => {
          const event = new CustomEvent('startAIChat', {
            detail: {
              message: `Hi! I'm ${formData.name} from ${formData.country}. I'm interested in ${formData.interests} about Nigeria. Can you tell me more?`
            }
          });
          window.dispatchEvent(event);
        }, 1000);

      } else {
        alert('Failed to save your information. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (hasVisited || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">Welcome to Nigeria&apos;s Culture Hub! 🇳🇬</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200"
            title="Close popup"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Tell us a bit about yourself and our AI assistant will help you discover amazing things about Nigeria!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Your Country *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Where are you from?"
              />
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                What interests you about Nigeria? *
              </label>
              <textarea
                id="interests"
                name="interests"
                required
                value={formData.interests}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g., culture, history, food, music, travel, business..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                'Saving...'
              ) : (
                <>
                  <MessageCircle size={20} />
                  Start My Nigeria Journey!
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Your information helps us provide personalized recommendations and is kept private.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitorPopup;