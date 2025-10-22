"use client";
import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Crown, BookOpen, Sparkles } from 'lucide-react';

const HistorySection = () => {
  const [historicalFacts, setHistoricalFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateHistoricalContent();
  }, []);

  const generateHistoricalContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/historical-content');
      if (response.ok) {
        const data = await response.json();
        setHistoricalFacts(data.events || []);
      }
    } catch (error) {
      console.error('Failed to generate historical content:', error);
      // Fallback content
      setHistoricalFacts([
        {
          year: "1960",
          title: "Independence from Britain",
          description: "Nigeria gained independence on October 1, 1960, becoming Africa's most populous nation.",
          significance: "Marked the beginning of self-governance and nation-building."
        },
        {
          year: "1967-1970",
          title: "Nigerian Civil War",
          description: "Also known as the Biafran War, this conflict tested the nation's unity and resilience.",
          significance: "Demonstrated Nigeria's commitment to national unity despite regional differences."
        },
        {
          year: "1999",
          title: "Return to Democracy",
          description: "Nigeria transitioned back to civilian rule after years of military governance.",
          significance: "Established the foundation for modern democratic governance."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const timelineEvents = [
    {
      period: "Ancient Era",
      title: "Kingdoms & Empires",
      description: "From the Nok civilization (500 BC) to powerful kingdoms like Benin, Oyo, and Kanem-Bornu that shaped West African history.",
      icon: <Crown className="w-6 h-6 text-yellow-500" />
    },
    {
      period: "15th-19th Century",
      title: "Trans-Saharan Trade",
      description: "Nigeria became a major hub for trade routes connecting North Africa with the Atlantic world.",
      icon: <MapPin className="w-6 h-6 text-blue-500" />
    },
    {
      period: "20th Century",
      title: "Colonial Period",
      description: "British colonization from 1900-1960, leading to the amalgamation of Northern and Southern protectorates.",
      icon: <BookOpen className="w-6 h-6 text-red-500" />
    },
    {
      period: "Modern Era",
      title: "Independent Nation",
      description: "Post-independence development, challenges, and emergence as Africa's largest economy and most populous nation.",
      icon: <Clock className="w-6 h-6 text-green-500" />
    }
  ];

  return (
    <section className="px-6 md:px-16 py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            Nigeria's Rich History
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the fascinating journey of Nigeria from ancient civilizations to modern nationhood
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {timelineEvents.map((event, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                {event.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {event.period}
              </h3>
              <h4 className="text-md font-medium text-blue-600 mb-3">
                {event.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {event.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-blue-800">
              Historical Milestones
            </h3>
            <button
              onClick={generateHistoricalContent}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Sparkles className="mr-2" size={16} />
              {loading ? 'Generating...' : 'Refresh Timeline'}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Generating historical insights...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {historicalFacts.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {event.year}
                    </div>
                  </div>
                  <div className="flex-1 border-l-2 border-blue-200 pl-6 pb-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      {event.title}
                    </h4>
                    <p className="text-gray-600 mb-3">
                      {event.description}
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Significance:</strong> {event.significance}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-6">
              Key Historical Figures
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Herbert Macaulay",
                  title: "Nationalist Leader",
                  contribution: "Pioneered Nigerian nationalism and anti-colonial activism in the early 20th century."
                },
                {
                  name: "Nnamdi Azikiwe",
                  title: "First President",
                  contribution: "Led Nigeria to independence and served as the first President of the Federal Republic."
                },
                {
                  name: "Obafemi Awolowo",
                  title: "Premier of Western Region",
                  contribution: "Architect of modern Nigeria's educational and economic policies."
                },
                {
                  name: "Chukwuemeka Odumegwu Ojukwu",
                  title: "Biafran Leader",
                  contribution: "Military governor whose actions led to the Nigerian Civil War and its eventual resolution."
                }
              ].map((figure, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-800">{figure.name}</h4>
                  <p className="text-sm text-blue-600 mb-1">{figure.title}</p>
                  <p className="text-gray-600 text-sm">{figure.contribution}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-6">
              Archaeological Wonders
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Nok Civilization",
                  location: "Northern Nigeria",
                  description: "Ancient civilization known for sophisticated terracotta sculptures dating back to 500 BC."
                },
                {
                  name: "Benin Bronzes",
                  location: "Edo State",
                  description: "Masterpieces of bronze casting that represent one of Africa's greatest artistic achievements."
                },
                {
                  name: "Igbo-Ukwu Artifacts",
                  location: "Anambra State",
                  description: "Bronze and copper works showing advanced metallurgical skills from the 9th century."
                },
                {
                  name: "Sungbo's Eredo",
                  location: "Ogun State",
                  description: "Massive earthwork construction, one of the largest in the world by volume."
                }
              ].map((site, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-800">{site.name}</h4>
                  <p className="text-sm text-purple-600 mb-1">{site.location}</p>
                  <p className="text-gray-600 text-sm">{site.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;