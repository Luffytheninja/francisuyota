'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Layers, Sliders, Film } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<'4K' | '1080p'>('4K');
  const [currentChapter, setCurrentChapter] = useState('01 / Narrative Fiction');
  const videoRef = useRef<HTMLVideoElement>(null);

  const chapters = [
    { title: '01 / Narrative Fiction', time: 0 },
    { title: '02 / Urban High-Speed (Okada)', time: 15 },
    { title: '03 / Neon Afrobeats Visuals', time: 35 },
    { title: '04 / Botanical Macro & Docu', time: 55 },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 text-white">
        {/* Header Bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <span
              className="text-2xl font-black tracking-tight text-[#D4F88D]"
              style={{ fontFamily: 'var(--font-slackey)' }}
            >
              UYOTA
            </span>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/80">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Official Cinematography Showreel (2026 Edition)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-white/10 rounded-full p-1 text-[11px] font-bold">
              <button
                onClick={() => setSelectedQuality('4K')}
                className={`px-3 py-1 rounded-full transition-colors ${selectedQuality === '4K' ? 'bg-[#D4F88D] text-black' : 'text-white/70'}`}
              >
                4K HDR
              </button>
              <button
                onClick={() => setSelectedQuality('1080p')}
                className={`px-3 py-1 rounded-full transition-colors ${selectedQuality === '1080p' ? 'bg-[#D4F88D] text-black' : 'text-white/70'}`}
              >
                1080p
              </button>
            </div>

            <button
              onClick={onClose}
              data-cursor="CLOSE"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Showreel"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Center Theater Video Player */}
        <div className="relative w-full max-w-6xl mx-auto aspect-video sm:aspect-[2.39/1] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/15 my-auto group">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85"
          >
            <source src="/videos/fagbeaux.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-cinematic-view-of-city-lights-at-night-41551-large.mp4" type="video/mp4" />
          </video>

          {/* Big Center Play/Pause button on Click */}
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-full bg-[#D4F88D] text-black flex items-center justify-center shadow-2xl"
              >
                <Play className="w-8 h-8 fill-black ml-1" />
              </motion.div>
            )}
          </div>

          {/* Video Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="p-2 rounded-full hover:bg-white/20">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
              </button>
              <button onClick={toggleMute} className="p-2 rounded-full hover:bg-white/20">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#D4F88D]" />}
              </button>
              <span className="text-xs font-mono text-white/70">
                {currentChapter}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-white/60">
              <span>Aspect Ratio: 2.39:1 Anamorphic Scope</span>
              <span>•</span>
              <span>Sensor: Large Format Full Frame</span>
            </div>
          </div>
        </div>

        {/* Bottom Chapters Timeline Selector */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 z-10">
          {chapters.map((ch, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentChapter(ch.title)}
              className={`p-3 rounded-xl text-left text-xs font-mono transition-all border ${
                currentChapter === ch.title
                  ? 'bg-[#D4F88D]/20 border-[#D4F88D] text-[#D4F88D]'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
              }`}
            >
              <span className="block text-[10px] text-white/40 mb-0.5">Chapter 0{idx + 1}</span>
              <span className="font-bold truncate block">{ch.title.split('/ ')[1]}</span>
            </button>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
}
