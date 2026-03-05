'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { SearchModal } from './SearchModal';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-light tracking-[0.3em] text-neutral-900">
              <img src="/images/logo_primary.png" alt="LIVRA" className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm tracking-wide text-neutral-600 hover:text-neutral-900 transition">
                Home
              </Link>
              <Link href="/collection/women" className="text-sm tracking-wide text-neutral-600 hover:text-neutral-900 transition">
                Women
              </Link>
              <Link href="/collection/men" className="text-sm tracking-wide text-neutral-600 hover:text-neutral-900 transition">
                Men
              </Link>
              <Link href="/collection/featured" className="text-sm tracking-wide text-neutral-600 hover:text-neutral-900 transition">
                Featured
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 text-neutral-600 hover:text-neutral-900 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Cart */}
              <Link href="/cart" className="p-2 text-neutral-600 hover:text-neutral-900 transition relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 text-white text-xs rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
              
              {/* Mobile menu button */}
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-neutral-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="md:hidden py-4 border-t border-neutral-100">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-sm tracking-wide text-neutral-600 hover:text-neutral-900">Home</Link>
                <Link href="/collection/women" className="text-sm tracking-wide text-neutral-600 hover:text-neutral-900">Women</Link>
                <Link href="/collection/men" className="text-sm tracking-wide text-neutral-600 hover:text-neutral-900">Men</Link>
                <Link href="/collection/featured" className="text-sm tracking-wide text-neutral-600 hover:text-neutral-900">Featured</Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
