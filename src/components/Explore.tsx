"use client";
import React, { useState } from 'react';
import LanguageTranslator from './LanguageTranslator';
import ImageGenerator from './ImageGenerator';
import RecipeGenerator from './RecipeGenerator';
import MusicRecommendations from './MusicRecommendations';
import TravelRecommendations from './TravelRecommendations';
import { AnvilIcon,  EarthIcon, TargetIcon } from 'lucide-react';

const Explore = () => {
  const [activeTab, setActiveTab] = useState('translator');

  const tabs = [
    { id: 'translator', label: 'Language Translator', component: LanguageTranslator },
    { id: 'images', label: 'AI Image Generator', component: ImageGenerator },
    { id: 'recipes', label: 'Recipe Generator', component: RecipeGenerator },
    { id: 'music', label: 'Music Recommendations', component: MusicRecommendations },
    { id: 'travel', label: 'Travel Recommendations', component: TravelRecommendations }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || LanguageTranslator;

  return (
    <section className="px-4 md:px-10 py-16 bg-gray-50" id='AI'>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Explore Nigeria with AI
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover Nigeria&apos;s rich culture, cuisine, music, and more through our AI-powered tools.
            From language translation to personalized recommendations, explore what makes Nigeria extraordinary.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center  rounded-lg shadow-lg p-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 mx-1 rounded-lg font-medium transition-colors text-sm md:text-base ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className=" rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <ActiveComponent />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl"><EarthIcon /></span>
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">Cultural Preservation</h3>
            <p className="text-gray-600 text-sm">
              Our AI tools help preserve and share Nigeria's diverse cultural heritage with the world.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl"><AnvilIcon /></span>
            </div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">AI-Powered Insights</h3>
            <p className="text-gray-600 text-sm">
              Get personalized recommendations and translations powered by advanced AI technology.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl"><TargetIcon /></span>
            </div>
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Accurate & Reliable</h3>
            <p className="text-gray-600 text-sm">
              All AI-generated content is carefully curated to ensure cultural accuracy and relevance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;