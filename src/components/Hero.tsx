"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import {PlayCircle, PauseCircle } from 'lucide-react';

const Hero = () => {
    const independenceDate = new Date("1660-10-01T00:00:00Z");
    const [age,setAge]= useState(" ");
    const [isPlaying,setIsPlaying]= useState(false)
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
    <section className="lg:min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-12  bg-green-50">
      {/* Left Side */}
      <div className=" md:-mt-20  text-center md:text-left md:space-y-10">
        <div className='flex flex-col md:space-y-4  '>
            <h1 className="text-4xl md:text-6xl font-bold text-green-800">Welcome to Nigeria</h1>
        <p className="mt-4 md:text-2xl md:max-w-2/3 text-gray-700 ">
          Discover the Giant of Africa - a land of rich culture, diverse heritage, 
          and unbreakable resilience. From our vibrant traditions to our proud history, 
          explore what makes Nigeria extraordinary.
        </p>
        </div>
        <div className='flex gap-2 items-center '>
            <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
          Explore
        </button>
        <p className="mt-6 text-sm text-gray-600 ">We are <span className='text-green-200 text-lg bg-green-700 p-1 font-serif'>{age}</span> old</p>
    
        </div>
          </div>

      {/* Right Side */}
      <div className="mt-8 md:mt-0 md:mr-20 h-full hidden md:flex flex-col items-center ">
        {/* Animated Flag */}
        <div className='flex '>
            
        <Image
          src="/nigeria-583.gif" 
          width={500}
          height={500}
          alt="Nigeria Flag"
          layout='responsive'
          className="w-1/2 object-cover rounded shadow-lg"
        />
        </div>
        {/* Anthem Button */}
        {isPlaying? <PlayCircle size={20}/>:<PauseCircle size={20}/>}
          <audio 
            controls 
            className="mt-4 rounded-lg shadow-md"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/nigeria-anthem.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
      </div>
    </section>
  )
}

export default Hero