'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Code2, Sparkles, Zap, Target } from 'lucide-react';

export default function AboutView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-40 px-10 md:px-24 pb-20"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-600 block mb-6">
            About Me
          </span>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-8">Eyad Hani</h1>
          <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
            AI Architect & Full-Stack Engineer crafting the future of digital experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
          <div className="flex items-center gap-4 p-6 border border-neutral-900 rounded-xl bg-neutral-950/20">
            <Calendar size={20} className="text-neutral-600" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Age</p>
              <p className="text-lg font-light">18 Years Old</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 border border-neutral-900 rounded-xl bg-neutral-950/20">
            <MapPin size={20} className="text-neutral-600" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1">Location</p>
              <p className="text-lg font-light">10th of Ramadan City</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-light tracking-tight mb-8 flex items-center gap-3">
            <Sparkles size={24} className="text-neutral-600" />
            Philosophy
          </h2>
          <div className="space-y-6 text-neutral-400 font-light leading-relaxed">
            <p>
              I believe that <span className="text-white font-normal">exceptional software</span> is
              born at the intersection of technical mastery and creative vision. Every line of code is
              an opportunity to push boundaries, challenge conventions, and create experiences that
              resonate deeply with users.
            </p>
            <p>
              My approach combines{' '}
              <span className="text-white font-normal">rigorous engineering discipline</span> with an
              obsessive attention to detail in UI/UX design. I don&apos;t just build applications — I
              architect systems that are elegant, performant, and built to scale.
            </p>
            <p>
              Driven by an insatiable curiosity, I&apos;m constantly exploring emerging technologies,
              from advanced AI architectures to cutting-edge frontend frameworks. The goal is always
              the same:{' '}
              <span className="text-white font-normal">deliver experiences that feel effortless</span>,
              even when the underlying complexity is immense.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-light tracking-tight mb-10 flex items-center gap-3">
            <Zap size={24} className="text-neutral-600" />
            Core Strengths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Code2,
                title: 'Full-Stack Mastery',
                desc: 'End-to-end development from system architecture to pixel-perfect UIs, leveraging modern frameworks and best practices.',
              },
              {
                icon: Target,
                title: 'Performance Obsession',
                desc: 'Every millisecond counts. I optimize relentlessly — from render cycles to network requests — to deliver instant, fluid experiences.',
              },
              {
                icon: Sparkles,
                title: 'Creative Engineering',
                desc: 'Blending technical precision with creative problem-solving to build interfaces that don&apos;t just work — they captivate.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-neutral-900 rounded-xl bg-neutral-950/20 hover:bg-neutral-950/40 transition-colors group"
              >
                <item.icon
                  size={28}
                  className="text-neutral-600 mb-4 group-hover:text-neutral-400 transition-colors"
                />
                <h3 className="text-lg font-light mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="border border-neutral-900 rounded-2xl p-10 bg-gradient-to-br from-neutral-950/40 to-black"
        >
          <h2 className="text-2xl font-light tracking-tight mb-6">Vision for the Future</h2>
          <p className="text-neutral-400 font-light leading-relaxed mb-6">
            The next generation of web applications will be defined by their ability to adapt,
            anticipate, and delight. I&apos;m committed to building scalable, intelligent systems that
            leverage AI not as a gimmick, but as a fundamental layer of user experience enhancement.
          </p>
          <p className="text-neutral-500 text-sm font-light leading-relaxed">
            My mission is to create digital products that people don&apos;t just use — they rely on,
            trust, and remember. Products that feel inevitable in their simplicity, yet revolutionary
            in their impact.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
