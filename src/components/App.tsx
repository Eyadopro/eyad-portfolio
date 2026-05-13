'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ParticleField from '@/components/three/ParticleField';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import HomeView from '@/views/HomeView';
import ProjectView from '@/views/ProjectView';
import { useMousePosition } from '@/hooks/useMousePosition';
import type { Project } from '@/lib/data';

type View = 'home' | 'project';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { mouseX, mouseY } = useMousePosition();

  const navigate = (to: string, data: Project | null = null) => {
    setActiveProject(data);
    setView(to as View);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black min-h-screen font-sans">
      <ParticleField />
      <Navbar view={view} onNavigate={navigate} />

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <HomeView key="home" onNavigate={navigate} />
        ) : (
          activeProject && (
            <ProjectView
              key="project"
              project={activeProject}
              onBack={() => navigate('home')}
            />
          )
        )}
      </AnimatePresence>

      <Footer />
      <CustomCursor mouseX={mouseX} mouseY={mouseY} />
    </div>
  );
}
