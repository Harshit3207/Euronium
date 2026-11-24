import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { playChime } from '../utils/audio';

function Counter({ end, duration = 2.2, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(ease * end);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-headline font-medium tracking-[-0.04em]">
      {end >= 10 ? Math.round(count) : count.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section id="about" className="relative py-14 sm:py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#ffffff] overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full space-y-12 sm:space-y-16 md:space-y-24">
        {/* Top Header Row: "• ABOUT US" pill on Left, "(01)" on Right */}
        <div className="flex items-center justify-between pb-2 sm:pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100/90 border border-neutral-200/50 text-[11px] font-sans font-medium text-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
            <span className="font-medium tracking-wide">ABOUT US</span>
          </div>

          <span className="font-sans font-medium text-xs md:text-sm text-neutral-400 font-medium">
            (01)
          </span>
        </div>

        {/* Section Headline Row + New Finds Community Widget */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          {/* Main Headline */}
          <div className="max-w-3xl">
            <h2 className="font-headline font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[5.2rem] tracking-[-0.04em] leading-[0.98] text-[#0a0a0c]">
              <span className="block">We give nature</span>
              <span className="block text-[#c5c5c9]">
                a chance to record
              </span>
            </h2>
          </div>

          {/* New Finds Community Badge (as in reference: 3 Avatars + "2,481 New finds") */}
          <div className="flex items-center gap-3.5 self-start lg:self-center">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-2 overflow-hidden items-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white overflow-hidden bg-sky-50 shadow-sm flex items-center justify-center">
                <img
                  src="/assets/specimen-blue.jpg"
                  alt="Blue Bloom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white overflow-hidden bg-amber-50 shadow-sm flex items-center justify-center">
                <img
                  src="/assets/specimen-gold.jpg"
                  alt="Gold Bud"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white bg-neutral-950 flex items-center justify-center text-white text-xs font-sans font-medium font-medium shadow-sm">
                +
              </div>
            </div>

            {/* Finds Counter Copy */}
            <div className="text-left space-y-0.5">
              <div className="font-headline font-medium text-sm sm:text-base md:text-lg text-neutral-950 leading-tight">
                2,481 New finds
              </div>
              <div className="text-[9px] sm:text-[10px] font-sans font-medium tracking-wider uppercase text-neutral-400">
                RECORDED THIS WEEK · WORLDWIDE
              </div>
            </div>
          </div>
        </div>

        {/* Big Stats Row: Stadium Capsule 1 (12B) + Circle Badge 2 (1.2K) */}
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
          {/* Main Stadium Capsule 1 (12B Records signed so far) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:flex-1 relative rounded-3xl sm:rounded-full p-4 sm:p-3 sm:pr-8 md:pr-14 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8 border border-neutral-200/80 shadow-[0_12px_40px_rgba(30,58,138,0.06)] overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #1e3a68 0%, #294d84 12%, #4a75b2 26%, #94b5e1 45%, #dbe7f7 65%, #f6f9fd 85%, #ffffff 100%)',
            }}
          >
            {/* Left White Circular Dial for "12B" */}
            <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full bg-white flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex-shrink-0 relative z-10">
              <div className="text-5xl sm:text-6xl md:text-[5.5rem] leading-none text-[#0a0a0c]">
                <Counter end={12} suffix="B" />
              </div>
              <p className="mt-2 text-[9px] sm:text-[10px] font-sans font-medium uppercase tracking-widest text-neutral-500 font-medium">
                EURONIUM · LIVE COUNT
              </p>
            </div>

            {/* Right Statement inside Stadium Capsule */}
            <div className="flex-1 py-2 sm:py-0 text-center sm:text-left space-y-1 relative z-10">
              <p className="font-headline font-normal sm:font-medium text-xl sm:text-2xl md:text-[2rem] text-neutral-900 leading-[1.15] tracking-[-0.03em]">
                Records signed so far.
              </p>
              <p className="font-headline font-normal sm:font-medium text-xl sm:text-2xl md:text-[2rem] text-neutral-900 leading-[1.15] tracking-[-0.03em]">
                Not one of them deleted.
              </p>
              <div className="pt-3 sm:pt-4">
                <span className="font-sans font-medium text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                  EURONIUM · PUBLIC REGISTRY
                </span>
              </div>
            </div>
          </motion.div>

          {/* Standalone Circular Stat Badge 2 ("1.2K" FIELD RANGERS) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full bg-[#f8f9fa] border border-neutral-200/70 shadow-[0_8px_35px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center p-4 sm:p-6 flex-shrink-0"
          >
            <div className="text-5xl sm:text-6xl md:text-[5.5rem] leading-none text-[#0a0a0c]">
              <Counter end={1.2} suffix="K" />
            </div>
            <p className="mt-2 sm:mt-3 text-[9px] sm:text-[10px] font-sans font-medium uppercase tracking-widest text-neutral-500 font-medium">
              FIELD RANGERS
            </p>
            <p className="mt-1 font-sans text-xs sm:text-[13px] text-neutral-700 font-normal">
              Signing finds every day
            </p>
          </motion.div>
        </div>

        {/* Bottom Statement Row: Left Metadata Paragraph + Right Giant Headline */}
        <div className="pt-6 sm:pt-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end">
          {/* Left Metadata Paragraph */}
          <div className="md:col-span-5 lg:col-span-4">
            <p className="max-w-[280px] font-sans font-medium text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-800 leading-relaxed">
              EVERY RECORD NAMES WHO FOUND IT, WHO CHECKED IT AND WHO LOOKS AFTER IT — SIGNED IN THE FIELD, KEPT FOR GOOD.
            </p>
          </div>

          {/* Right Giant Headline */}
          <div className="md:col-span-7 lg:col-span-8 text-left md:text-right">
            <h3 className="font-headline font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[4.6rem] xl:text-[5.2rem] tracking-[-0.04em] leading-[0.96] text-[#0a0a0c]">
              <span className="block">Every find keeps</span>
              <span className="block text-[#c5c5c9]">
                its discoverer’s name.
              </span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
