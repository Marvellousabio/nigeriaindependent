import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Info from '@/components/Info'
import Footer from '@/components/Footer'
import About from '@/components/About'



const page = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Info />
      <Footer />
    </div>
  )
}

export default page