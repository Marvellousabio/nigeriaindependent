"use client";

import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import CultureSection from '@/components/CultureSection'
import TravelSection from '@/components/TravelSection'
import TravelRecommendations from '@/components/TravelRecommendations'
import LanguageTranslator from '@/components/LanguageTranslator'
import ImageGenerator from '@/components/ImageGenerator'
import RecipeGenerator from '@/components/RecipeGenerator'
import VirtualTours from '@/components/VirtualTours'
import CulturalQuiz from '@/components/CulturalQuiz'
import MusicRecommendations from '@/components/MusicRecommendations'
import Info from '@/components/Info'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'
import VisitorPopup from '@/components/VisitorPopup'



const page = () => {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">
      <Header />
      <Hero />
      <About />
      <CultureSection />
      <TravelSection />
      <TravelRecommendations />
      <LanguageTranslator />
      <ImageGenerator />
      <RecipeGenerator />
      <VirtualTours />
      <CulturalQuiz />
      <MusicRecommendations />
      <Info />
      <div id="chat-section">
        <ChatBot/>
      </div>
      <VisitorPopup />
      <Footer />
    </div>
  )
}

export default page