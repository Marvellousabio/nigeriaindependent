"use client"
import React, { useState } from 'react'

const Info = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
    const faqs = [
    {
      q: "What is Nigeria known for?",
      a: "Nigeria is known for its rich cultural diversity, Nollywood (the 2nd largest film industry), vibrant music scene (Afrobeats), and as Africa's largest economy."
    },
    {
      q: "How many languages are spoken in Nigeria?",
      a: "Over 500 languages are spoken in Nigeria, with English as the official language. Major languages include Hausa, Yoruba, and Igbo."
    },
    {
      q: "What is Nigeria's capital?",
      a: "Abuja is the capital of Nigeria, while Lagos is the largest city and economic hub."
    },
    {
      q: "When did Nigeria gain independence?",
      a: "Nigeria gained independence from British colonial rule on October 1, 1960."
    }
  ];

  return (
    <section className="px-6 md:px-16 py-16 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                {faq.q}
              </button>
              {openIndex === idx && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
  
export default Info