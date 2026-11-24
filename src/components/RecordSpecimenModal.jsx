import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MapPin, Upload, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { playChime } from '../utils/audio';

export default function RecordSpecimenModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    speciesName: 'Wild Orchid (Cypripedium calceolus)',
    discovererName: 'Aurélien De Vries',
    location: '46°12\'08"N 11°07\'50"E',
    elevation: '1,840m ASL',
    notes: 'Discovered in alpine limestone talus slope. Micro-droplet condensation intact.',
  });

  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [createdHash, setCreatedHash] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsMinting(true);
    playChime('click');

    setTimeout(() => {
      setIsMinting(false);
      setMintSuccess(true);
      setCreatedHash('0x9a4f' + Math.random().toString(16).substring(2, 10) + '...e81');
      playChime('verify');
    }, 1800);
  };

  const handleReset = () => {
    setMintSuccess(false);
    onClose();
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
          className="relative max-w-lg w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-neutral-200 z-10 max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-purple-100 text-purple-800 mb-1">
                <Sparkles size={11} />
                <span>GENESIS PROTOCOL</span>
              </div>
              <h3 className="font-headline font-medium text-lg text-neutral-900">
                Record Specimen To Blockchain
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {!mintSuccess ? (
            <form onSubmit={handleSubmit} className="py-5 space-y-4 text-xs font-sans font-medium">
              <div>
                <label className="block text-neutral-500 mb-1">SPECIMEN / TAXA NAME</label>
                <input
                  type="text"
                  required
                  value={formData.speciesName}
                  onChange={(e) => setFormData({ ...formData, speciesName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/70 focus:bg-white focus:border-purple-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-500 mb-1">DISCOVERER</label>
                  <input
                    type="text"
                    required
                    value={formData.discovererName}
                    onChange={(e) => setFormData({ ...formData, discovererName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/70 focus:bg-white focus:border-purple-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">ELEVATION</label>
                  <input
                    type="text"
                    required
                    value={formData.elevation}
                    onChange={(e) => setFormData({ ...formData, elevation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/70 focus:bg-white focus:border-purple-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">GPS COORDINATES</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/70 focus:bg-white focus:border-purple-600 focus:outline-none transition-colors"
                  />
                  <MapPin size={14} className="absolute left-3 top-3 text-purple-600" />
                </div>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">FIELD NOTES & MICRO-EVIDENCE</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-neutral-50/70 focus:bg-white focus:border-purple-600 focus:outline-none transition-colors font-sans text-xs"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/50 flex items-center justify-between text-neutral-600">
                <span className="text-[11px]">IMMUTABLE PERPETUAL GAS:</span>
                <span className="font-medium text-purple-900">0.0000 ETH (SUBSIDIZED)</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-sans font-medium text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isMinting}
                  className="px-6 py-2.5 rounded-full text-xs font-sans font-medium font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-sm"
                >
                  {isMinting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Broadcasting to Consensus...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={14} className="text-purple-400" />
                      <span>Mint Specimen Record</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-headline font-medium text-2xl text-neutral-900">
                Specimen Successfully Minted!
              </h4>
              <p className="text-xs font-sans font-medium text-neutral-500 max-w-sm mx-auto">
                Transaction included in Block #1,842,911. Replicated across 184 consensus herbaria nodes.
              </p>
              <div className="p-3 rounded-xl bg-neutral-100 text-[11px] font-sans font-medium text-purple-900 break-all select-all">
                Hash: {createdHash}
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-full text-xs font-sans font-medium font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
