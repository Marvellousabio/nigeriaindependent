"use client"
import React, { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { AboutContent } from '../types'


const About = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateAboutContent();
  }, []);

  const generateAboutContent = async () => {
    try {
      const response = await fetch('/api/about-content');
      if (response.ok) {
        const data = await response.json();
        setAboutContent(data);
      }
    } catch (error) {
      console.error('Failed to generate about content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 md:px-10 py-16 bg-white">
      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold text-green-800">
            {loading ? "About Nigeria" : (aboutContent?.title || "About Nigeria")}
          </h2>
          <button
            onClick={generateAboutContent}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Sparkles className="mr-2" size={16} />
            {loading ? 'Generating...' : 'Refresh Content'}
          </button>
        </div>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {loading ? (
            <>
              <p className="text-lg">
                Nigeria, officially the Federal Republic of Nigeria, is a country in West Africa
                and the most populous country on the African continent. With over 200 million people
                and more than 250 ethnic groups, Nigeria is a melting pot of cultures, languages, and traditions.
              </p>
              <p className="text-lg">
                From the ancient Nok civilization to the powerful kingdoms of Benin, Oyo, and Kanem-Bornu,
                Nigeria&apos;s history spans millennia. Our nation gained independence on October 1, 1960,
                and has since grown into Africa&apos;s largest economy and a beacon of hope and resilience.
              </p>
            </>
          ) : (
            aboutContent?.paragraphs?.map((paragraph: string, index: number) => (
              <p key={index} className="text-lg">{paragraph}</p>
            )) || (
              <>
                <p className="text-lg">
                  Nigeria, officially the Federal Republic of Nigeria, is a country in West Africa
                  and the most populous country on the African continent. With over 200 million people
                  and more than 250 ethnic groups, Nigeria is a melting pot of cultures, languages, and traditions.
                </p>
                <p className="text-lg">
                  From the ancient Nok civilization to the powerful kingdoms of Benin, Oyo, and Kanem-Bornu,
                  Nigeria&apos;s history spans millennia. Our nation gained independence on October 1, 1960,
                  and has since grown into Africa&apos;s largest economy and a beacon of hope and resilience.
                </p>
              </>
            )
          )}
        </div>
      </div>
    </section>
    
 
  )
}

export default About