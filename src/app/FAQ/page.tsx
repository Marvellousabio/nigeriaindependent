"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Nigeria known for?",
      answer: "Nigeria is known for its rich cultural heritage, diverse ethnic groups, Nollywood (the second-largest film industry in the world), Afrobeat music pioneered by Fela Kuti, and being the most populous country in Africa with over 250 ethnic groups."
    },
    {
      question: "How many languages are spoken in Nigeria?",
      answer: "Nigeria has over 500 languages spoken across its 36 states and Federal Capital Territory. The three major languages are Hausa, Yoruba, and Igbo, while English serves as the official language and lingua franca."
    },
    {
      question: "What are the major tourist attractions in Nigeria?",
      answer: "Major attractions include Zuma Rock in Abuja, Olumo Rock in Abeokuta, Yankari National Park, Obudu Mountain Resort, the Benin City National Museum, and various cultural festivals throughout the year."
    },
    {
      question: "What is the currency used in Nigeria?",
      answer: "The Nigerian Naira (₦) is the official currency. It's subdivided into 100 kobo. Note that the currency has experienced significant inflation, so current exchange rates should be checked."
    },
    {
      question: "What are the main religions in Nigeria?",
      answer: "Nigeria is religiously diverse with approximately 50% Muslim (mostly in the north), 48% Christian (mostly in the south), and 2% following traditional African religions or other faiths."
    },
    {
      question: "What is the best time to visit Nigeria?",
      answer: "The best time to visit is during the dry season from November to March when the weather is cooler and more comfortable for outdoor activities. The rainy season (April-October) brings lush greenery but can make travel challenging."
    },
    {
      question: "Is Nigeria safe for tourists?",
      answer: "While Nigeria has made significant progress in security, some areas require caution. Major cities like Lagos, Abuja, and Port Harcourt are generally safe for tourists who take standard precautions. Always check travel advisories and consider guided tours."
    },
    {
      question: "What traditional foods should I try?",
      answer: "Must-try Nigerian foods include Jollof Rice, Egusi Soup, Pepper Soup, Suya (grilled meat), Pounded Yam with Egusi, and various stews. Don't miss trying local fruits like mangoes, pineapples, and plantains."
    },
    {
      question: "How do Nigerians greet each other?",
      answer: "Greetings are important in Nigerian culture. Common greetings include 'Kedu' (Igbo), 'Sannu' (Hausa), 'E kaaro' (Yoruba), or simply 'Hello'. Handshakes are common, and it's polite to ask about family and well-being."
    },
    {
      question: "What is the education system like in Nigeria?",
      answer: "Nigeria has a 6-3-3-4 system: 6 years primary, 3 years junior secondary, 3 years senior secondary, and 4 years university. There are both public and private institutions, with universities like University of Lagos and University of Ibadan being highly regarded."
    },
    {
      question: "What sports are popular in Nigeria?",
      answer: "Football (soccer) is the most popular sport, with Nigeria having won the African Cup of Nations multiple times. Other popular sports include basketball, athletics, and traditional sports like wrestling and boxing."
    },
    {
      question: "How does the Nigerian economy work?",
      answer: "Nigeria has Africa's largest economy, heavily reliant on oil and gas exports. However, there's growing emphasis on agriculture, technology, entertainment (Nollywood), and services. The economy is diverse with significant informal sector activity."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-green-800 mb-12 text-center">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-700 mb-12 text-center">
            Everything you need to know about Nigeria's culture, history, travel, and more.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-green-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-green-800">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="text-green-600" size={24} />
                  ) : (
                    <ChevronDown className="text-green-600" size={24} />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Still have questions?</h2>
            <p className="text-gray-700 mb-6">
              Can't find what you're looking for? Our AI assistant is here to help with any questions about Nigeria.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Ask Our AI Assistant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;