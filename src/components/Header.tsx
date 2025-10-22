"use client"
import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import { MenuSquare, X, Sun, Moon, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'


const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

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

  const scrollToChat = () => {
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
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
        <button
          onClick={toggleTheme}
          className='p-2 rounded-lg bg-secondary-200 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-200 hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors'
          aria-label='Toggle theme'
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <nav className='hidden md:flex space-x-4 text-white gap-7 pr-4'>
          <Link href="/" className='hover:text-accent-300 transition-colors'>Home</Link>
          <Link href='/News' className='hover:text-accent-300 transition-colors'>News</Link>
          <Link href='/History' className='hover:text-accent-300 transition-colors'>History</Link>
          <button
            onClick={scrollToChat}
            className='hover:text-accent-300 transition-colors flex items-center gap-1'
          >
            <MessageCircle size={16} />
            AI
          </button>
          <Link href='/FAQ' className='hover:text-accent-300 transition-colors'>FAQs</Link>
          <Link href='#' className='hover:text-accent-300 transition-colors'>Support</Link>
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
              onClick={() => { scrollToChat(); setIsOpen(false); }}
              className='hover:text-accent-300 py-2 text-left flex items-center gap-2'
            >
              <MessageCircle size={16} />
              AI Assistant
            </button>
            <Link href='/FAQ' className='hover:text-accent-300 py-2' onClick={() => setIsOpen(false)}>FAQs</Link>
            <Link href='#' className='hover:text-accent-300 py-2' onClick={() => setIsOpen(false)}>Support</Link>

            {/* Mobile Theme Toggle */}
            <div className='border-t border-secondary-300 mt-4 pt-4'>
              <button
                onClick={() => { toggleTheme(); setIsOpen(false); }}
                className='flex items-center gap-2 text-secondary-100 hover:text-accent-300 py-2'
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </nav>
        </div>
    }
    </>
  )
}

export default Header