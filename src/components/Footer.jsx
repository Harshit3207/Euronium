import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { playChime } from '../utils/audio';

export default function Footer({ onOpenRecordModal }) {
  return (
    <footer className="relative bg-white text-neutral-900 pt-16 sm:pt-20 md:pt-24 pb-8 px-6 md:px-12 lg:px-16 border-t border-black/[0.06] overflow-hidden">
      {/* Botanical Plant Background Illustration (Matches exact reference mockup) */}
      <div className="absolute right-0 top-0 bottom-8 w-[65vw] sm:w-[52vw] md:w-[44vw] lg:w-[38vw] max-w-[540px] pointer-events-none z-0 flex items-center justify-end select-none overflow-hidden">
        <motion.img
          src="/assets/footer-plant-transparent.png"
          alt="Euronium Flora Specimen"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-contain object-right filter contrast-[1.02] drop-shadow-sm pointer-events-none select-none"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full flex flex-col justify-between min-h-[520px]">
        {/* Top Section: CTA Copy & "Register a record" Pill Button */}
        <div className="max-w-xl sm:max-w-2xl space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-headline font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[70px] tracking-[-0.04em] leading-[0.98] text-[#0d0e12]"
          >
            <span>Found something?</span>
            <span className="block text-[#b4b7be] font-medium mt-1">
              Put it on the record.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="pt-1"
          >
            <button
              onClick={() => {
                playChime('click');
                if (onOpenRecordModal) onOpenRecordModal();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0d0e12] hover:bg-neutral-800 text-white text-xs sm:text-[13px] font-sans font-medium tracking-tight transition-all duration-300 shadow-sm group cursor-pointer"
            >
              <span>Register a record</span>
              <ArrowUpRight
                size={14}
                className="opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </motion.div>
        </div>

        {/* Middle Section: 4 Clean Navigation Columns (Matching Mockup) */}
        <div className="pt-14 sm:pt-16 pb-8 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 max-w-2xl text-xs sm:text-[13px] font-sans">
          {/* Column 1: REGISTRY */}
          <div className="space-y-3">
            <h5 className="font-medium text-neutral-900 uppercase tracking-wider text-[11px]">
              REGISTRY
            </h5>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <a
                  href="#about"
                  onClick={() => playChime('hover')}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Explorer
                </a>
              </li>
              <li>
                <a
                  href="#classification"
                  onClick={() => playChime('hover')}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Species check
                </a>
              </li>
              <li>
                <a
                  href="#protocol"
                  onClick={() => playChime('hover')}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Custody trace
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: NETWORK */}
          <div className="space-y-3">
            <h5 className="font-medium text-neutral-900 uppercase tracking-wider text-[11px]">
              NETWORK
            </h5>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <a
                  href="#ecosystem"
                  onClick={() => playChime('hover')}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Cooperatives
                </a>
              </li>
              <li>
                <a
                  href="#ecosystem"
                  onClick={() => playChime('hover')}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Research bodies
                </a>
              </li>
              <li>
                <a
                  href="#ecosystem"
                  onClick={() => playChime('hover')}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Buyers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="space-y-3">
            <h5 className="font-medium text-neutral-900 uppercase tracking-wider text-[11px]">
              COMPANY
            </h5>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <a
                  href="#about"
                  onClick={() => playChime('hover')}
                  className="hover:text-neutral-950 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#protocol"
                  onClick={() => playChime('hover')}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#roles"
                  onClick={() => playChime('hover')}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: SOCIAL */}
          <div className="space-y-3">
            <h5 className="font-medium text-neutral-900 uppercase tracking-wider text-[11px]">
              SOCIAL
            </h5>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playChime('hover')}
                  className="inline-flex items-center gap-1 hover:text-neutral-950 transition-colors"
                >
                  <span>LinkedIn</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playChime('hover')}
                  className="inline-flex items-center gap-1 hover:text-neutral-950 transition-colors"
                >
                  <span>X</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Giant Euronium Display Typography (Matching Reference Mockup) */}
        <div className="pt-8 sm:pt-10 select-none overflow-hidden relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <h1 className="font-headline font-medium text-[16vw] sm:text-[17vw] md:text-[18vw] leading-[0.8] tracking-[-0.04em] text-[#0d0e12] select-none pointer-events-none text-left">
              Euronium
            </h1>
          </motion.div>
        </div>

        {/* Bottom Legal / Copyright Meta Strip (Matching Exact Mockup) */}
        <div className="pt-6 pb-2 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-sans font-medium tracking-widest uppercase text-neutral-400 gap-2 select-none">
          <a href="#" className="hover:text-neutral-900 transition-colors">
            PRIVACY POLICY
          </a>
          <span>© 2026 EURONIUM</span>
          <a href="#" className="hover:text-neutral-900 transition-colors">
            TERMS OF USE
          </a>
        </div>
      </div>
    </footer>
  );
}
