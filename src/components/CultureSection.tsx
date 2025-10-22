"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Music, ChefHat, Users, Sparkles } from 'lucide-react';

const CultureSection = () => {
  const [culturalFacts, setCulturalFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateCulturalContent();
  }, []);

  const generateCulturalContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cultural-content');
      if (response.ok) {
        const data = await response.json();
        setCulturalFacts(data.facts || []);
      }
    } catch (error) {
      console.error('Failed to generate cultural content:', error);
      // Fallback content
      setCulturalFacts([
        {
          title: "The Power of 'Ubuntu'",
          content: "Ubuntu philosophy emphasizes community and humanity. 'I am because we are' reflects the interconnectedness of Nigerian society.",
          category: "Philosophy"
        },
        {
          title: "Nollywood Magic",
          content: "Nigeria's film industry, Nollywood, is the second-largest in the world, producing over 2,000 films annually in multiple languages.",
          category: "Entertainment"
        },
        {
          title: "Afrobeats Revolution",
          content: "Afrobeats has become a global phenomenon, blending traditional African rhythms with contemporary sounds, influencing artists worldwide.",
          category: "Music"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const culturalHighlights = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Family & Community",
      description: "Strong emphasis on family ties and community support systems that form the backbone of Nigerian society."
    },
    {
      icon: <Music className="w-8 h-8 text-purple-500" />,
      title: "Rhythm & Music",
      description: "Diverse musical traditions from Highlife to Afrobeats, with music playing a central role in celebrations and ceremonies."
    },
    {
      icon: <ChefHat className="w-8 h-8 text-orange-500" />,
      title: "Culinary Heritage",
      description: "Rich culinary traditions featuring diverse regional cuisines, from Jollof Rice to traditional soups and stews."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Ethnic Diversity",
      description: "Over 250 ethnic groups, each with unique languages, traditions, and cultural practices that enrich the national tapestry."
    }
  ];

  return (
    <section className="px-6 md:px-16 py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Nigerian Culture & Heritage
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the rich tapestry of Nigerian culture, from ancient traditions to modern innovations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {culturalHighlights.map((highlight, index) => (
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
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-green-800">
              Cultural Insights
            </h3>
            <button
              onClick={generateCulturalContent}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Sparkles className="mr-2" size={16} />
              {loading ? 'Generating...' : 'Refresh Insights'}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Generating cultural insights...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {culturalFacts.map((fact, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {fact.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    {fact.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {fact.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-6">
              Traditional Festivals
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Durbar Festival",
                  region: "Northern Nigeria",
                  description: "Spectacular horse parades and cultural displays showcasing traditional horsemanship."
                },
                {
                  name: "Eyo Festival",
                  region: "Lagos",
                  description: "Ancient masked festival honoring the dead, featuring elaborate costumes and processions."
                },
                {
                  name: "Argungu Fishing Festival",
                  region: "Kebbi State",
                  description: "Annual fishing competition and cultural celebration along the Niger River."
                }
              ].map((festival, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-800">{festival.name}</h4>
                  <p className="text-sm text-green-600 mb-1">{festival.region}</p>
                  <p className="text-gray-600 text-sm">{festival.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-6">
              Art & Craftsmanship
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Bronze Casting",
                  origin: "Benin Kingdom",
                  description: "Ancient lost-wax technique producing intricate bronze sculptures and artworks."
                },
                {
                  name: "Tie-Dye (Adire)",
                  origin: "Yoruba Tradition",
                  description: "Colorful fabric dyeing technique using traditional patterns and natural dyes."
                },
                {
                  name: "Beadwork",
                  origin: "Various Regions",
                  description: "Intricate beadwork used in jewelry, clothing, and traditional regalia."
                }
              ].map((art, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-800">{art.name}</h4>
                  <p className="text-sm text-blue-600 mb-1">{art.origin}</p>
                  <p className="text-gray-600 text-sm">{art.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;