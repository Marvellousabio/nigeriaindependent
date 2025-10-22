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
      },
      {
        q: "Is Nigeria safe for tourists?",
        a: "While Nigeria has areas that are very safe for tourists, it's important to research your destinations, use registered transportation, and follow local advisories. Many visitors enjoy safe experiences in tourist areas."
      },
      {
        q: "What should I know about Nigerian currency?",
        a: "The Nigerian Naira (₦) is the official currency. ATMs are available but carry some cash. Credit cards are accepted in major hotels and restaurants, but cash is preferred in markets."
      },
      {
        q: "What are the best times to visit Nigeria?",
        a: "The dry season (November-April) is generally the best time to visit, with cooler temperatures and less rainfall. The wet season (May-October) brings heavy rains but also lush landscapes."
      },
      {
        q: "What traditional foods should foreigners try?",
        a: "Must-try Nigerian foods include Jollof Rice, Egusi Soup, Suya (grilled meat), Pounded Yam with Egusi, and various stews. Street food culture is vibrant and delicious."
      },
      {
        q: "How do Nigerians greet each other?",
        a: "Greetings are important in Nigerian culture. Common greetings include 'Hello,' 'Good morning/afternoon/evening,' and 'How are you?' Handshakes are common, and in some cultures, special greetings are used."
      },
      {
        q: "What are the major ethnic groups in Nigeria?",
        a: "The three largest ethnic groups are the Hausa-Fulani (northern Nigeria), Yoruba (southwestern), and Igbo (southeastern). There are also many other ethnic groups with rich traditions."
      },
      {
        q: "What is the business culture like in Nigeria?",
        a: "Business relationships are built on trust and personal connections. Meetings may start with social conversation. Punctuality is valued, and business cards are exchanged with both hands."
      },
      {
        q: "Are there any cultural taboos foreigners should know?",
        a: "Avoid discussing politics or religion unless you know your host well. Eating with your left hand is considered disrespectful. Always ask before taking photos of people or sacred sites."
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