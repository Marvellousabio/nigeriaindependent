"use client";
import React, { useState, useEffect } from 'react';
import { Newspaper, Clock, ExternalLink, RefreshCw } from 'lucide-react';

const NewsAggregator = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(null);

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'politics', label: 'Politics' },
    { value: 'economy', label: 'Economy' },
    { value: 'culture', label: 'Culture' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' }
  ];

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news?category=${category}`);
      if (response.ok) {
        const data = await response.json();
        setNews(data.articles || []);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('News fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const articleDate = new Date(dateString);
    const diffInHours = Math.floor((now - articleDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <section className="px-6 md:px-16 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 mt-5">
          <div>
            <h2 className="text-4xl font-bold text-green-800 mb-2">
              Nigeria News & Updates
            </h2>
            <p className="text-gray-600">Stay informed about the latest happenings in Nigeria</p>
          </div>

          <button
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <RefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} size={16} />
            Refresh
          </button>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  category === cat.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {lastUpdated && (
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Clock size={16} className="mr-2" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading latest news...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <article key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {article.image && (
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {article.category || 'General'}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {formatTimeAgo(article.publishedAt)}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.description || article.content?.substring(0, 150) + '...'}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {article.source?.name || 'Nigeria News'}
                    </span>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Read more
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No news available</h3>
            <p className="text-gray-500">Check back later for updates</p>
          </div>
        )}

        <div className="mt-12 bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">News Sources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-800">Major Newspapers</h4>
              <ul className="text-gray-600 mt-2 space-y-1">
                <li>• The Guardian Nigeria</li>
                <li>• Vanguard</li>
                <li>• Punch</li>
                <li>• Daily Trust</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-800">Online News</h4>
              <ul className="text-gray-600 mt-2 space-y-1">
                <li>• Premium Times</li>
                <li>• Sahara Reporters</li>
                <li>• The Cable</li>
                <li>• TechCabal</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-800">Business News</h4>
              <ul className="text-gray-600 mt-2 space-y-1">
                <li>• Business Day</li>
                <li>• This Day</li>
                <li>• The Nation</li>
                <li>• Leadership</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-800">International</h4>
              <ul className="text-gray-600 mt-2 space-y-1">
                <li>• BBC News (Africa)</li>
                <li>• Al Jazeera</li>
                <li>• Reuters Nigeria</li>
                <li>• AP News</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsAggregator;