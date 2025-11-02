"use client";

import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Government from '@/components/Government'
import Explore from '@/components/Explore'
import VirtualTours from '@/components/VirtualTours'
import CulturalQuiz from '@/components/CulturalQuiz'
import Info from '@/components/Info'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'



const page = () => {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">
      <Header />
      <Hero />
      <Government />
      <Explore />
      <VirtualTours />
      <CulturalQuiz />
      <Info />
      <div id="chat-section">
        <ChatBot/>
      </div>
      <Footer />
    </div>
  )
}

export default page