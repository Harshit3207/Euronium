import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function CtaSection({ onOpenRecordModal }) {
  return (
    <section className="relative pt-24 pb-20 px-6 md:px-12 bg-white overflow-hidden border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: CTA Copy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100/90 border border-neutral-200/50 text-[11px] font-sans font-medium text-neutral-800 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
            <span className="tracking-wide">OPEN INVITATION</span>
          </div>

          <h2 className="font-headline font-medium text-5xl sm:text-6xl md:text-7xl tracking-[-0.04em] leading-[0.98] text-[#0d0e12]">
            <span>Found something?</span>
            <span className="block text-[#b4b7be] font-medium">
              Put it on the record.
            </span>
          </h2>

          <p className="text-neutral-600 text-base md:text-lg max-w-lg font-light leading-relaxed">
            Whether you are a field botanist in the Himalayas or a backyard observer, contribute your biological findings to the perpetual cryptographic heritage of Earth.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={onOpenRecordModal}
              variant="dark"
              className="px-8 py-4 text-sm font-medium tracking-wide"
            >
              <span>Record Specimen Now</span>
              <ArrowRight size={16} />
            </MagneticButton>

            <span className="text-xs font-sans font-medium text-neutral-400">
              Zero gas fees for verified non-profit herbaria
            </span>
          </div>
        </div>

        {/* Right Column: Nasturtium & Water Lily Green Leaves Visual */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-emerald-300/20 via-transparent to-transparent blur-2xl pointer-events-none" />

          <div className="relative w-full max-w-[420px] aspect-[4/4] rounded-3xl overflow-hidden shadow-lg group">
            <img
              src="/assets/footer-green-leaves.jpg"
              alt="Nasturtium and Lotus Botanical Leaves"
              className="w-full h-full object-cover filter saturate-105 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl glass-panel text-[11px] font-sans font-medium text-neutral-800 flex items-center justify-between border border-white/80">
              <span className="flex items-center gap-1.5">
                <Leaf size={14} className="text-emerald-600" />
                <span>Tropaeolum Majus (Nasturtium)</span>
              </span>
              <span className="text-neutral-400">#0921-VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
