'use client';

import { motion, MotionValue } from 'framer-motion';

interface Props {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export default function CustomCursor({ mouseX, mouseY }: Props) {
  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[1000] mix-blend-difference"
      style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.5 }}
    />
  );
}
