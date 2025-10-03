"use client"
import React,{useState} from 'react'
import Link from 'next/link'
import { MenuSquare, X } from 'lucide-react'
import Image from 'next/image'


const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle =()=>{
    setIsOpen(true)
  }
  const handleClose =()=>{
    setIsOpen(false)
  }
  return (
    <>
    <div className='flex w-full fixed items-center justify-between px-4  md:px-6 lg:px-17 border-b border-gray-500 py-4 bg-green-50/95 '>
      <div className='text-xl font-bold text-green-800 flex flex-row'><Image  alt='logo' width={30} height={30} src="/nigeria.gif"/> Nigeria</div>
      <div className='flex'>
      <nav className='hidden md:flex space-x-4 text-green-900 gap-7 pr-20'>
        <Link href="/" className='hover:text-green-500'>Home</Link>
        <Link href='/History' className='hover:text-green-500'>History</Link>
        <Link href='#' className='hover:text-green-500'>Support</Link>
        <Link href='#' className='hover:text-green-500'>FAQs</Link>
      </nav>
      <div className='md:hidden'>{!isOpen? <MenuSquare onClick={handleToggle} className='text-green-800 text-2xl fade'/>
       :<X onClick={handleClose} className='text-green-800 text-2xl'/>}</div>
      
      
</div> 
    </div>
    {isOpen &&
        <div className=' z-20 p-8 mt-0  '>
          <nav className='flex flex-col md:hidden lg:hidden text-gray-100 gap-7  '>
        <Link href="/" className='hover:text-green-500'>Home</Link>
        <Link href='/History' className='hover:text-green-500'>History</Link>
        <Link href='#' className='hover:text-green-500'>Support</Link>
        <Link href='#' className='hover:text-green-500'>FAQs</Link>
      </nav>
        </div>
}
</>
  )
}

export default Header