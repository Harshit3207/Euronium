import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { playChime } from '../utils/audio';

export default function HeroSection({ onOpenRecordModal, onOpenVerifyModal }) {
  const containerRef = useRef(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const flowerY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Interactive 3D tilt for the "Proof of life" card
  const cardX = useMotionValue(0);
  const cardRotY = useMotionValue(0);
  const springCardX = useSpring(cardX, { stiffness: 200, damping: 22 });
  const springCardY = useSpring(cardRotY, { stiffness: 200, damping: 22 });

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / 16;
    const y = (e.clientY - (rect.top + rect.height / 2)) / 16;
    cardX.set(x);
    cardRotY.set(-y);
  };

  const handleCardMouseLeave = () => {
    cardX.set(0);
    cardRotY.set(0);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-between overflow-hidden bg-[#fafafa]"
    >
      {/* Background Exact Botanical Flower (Right Side, as in reference) */}
      <motion.div
        style={{ y: flowerY }}
        className="absolute -right-8 sm:right-[-2%] md:right-[2%] lg:right-[4%] xl:right-[7%] top-[2%] sm:top-[0%] md:top-[-2%] w-[85vw] sm:w-[62vw] md:w-[50vw] lg:w-[44vw] max-w-[760px] h-[75%] sm:h-[95%] md:h-[105%] pointer-events-none z-0 flex items-center justify-end will-change-transform transform-gpu opacity-40 sm:opacity-85 md:opacity-100"
      >
        {/* Soft Ethereal Glow behind the flower */}
        <div className="absolute top-1/4 right-1/4 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full bg-purple-300/20 blur-[100px] sm:blur-[130px] pointer-events-none" />

        {/* The Exact Uploaded Purple Flower with Micro-dot Glistening Texture */}
        <motion.img
          src="/assets/hero-flower-exact.png"
          alt="Euronium Botanical Specimen"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-contain object-right-top filter contrast-[1.02] drop-shadow-[0_25px_60px_rgba(147,51,234,0.12)]"
        />
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Hero Headline (Left Side) */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="pt-4 sm:pt-6 md:pt-10 max-w-4xl"
        >
          <h1 className="font-headline font-medium text-[12vw] sm:text-[9.5vw] md:text-[6.8vw] lg:text-[5.8rem] xl:text-[6.6rem] tracking-[-0.04em] leading-[0.95] text-[#0a0a0c] break-words">
            <span className="block">Blockchain</span>
            <span className="block">record for nature</span>
            <span className="block text-[#c5c5c9]">
              never deleted
            </span>
          </h1>
        </motion.div>

        {/* Middle Metadata Strip (as in reference: PUBLIC REGISTRY · EST. 2026 / ( EURONIUM ) / SCROLL TO EXPLORE ↓) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="py-8 sm:py-10 md:py-14 flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-3 items-start sm:items-center text-[10px] sm:text-[11px] font-sans font-medium tracking-widest uppercase text-neutral-500"
        >
          <div className="text-left font-medium">
            PUBLIC REGISTRY · EST. 2026
          </div>
          <div className="text-left sm:text-center text-neutral-400 font-normal">
            ( EURONIUM )
          </div>
          <div className="text-left sm:text-right text-neutral-500 font-medium flex items-center sm:justify-end gap-1.5">
            <span>SCROLL TO EXPLORE</span>
            <span className="text-sm leading-none">↓</span>
          </div>
        </motion.div>

        {/* Bottom Split Row: Left "Proof of life" Card & Right "Register a record" CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end pt-2 sm:pt-4 pb-2">
          {/* Bottom Left: Floating "Proof of life" Card (Exact Replica of Reference) */}
          <motion.div
            style={{
              x: springCardX,
              rotateX: springCardY,
              perspective: 1000,
            }}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="lg:col-span-5 max-w-full sm:max-w-[360px] w-full p-4 sm:p-5 rounded-2xl sm:rounded-[1.8rem] bg-white/95 backdrop-blur-xl border border-black/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_50px_rgba(147,51,234,0.1)] transition-all duration-300"
          >
            {/* Top Row: Thumbnail + Title + Metadata */}
            <div className="flex items-start gap-3.5 pb-4">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-amber-50 border border-amber-200/60 flex-shrink-0 flex items-center justify-center p-1 shadow-sm">
                <img
                  src="/assets/specimen-gold.jpg"
                  alt="GR-0918 Specimen"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-headline font-medium text-sm text-neutral-900 leading-snug">
                  Proof of life
                </h3>
                <p className="text-[11px] font-sans font-medium text-neutral-500">
                  GR-0918 · by Field ranger
                </p>
                <p className="text-[10px] text-neutral-400 font-sans">
                  Photo, GPS and date attached
                </p>
              </div>
            </div>

            {/* Buttons Row: "↗ View record" (Black) and "Share" (White/Light) */}
            <div className="grid grid-cols-2 gap-2 pt-1 pb-3">
              <button
                onClick={() => {
                  playChime('click');
                  onOpenVerifyModal();
                }}
                className="w-full py-2 px-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>↗ View record</span>
              </button>
              <button
                onClick={() => {
                  playChime('click');
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="w-full py-2 px-3 rounded-full bg-neutral-100/90 hover:bg-neutral-200/90 text-neutral-700 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Share</span>
              </button>
            </div>

            {/* Verification Strip: Found by Field ranger ... Stays on record */}
            <div className="py-2.5 px-3 rounded-xl bg-neutral-50/90 border border-neutral-100 flex items-center justify-between text-[10px] font-sans font-medium text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-400/80 inline-block ring-2 ring-rose-100" />
                <span className="font-medium text-neutral-800">Found by Field ranger</span>
              </div>
              <span className="text-neutral-400">Stays on record</span>
            </div>

            {/* Micro Caption */}
            <p className="pt-3 text-[10px] text-neutral-400 font-sans text-center leading-normal">
              Each layer is signed by a verifier. Nobody can rewrite it.
            </p>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Bottom Right: Infrastructure Paragraph + "Register a record ↗" Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="lg:col-span-5 flex flex-col items-start lg:items-end text-left lg:text-right space-y-3 sm:space-y-4 pt-3 sm:pt-0"
          >
            {/* Infrastructure Statement (Exact text from reference) */}
            <p className="max-w-[340px] text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider text-neutral-800 leading-relaxed">
              A BLOCKCHAIN-BASED REGISTRY THAT GIVES NATURE A VERIFIABLE RECORD. BUILT AS INFRASTRUCTURE FOR CONSERVATION, FINANCE AND TRADE — NOT A SINGLE APP.
            </p>

            {/* Black Pill Button: "Register a record ↗" */}
            <MagneticButton
              onClick={() => {
                playChime('click');
                onOpenRecordModal();
              }}
              variant="dark"
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-medium tracking-wide"
            >
              <span>Register a record</span>
              <span className="text-sm font-light">↗</span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
