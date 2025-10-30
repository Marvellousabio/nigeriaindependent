"use client";
import React, { useState } from 'react';
import { ImageIcon, Download, RefreshCw } from 'lucide-react';
import Image from 'next/image';

interface UploadedImage {
  name: string;
  base64: string;
}

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const culturalPrompts = [
    "Traditional Nigerian wedding ceremony with colorful attire",
    "Nigerian market scene with local traders and fresh produce",
    "Ancient Benin bronze artwork and sculptures",
    "Nigerian family preparing traditional egusi soup",
    "Yoruba Gelede mask festival dancers",
    "Hausa Fulani cattle market in Northern Nigeria",
    "Igbo New Yam festival celebration",
    "Nigerian Nollywood movie set with actors",
    "Traditional Nigerian beadwork and jewelry",
    "Nigerian children playing traditional games"
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert uploaded image to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const base64String = reader.result.split(",")[1];
        setUploadedImage({ name: file.name, base64: base64String });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, 
          base64Image: uploadedImage ? uploadedImage.base64 : null,
         })
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedImage(data.imageUrl);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to generate image');
      }
    } catch (err) {
      console.error('Image generation error:', err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nigeria-cultural-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  return (
    <section className="px-6 md:px-16 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
          AI Cultural Image Generator
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Generate beautiful visualizations of Nigerian culture, traditions, and landmarks
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload an image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none p-2"
              aria-label="Upload an image for AI generation"
            />
            {uploadedImage && (
              <p className="text-sm text-green-700 mt-2">
                Image loaded: {uploadedImage.name}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe what you want to visualize
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Traditional Nigerian wedding ceremony with colorful attire and dancers..."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Quick Inspiration:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {culturalPrompts.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-green-300 transition-colors text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              <ImageIcon className="mr-2" size={20} />
              {loading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {generatedImage && (
            <div className="text-center">
              <div className="mb-4">
                <Image
                  src={generatedImage}
                  alt="Generated cultural visualization"
                  width={512}
                  height={512}
                  className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  <Download className="mr-2" size={16} />
                  Download
                </button>

                <button
                  onClick={() => {
                    const shareData = {
                      title: 'AI Generated Nigerian Cultural Image',
                      text: 'Check out this beautiful AI-generated image of Nigerian culture!',
                      url: window.location.href
                    };
                    if (navigator.share) {
                      navigator.share(shareData);
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
                >
                  Share
                </button>

                <button
                  onClick={() => setGeneratedImage(null)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center"
                >
                  <RefreshCw className="mr-2" size={16} />
                  Generate New
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Images are generated using AI and may not be 100% accurate representations.</p>
          <p>Use them for educational and inspirational purposes.</p>
        </div>
      </div>
    </section>
  );
};

export default ImageGenerator;