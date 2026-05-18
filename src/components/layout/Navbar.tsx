'use client';

import { CONFIG } from '@/lib/config';

interface Props {
  view: string;
  onNavigate: (to: string, data?: any) => void;
}

export default function Navbar({ view, onNavigate }: Props) {
  return (
    <nav className="fixed top-0 w-full p-10 md:p-14 z-[100] flex justify-between items-center mix-blend-difference">
      <div
        onClick={() => onNavigate('home')}
        className="text-sm font-medium tracking-[0.5em] uppercase cursor-pointer hover:opacity-50 transition-all"
      >
        {CONFIG.initials}
      </div>
      <div className="flex gap-8 md:gap-12 text-[10px] uppercase tracking-[0.3em]">
        <a
          href="#work"
          onClick={(e) => { e.preventDefault(); if (view !== 'home') onNavigate('home'); }}
          className="hover:text-neutral-500 transition-colors cursor-pointer"
        >
          Work
        </a>
        <a
          href="#entity"
          onClick={(e) => { e.preventDefault(); if (view !== 'home') onNavigate('home'); }}
          className="hover:text-neutral-500 transition-colors cursor-pointer"
        >
          Entity
        </a>
        <button
          onClick={() => onNavigate('about')}
          className="hover:text-neutral-500 transition-colors"
        >
          About
        </button>
        <a href="mailto:eyadopro88@gmail.com" className="hover:text-neutral-500 transition-colors">
          Contact
        </a>
      </div>
    </nav>
  );
}
