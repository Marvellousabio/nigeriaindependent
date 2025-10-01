import React from 'react'

const Header = () => {
  return (
    <div className='flex w-full items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4'>
      <div className='text-lg font-bold text-green-800'>Nigeria</div>
      <nav className='flex space-x-4'>
        <a href='#' className='hover:text-blue-500'>Home</a>
        <a href='#' className='hover:text-blue-500'>Contact</a>
        <a href='#' className='hover:text-blue-500'>History</a>
        <a href='#' className='hover:text-blue-500'>FAQs</a>
      </nav>
    </div>
  )
}

export default Header