"use client";

import React from 'react';
import VirtualTours from '@/components/VirtualTours';
import Header from '@/components/Header';
import CultureSection from '@/components/CultureSection';
import Footer from '@/components/Footer';

const History = () => {
  const timeline = [
    { year: "500 BC - 200 AD", event: "Nok Civilization flourishes with advanced iron working and terracotta sculptures" },
    { year: "1000 AD", event: "Kanem-Bornu Empire established, becoming a major trading power" },
    { year: "1400s", event: "Benin Empire at its peak with sophisticated bronze casting and centralized governance" },
    { year: "1800s", event: "Colonial era begins with British influence expanding" },
    { year: "1960", event: "Independence from British colonial rule on October 1st" },
    { year: "1999", event: "Return to democratic governance after military rule" },
    { year: "2023", event: "Continued growth and cultural renaissance" },
  ];

  const touristAttractions = [
    { name: "Zuma Rock", location: "Niger State", description: "Massive rock formation resembling a human face, symbol of Abuja" },
    { name: "Olumo Rock", location: "Abeokuta", description: "Sacred hill with historical significance and climbing trails" },
    { name: "Benin City National Museum", location: "Benin City", description: "Showcases Benin Empire artifacts and history" },
    { name: "Yankari National Park", location: "Bauchi State", description: "Wildlife reserve with hot springs and diverse fauna" },
    { name: "Obudu Mountain Resort", location: "Cross River State", description: "Mountain resort with cable car and stunning views" },
  ];

  const culturalHighlights = [
    "Rich oral traditions and storytelling",
    "Diverse ethnic groups with unique languages and customs",
    "Traditional festivals like Durbar and Eyo",
    "Nollywood - the second-largest film industry globally",
    "Afrobeat music pioneered by Fela Kuti",
  ];

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">
      <Header />
      <CultureSection />
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-green-800 mb-12 md:mt-5 text-center">Nigeria&apos;s History & Heritage</h1>

          {/* Historical Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-green-800 mb-8">Historical Timeline</h2>
            <div className="space-y-6">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-white p-6 rounded-lg shadow-md">
                  <div className="min-w-[160px] text-green-700 font-bold text-lg">{item.year}</div>
                  <div className="text-gray-700 text-lg">{item.event}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tourist Attractions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-green-800 mb-8">Tourist Attractions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {touristAttractions.map((attraction, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">{attraction.name}</h3>
                  <p className="text-green-600 font-medium mb-2">{attraction.location}</p>
                  <p className="text-gray-700">{attraction.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Highlights */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-green-800 mb-8">Cultural Highlights</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <ul className="space-y-4">
                {culturalHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">•</span>
                    <span className="text-gray-700 text-lg">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-green-800 mb-8">Explore Nigeria</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">Interactive map coming soon. For now, explore our virtual tours below.</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4069570.1459999997!2d3.3792057!3d9.0764785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7da48d0d%3A0x5645c7e5c7e5c7e5!2sNigeria!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s"
                width="100%"
                height="400"
                className="border-0"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Nigeria Map"
              ></iframe>
            </div>
          </div>

          {/* Virtual Tours */}
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-8">Virtual Tours</h2>
            <VirtualTours />
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};
export default History