import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import CultureSection from '@/components/CultureSection'
import TravelSection from '@/components/TravelSection'
import HistorySection from '@/components/HistorySection'
import TravelRecommendations from '@/components/TravelRecommendations'
import LanguageTranslator from '@/components/LanguageTranslator'
import ImageGenerator from '@/components/ImageGenerator'
import RecipeGenerator from '@/components/RecipeGenerator'
import VirtualTours from '@/components/VirtualTours'
import CulturalQuiz from '@/components/CulturalQuiz'
import MusicRecommendations from '@/components/MusicRecommendations'
import NewsAggregator from '@/components/NewsAggregator'
import Info from '@/components/Info'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'



const page = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <CultureSection />
      <TravelSection />
      <HistorySection />
      <TravelRecommendations />
      <LanguageTranslator />
      <ImageGenerator />
      <RecipeGenerator />
      <VirtualTours />
      <CulturalQuiz />
      <MusicRecommendations />
      <NewsAggregator />
      <Info />
      <ChatBot/>
      <Footer />
    </div>
  )
}

export default page