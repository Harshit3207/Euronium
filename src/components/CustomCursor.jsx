import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default'); // 'default', 'pointer', 'text', 'hidden'
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop/mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, input, [data-cursor]');
      if (target) {
        const cursorData = target.getAttribute('data-cursor');
        if (cursorData) {
          setCursorType(cursorData);
        } else {
          setCursorType('pointer');
        }
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-purple-600 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* Trailing Fluid Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 border ${
          cursorType === 'pointer'
            ? 'w-12 h-12 bg-purple-500/10 border-purple-500/60 scale-125'
            : cursorType === 'drag'
            ? 'w-16 h-16 bg-purple-900/10 border-purple-600/70 scale-110'
            : 'w-8 h-8 border-neutral-400/50 bg-white/20'
        } backdrop-blur-[1px]`}
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        {cursorType === 'drag' && (
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-sans font-medium tracking-tighter text-purple-900">
            DRAG
          </span>
        )}
      </motion.div>
    </>
  );
}
