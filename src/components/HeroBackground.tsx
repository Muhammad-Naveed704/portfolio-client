'use client';

import { motion } from 'framer-motion';

/** Animated hero backdrop — rings, grid, orbs, light beams */
export default function HeroBackground() {
  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Soft color washes */}
      <div className="absolute inset-0 bg-xws-radial-green opacity-80" />
      <div className="absolute inset-0 bg-xws-radial-blue opacity-70" />
      <div className="xws-hero-grid" />

      {/* Concentric rings */}
      <div className="xws-hero-rings">
        <span />
        <span />
        <span />
        <span />
        <span className="xws-hero-ring-dashed" />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="xws-hero-orb xws-hero-orb--cyan"
        style={{ top: '12%', left: '8%' }}
        animate={{ y: [0, -18, 0], x: [0, 10, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="xws-hero-orb xws-hero-orb--green"
        style={{ top: '18%', right: '10%' }}
        animate={{ y: [0, 14, 0], x: [0, -12, 0], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="xws-hero-orb xws-hero-orb--green xws-hero-orb--sm"
        style={{ bottom: '22%', left: '14%' }}
        animate={{ y: [0, -12, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="xws-hero-orb xws-hero-orb--cyan xws-hero-orb--sm"
        style={{ bottom: '28%', right: '12%' }}
        animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Diagonal light beams */}
      <div className="xws-hero-beam xws-hero-beam--1" />
      <motion.div className="xws-hero-beam xws-hero-beam--2" />

      {/* Center spotlight behind headline */}
      <motion.div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,42rem)] h-[min(50vh,28rem)] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(52,211,153,0.14) 0%, rgba(34,211,238,0.06) 40%, transparent 70%)',
        }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle scan line */}
      <motion.div
        className="xws-hero-scanline"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Dot constellation */}
      <div className="xws-hero-dots" />
    </motion.div>
  );
}
