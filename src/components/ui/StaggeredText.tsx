'use client';

import { motion } from 'framer-motion';

interface Props {
  text: string;
  delay?: number;
}

export default function StaggeredText({ text, delay = 0 }: Props) {
  const words = text.split(' ');
  return (
    <motion.div className="flex flex-wrap overflow-hidden">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mr-[0.2em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
