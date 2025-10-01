"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Hero = () => {
    const independenceDate = new Date("1660-10-01T00:00:00Z");
    const [age,setAge]= useState(" ");
    useEffect(()=>{
        const interval=setInterval(()=>{
            const now= new Date();
            const diff = now.getTime()- independenceDate.getTime();

            const years =Math.floor(diff/(1000 * 60 * 60 *24 *365));
            const days= Math.floor ((diff/(1000*60*60*24))% 365);
            const hours= Math.floor((diff/(1000*60*60))%24);
            const minutes= Math.floor((diff/(1000*60))%60);
            const seconds= Math.floor((diff/1000)%60);

            setAge(`${years} years ${days} days ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);
        return ()=> clearInterval(interval)
    }, []);
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-12 bg-green-50">
      {/* Left Side */}
      <div className="max-w-lg text-center md:text-left">
        <div className='flex flex-col'>
            <h1 className="text-4xl font-bold text-green-800">Welcome to Nigeria</h1>
        <p className="mt-4 text-gray-700">
          Discover the land of rich culture, heritage, and resilience.
        </p>
        </div>
        <div className='flex'>
            <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
          Explore
        </button>
        <p className="mt-6 text-sm text-gray-600">We are {age} old as a nation 🇳🇬</p>
    
        </div>
          </div>

      {/* Right Side */}
      <div className="mt-8 md:mt-0 md:ml-12 hidden md:flex flex-col items-center right-0">
        {/* Animated Flag */}
        <Image
          src="/nigeria-flag.gif" 
          width={25}
          alt="Nigeria Flag"
          className="w-64 h-40 object-cover rounded shadow-lg"
        />
        {/* Anthem Button */}
        <audio controls className="mt-4">
          <source src="/nigeria-anthem.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </section>
  )
}

export default Hero