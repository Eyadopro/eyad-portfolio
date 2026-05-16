'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Terminal, Code2, Globe, Award, BadgeCheck, Cpu, ShieldCheck, Brain, Code } from 'lucide-react';
import Image from 'next/image';
import StaggeredText from '@/components/ui/StaggeredText';
import MagneticWrapper from '@/components/ui/MagneticWrapper';
import AIEntity3D from '@/components/three/AIEntity3D';
import { CONFIG } from '@/lib/config';
import { PROJECTS_DATA } from '@/lib/data';
import type { Project } from '@/lib/data';

interface Props {
  onNavigate: (to: string, data?: Project) => void;
}

function LuxuryPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 80, damping: 20, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);
  const scale = useSpring(1, { stiffness: 120, damping: 18 });
  const shimmerOpacity = useSpring(0, { stiffness: 100, damping: 20 });
  const shimmerX = useSpring(useTransform(mouseX, [0, 1], [-40, 40]), springConfig);
  const shimmerY = useSpring(useTransform(mouseY, [0, 1], [-40, 40]), springConfig);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };
  const handleEnter = () => { scale.set(1.03); shimmerOpacity.set(1); };
  const handleLeave = () => { mouseX.set(0.5); mouseY.set(0.5); scale.set(1); shimmerOpacity.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d', perspective: 800 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full overflow-hidden"
    >
      <Image src="/eyad.jpg" alt="Eyad Hani" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
      <motion.div style={{ opacity: shimmerOpacity, x: shimmerX, y: shimmerY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }} />
      <motion.div style={{ opacity: shimmerOpacity }} className="absolute inset-0 border border-white/10 pointer-events-none" />
      <div className="absolute bottom-6 left-6 flex items-center gap-2 z-10">
        <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-light">Eyad Hani — 2025</span>
      </div>
    </motion.div>
  );
}

