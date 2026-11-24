import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Compass, ShieldCheck, Eye, Layers } from 'lucide-react';
import { playChime } from '../utils/audio';

const specimens = [
  {
    id: '0184',
    title: 'Wild-found',
    scientific: 'Rhododendron Campanulatum',
    location: 'Highland Ridge • 3,420m elevation',
    coordinates: '27°59\'17"N 86°55\'31"E',
    image: '/assets/specimen-pink.jpg',
    colorName: 'Rose Petal',
    badgeColor: 'bg-rose-500',
    accentColor: 'from-pink-500/20 to-purple-500/20',
    discoverer: 'Dr. Elena Rostova',
    blockHeight: '#1,842,109',
    rarity: 'Endangered Grade A',
  },
  {
    id: '0185',
    title: 'Glacial Bloom',
    scientific: 'Meconopsis Grandis (Blue Poppy)',
    location: 'Annapurna Sanctuary • 4,120m elevation',
    coordinates: '28°31\'48"N 83°52\'24"E',
    image: '/assets/specimen-blue.jpg',
    colorName: 'Cobalt Iris',
    badgeColor: 'bg-blue-500',
    accentColor: 'from-blue-500/20 to-cyan-500/20',
    discoverer: 'Tenzing Norgay Archive',
    blockHeight: '#1,842,420',
    rarity: 'Ultra-Rare Alpine',
  },
  {
    id: '0186',
    title: 'Solar Radiance',
    scientific: 'Ranunculus Ficaria Aurum',
    location: 'Dolomite Valley • 2,150m elevation',
    coordinates: '46°26\'12"N 11°51\'40"E',
    image: '/assets/specimen-gold.jpg',
    colorName: 'Golden Amber',
    badgeColor: 'bg-amber-500',
    accentColor: 'from-amber-500/20 to-yellow-500/20',
    discoverer: 'Matteo Bernardi',
    blockHeight: '#1,842,654',
    rarity: 'Protected Biosphere',
  },
  {
    id: '0187',
    title: 'Saffron Dusk',
    scientific: 'Crocus Vernus Purpurea',
    location: 'Julian Alps • 1,890m elevation',
    coordinates: '46°22\'45"N 13°50\'12"E',
    image: '/assets/specimen-violet.jpg',
    colorName: 'Violet Crown',
    badgeColor: 'bg-purple-600',
    accentColor: 'from-purple-600/20 to-indigo-500/20',
    discoverer: 'Sora Takahashi',
    blockHeight: '#1,842,880',
    rarity: 'Consensus Verified',
  },
];

export default function SpecimenCarousel({ onSelectSpecimen }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    playChime('click');
    setCurrentIndex((prev) => (prev === 0 ? specimens.length - 1 : prev - 1));
  };

  const next = () => {
    playChime('click');
    setCurrentIndex((prev) => (prev === specimens.length - 1 ? 0 : prev + 1));
  };

  const selectIndex = (i) => {
    playChime('click');
    setCurrentIndex(i);
  };

  const current = specimens[currentIndex];
  const prevSpecimen = specimens[(currentIndex - 1 + specimens.length) % specimens.length];
  const nextSpecimen = specimens[(currentIndex + 1) % specimens.length];

  return (
    <section id="classification" className="relative py-28 px-6 md:px-12 bg-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-purple-100/40 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Eyebrow and Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100/90 border border-neutral-200/50 text-[11px] font-sans font-medium text-neutral-800 mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
            <span className="tracking-wide">SPECIMEN CAROUSEL (02)</span>
          </div>

          <h2 className="font-headline font-medium text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] leading-[0.98] text-[#0d0e12]">
            <span>Every record begins</span>
            <span className="block text-[#b4b7be] font-medium">
              with where it came from.
            </span>
          </h2>
        </div>

        {/* Carousel Visual Area with Circular Lens */}
        <div className="relative flex items-center justify-center my-8">
          {/* Left Flanking Preview Circle */}
          <div
            onClick={prev}
            className="hidden md:block absolute left-4 lg:left-16 w-44 h-44 rounded-full overflow-hidden opacity-30 hover:opacity-70 transition-all duration-500 cursor-pointer transform -translate-x-4 hover:-translate-x-6 scale-90 blur-[1px] border border-neutral-300"
          >
            <img
              src={prevSpecimen.image}
              alt={prevSpecimen.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Central Active Circular Lens Focus */}
          <div className="relative z-10 w-72 sm:w-84 md:w-96 aspect-square rounded-full p-2 bg-gradient-to-b from-white via-purple-50 to-purple-100 shadow-[0_25px_60px_-15px_rgba(147,51,234,0.22)] border border-neutral-200">
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-inner group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.08, rotate: 4 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover object-center filter saturate-105 group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>

              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/20 pointer-events-none" />

              {/* Interactive Inspect Chip */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass-panel text-[11px] font-sans font-medium font-medium text-neutral-900 border border-white/90 flex items-center gap-1.5 shadow-sm">
                <Compass size={12} className="text-purple-600" />
                <span>{current.coordinates}</span>
              </div>
            </div>
          </div>

          {/* Right Flanking Preview Circle */}
          <div
            onClick={next}
            className="hidden md:block absolute right-4 lg:right-16 w-44 h-44 rounded-full overflow-hidden opacity-30 hover:opacity-70 transition-all duration-500 cursor-pointer transform translate-x-4 hover:translate-x-6 scale-90 blur-[1px] border border-neutral-300"
          >
            <img
              src={nextSpecimen.image}
              alt={nextSpecimen.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Specimen Metadata & Details */}
        <div className="text-center max-w-xl mx-auto mt-8 space-y-4">
          <div className="inline-block">
            <span className="text-xs font-sans font-medium tracking-wider text-purple-700 uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
              SPECIMEN #{current.id} • {current.rarity}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="font-headline font-medium text-3xl sm:text-4xl text-neutral-950 tracking-[-0.04em]">
                {current.title}
              </h3>
              <p className="font-sans text-sm text-neutral-500 italic mt-1">
                {current.scientific}
              </p>
              <p className="text-xs font-sans text-neutral-400 mt-2">
                {current.location}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Color Swatches Selector */}
          <div className="flex items-center justify-center gap-2.5 pt-3">
            {specimens.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => selectIndex(idx)}
                className={`w-6 h-6 rounded-full transition-all duration-300 relative ${
                  currentIndex === idx
                    ? 'ring-2 ring-purple-600 ring-offset-2 scale-110'
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
                title={item.colorName}
              >
                <span className={`block w-full h-full rounded-full ${item.badgeColor}`} />
              </button>
            ))}
          </div>

          {/* Navigation Controls & Progress */}
          <div className="flex items-center justify-between max-w-xs mx-auto pt-6 border-t border-black/[0.06]">
            {/* Prev Arrow */}
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-900 hover:text-white transition-all duration-300"
              title="Previous specimen"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Counter */}
            <div className="font-sans font-medium text-xs text-neutral-600 tracking-widest">
              <span className="font-medium text-neutral-950">
                0{currentIndex + 1}
              </span>
              <span className="mx-2 text-neutral-300">/</span>
              <span>0{specimens.length}</span>
            </div>

            {/* Next Arrow */}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-300 shadow-sm"
              title="Next specimen"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
