import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { playChime } from '../utils/audio';

export default function MagneticButton({
  children,
  onClick,
  className = '',
  variant = 'dark', // 'dark', 'glass', 'outline'
  strength = 0.35,
  ...props
}) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * strength;
    const y = (e.clientY - (top + height / 2)) * strength;
    setPosition({ x, y });

    const glareX = ((e.clientX - left) / width) * 100;
    const glareY = ((e.clientY - top) / height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    playChime('click');
    if (onClick) onClick(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden transition-all duration-300 focus:outline-none select-none';

  let variantStyles = '';
  if (variant === 'dark') {
    variantStyles =
      'bg-neutral-950 text-white hover:bg-neutral-900 shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.25)] border border-neutral-800';
  } else if (variant === 'glass') {
    variantStyles =
      'glass-pill text-neutral-900 hover:bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/5 hover:border-purple-300';
  } else if (variant === 'pill-purple') {
    variantStyles =
      'bg-purple-600 text-white hover:bg-purple-700 shadow-glow-pill border border-purple-500';
  }

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.96 }}
      className={`${baseStyles} ${variantStyles} ${className}`}
      data-cursor="pointer"
      {...props}
    >
      {/* Specular Glare Effect */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
