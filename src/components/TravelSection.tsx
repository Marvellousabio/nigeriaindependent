"use client";
import React from 'react';
import { Plane, MapPin, Camera, Utensils, Music, Heart } from 'lucide-react';

const TravelSection = () => {
  const travelHighlights = [
    {
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      title: "Diverse Landscapes",
      description: "From savannas and rainforests to beaches and mountains, Nigeria offers incredible geographical diversity."
    },
    {
      icon: <Camera className="w-8 h-8 text-purple-500" />,
      title: "Cultural Heritage",
      description: "Explore ancient kingdoms, UNESCO sites, and vibrant cultural festivals across the nation."
    },
    {
      icon: <Utensils className="w-8 h-8 text-orange-500" />,
      title: "Culinary Journey",
      description: "Experience world-class cuisine from street food to fine dining, featuring diverse regional specialties."
    },
    {
      icon: <Music className="w-8 h-8 text-pink-500" />,
      title: "Music & Arts",
      description: "Immerse yourself in Nigeria's musical heritage and contemporary arts scene."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Warm Hospitality",
      description: "Experience the legendary Nigerian hospitality and connect with welcoming local communities."
    },
    {
      icon: <Plane className="w-8 h-8 text-green-500" />,
      title: "Modern Amenities",
      description: "World-class hotels, transportation, and infrastructure make travel comfortable and convenient."
    }
  ];

  const destinations = [
    {
      name: "Lagos",
      description: "Nigeria's economic capital and cultural melting pot",
      highlights: ["Victoria Island", "Lekki Conservation Centre", "National Museum", "Markets"],
      image: "lagos-skyline"
    },
    {
      name: "Abuja",
      description: "The Federal Capital Territory with planned architecture",
      highlights: ["Aso Rock", "National Mosque", "Millennium Park", "Museums"],
      image: "abuja-monuments"
    },
    {
      name: "Calabar",
      description: "The People's Paradise with beautiful beaches and festivals",
      highlights: ["Marina Resort", "Tinapa", "Slave History Museum", "Carnival"],
      image: "calabar-beach"
    },
    {
      name: "Kano",
      description: "Ancient city of trade and Islamic scholarship",
      highlights: ["Kano Central Mosque", "Kano City Walls", "Dala Hill", "Markets"],
      image: "kano-mosque"
    }
  ];

  const travelTips = [
    {
      category: "Best Time to Visit",
      tips: [
        "Dry season (November-April) for outdoor activities",
        "Harmattan period (December-February) for cooler weather",
        "Wet season (May-October) for lush landscapes"
      ]
    },
    {
      category: "Cultural Etiquette",
      tips: [
        "Greetings are important - learn basic phrases",
        "Dress modestly when visiting religious sites",
        "Remove shoes when entering homes or mosques",
        "Use right hand for eating and giving/receiving"
      ]
    },
    {
      category: "Safety & Health",
      tips: [
        "Stay hydrated and use sunscreen",
        "Use registered transportation services",
        "Keep valuables secure in urban areas",
        "Get necessary vaccinations before travel"
      ]
    }
  ];

  return (
    <section className="px-6 md:px-16 py-16 bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Discover Nigeria
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience Africa&apos;s most populous nation - a land of incredible diversity, rich culture, and warm hospitality
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {travelHighlights.map((highlight, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                {highlight.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {highlight.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Must-Visit Destinations
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {destinations.map((dest, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{dest.name}</h4>
                <p className="text-gray-600 mb-4">{dest.description}</p>
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Highlights:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {dest.highlights.map((highlight, i) => (
                      <li key={i}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {travelTips.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.tips.map((tip, i) => (
                  <li key={i} className="text-gray-600 text-sm flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Explore Nigeria?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Get personalized travel recommendations, connect with local guides, and start planning your Nigerian adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 font-medium">
              Get Travel Recommendations
            </button>
            <button className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 font-medium">
              Connect with Local Guides
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelSection;