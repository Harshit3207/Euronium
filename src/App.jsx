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
import { playChime } from './utils/audio';

export default function App() {
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

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
    </div>
  );
}
