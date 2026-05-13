'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail, Instagram } from 'lucide-react';
import MagneticWrapper from '@/components/ui/MagneticWrapper';

export default function Footer() {
  return (
    <footer className="py-40 px-10 md:px-24 border-t border-neutral-900 bg-black flex flex-col items-center">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-32">
        <div className="text-4xl md:text-8xl font-light tracking-tighter opacity-20 uppercase">
          Architecture <br /> Of Tomorrow
        </div>
        <div className="space-y-4 text-right">
          <p className="text-xs uppercase tracking-widest text-neutral-600">Based in Digital Space</p>
          <p className="text-xl font-light">EST. 2025</p>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-neutral-900 pt-10 gap-6">
        <div className="flex gap-10">
          <MagneticWrapper>
            <a href="https://www.instagram.com/eyadh911/?hl=ar" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} className="text-neutral-600 hover:text-white transition-colors cursor-pointer" />
            </a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a href="https://www.linkedin.com/in/eyad-hani-794b45298/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} className="text-neutral-600 hover:text-white transition-colors cursor-pointer" />
            </a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a href="mailto:eyadopro88@gmail.com" aria-label="Email">
              <Mail size={20} className="text-neutral-600 hover:text-white transition-colors cursor-pointer" />
            </a>
          </MagneticWrapper>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.8em] text-neutral-700 font-bold"
          >
            BY EYAD HANI
          </motion.div>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-4 bg-neutral-800" />
            <span className="text-[9px] uppercase tracking-widest text-neutral-600">
              Full Autonomy Script v2.5
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
