"use client";
import React, { useState } from 'react';
import { Languages, ArrowRightLeft } from 'lucide-react';

const LanguageTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ha');
  const [loading, setLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ha', name: 'Hausa' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'ig', name: 'Igbo' },
    { code: 'fr', name: 'French' },
    { code: 'ar', name: 'Arabic' },
    { code: 'es', name: 'Spanish' },
    { code: 'pt', name: 'Portuguese' }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          sourceLang,
          targetLang
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTranslatedText(data.translation);
      }
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  return (
    <section className="px-6 md:px-16 py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
          Cultural Language Translator
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Translate between English and Nigerian languages to better understand cultural content
        </p>

        <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                rows={4}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={swapLanguages}
                className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                title="Swap languages"
              >
                <ArrowRightLeft size={20} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <textarea
                value={translatedText}
                readOnly
                placeholder="Translation will appear here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none bg-white"
                rows={4}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleTranslate}
              disabled={loading || !inputText.trim()}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              <Languages className="mr-2" size={20} />
              {loading ? 'Translating...' : 'Translate'}
            </button>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="text-center">
              <h4 className="font-medium mb-2">Popular Phrases</h4>
              <ul className="space-y-1">
                <li>"Good morning" → "Ina kwana" (Hausa)</li>
                <li>"Thank you" → "E se" (Yoruba)</li>
                <li>"Welcome" → "Nnọọ" (Igbo)</li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="font-medium mb-2">Cultural Terms</h4>
              <ul className="space-y-1">
                <li>"Jollof Rice" → "Jolof" (Pidgin)</li>
                <li>"Egusi Soup" → "Ofe Egusi"</li>
                <li>"Suya" → "Tsire" (Hausa)</li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="font-medium mb-2">Greetings</h4>
              <ul className="space-y-1">
                <li>"How are you?" → "Kana yaya?" (Hausa)</li>
                <li>"I'm fine" → "Mo wa dada" (Yoruba)</li>
                <li>"Peace" → "Udo" (Igbo)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageTranslator;