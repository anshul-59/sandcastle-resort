"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MusicShell() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/song.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <motion.button
        onClick={toggleMusic}
        whileTap={{ scale: 0.9 }}
        className="relative focus:outline-none cursor-pointer"
        style={{ width: 160, height: 160 }}
      >
        {/* Rotating circular text container */}
        <div className="absolute inset-0 animate-spin-slow">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
          >
            <defs>
              {/* Reduced radius from 75 to 48 to hug the shell tighter */}
              <path
                id="circlePath"
                d="M 100, 100 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
                fill="none"
              />
            </defs>

            {/* First "click me" at top */}
            <text className="fill-ocean-400 font-body text-[11px] tracking-[0.25em] uppercase glow-text">
              <textPath href="#circlePath" startOffset="0%">
                click me
              </textPath>
            </text>

            {/* Second "click me" opposite (180°) */}
            <text className="fill-ocean-400 font-body text-[11px] tracking-[0.25em] uppercase glow-text">
              <textPath href="#circlePath" startOffset="50%">
                click me
              </textPath>
            </text>
          </svg>
        </div>

        {/* Shell image centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.img
            src="/shell.png"
            alt="Shell Music Toggle"
            className="w-14 h-14 object-contain drop-shadow-lg"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isPlaying
                ? { repeat: Infinity, duration: 4, ease: "linear" }
                : { duration: 0.5 }
            }
          />
        </div>
      </motion.button>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .glow-text {
          animation: glowPulse 2s ease-in-out infinite alternate;
        }
        @keyframes glowPulse {
          0% {
            filter: drop-shadow(0 0 2px rgba(109, 181, 196, 0.5))
                    drop-shadow(0 0 6px rgba(109, 181, 196, 0.3));
            opacity: 0.6;
          }
          100% {
            filter: drop-shadow(0 0 4px rgba(109, 181, 196, 1))
                    drop-shadow(0 0 10px rgba(109, 181, 196, 0.6))
                    drop-shadow(0 0 18px rgba(109, 181, 196, 0.4));
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}