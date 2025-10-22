"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReviewModal from './ReviewModal';

const Footer = ({ companyName = "Nigeria Independent", year = new Date().getFullYear() }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const visitorId = mounted && typeof window !== 'undefined' ? localStorage.getItem('visitorId') : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleReviewClick = () => {
    if (visitorId) {
      setShowReviewModal(true);
    } else {
      alert('Please complete the visitor form first to leave a review.');
    }
  };

  return (
    <>
      <footer className=" text-white dark:bg-gray-900/95  py-8">
        <div className='max-w-6xl mx-auto px-6 md:px-16'>
          <div className='grid md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-xl font-bold mb-4'>{companyName}</h3>
              <p className='text-green-100'>Discover the rich culture, history, and beauty of Nigeria through immersive experiences and AI-powered insights.</p>
              <div className='mt-4'>
                <a
                  href="https://www.buymeacoffee.com/marvellousabi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='inline-block bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors'
                >
                  ☕ Buy Me a Coffee
                </a>
              </div>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Quick Links</h4>
              <ul className='space-y-2'>
                <li><Link href="/" className='text-green-100 hover:text-white'>Home</Link></li>
                <li><Link href="/History" className='text-green-100 hover:text-white'>History</Link></li>
                <li><Link href="/FAQ" className='text-green-100 hover:text-white'>FAQs</Link></li>
                <li><Link href="#" className='text-green-100 hover:text-white'>AI Assistant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Resources</h4>
              <ul className='space-y-2'>
                <li><Link href="#" className='text-green-100 hover:text-white'>Language Translator</Link></li>
                <li><Link href="#" className='text-green-100 hover:text-white'>Recipe Generator</Link></li>
                <li><Link href="#" className='text-green-100 hover:text-white'>Virtual Tours</Link></li>
                <li><Link href="#" className='text-green-100 hover:text-white'>Cultural Quiz</Link></li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Support</h4>
              <ul className='space-y-2'>
                <li><button onClick={handleReviewClick} className='text-green-100 hover:text-white cursor-pointer'>Leave a Review</button></li>
                <li><Link href="#" className='text-green-100 hover:text-white'>Contact Us</Link></li>
                <li><Link href="#" className='text-green-100 hover:text-white'>Privacy Policy</Link></li>
                <li><Link href="#" className='text-green-100 hover:text-white'>Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className='border-t border-green-700 mt-8 pt-8 text-center'>
            <p className='text-green-100'>© {year} {companyName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        visitorId={visitorId || ''}
      />
    </>
  );
};

export default Footer;