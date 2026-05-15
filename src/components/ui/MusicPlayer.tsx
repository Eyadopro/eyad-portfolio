'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2, Maximize2, X, Menu } from 'lucide-react';
import Image from 'next/image';

const TRACKS = [
  { id: 1, title: 'MASSIVE', file: '/music/massive.mp3', cover: '/covers/massive.jpg' },
  { id: 2, title: 'FLIGHTS BOOKED', file: '/music/flights-booked.mp3', cover: '/covers/flights-booked.jpg' },
  { id: 3, title: '1 NOT THE 2', file: '/music/not-the-2.mp3', cover: '/covers/not-the-2.jpg' },
  { id: 4, title: 'JADED', file: '/music/jaded.mp3', cover: '/covers/jaded.jpg' },
];

const STORAGE_KEY = 'eyad-music-player-state';

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerSize, setPlayerSize] = useState<'small' | 'medium' | 'large'>('medium');
  const audioRef = useRef<HTMLAudioElement>(null);
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Load saved state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        setCurrentTrack(state.track || 0);
        setPlayerSize(state.size || 'medium');
        if (state.x !== undefined) x.set(state.x);
        if (state.y !== undefined) y.set(state.y);
      }
    } catch (e) {
      console.log('Could not load player state');
    }
  }, [x, y]);

  // Save state on changes
  useEffect(() => {
    const saveState = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          track: currentTrack,
          size: playerSize,
          x: x.get(),
          y: y.get(),
        }));
      } catch (e) {
        console.log('Could not save player state');
      }
    };
    saveState();
  }, [currentTrack, playerSize, x, y]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', updateProgress);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = TRACKS[currentTrack].file;
    if (isPlaying) audio.play().catch(() => console.log('Playback blocked'));
  }, [currentTrack, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => console.log('Playback blocked'));
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
  const prevTrack = () => setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  const toggleMute = () => {
    if (audioRef.current) audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = percent * duration;
  };

  const formatTime = (sec: number) => {
    if (!sec || isNaN(sec)) return '0:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sizes = {
    small: { width: 240, coverHeight: 160 },
    medium: { width: 320, coverHeight: 220 },
    large: { width: 400, coverHeight: 280 },
  };

  const currentSize = sizes[playerSize];

  return (
    <>
      <audio ref={audioRef} />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0}
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-10 left-10 z-[90] cursor-move touch-none"
            style={{ width: isExpanded ? currentSize.width : 64 }}
          >
            {isExpanded ? (
              <div className="bg-black/95 backdrop-blur-2xl border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                {/* Cover */}
                <div
                  className="relative w-full overflow-hidden select-none"
                  style={{ height: currentSize.coverHeight }}
                  onPointerDown={(e) => dragControls.start(e)}
                >
                  <Image src={TRACKS[currentTrack].cover} alt={TRACKS[currentTrack].title} fill style={{ objectFit: 'cover' }} priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/50" />

                  {/* Top bar */}
                  <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
                    <div className="flex gap-1">
                      {(['small', 'medium', 'large'] as const).map((size) => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setPlayerSize(size)}
                          className={`w-6 h-6 rounded-full backdrop-blur flex items-center justify-center border transition-colors ${
                            playerSize === size ? 'bg-white/20 border-white/40' : 'bg-black/30 border-neutral-700'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${playerSize === size ? 'bg-white' : 'bg-neutral-500'}`} />
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex gap-1.5">
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsExpanded(false)} className="w-7 h-7 rounded-full bg-black/50 backdrop-blur flex items-center justify-center border border-neutral-700 hover:bg-black/70 transition-colors">
                        <Minimize2 size={11} className="text-white" />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsVisible(false)} className="w-7 h-7 rounded-full bg-black/50 backdrop-blur flex items-center justify-center border border-neutral-700 hover:bg-black/70 transition-colors">
                        <X size={11} className="text-white" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Track info */}
                  <div className="absolute bottom-2 left-3 right-3">
                    <h4 className="text-xs font-light text-white tracking-wider truncate">{TRACKS[currentTrack].title}</h4>
                    <p className="text-[8px] uppercase text-neutral-400 tracking-widest">Portfolio Mix</p>
                  </div>
                </div>

                {/* Controls */}
                <div className="p-3">
                  {/* Seekable progress */}
                  <div className="mb-2.5">
                    <div onClick={seek} className="h-1 bg-neutral-800 rounded-full overflow-hidden cursor-pointer hover:h-1.5 transition-all group">
                      <motion.div className="h-full bg-gradient-to-r from-white to-neutral-300 group-hover:from-neutral-200 transition-colors" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between text-[8px] text-neutral-600 mt-1 font-mono">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Playback controls */}
                  <div className="flex items-center justify-between">
                    <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={toggleMute}>
                      {isMuted ? <VolumeX size={15} className="text-neutral-500" /> : <Volume2 size={15} className="text-neutral-400 hover:text-white transition-colors" />}
                    </motion.button>

                    <div className="flex items-center gap-3">
                      <motion.button whileHover={{ scale: 1.2, rotate: -10 }} whileTap={{ scale: 0.9 }} onClick={prevTrack} className="transition-transform">
                        <SkipBack size={17} className="text-neutral-400 hover:text-white transition-colors" fill="currentColor" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-neutral-200 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                      >
                        {isPlaying ? <Pause size={15} className="text-black" /> : <Play size={15} className="text-black ml-0.5" />}
                      </motion.button>

                      <motion.button whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }} onClick={nextTrack} className="transition-transform">
                        <SkipForward size={17} className="text-neutral-400 hover:text-white transition-colors" fill="currentColor" />
                      </motion.button>
                    </div>

                    <div className="w-4" />
                  </div>
                </div>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(true)}
                onPointerDown={(e) => dragControls.start(e)}
                className="w-16 h-16 rounded-full bg-black/95 backdrop-blur-2xl border border-neutral-800 flex items-center justify-center shadow-2xl hover:shadow-white/5 transition-shadow"
              >
                {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-0.5" />}
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restore button */}
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => { setIsVisible(true); setIsExpanded(true); }}
          className="fixed bottom-10 left-10 z-[90] w-14 h-14 rounded-full bg-black/95 backdrop-blur-2xl border border-neutral-800 flex items-center justify-center hover:shadow-2xl transition-all"
        >
          <Menu size={18} className="text-white" />
        </motion.button>
      )}
    </>
  );
}
