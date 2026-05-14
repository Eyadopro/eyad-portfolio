'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2 } from 'lucide-react';
import Image from 'next/image';

const TRACKS = [
  { id: 1, title: 'MASSIVE', file: '/music/massive.mp3', cover: '/covers/massive.jpg' },
  { id: 2, title: 'FLIGHTS BOOKED', file: '/music/flights-booked.mp3', cover: '/covers/flights-booked.jpg' },
  { id: 3, title: '1 NOT THE 2', file: '/music/not-the-2.mp3', cover: '/covers/not-the-2.jpg' },
  { id: 4, title: 'JADED', file: '/music/jaded.mp3', cover: '/covers/jaded.jpg' },
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const handleEnded = () => {
      setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = TRACKS[currentTrack].file;
    if (isPlaying) audio.play();
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
  const prevTrack = () => setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  const toggleMute = () => {
    if (audioRef.current) audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} />
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-10 right-10 z-[90] w-80 bg-black/80 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden"
          >
            <div className="relative w-full h-64 overflow-hidden">
              <Image src={TRACKS[currentTrack].cover} alt={TRACKS[currentTrack].title} fill style={{ objectFit: 'cover' }} priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setIsMinimized(true)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center border border-neutral-700 hover:bg-black/60 transition-colors">
                <Minimize2 size={14} className="text-white" />
              </motion.button>
            </div>

            <div className="p-6">
              <h4 className="text-sm font-light text-white mb-1 tracking-wider">{TRACKS[currentTrack].title}</h4>
              <p className="text-[10px] uppercase text-neutral-500 tracking-widest">Portfolio Mix</p>
              <div className="mt-4 h-1 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div className="h-full bg-white" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
              </div>
              <div className="flex items-center justify-between mt-6">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleMute}>
                  {isMuted ? <VolumeX size={18} className="text-neutral-500" /> : <Volume2 size={18} className="text-neutral-400" />}
                </motion.button>
                <div className="flex items-center gap-6">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevTrack}><SkipBack size={20} className="text-neutral-400" /></motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={togglePlay} className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    {isPlaying ? <Pause size={18} className="text-black" /> : <Play size={18} className="text-black ml-1" />}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextTrack}><SkipForward size={20} className="text-neutral-400" /></motion.button>
                </div>
                <div className="w-5" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMinimized && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} onClick={() => setIsMinimized(false)} className="fixed bottom-10 right-10 z-[90] w-14 h-14 rounded-full bg-black/80 backdrop-blur-xl border border-neutral-800 flex items-center justify-center hover:scale-105 transition-transform">
          {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white ml-0.5" />}
        </motion.button>
      )}
    </>
  );
}
