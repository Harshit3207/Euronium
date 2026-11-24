import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { playChime } from '../utils/audio';
import MagneticButton from './MagneticButton';

export default function Navbar({ onOpenRecordModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 lg:px-16 pt-5 pb-2 transition-all duration-300">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-[1440px] mx-auto flex items-center justify-between px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 ${
          scrolled
            ? 'glass-pill shadow-lg shadow-black/[0.03] border-white/80'
            : 'bg-white/70 backdrop-blur-md border border-black/5 shadow-xs'
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center group py-0.5"
          onClick={() => playChime('click')}
          title="Euronium"
        >
          <img
            src="/assets/euronium-logo.png"
            alt="Euronium"
            className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </a>

        {/* Center Navigation Links (Styled in Clean Inter without brackets) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs sm:text-[13px] font-sans font-medium tracking-wide uppercase text-neutral-600">
          <a
            href="#about"
            className="hover:text-neutral-950 transition-colors"
            onClick={() => playChime('hover')}
          >
            About
          </a>
          <a
            href="#classification"
            className="hover:text-neutral-950 transition-colors"
            onClick={() => playChime('hover')}
          >
            Specimen Index
          </a>
          <a
            href="#protocol"
            className="hover:text-neutral-950 transition-colors"
            onClick={() => playChime('hover')}
          >
            Consensus
          </a>
          <a
            href="#roles"
            className="hover:text-neutral-950 transition-colors"
            onClick={() => playChime('hover')}
          >
            Roles
          </a>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Record CTA Button */}
          <MagneticButton
            onClick={onOpenRecordModal}
            variant="dark"
            className="px-5 py-2.5 text-xs font-medium tracking-tight"
          >
            <span>Record Specimen</span>
            <ArrowUpRight size={14} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
          </MagneticButton>

          {/* Iconic Black Circular Hamburger Button (as in reference mockup) */}
          <button
            onClick={() => {
              playChime('click');
              setMenuOpen(!menuOpen);
            }}
            className="w-10 h-10 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white flex items-center justify-center transition-all duration-300 shadow-sm group"
            title="Navigation Menu"
          >
            {menuOpen ? (
              <X size={16} />
            ) : (
              <div className="flex flex-col gap-1 items-center justify-center w-4">
                <span className="w-4 h-[1.5px] bg-white rounded-full transition-transform group-hover:scale-x-110" />
                <span className="w-4 h-[1.5px] bg-white rounded-full transition-transform group-hover:scale-x-90" />
                <span className="w-4 h-[1.5px] bg-white rounded-full transition-transform group-hover:scale-x-110" />
              </div>
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden mt-2 p-4 rounded-2xl glass-pill flex flex-col gap-3 font-sans font-medium text-xs uppercase"
        >
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-purple-50 text-neutral-800"
          >
            About Foundation
          </a>
          <a
            href="#classification"
            onClick={() => setMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-purple-50 text-neutral-800"
          >
            Specimen Index
          </a>
          <a
            href="#protocol"
            onClick={() => setMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-purple-50 text-neutral-800"
          >
            Cryptographic Protocol
          </a>
          <a
            href="#ecosystem"
            onClick={() => setMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-purple-50 text-neutral-800"
          >
            Ecosystem Roles
          </a>
        </motion.div>
      )}
    </header>
  );
}
