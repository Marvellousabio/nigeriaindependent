 "use client";
import React from "react";
import { Mail, Twitter, Instagram, Github } from "lucide-react";
import Link from "next/link";


const Footer = ({ companyName = "Bestricky", year = new Date().getFullYear() }) => {
  return (
   
// export default function Footer({ companyName = "Bestricky", year = new Date().getFullYear() }) {
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand + short */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-lg">{companyName.charAt(0)}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{companyName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connecting people to the stories and heritage of Nigeria.</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              <p>
                Built with ❤️ for the Nigerian community — discover culture, history and resources in one place.
              </p>
            </div>

            <div className="mt-6">
              <form className="flex max-w-md" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="footer-subscribe" className="sr-only">Subscribe</label>
                <input
                  id="footer-subscribe"
                  type="email"
                  placeholder="Your email"
                  className="flex-1  px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  type="submit"
                  className="px-4 py-2 focus:ring-2 focus:ring-green-700 transition-all duration-200 bg-green-600 text-white rounded-r-md hover:bg-green-700 text-sm"
                  aria-label="Subscribe"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Get updates about new stories, features and tips.</p>
            </div>
          </div>

          {/* Links section */}
          <div className="flex-1 grid grid-cols-2 gap-6 max-w-lg">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Explore</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/history" className="hover:underline">History</Link></li>
                <li><Link href="/culture" className="hover:underline">Culture</Link></li>
                <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                <li><Link href="/careers" className="hover:underline">Careers</Link></li>
                <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">© {year} {companyName}. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <nav aria-label="Social links" className="flex items-center gap-3">
              <Link href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"
              className="p-2 rounded-md transition-colors hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-900">
              <Twitter size={16} />
            </Link>

              <Link href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Instagram">
                <Instagram size={16} />
              </Link>
              <Link href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="GitHub">
                <Github size={16} />
              </Link>
              <Link href="mailto:hello@example.com" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Email">
                <Mail size={16} />
              </Link>
            </nav>

            <Link href="/sitemap.xml" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer