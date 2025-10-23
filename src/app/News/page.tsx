import NewsAggregator from '@/components/NewsAggregator'
import Header from '@/components/Header'
import React from 'react'
import Footer from '@/components/Footer'

const pages = () => {
  return (
    <div>
      <Header />
        <NewsAggregator />
        <Footer/>
    </div>
  )
}

export default pages