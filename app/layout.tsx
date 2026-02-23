"use client"; // Needed for the toggle state

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <html lang="en">
      <body className="bg-vc-beige text-vc-navy min-h-screen font-sans">
        <header className="w-full border-b border-vc-navy/10 bg-vc-beige/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            
            {/* Logo and Title */}
            <Link href="/" className="flex items-center gap-3 md:gap-6 group flex-shrink-0">
              <div className="w-12 h-12 md:w-20 md:h-20 relative">
                <Image 
                  src="/venture-compass-logo-transparent.png" 
                  alt="The Venture Compass Logo" 
                  fill 
                  className="object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>
              <div className="h-10 w-[1.5px] bg-vc-navy rounded-full hidden sm:block" />
              <span className="text-lg md:text-2xl font-serif font-bold tracking-tight text-vc-navy uppercase">
                Venture Compass
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                href="/" 
                className="text-sm font-bold uppercase tracking-widest hover:text-blue-800 transition-colors"
              >
                Journal
              </Link>
              <Link 
                href="/tracker" 
                className="text-sm font-bold uppercase tracking-widest hover:text-blue-800 transition-colors border-x border-vc-navy/10 px-6"
              >
                Signal Tracker
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-bold uppercase tracking-widest hover:text-blue-800 transition-colors"
              >
                About
              </Link>
            </nav>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-vc-navy focus:outline-none transition-transform active:scale-90"
              aria-label="Toggle Menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-vc-navy transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-vc-navy transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-vc-navy transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-vc-beige/95 backdrop-blur-lg ${
              isMenuOpen ? 'max-h-[400px] border-b border-vc-navy/10' : 'max-h-0'
            }`}
          >
            <nav className="flex flex-col items-stretch pt-2 pb-6">
              <Link 
                href="/" 
                onClick={toggleMenu} 
                className="text-sm font-bold uppercase tracking-[0.2em] py-5 text-center active:bg-vc-navy/5 transition-colors"
              >
                Journal
              </Link>
              
              <div className="flex justify-center">
                <div className="w-64 h-[1px] bg-vc-navy/10" />
              </div>

              <Link 
                href="/tracker" 
                onClick={toggleMenu} 
                className="text-sm font-bold uppercase tracking-[0.2em] py-5 text-center active:bg-vc-navy/5 transition-colors"
              >
                Signal Tracker
              </Link>

              <div className="flex justify-center">
                <div className="w-64 h-[1px] bg-vc-navy/10" />
              </div>

              <Link 
                href="/about" 
                onClick={toggleMenu} 
                className="text-sm font-bold uppercase tracking-[0.2em] py-5 text-center active:bg-vc-navy/5 transition-colors"
              >
                About
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}