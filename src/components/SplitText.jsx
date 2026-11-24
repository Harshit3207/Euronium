import React from 'react';
import { motion } from 'framer-motion';

export default function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
  as = 'h2',
  highlight = false,
}) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: '70%',
      rotateX: -40,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: '0%',
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 100,
        mass: 0.8,
      },
    },
  };

  const Tag = as;

  return (
    <Tag className={`overflow-hidden inline-block ${className}`}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden mr-[0.26em] pb-1">
            <motion.span
              variants={childVariants}
              className={`inline-block origin-bottom ${
                highlight ? 'text-purple-600' : ''
              }`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
