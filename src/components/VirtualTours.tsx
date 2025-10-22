"use client";
import React, { useState } from 'react';
import { MapPin, Play, Pause, RotateCcw, Eye } from 'lucide-react';
import { VirtualTour } from '../types';

const VirtualTours = () => {
  const [selectedTour, setSelectedTour] = useState<VirtualTour | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const tours = [
    {
      id: 'benin-city',
      title: 'Benin City - Ancient Kingdom',
      description: 'Explore the ancient city of Benin with its rich history and bronze artworks',
      duration: '15 minutes',
      highlights: ['Benin City National Museum', 'Oba Palace', 'Bronze Castings', 'City Walls'],
      image: '/benin-kingdom.jpg',
      audioGuide: '/benin-tour-audio.mp3'
    },
    {
      id: 'lagos-island',
      title: 'Lagos Island - Colonial Heritage',
      description: 'Walk through the historic Lagos Island with its colonial architecture',
      duration: '12 minutes',
      highlights: ['Lagos Marina', 'Freedom Park', 'Central Mosque', 'Cathedral Church'],
      image: '/lagos-island.jpg',
      audioGuide: '/lagos-tour-audio.mp3'
    },
    {
      id: 'kano-market',
      title: 'Kano Ancient Market',
      description: 'Experience the vibrant trading culture of Northern Nigeria',
      duration: '18 minutes',
      highlights: ['Kano Central Market', 'Dala Hill', 'Emir\'s Palace', 'Ancient Walls'],
      image: '/kano-market.jpg',
      audioGuide: '/kano-tour-audio.mp3'
    },
    {
      id: 'oyo-empire',
      title: 'Oyo Empire Ruins',
      description: 'Discover the archaeological remains of the powerful Oyo Empire',
      duration: '20 minutes',
      highlights: ['Oyo Ile', 'Ancient Palaces', 'Sacred Groves', 'Traditional Compounds'],
      image: '/oyo-ruins.jpg',
      audioGuide: '/oyo-tour-audio.mp3'
    },
    {
      id: 'tinapa-resort',
      title: 'Tinapa Business Resort',
      description: 'Modern Nigerian architecture and business hub in Calabar',
      duration: '10 minutes',
      highlights: ['Business District', 'Cultural Village', 'Marina', 'Entertainment Complex'],
      image: '/tinapa-resort.jpg',
      audioGuide: '/tinapa-tour-audio.mp3'
    },
    {
      id: 'zuma-rock',
      title: 'Zuma Rock - Natural Wonder',
      description: 'Marvel at this iconic natural monument near Abuja',
      duration: '8 minutes',
      highlights: ['Rock Formation', 'Legendary Stories', 'Hiking Trails', 'Scenic Views'],
      image: '/zuma-rock.jpg',
      audioGuide: '/zuma-tour-audio.mp3'
    }
  ];

  const handleTourSelect = (tour: VirtualTour) => {
    setSelectedTour(tour);
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control audio playback
  };

  return (
    <section className="px-6 md:px-16 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
          Virtual Reality Tours of Nigerian Landmarks
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Experience Nigeria&apos;s rich heritage through immersive virtual tours
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleTourSelect(tour)}
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Eye size={48} className="mx-auto mb-2" />
                  <p className="text-sm">{tour.title}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{tour.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tour.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {tour.duration}
                  </span>
                  <span>{tour.highlights.length} highlights</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedTour && (
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-green-800 mb-2">{selectedTour.title}</h3>
                <p className="text-gray-600">{selectedTour.description}</p>
              </div>
              <button
                onClick={() => setSelectedTour(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center text-gray-500">
                    <Eye size={64} className="mx-auto mb-4" />
                    <p className="text-lg font-medium">360° Virtual Tour</p>
                    <p className="text-sm">Interactive VR experience coming soon</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <button
                    onClick={toggleAudio}
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {isPlaying ? <Pause size={20} className="mr-2" /> : <Play size={20} className="mr-2" />}
                    {isPlaying ? 'Pause Audio' : 'Play Audio Guide'}
                  </button>

                  <button className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <RotateCcw size={20} className="mr-2" />
                    Restart Tour
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Tour Highlights</h4>
                <div className="space-y-4">
                  {selectedTour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-4 mt-0.5">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">{highlight}</p>
                        <p className="text-gray-600 text-sm mt-1">
                          {index === 0 && "Begin your journey here"}
                          {index === 1 && "Explore the historical significance"}
                          {index === 2 && "Learn about cultural importance"}
                          {index === 3 && "Discover modern connections"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">Tour Information</h5>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Duration:</strong> {selectedTour.duration}</p>
                    <p><strong>Best Time to Visit:</strong> Dry season (November - March)</p>
                    <p><strong>Language:</strong> English audio guide available</p>
                    <p><strong>Accessibility:</strong> Wheelchair accessible paths</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 inline-block">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">Coming Soon: Full VR Experience</h4>
            <p className="text-blue-700">
              We&apos;re developing immersive 360° virtual reality tours. Sign up for updates to be the first to experience Nigeria&apos;s landmarks in VR!
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTours;