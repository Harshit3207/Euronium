import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, Copy, ExternalLink, RefreshCw, Sparkles, Hash } from 'lucide-react';
import { playChime } from '../utils/audio';

export default function VerificationModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(true);

  if (!isOpen) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    playChime('click');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReVerify = () => {
    setVerifying(true);
    playChime('click');
    setTimeout(() => {
      setVerifying(false);
      setVerifiedSuccess(true);
      playChime('verify');
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-lg w-full bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-neutral-200 z-10 overflow-hidden"
        >
          {/* Top Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="font-headline font-medium text-base text-neutral-900">
                  Cryptographic Provenance Certificate
                </h3>
                <span className="text-[10px] font-sans font-medium text-neutral-400">
                  STANDARD ERC-721B / ZK-SNARK GROTH16
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Certificate Body */}
          <div className="py-6 space-y-4">
            {/* Status Pill */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <div>
                  <div className="text-xs font-sans font-medium text-emerald-900">
                    STATUS: IMMUTABLE & VERIFIED
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    Consensus achieved by 12 independent botanical nodes.
                  </div>
                </div>
              </div>

              <button
                onClick={handleReVerify}
                disabled={verifying}
                className="p-2 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                title="Re-verify against Arweave"
              >
                <RefreshCw size={14} className={verifying ? 'animate-spin' : ''} />
              </button>
            </div>

            {/* Proof Details */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2.5 text-xs font-sans font-medium">
              <div className="flex justify-between items-center text-neutral-500">
                <span>SPECIES IDENTIFIER:</span>
                <span className="font-medium text-neutral-900">Magnolia Liliiflora Desr.</span>
              </div>

              <div className="flex justify-between items-center text-neutral-500">
                <span>GEOLOCATION PROOF:</span>
                <span className="text-neutral-800">35°41'22.1"N 139°41'30.2"E</span>
              </div>

              <div className="flex justify-between items-center text-neutral-500">
                <span>TIMESTAMP (UTC):</span>
                <span className="text-neutral-800">2024-11-24 05:14:02 UTC</span>
              </div>

              <div className="flex justify-between items-center text-neutral-500">
                <span>BLOCK HEIGHT:</span>
                <span className="text-purple-700 font-medium">#1,842,910</span>
              </div>

              <div className="pt-2 border-t border-neutral-200">
                <div className="text-neutral-400 mb-1 flex items-center justify-between">
                  <span>ROOT MERKLE HASH:</span>
                  <button
                    onClick={() => handleCopy('0x7b4ae812c3098f9213bc54d924e71ab842f109b8')}
                    className="text-purple-600 hover:underline flex items-center gap-1"
                  >
                    <Copy size={11} />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-2 rounded bg-neutral-900 text-purple-300 text-[10px] break-all select-all font-sans font-medium">
                  0x7b4ae812c3098f9213bc54d924e71ab842f109b82c7a
                </div>
              </div>
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-sans font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              Close
            </button>
            <a
              href="https://arweave.net"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full text-xs font-sans font-medium font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <span>View On Arweave</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
