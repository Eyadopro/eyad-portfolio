'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Layers } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/lib/data';

interface Props {
  project: Project;
  onBack: () => void;
}

export default function ProjectView({ project, onBack }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="min-h-screen pt-40 px-10 md:px-24 pb-20 bg-black"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-3 text-neutral-500 hover:text-white transition-all uppercase text-[10px] tracking-widest mb-24"
      >
        <ArrowLeft size={14} /> Back to Library
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
        <div>
          <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-600 mb-6 block">
            {project.category}
          </span>
          <h1 className="text-6xl md:text-9xl font-light tracking-tighter mb-12 leading-none">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-4 mb-16">
            {project.tech?.map((t) => (
              <span
                key={t}
                className="px-6 py-2 border border-neutral-900 rounded-full text-xs text-neutral-500 font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Project Images */}
          <div className="grid grid-cols-2 gap-4 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-neutral-900 group"
            >
              <Image
                src={`/projects/${project.id}-1.jpg`}
                alt={`${project.title} screenshot 1`}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-neutral-900 group"
            >
              <Image
                src={`/projects/${project.id}-2.jpg`}
                alt={`${project.title} screenshot 2`}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>
        </div>

        <div className="space-y-20 pt-10">
          <div>
            <h4 className="text-[10px] uppercase text-neutral-700 tracking-widest mb-6 flex items-center gap-2">
              <Zap size={12} /> The Challenge
            </h4>
            <p className="text-xl font-light text-neutral-300 leading-relaxed italic">
              &ldquo;{project.challenge || 'Pushing the boundaries of browser performance.'}&rdquo;
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase text-neutral-700 tracking-widest mb-6 flex items-center gap-2">
              <Layers size={12} /> Technical Solution
            </h4>
            <p className="text-neutral-400 font-light leading-relaxed">
              {project.solution || 'Proprietary architectural patterns designed for scale.'}
            </p>
          </div>
          {project.metrics && (
            <div className="grid grid-cols-2 gap-8 border-t border-neutral-900 pt-10">
              {project.metrics.map((m, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="text-2xl font-light">{m.split(' ')[0]}</span>
                  <span className="text-[10px] uppercase text-neutral-600 tracking-widest">
                    {m.split(' ').slice(1).join(' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
