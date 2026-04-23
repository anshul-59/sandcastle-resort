"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The "Story" phrases that will appear sequentially
const storyPhrases = [
  "A legacy of luxury, carved into the golden sands of Dapoli.",
  "Where the Konkan soul meets the Arabian Sea.",
  "Your private escape from the noise of the world.",
  "Founded in 1987. Redefined for you today."
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyTextRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [activePhraseIndex, setActivePhraseIndex] = useState(-1);
  
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // increase end value to +=400% to give more room for multiple phrases
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", 
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Logic to switch text based on scroll depth
            if (progress < 0.2) setActivePhraseIndex(-1);
            else if (progress < 0.4) setActivePhraseIndex(0);
            else if (progress < 0.6) setActivePhraseIndex(1);
            else if (progress < 0.8) setActivePhraseIndex(2);
            else setActivePhraseIndex(3);
          }
        },
      });

      // 1. Initial "Our Story" center text fades out
      tl.to(storyTextRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
      })
      // 2. Video reveals itself
      .fromTo(videoWrapperRef.current, 
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }, 
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 2 },
        "-=0.5"
      )
      // 3. Add extra duration to the timeline so the pinned video stays 
      // visible while the user scrolls through the phrases
      .to({}, { duration: 6 }); 
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative overflow-hidden bg-sand-50">
      
      {/* Cinematic Layer */}
      <div className="relative h-screen w-full flex items-center justify-center">
        
        {/* Step 1: Initial Label */}
        <div ref={storyTextRef} className="z-10 text-center">
          <div className="w-12 h-px bg-ocean-400 mx-auto mb-4" />
          <h2 className="font-body text-xs tracking-[0.4em] uppercase text-ocean-400">
            Our Story
          </h2>
        </div>

        {/* Step 2: The Video & Floating Story Text */}
        <div ref={videoWrapperRef} className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover">
            <source src="/videos/resort-cinematic.mp4" type="video/mp4" />
          </video>

          {/* Sequential Text Overlay */}
          <div className="absolute z-20 w-full max-w-4xl px-10 text-center">
            <AnimatePresence mode="wait">
              {activePhraseIndex >= 0 && (
                <motion.p
                  key={activePhraseIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="font-display text-3xl md:text-5xl text-white italic leading-tight"
                >
                  {storyPhrases[activePhraseIndex]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Visual indicator that user is in the "Story" section */}
          <div className="absolute bottom-12 z-20 flex gap-2">
            {storyPhrases.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 rounded-full ${activePhraseIndex === i ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section (Appears after the pinning ends) */}
      <div ref={contentRef} className="relative z-30 py-32 bg-sand-50">
        {/* ... Rest of your component (Stats, About Text, etc.) ... */}
      </div>
    </section>
  );
}