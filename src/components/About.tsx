import React from 'react'

const About = () => {
  return (
    <section className="px-4 md:px-10 py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 mb-6">About Nigeria</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p className="text-lg">
            Nigeria, officially the Federal Republic of Nigeria, is a country in West Africa 
            and the most populous country on the African continent. With over 200 million people 
            and more than 250 ethnic groups, Nigeria is a melting pot of cultures, languages, and traditions.
          </p>
          <p className="text-lg">
            From the ancient Nok civilization to the powerful kingdoms of Benin, Oyo, and Kanem-Bornu, 
            Nigeria&aposs history spans millennia. Our nation gained independence on October 1, 1960, 
            and has since grown into Africa&aposs largest economy and a beacon of hope and resilience.
          </p>
        </div>
      </div>
    </section>
 
  )
}

export default About