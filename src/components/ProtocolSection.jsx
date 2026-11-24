import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Clock, ArrowUpRight, Scan } from 'lucide-react';
import { playChime } from '../utils/audio';

const interfaces = [
  {
    id: 'explorer',
    index: '01/03',
    label: 'Public explorer',
    icon: Globe,
    description: 'Anyone can look up a record and check every signed layer.',
  },
  {
    id: 'app',
    index: '02/03',
    label: 'Consumer app',
    icon: Smartphone,
    description: 'Mobile field scanners verify specimen DNA and provenance instantly.',
  },
  {
    id: 'dashboard',
    index: '03/03',
    label: 'Steward dashboard',
    icon: Clock,
    description: 'Herbaria nodes sign curation proofs and govern biological taxonomies.',
  },
];

export default function ProtocolSection({ onOpenVerifyModal }) {
  const [activeTab, setActiveTab] = useState(0);

  const selectTab = (idx) => {
    playChime('click');
    setActiveTab(idx);
  };

  return (
    <section
      id="protocol"
      className="relative min-h-[750px] lg:min-h-[850px] py-10 md:py-14 px-6 md:px-12 lg:px-16 bg-white overflow-hidden flex flex-col justify-between"
    >
      {/* Background High-Res Botanical Image (Seamlessly blended across the canvas exactly as reference) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-end overflow-hidden">
        <img
          src="/assets/flower-branch-highres.jpg"
          alt="Flowering Branch Specimen"
          className="w-full h-full max-w-[1480px] object-cover sm:object-contain object-right md:object-[78%_center] mix-blend-multiply will-change-transform transform-gpu select-none"
        />
      </div>

      {/* Main Content Area (Layered Directly on Top of the Background Image) */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Top Header Row: "• INTERFACES (03)" on Left, "(03)" on Right */}
        <div className="flex items-center justify-between pb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/60 text-[11px] font-sans font-medium text-neutral-800 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
            <span className="font-medium tracking-wide">INTERFACES (03)</span>
          </div>

          <span className="font-sans font-medium text-xs md:text-sm text-neutral-400 font-medium">
            (03)
          </span>
        </div>

        {/* Section Headline & Description Paragraph (Headline Overlaps Right Over Center Petals) */}
        <div className="pt-2 md:pt-4 max-w-4xl space-y-5">
          <h2 className="font-headline font-medium text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-[-0.04em] leading-[0.94] text-[#0a0a0c]">
            <span className="block">Three ways in.</span>
            <span className="block text-[#c5c5c9]">
              One record underneath
            </span>
          </h2>

          <p className="max-w-[280px] font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-wider text-neutral-800 leading-relaxed font-medium">
            A PUBLIC EXPLORER, A CONSUMER APP AND A STEWARD DASHBOARD — EVERY ONE OF THEM READS THE SAME SIGNED RECORD.
          </p>
        </div>

        {/* Bottom Split Row: Left Interactive Interface Tabs & Right Pinned Specimen Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-12 md:pt-20 pb-2">
          {/* Bottom Left: Three Interface Switcher Pills + Caption (Directly over lower blossom) */}
          <div className="lg:col-span-6 space-y-3.5">
            {/* The 3 Pill Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {interfaces.map((item, idx) => {
                const isActive = activeTab === idx;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => selectTab(idx)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-sans font-medium font-medium transition-all duration-300 shadow-sm backdrop-blur-md ${
                      isActive
                        ? 'bg-neutral-950 text-white border border-neutral-900'
                        : 'bg-white/90 hover:bg-white text-neutral-700 border border-neutral-200/80 hover:border-neutral-300'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-white' : 'text-neutral-500'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanatory Index & Description */}
            <div className="pt-1 text-xs font-sans font-medium text-neutral-600">
              <span className="font-medium text-neutral-900 mr-2">
                {interfaces[activeTab].index}
              </span>
              <span>{interfaces[activeTab].description}</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Bottom Right: Pinned Glass Specimen Card ("GR-0918") (Layered over right branch) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            {/* Floating Status Pill: "• New layer signed  2m ago" */}
            <div className="mb-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.06] shadow-sm text-[11px] font-sans font-medium text-neutral-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                New layer signed <span className="text-neutral-400">2m ago</span>
              </span>
            </div>

            {/* GR-0918 Specimen Card */}
            <div className="max-w-[340px] sm:max-w-[370px] w-full p-5 sm:p-6 rounded-[1.8rem] bg-white/95 backdrop-blur-xl border border-black/[0.06] shadow-[0_16px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(244,114,182,0.12)] transition-all duration-300 space-y-4">
              {/* Card Header: Circular Pink Flower Thumbnail + Title + Subtitle */}
              <div className="flex items-center gap-3.5 pb-1">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-rose-50 border border-rose-200/60 flex-shrink-0 shadow-sm">
                  <img
                    src="/assets/specimen-pink.jpg"
                    alt="GR-0918 Specimen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-headline font-medium text-2xl text-neutral-950 leading-tight">
                    GR-0918
                  </h3>
                  <p className="text-xs font-sans font-medium text-neutral-400">
                    Wild-found · Proof of life
                  </p>
                </div>
              </div>

              {/* Key-Value Details Grid */}
              <div className="space-y-2 text-xs font-sans font-medium border-t border-b border-black/[0.05] py-3">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 font-sans">Location</span>
                  <span className="text-neutral-900 font-medium">Kapuas Hulu, W. Kalimantan</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 font-sans">Origin type</span>
                  <span className="text-neutral-900 font-medium">Wild-found</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 font-sans">Signed layers</span>
                  <span className="text-neutral-900 font-medium">6 · no gaps</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 font-sans">Last update</span>
                  <span className="text-neutral-900 font-medium">3d ago</span>
                </div>
              </div>

              {/* Action Buttons: "View on explorer ↗" + Scan Button */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    playChime('click');
                    onOpenVerifyModal();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-sans font-medium font-medium flex items-center justify-between transition-colors shadow-sm"
                >
                  <span>View on explorer</span>
                  <ArrowUpRight size={14} />
                </button>

                <button
                  onClick={() => {
                    playChime('click');
                    onOpenVerifyModal();
                  }}
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors shadow-sm"
                  title="Scan QR / Verify Layer"
                >
                  <Scan size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
