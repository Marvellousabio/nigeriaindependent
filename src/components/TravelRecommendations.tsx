"use client";
import React, { useState } from 'react';
import { MapPin, Calendar, Users, Star } from 'lucide-react';

const TravelRecommendations = () => {
  const [preferences, setPreferences] = useState({
    duration: '',
    interests: [],
    budget: '',
    groupSize: ''
  });
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/travel-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-16 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
          AI-Powered Travel Recommendations
        </h2>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Trip Duration
              </label>
              <select
                value={preferences.duration}
                onChange={(e) => setPreferences({...preferences, duration: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="">Select duration</option>
                <option value="weekend">Weekend (2-3 days)</option>
                <option value="short">Short trip (4-7 days)</option>
                <option value="medium">Medium trip (1-2 weeks)</option>
                <option value="long">Long trip (2-4 weeks)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-2" />
                Group Size
              </label>
              <select
                value={preferences.groupSize}
                onChange={(e) => setPreferences({...preferences, groupSize: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="">Select group size</option>
                <option value="solo">Solo traveler</option>
                <option value="couple">Couple</option>
                <option value="family">Family</option>
                <option value="group">Group (3+ people)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                value={preferences.budget}
                onChange={(e) => setPreferences({...preferences, budget: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="">Select budget</option>
                <option value="budget">Budget (₦50k-150k)</option>
                <option value="moderate">Moderate (₦150k-500k)</option>
                <option value="luxury">Luxury (₦500k+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests
              </label>
              <div className="space-y-2">
                {['Culture', 'Adventure', 'Food', 'History', 'Nature', 'City Life'].map(interest => (
                  <label key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      value={interest}
                      onChange={(e) => {
                        const newInterests = e.target.checked
                          ? [...preferences.interests, interest]
                          : preferences.interests.filter(i => i !== interest);
                        setPreferences({...preferences, interests: newInterests});
                      }}
                      className="mr-2"
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Getting Recommendations...' : 'Get AI Recommendations'}
          </button>
        </form>

        {recommendations && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-6">Your Personalized Itinerary</h3>
            <div className="space-y-6">
              {recommendations.destinations?.map((dest, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">{dest.name}</h4>
                      <p className="text-gray-600">{dest.description}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="ml-1 text-gray-700">{dest.rating}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Highlights:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {dest.highlights?.map((highlight, i) => (
                          <li key={i}>• {highlight}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Best Time to Visit:</h5>
                      <p className="text-sm text-gray-600">{dest.bestTime}</p>

                      <h5 className="font-medium text-gray-800 mb-2 mt-4">Estimated Cost:</h5>
                      <p className="text-sm text-gray-600">{dest.cost}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelRecommendations;