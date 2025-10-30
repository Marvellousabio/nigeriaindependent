"use client"
import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import { MenuSquare, X,  MessageCircle } from 'lucide-react'
import Image from 'next/image'


const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  const handleToggle =()=>{
    setIsOpen(true)
  }
  const handleClose =()=>{
    setIsOpen(false)
  }

  const scrollToAI = () => {
    const aiSection = document.getElementById('AI');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
    <div className='flex w-full fixed items-center justify-between px-4 md:px-6 lg:px-17 border-b border-secondary-300 dark:border-secondary-700 py-4 bg-green-700 backdrop-blur-sm z-40'>
      <div className='text-xl font-bold text-white flex flex-row'>
        <Image alt='logo' width={30} height={30} src="/nigeria.gif"/>
        Nigeria
      </div>
      <div className='flex items-center gap-4'>
        {/* Theme Toggle */}
        

        <nav className='hidden md:flex space-x-4 text-white gap-7 pr-4'>
          <Link href="/" className='hover:text-accent-300 transition-colors'>Home</Link>
          <Link href='/News' className='hover:text-accent-300 transition-colors'>News</Link>
          <Link href='/History' className='hover:text-accent-300 transition-colors'>History</Link>
          <button
            onClick={scrollToAI}
            className='hover:text-accent-300 transition-colors flex items-center gap-1'
          >
            <MessageCircle size={16} />
            AI
          </button>
          <Link href='/FAQ' className='hover:text-accent-300 transition-colors'>FAQs</Link>
          
        </nav>
        <div className='md:hidden'>
          {!isOpen ?
            <MenuSquare onClick={handleToggle} className='text-white text-2xl cursor-pointer'/>
            :
            <X onClick={handleClose} className='text-white text-2xl cursor-pointer'/>
          }
        </div>
      </div>
    </div>

    {isOpen &&
        <div className='fixed top-16 left-0 right-0 z-30 bg-green-600 border-b border-secondary-300 shadow-lg'>
          <nav className='flex flex-col md:hidden text-white gap-4 py-6 px-6'>
            <Link href="/" className='hover:text-accent-300 py-2' onClick={() => setIsOpen(false)}>Home</Link>
            <Link href='/News' className='hover:text-accent-300 transition-colors'>News</Link>
            <Link href='/History' className='hover:text-accent-300 py-2' onClick={() => setIsOpen(false)}>History</Link>
            <button
              onClick={() => { scrollToAI(); setIsOpen(false); }}
              className='hover:text-accent-300 py-2 text-left flex items-center gap-2'
            >
              <MessageCircle size={16} />
              AI Assistant
            </button>
            <Link href='/FAQ' className='hover:text-accent-300 py-2' onClick={() => setIsOpen(false)}>FAQs</Link>
                  
            {/* Mobile Theme Toggle */}
            <div className='border-t border-secondary-300 mt-4 pt-4'>
              <a
                  href="https://selar.com/showlove/marvellousabio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='inline-block bg-pink-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-pink-400 transition-colors'
                >
                  Support me on selar
                </a>
            </div>
          </nav>
        </div>
    }
    </>
  )
}

export default Header