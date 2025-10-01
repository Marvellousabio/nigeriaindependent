import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='flex w-full items-center justify-between px-4 sm:px-6 md:px-6 lg:px-17 border-b border-gray-500 py-4 bg-green-50'>
      <div className='text-xl font-bold text-green-800'>Nigeria</div>
      <nav className='flex space-x-4 text-green-900 gap-7 pr-20'>
        <Link href="/" className='hover:text-green-500'>Home</Link>
        <Link href='/History' className='hover:text-green-500'>History</Link>
        <Link href='#' className='hover:text-green-500'>Support</Link>
        <Link href='#' className='hover:text-green-500'>FAQs</Link>

        
      </nav>
    </div>
  )
}

export default Header