"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storyPhrases = [
  "A legacy of luxury, carved into the golden sands of Dapoli.",
  "Where the Konkan soul meets the Arabian Sea.",
  "Your private escape from the noise of the world.",
  "Founded in 1987. Redefined for you today.",
];

const stats = [
  { num: "2.4", unit: "km", label: "Pristine Coastline" },
  { num: "18",  unit: "",   label: "Private Villas" },
  { num: "300+",unit: "",   label: "Days of Sunshine" },
  { num: "1987",unit: "",   label: "Est. Year" },
];

export default function About() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const storyTextRef    = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [activePhraseIndex, setActivePhraseIndex] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if      (p < 0.2) setActivePhraseIndex(-1);
            else if (p < 0.4) setActivePhraseIndex(0);
            else if (p < 0.6) setActivePhraseIndex(1);
            else if (p < 0.8) setActivePhraseIndex(2);
            else              setActivePhraseIndex(3);
          },
        },
      });
      tl.to(storyTextRef.current, { opacity: 0, scale: 0.9, duration: 1 })
        .fromTo(videoWrapperRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 2 },
          "-=0.5")
        .to({}, { duration: 6 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "relative", height: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Eyebrow label */}
        <div ref={storyTextRef} style={{ zIndex: 10, textAlign: "center" }}>
          <div style={{ width: 48, height: 1, background: "var(--red-300)", margin: "0 auto 16px" }} />
          <h2 className="font-body" style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--red-300)", margin: 0 }}>
            Our Story
          </h2>
        </div>

        {/* Video / cinematic reveal */}
        <div ref={videoWrapperRef} style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(26,13,10,0.5)", zIndex: 10 }} />
          {/* Fallback gradient */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#1a0d0a 0%,#3d1a10 25%,#6b1a11 50%,#9e2b1f 70%,#c9a87a 100%)" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
              <path fill="rgba(201,168,122,0.4)" d="M0,500 Q360,450 720,500 Q1080,550 1440,500 L1440,800 L0,800Z"/>
            </svg>
          </div>
          <video autoPlay muted loop playsInline preload="auto"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
            <source src="/videos/resort-cinematic.mp4" type="video/mp4" />
          </video>
          <div style={{ position: "relative", zIndex: 20, maxWidth: 800, padding: "0 40px", textAlign: "center" }}>
            <AnimatePresence mode="wait">
              {activePhraseIndex >= 0 && (
                <motion.p key={activePhraseIndex}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="font-display"
                  style={{ fontSize: "clamp(1.6rem,4vw,3rem)", fontStyle: "italic", fontWeight: 300, color: "#ffffff", lineHeight: 1.4, margin: 0 }}>
                  {storyPhrases[activePhraseIndex]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div style={{ position: "absolute", bottom: 48, zIndex: 20, display: "flex", gap: 8 }}>
            {storyPhrases.map((_, i) => (
              <div key={i} style={{ height: 4, borderRadius: 2, width: activePhraseIndex === i ? 32 : 8, background: activePhraseIndex === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)", transition: "all 0.5s" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip — no hard bg, blends with page gradient */}
      <div style={{ position: "relative", zIndex: 30, padding: "80px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 32 }}>
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ textAlign: "center" }}>
                <div className="font-display" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "var(--sand-100)" }}>
                  {s.num}<span style={{ fontSize: "1.2rem" }}>{s.unit}</span>
                </div>
                <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(253,250,245,0.55)", marginTop: 6 }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.stats-grid{grid-template-columns:repeat(4,1fr)!important;}}`}</style>
    </section>
  );
}
