"use client";
import Image from 'next/image';
import React, { useEffect, useState, useMemo,useRef } from 'react'
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
      const [age,setAge]= useState(" ");
      const [isPlaying,setIsPlaying]= useState(false);
      const [heroContent, setHeroContent] = useState<{ title?: string; description?: string; ctaText?: string } | null>(null);
      const [loading, setLoading] = useState(true);
      const independenceDate = useMemo(() => new Date("1960-10-01T00:00:00Z"), []);
      const [currentTime, setCurrentTime] = useState(0);
const [currentLine, setCurrentLine] = useState(0);
const audioRef = useRef<HTMLAudioElement>(null);

const handleTimeUpdate = () => {
  const time = audioRef.current?.currentTime || 0;
  setCurrentTime(time);

  const activeIndex = syncedLyrics.findIndex((line, i) => {
    const nextTime = syncedLyrics[i + 1]?.time || Infinity;
    return time >= line.time && time < nextTime;
  });
  if (activeIndex !== -1 && activeIndex !== currentLine) {
    setCurrentLine(activeIndex);
  }
};

    useEffect(()=>{
        const interval=setInterval(()=>{
            const now= new Date();
            const diff = now.getTime()- independenceDate.getTime();
             const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

          const remainder = diff - years * (1000 * 60 * 60 * 24 * 365.25);

      const days = Math.floor(remainder / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainder / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainder / (1000 * 60)) % 60);
      const seconds = Math.floor((remainder / 1000) % 60);

            setAge(`${years}y ${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);
        return ()=> clearInterval(interval)
    }, [independenceDate]);

    useEffect(() => {
        generateHeroContent();
    }, []);

    const syncedLyrics = [
  { time: 0.0, text: "...................." },
  { time: 12.0, text: "Nigeria we hail thee, Our own dear native land," },
  { time: 21.0, text: "Though tribe and tongue may differ, In brotherhood we stand," },
  { time: 28.0, text: "Nigerians all, and proud to serve our sovereign Motherland." },
  { time: 37.0, text: "Our flag shall be a symbol that truth and justice reign," },
  { time: 45.0, text: "In peace or battle honour’d, and this we count as gain," },
  { time: 53.0, text: "To hand on to our children a banner without stain." },
  { time: 62.0, text: "...................." },
  { time: 66.0, text: "O God of all creation, grant this our one request," },
  { time: 74.0, text: "Help us to build a nation where no man is oppressed," },
  { time: 81.0, text: "And so with peace and plenty, Nigeria may be blessed." },
  { time: 90.0, text: "...................." },
    ];


    const generateHeroContent = async () => {
        try {
            const response = await fetch('/api/hero-content');
            if (response.ok) {
                const data = await response.json();
                setHeroContent(data);
            }
        } catch (error) {
            console.error('Failed to generate hero content:', error);
        } finally {
            setLoading(false);
        }
    };
  return (
    <section className="lg:min-h-screen flex flex-col md:flex-row  items-center justify-between px-8 py-27 md:px-12 bg-green-50">
      {/* Left Side */}
      <div className=" md:mt-10 text-center md:text-left md:space-y-10 lg:col-span-7 ">
        <div className='flex flex-col md:space-y-4  '>
            <h1 className="text-4xl md:text-6xl font-bold text-green-800">
                {loading ? "Welcome to Nigeria" : (heroContent?.title || "Welcome to Nigeria")}
            </h1>
        <p className="mt-4 md:text-2xl md:max-w-2/3 text-gray-700 ">
          {loading ? "Discover the Giant of Africa - a land of rich culture, diverse heritage, and unbreakable resilience. From our vibrant traditions to our proud history, explore what makes Nigeria extraordinary." : (heroContent?.description || "Discover the Giant of Africa - a land of rich culture, diverse heritage, and unbreakable resilience. From our vibrant traditions to our proud history, explore what makes Nigeria extraordinary.")}
        </p>
        </div>
        <div className='flex gap-2 items-center '>
            <button className="mt-6 px-6 py-3 border-none bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center">
                <Sparkles className="mr-2" size={16} />
                {loading ? "Explore" : (heroContent?.ctaText || "Explore")}
            </button>
        <div className="mt-6 flex flex-col items-center md:items-start">
          <p className="text-sm text-gray-600 mb-2"><span className='hidden md:inline'>
          <div className=" bg-opacity-80 text-green-400 px-6 py-3 rounded border-2 border-green-400 font-mono text-sm md:text-lg font-bold tracking-wider shadow-2xl">
            {age}
          </div>
          </span>years old</p>
        </div>

        </div>
          </div>

      {/* Right Side */}
      <div className="mt-8 md:mt-0 md:mr-20 h-full hidden md:flex flex-col items-center lg:col-span-5">
        {/* Animated Flag */}
        <div className='flex flex-col items-center'>
        <Image
          src="/nigeria-583.gif"
          width={500}
          height={500}
          alt="Nigeria Flag"
          layout='responsive'
          className="w-1/2 object-cover rounded shadow-lg"

        />
        {/* Lyrics Display */}
        {isPlaying && (
        <div className="mt-4 p-4 bg-white bg-opacity-90 rounded-lg shadow-md max-w-xs text-center">
          <h4 className="text-sm font-semibold text-green-800 mb-3">
            National Anthem Lyrics
          </h4>

          <div className="transition-all duration-500">
            <motion.p
              key={currentLine}
              className="text-sm leading-tight text-green-700 font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {syncedLyrics[currentLine]?.text || "Lyrics will appear here..."}
            </motion.p>
          </div>
        </div>
      )}
        </div>
        {/* Audio Controls */}
        <audio
          controls
          ref={audioRef}
          className="mt-4 rounded-lg shadow-md"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
           onTimeUpdate={handleTimeUpdate}
        >
          <source src="/nigeria-anthem.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className='flex md:hidden mt-4 gap-2 justify-center items-center flex-col'>
        <div className='flex flex-2'>
          <Image
          src="/nigeria-583.gif"
          width={50}
          height={50}
          alt="Nigeria Flag"
          layout='responsive'
          className="w-1/2 object-cover rounded shadow-lg"
        />
        </div>
        {/* Lyrics Display for Mobile */}
        {isPlaying && (
          <div className="mt-2 p-3 bg-white bg-opacity-90 rounded-lg shadow-md max-w-xs text-center">
            <h4 className="text-xs font-semibold text-green-800 mb-1">National Anthem Lyrics</h4>
            <p className="text-xs text-gray-700 leading-tight">
              Arise, O compatriots, Nigeria&apos;s call obey...<br/>
              <em>(Full lyrics play with audio)</em>
            </p>
          </div>
        )}
        <div className='flex flex-2'>
          <audio
            controls
            className="mt-2 rounded-lg shadow-md"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/nigeria-anthem.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </section>
  )
}

export default Hero