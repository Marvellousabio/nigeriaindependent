"use client";
import React, { useState } from 'react';
import { ChefHat, Clock, Users, Star } from 'lucide-react';

const RecipeGenerator = () => {
  const [preferences, setPreferences] = useState({
    cuisine: '',
    dietary: [],
    difficulty: '',
    time: ''
  });
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const cuisines = [
    'Yoruba', 'Hausa', 'Igbo', 'Nigerian Fusion',
    'Northern Nigerian', 'Southern Nigerian', 'Eastern Nigerian', 'Western Nigerian'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free', 'Dairy-Free'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      });

      if (response.ok) {
        const data = await response.json();
        setRecipe(data);
      }
    } catch (error) {
      console.error('Recipe generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-16 py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
          AI Nigerian Recipe Generator
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Discover authentic Nigerian recipes tailored to your preferences
        </p>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ChefHat className="inline w-4 h-4 mr-2" />
                Cuisine Type
              </label>
              <select
                value={preferences.cuisine}
                onChange={(e) => setPreferences({...preferences, cuisine: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="">Select cuisine</option>
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-2" />
                Cooking Time
              </label>
              <select
                value={preferences.time}
                onChange={(e) => setPreferences({...preferences, time: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="">Select time</option>
                <option value="quick">Quick (15-30 mins)</option>
                <option value="medium">Medium (30-60 mins)</option>
                <option value="slow">Slow cooking (1-2 hours)</option>
                <option value="traditional">Traditional (2+ hours)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={preferences.difficulty}
                onChange={(e) => setPreferences({...preferences, difficulty: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Preferences
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {dietaryOptions.map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option}
                      onChange={(e) => {
                        const newDietary = e.target.checked
                          ? [...preferences.dietary, option]
                          : preferences.dietary.filter(d => d !== option);
                        setPreferences({...preferences, dietary: newDietary});
                      }}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
          >
            <ChefHat className="mr-2" size={20} />
            {loading ? 'Generating Recipe...' : 'Generate Recipe'}
          </button>
        </form>

        {recipe && (
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-green-800 mb-2">{recipe.title}</h3>
                <p className="text-gray-600 italic">{recipe.description}</p>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="ml-1 text-gray-700">{recipe.rating}/5</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm">{recipe.cookingTime}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm">Serves {recipe.servings}</span>
              </div>
              <div className="flex items-center">
                <ChefHat className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm">{recipe.difficulty}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h4>
                <ul className="space-y-2">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h4>
                <ol className="space-y-3">
                  {recipe.instructions?.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {recipe.culturalNotes && (
              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <h4 className="text-lg font-semibold text-green-800 mb-2">Cultural Notes</h4>
                <p className="text-gray-700">{recipe.culturalNotes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipeGenerator;