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
      <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em]">
        <a
          href="#work"
          onClick={() => view !== 'home' && onNavigate('home')}
          className="hover:text-neutral-500 transition-colors"
        >
          Work
        </a>
        <a
          href="#entity"
          onClick={() => view !== 'home' && onNavigate('home')}
          className="hover:text-neutral-500 transition-colors"
        >
          Entity
        </a>
        <a href="mailto:contact@eyadhani.com" className="hover:text-neutral-500 transition-colors">
          Contact
        </a>
      </div>
    </nav>
  );
}
