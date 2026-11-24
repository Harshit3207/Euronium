import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Shield, Eye, Lock, Plus } from 'lucide-react';
import { playChime } from '../utils/audio';

const rolesData = [
  {
    id: 'landowner',
    title: 'Landowner',
    icon: MapPin,
    description:
      'APPROVES WHO CAN ACCESS, HARVEST AND TRADE ON THE SITE — BUT CAN’T ERASE THE DISCOVERER’S CREDIT.',
    orbitNodes: [
      { id: 'n1', label: 'Access', position: 'top', isLocked: false },
      { id: 'n2', label: 'Harvest', position: 'right', isLocked: false },
      { id: 'n3', label: 'Erase discoverer', position: 'bottom', isLocked: true },
      { id: 'n4', label: 'Trade', position: 'left', isLocked: false },
    ],
  },
  {
    id: 'discoverer',
    title: 'Discoverer',
    icon: Search,
    description:
      'LOGS PHYSICAL GPS, HIGH-RES SCANS AND TAXONOMIC BIOMETRICS — PERPETUALLY CREDITED AS THE FIRST OBSERVER.',
    orbitNodes: [
      { id: 'n1', label: 'Observe', position: 'top', isLocked: false },
      { id: 'n2', label: 'Register', position: 'right', isLocked: false },
      { id: 'n3', label: 'Alter origin', position: 'bottom', isLocked: true },
      { id: 'n4', label: 'Provenance', position: 'left', isLocked: false },
    ],
  },
  {
    id: 'verifier',
    title: 'Verifier',
    icon: Shield,
    description:
      'BOTANICAL CONSENSUS NODES CROSS-CHECKING PHENOTYPIC TRAITS AND DNA BARCODES TO ELIMINATE FALSE CLAIMS.',
    orbitNodes: [
      { id: 'n1', label: 'Validate', position: 'top', isLocked: false },
      { id: 'n2', label: 'Consensus', position: 'right', isLocked: false },
      { id: 'n3', label: 'Forge proof', position: 'bottom', isLocked: true },
      { id: 'n4', label: 'Timestamp', position: 'left', isLocked: false },
    ],
  },
  {
    id: 'guardian',
    title: 'Guardian',
    icon: Eye,
    description:
      'CONSERVATION GUILDS AND HERBARIA STEWARDING HABITAT INTEGRITY AND LONG-TERM SPECIMEN PROTECTION.',
    orbitNodes: [
      { id: 'n1', label: 'Protect', position: 'top', isLocked: false },
      { id: 'n2', label: 'Monitor', position: 'right', isLocked: false },
      { id: 'n3', label: 'Exploit habitat', position: 'bottom', isLocked: true },
      { id: 'n4', label: 'Endow', position: 'left', isLocked: false },
    ],
  },
];

export default function EcosystemSection() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  const selectRole = (index) => {
    playChime('click');
    setActiveRoleIndex(index);
  };

  const activeRole = rolesData[activeRoleIndex];
  const ActiveIcon = activeRole.icon;

  return (
    <section id="roles" className="relative py-14 sm:py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full space-y-8 sm:space-y-12">
        {/* Top Header Row: "• ROLES (04)" on Left, "(04)" on Right */}
        <div className="flex items-center justify-between pb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/70 text-[11px] font-sans font-medium text-neutral-800 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
            <span className="tracking-wide">ROLES (04)</span>
          </div>

          <span className="font-sans text-xs md:text-sm text-neutral-400 font-medium">
            (04)
          </span>
        </div>

        {/* Section Headline & Description Paragraph */}
        <div className="pt-2 max-w-4xl space-y-4 sm:space-y-5">
          <h2 className="font-headline font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[5.2rem] tracking-[-0.04em] leading-[0.96] text-[#0a0a0c]">
            <span className="block">Custody, not ownership.</span>
            <span className="block text-[#c5c5c9]">
              Four roles, one record.
            </span>
          </h2>

          <p className="max-w-[380px] font-sans font-medium text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-800 leading-relaxed">
            ONE POINT ON THE MAP HOLDS FOUR CLAIMS. EACH ROLE SIGNS ITS OWN LAYER — NONE OF THEM CAN REWRITE THE RECORD.
          </p>
        </div>

        {/* Main Interactive Grid: Left Active Role & Inactive Pills / Right Stadium Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-4 pb-2">
          {/* Left Column: Expanded Active Role + Inactive Pills */}
          <div className="lg:col-span-5 space-y-4">
            {/* Active Expanded Role (Matches Reference Exactly) */}
            <div className="pb-2">
              {/* Black Circular Icon Button */}
              <div className="w-11 h-11 rounded-full bg-neutral-950 flex items-center justify-center text-white mb-3.5 shadow-sm">
                <ActiveIcon size={18} />
              </div>

              {/* Title */}
              <h3 className="font-headline font-medium text-2xl text-neutral-950 leading-snug">
                {activeRole.title}
              </h3>

              {/* Description */}
              <p className="font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-wider text-neutral-700 leading-relaxed max-w-[360px] mt-2">
                {activeRole.description}
              </p>
            </div>

            {/* Inactive Role Selector Pills (Click to Expand) */}
            <div className="space-y-2.5 pt-2">
              {rolesData.map((role, idx) => {
                if (idx === activeRoleIndex) return null;
                const RoleIcon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => selectRole(idx)}
                    className="w-full max-w-[360px] py-3.5 px-4 rounded-full bg-[#f4f5f7] hover:bg-[#eaebed] transition-all duration-200 flex items-center justify-between text-left group border border-neutral-200/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-neutral-700 shadow-xs group-hover:scale-105 transition-transform">
                        <RoleIcon size={14} />
                      </div>
                      <span className="font-headline font-medium text-sm text-neutral-900">
                        {role.title}
                      </span>
                    </div>

                    <span className="text-neutral-400 font-light text-base group-hover:text-neutral-800 pr-1 transition-colors">
                      +
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Giant Horizontal Stadium Pill with Ethereal Lavender Gradient (Exact match to reference, no shadow) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[620px] md:max-w-[660px] h-[300px] sm:h-[400px] md:h-[480px] rounded-3xl sm:rounded-full p-3 sm:p-4 flex items-center justify-center overflow-hidden sm:overflow-visible"
              style={{
                background:
                  'linear-gradient(90deg, #ffffff 0%, #f8f3fe 15%, #ebdcfb 40%, #caaef2 72%, #b898ec 100%)',
              }}
            >
              {/* Central Circular Lens Housing the Purple Botanical Specimen (No shadow, flat crisp white circle) */}
              <motion.div
                key={activeRole.id}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full bg-white flex items-center justify-center shadow-xs"
              >
                {/* Orbiting Fine Dashed Ring */}
                <div className="absolute inset-[-14px] sm:inset-[-22px] rounded-full border border-white/70 border-dashed pointer-events-none" />

                {/* The Exact Purple Botanical Specimen */}
                <div className="w-[82%] h-[82%] rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/assets/hero-flower-exact.png"
                    alt="Living Botanical Specimen"
                    className="w-full h-full object-contain filter contrast-[1.03] select-none"
                  />
                </div>

                {/* 4 Orbiting Protocol Nodes matching reference positioning */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRole.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {activeRole.orbitNodes.map((node) => {
                      let posClass = '';
                      if (node.position === 'top') {
                        posClass = 'top-[-10px] sm:top-[-14px] left-1/2 -translate-x-1/2';
                      } else if (node.position === 'right') {
                        posClass = 'right-[-12px] sm:right-[-20px] top-1/2 -translate-y-1/2';
                      } else if (node.position === 'bottom') {
                        posClass = 'bottom-[-10px] sm:bottom-[-14px] left-1/2 -translate-x-1/2';
                      } else if (node.position === 'left') {
                        posClass = 'left-[-12px] sm:left-[-20px] top-1/2 -translate-y-1/2';
                      }

                      return (
                        <div
                          key={node.id}
                          className={`absolute ${posClass} pointer-events-auto px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white text-[10px] sm:text-[11px] font-sans font-medium text-neutral-800 flex items-center gap-1.5 whitespace-nowrap shadow-xs`}
                        >
                          {node.isLocked ? (
                            <>
                              <Lock size={11} className="text-neutral-500" />
                              <span>{node.label}</span>
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                              <span>{node.label}</span>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