export default function HomeView({ onNavigate }: Props) {
  return (
    <motion.div exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-10 md:px-24 py-32">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
          {/* Left — name block */}
          <div className="flex-1 order-2 md:order-1">
            <h1 className="text-7xl md:text-[12rem] font-light tracking-tighter leading-[0.85] uppercase mix-blend-difference">
              <StaggeredText text="EYAD" />
              <StaggeredText text="HANI" delay={0.2} />
            </h1>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12 flex items-center gap-6 text-neutral-500 uppercase tracking-[0.4em] text-[10px]"
            >
              <span className="w-16 h-[1px] bg-neutral-800"></span>
              {CONFIG.role}
            </motion.div>
          </div>

          {/* Right — photo (visible on mobile too) */}
          <div className="w-full md:w-[300px] h-[300px] md:h-[400px] flex-shrink-0 order-1 md:order-2">
            <LuxuryPhoto />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="work" className="py-40 px-10 md:px-24 border-t border-neutral-900 bg-black/40 backdrop-blur-xl">
        <div className="flex justify-between items-end mb-24">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-600 block mb-4">Portfolio v2.5</span>
            <h2 className="text-4xl font-light">Selected Artifacts</h2>
          </div>
          <div className="hidden md:block text-neutral-600 text-xs tracking-widest uppercase">
            Scroll to Explore (0{PROJECTS_DATA.length})
          </div>
        </div>
        <div className="grid grid-cols-1 gap-px bg-neutral-900 border-y border-neutral-900">
          {PROJECTS_DATA.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => onNavigate('project', project)}
              className="group bg-black py-20 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-all duration-700 hover:px-12"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-neutral-700 font-mono text-xs">0{idx + 1}</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{project.category}</span>
                </div>
                <h3 className="text-4xl md:text-7xl font-light tracking-tight group-hover:italic transition-all duration-500">
                  {project.title}
                </h3>
              </div>
              <div className="mt-8 md:mt-0 flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Entity Section */}
      <section id="entity" className="py-40 px-10 md:px-24 flex flex-col md:grid md:grid-cols-2 gap-24 items-center overflow-hidden">
        <div className="order-2 md:order-1">
          <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-600 mb-8 block">The Architecture</span>
          <h2 className="text-4xl md:text-6xl font-light leading-tight mb-10 tracking-tight">
            Engineering elegance through <br/> <span className="text-neutral-500 italic">computational complexity.</span>
          </h2>
          <p className="text-neutral-400 font-light text-lg max-w-lg leading-relaxed mb-12">
            Bridging the gap between robust systems and fluid, high-performance interfaces.
            I build digital experiences that command attention through subtlety.
          </p>
          <div className="flex gap-10">
            <MagneticWrapper><Terminal className="text-neutral-600 hover:text-white" size={24} /></MagneticWrapper>
            <MagneticWrapper><Code2 className="text-neutral-600 hover:text-white" size={24} /></MagneticWrapper>
            <MagneticWrapper><Globe className="text-neutral-600 hover:text-white" size={24} /></MagneticWrapper>
          </div>
        </div>
        <div className="order-1 md:order-2 w-full aspect-square relative border border-neutral-900 rounded-3xl overflow-hidden bg-neutral-950/20 group">
          <AIEntity3D />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-10 left-10 flex items-center gap-3">
            <div className="w-2 h-2 bg-neutral-500 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">Active Cognitive Layer</span>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="credentials" className="py-40 px-10 md:px-24 border-t border-neutral-900">
        <div className="flex justify-between items-end mb-24">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-600 block mb-4">Verified Credentials</span>
            <h2 className="text-4xl font-light">Certifications</h2>
          </div>
          <div className="hidden md:block text-neutral-600 text-xs tracking-widest uppercase">
            0{CERTS_DATA.length} Credentials
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-900 border border-neutral-900">
          {CERTS_DATA.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black p-10 flex gap-8 items-start group hover:bg-neutral-950 transition-colors duration-500"
            >
              <div className="flex-shrink-0 w-12 h-12 border border-neutral-800 rounded-full flex items-center justify-center group-hover:border-neutral-600 transition-colors">
                <cert.Icon size={18} className="text-neutral-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-600">{cert.issuer}</span>
                  <span className="text-[9px] font-mono text-neutral-700">{cert.year}</span>
                </div>
                <h4 className="text-lg font-light text-white mb-2 leading-snug">{cert.title}</h4>
                <p className="text-[11px] text-neutral-600 leading-relaxed">{cert.desc}</p>
                <div className="flex items-center gap-2 mt-4">
                  <BadgeCheck size={12} className="text-neutral-700" />
                  <span className="text-[9px] uppercase tracking-widest text-neutral-700">Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

const CERTS_DATA = [
  {
    Icon: Brain,
    issuer: 'DeepLearning.AI',
    year: '2024',
    title: 'Deep Learning Specialization',
    desc: 'Neural networks, CNNs, RNNs, transformers, and deployment of production-grade AI systems across 5 rigorous courses.',
  },
  {
    Icon: Cpu,
    issuer: 'Google Cloud',
    year: '2024',
    title: 'Professional Machine Learning Engineer',
    desc: 'Designing, building, and productionizing ML models at scale using Google Cloud infrastructure and MLOps pipelines.',
  },
  {
    Icon: Code,
    issuer: 'Meta',
    year: '2023',
    title: 'Meta Front-End Developer',
    desc: 'Advanced React architecture, performance optimization, accessibility, and production-level UI engineering.',
  },
  {
    Icon: ShieldCheck,
    issuer: 'ISC²',
    year: '2024',
    title: 'Certified in Cybersecurity (CC)',
    desc: 'Security principles, access controls, network security, and incident response — ISC² internationally recognized credential.',
  },
  {
    Icon: Globe,
    issuer: 'AWS',
    year: '2023',
    title: 'AWS Certified Cloud Practitioner',
    desc: 'Core AWS services, cloud architecture fundamentals, security best practices, and cost optimization strategies.',
  },
  {
    Icon: Award,
    issuer: 'OpenAI / DeepLearning.AI',
    year: '2024',
    title: 'Prompt Engineering for Developers',
    desc: 'Advanced LLM prompting, chain-of-thought reasoning, system design for AI-powered applications using GPT-4 APIs.',
  },
];
