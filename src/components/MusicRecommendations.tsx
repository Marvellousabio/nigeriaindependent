"use client";
import React, { useState } from 'react';
import { Music, Play, Heart, Share2 } from 'lucide-react';
import { MusicRecommendation } from '../types';

const MusicRecommendations = () => {
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [recommendations, setRecommendations] = useState<MusicRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const moods = [
    'Energetic', 'Romantic', 'Cultural', 'Party', 'Relaxing',
    'Traditional', 'Modern', 'Inspirational', 'Dance', 'Chill'
  ];

  const genres = [
    'Afrobeats', 'Highlife', 'Juju', 'Fuji', 'Hip-Hop',
    'R&B', 'Gospel', 'Traditional', 'Pop', 'Reggae'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/music-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, genre })
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
      }
    } catch (error) {
      console.error('Music recommendations error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-16 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
          AI Music Recommendations
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Discover Nigerian music that matches your mood and taste
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Music className="inline w-4 h-4 mr-2" />
                Your Mood
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                required
                aria-label="Select your mood"
              >
                <option value="">Select your mood</option>
                {moods.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre Preference
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                required
                aria-label="Select genre preference"
              >
                <option value="">Select genre</option>
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
          >
            <Music className="mr-2" size={20} />
            {loading ? 'Finding Music...' : 'Get Recommendations'}
          </button>
        </form>

        {recommendations && (
          <div className="space-y-6">
            {recommendations.songs?.map((song, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{song.title}</h3>
                    <p className="text-green-600 font-medium mb-2">{song.artist}</p>
                    <p className="text-gray-600 text-sm mb-3">{song.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Music className="w-4 h-4 mr-1" />
                        {song.genre}
                      </span>
                      <span>{song.duration}</span>
                      <span>⭐ {song.rating}/5</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" aria-label="Like song">
                      <Heart size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors" aria-label="Share song">
                      <Share2 size={20} />
                    </button>
                    <button className="p-2 text-green-600 hover:text-green-700 transition-colors" aria-label="Play song">
                      <Play size={20} />
                    </button>
                  </div>
                </div>

                {song.lyrics && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Sample Lyrics:</h4>
                    <p className="text-gray-700 text-sm italic">&quot;{song.lyrics}&quot;</p>
                  </div>
                )}

                {song.culturalContext && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Cultural Context:</h4>
                    <p className="text-green-700 text-sm">{song.culturalContext}</p>
                  </div>
                )}
              </div>
            ))}

            {recommendations.playlist && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Complete Playlist</h3>
                <p className="text-gray-600 mb-4">{recommendations.playlist.description}</p>

                <div className="space-y-3">
                  {recommendations.playlist.songs?.map((song, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-800">{song.title}</p>
                          <p className="text-sm text-gray-600">{song.artist}</p>
                        </div>
                      </div>
                      <button className="p-2 text-green-600 hover:text-green-700" aria-label="Play song">
                        <Play size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Nigerian Artists</h3>
            <div className="space-y-3">
              {[
                { name: 'Burna Boy', genre: 'Afrobeats' },
                { name: 'Wizkid', genre: 'Afrobeats' },
                { name: 'Davido', genre: 'Afrobeats' },
                { name: 'Olamide', genre: 'Hip-Hop' },
                { name: 'Tiwa Savage', genre: 'R&B' }
              ].map((artist, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-800">{artist.name}</span>
                  <span className="text-sm text-gray-500">{artist.genre}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Music Genres Explained</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-gray-800">Afrobeats:</strong>
                <span className="text-gray-600 ml-2">Modern fusion of African rhythms with global pop</span>
              </div>
              <div>
                <strong className="text-gray-800">Highlife:</strong>
                <span className="text-gray-600 ml-2">Upbeat dance music from Ghana/Nigeria</span>
              </div>
              <div>
                <strong className="text-gray-800">Juju:</strong>
                <span className="text-gray-600 ml-2">Guitar-based music with Yoruba influences</span>
              </div>
              <div>
                <strong className="text-gray-800">Fuji:</strong>
                <span className="text-gray-600 ml-2">Islamic-influenced music with talking drum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicRecommendations;