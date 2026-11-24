import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import SpecimenCarousel from './components/SpecimenCarousel';
import ProtocolSection from './components/ProtocolSection';
import EcosystemSection from './components/EcosystemSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import DewDropsCanvas from './components/DewDropsCanvas';
import VerificationModal from './components/VerificationModal';
import RecordSpecimenModal from './components/RecordSpecimenModal';
import { Eye, Image as ImageIcon, X } from 'lucide-react';
import { playChime } from './utils/audio';

export default function App() {
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [showMockupCompare, setShowMockupCompare] = useState(false);

  useEffect(() => {
    // Ultra-smooth, responsive Lenis scroll
    const lenis = new Lenis({
      lerp: 0.1, // responsive smooth linear interpolation
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      smoothWheel: true,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fafafa] text-nature-dark selection:bg-purple-200 selection:text-purple-900">
      {/* Custom Precision Follower Cursor */}
      <CustomCursor />

      {/* Floating Dewdrop & Light Mote Particles */}
      <DewDropsCanvas />

      {/* Navigation Bar */}
      <Navbar
        onOpenRecordModal={() => {
          playChime('click');
          setIsRecordModalOpen(true);
        }}
      />

      {/* Main Page Sections matching the design hierarchy */}
      <main>
        {/* Section 1: Hero ("Blockchain record for nature never deleted.") */}
        <HeroSection
          onOpenRecordModal={() => {
            playChime('click');
            setIsRecordModalOpen(true);
          }}
          onOpenVerifyModal={() => {
            playChime('click');
            setIsVerifyModalOpen(true);
          }}
        />

        {/* Section 2: Stats ("We give nature a chance to record" - 12B, 1.2K) */}
        <StatsSection />

        {/* Section 3: Specimen Carousel ("Every record begins with where it came from.") */}
        <SpecimenCarousel />

        {/* Section 4: Protocol ("Three ways in. One record underneath.") */}
        <ProtocolSection
          onOpenVerifyModal={() => {
            playChime('click');
            setIsVerifyModalOpen(true);
          }}
        />

        {/* Section 5: Ecosystem ("Custody, not ownership. Four roles, one record.") */}
        <EcosystemSection />
      </main>

      {/* Footer styled to match reference mockup */}
      <Footer
        onOpenRecordModal={() => {
          playChime('click');
          setIsRecordModalOpen(true);
        }}
      />

      {/* Interactive Verification Proof Modal */}
      <VerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      />

      {/* Interactive Record Specimen Modal */}
      <RecordSpecimenModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
      />

      {/* Floating Toggle Pill to compare with user's original mockup */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => {
            playChime('click');
            setShowMockupCompare(!showMockupCompare);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-pill border border-neutral-300 text-xs font-sans font-medium font-medium text-neutral-800 shadow-lg hover:bg-white hover:scale-105 transition-all"
        >
          <ImageIcon size={14} className="text-purple-600" />
          <span>{showMockupCompare ? 'Close Mockup' : 'View Original Mockup'}</span>
        </button>
      </div>

      {/* Original Mockup Comparison Drawer */}
      {showMockupCompare && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[360px] md:w-[420px] bg-white/95 backdrop-blur-xl z-50 shadow-2xl border-l border-neutral-200 p-4 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <span className="text-xs font-sans font-medium text-neutral-900 uppercase">
              Original Design Reference
            </span>
            <button
              onClick={() => setShowMockupCompare(false)}
              className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500"
            >
              <X size={18} />
            </button>
          </div>
          <div className="py-4">
            <p className="text-xs font-sans font-medium text-neutral-500 mb-3">
              Uploaded design mockup by user. Compare side-by-side with live reactive page:
            </p>
            <img
              src="/assets/reference-mockup.jpg"
              alt="Original Reference Mockup"
              className="w-full rounded-2xl border border-neutral-200 shadow-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
