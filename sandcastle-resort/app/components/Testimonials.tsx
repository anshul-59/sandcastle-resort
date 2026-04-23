"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    quote: "We've stayed at many luxury resorts across India, but Sandcastle is in a different league. The stillness of the cove at 6am, the sound of coconut fronds in the breeze — it's a kind of luxury you can't manufacture.",
    author: "Ananya Krishnamurthy", location: "Mumbai", rating: 5, stay: "Shoreline Suite · Oct 2024",
  },
  {
    quote: "Dapoli itself is magical, but the resort elevates the experience completely. The team remembered our names from the first evening, and every sunrise felt like it was staged just for us.",
    author: "Rohan & Priya Mehta", location: "Pune", rating: 5, stay: "Coconut Grove Villa · Dec 2024",
  },
  {
    quote: "The Konkan cuisine at the resort is extraordinary — fresh catch each morning, traditional recipes, and a chef who clearly loves what he does. I came for the beach, but I'll return for the food.",
    author: "Kabir Sundaram", location: "Bangalore", rating: 5, stay: "Horizon Cottage · Nov 2024",
  },
];

// Each crab patrols its own third of the stage so they never crowd
const LANES = [
  { minPct: 2,  maxPct: 30 },
  { minPct: 35, maxPct: 63 },
  { minPct: 68, maxPct: 96 },
];

/* ─── Ocean-themed Crab ─────────────────────────────────────── */
function Crab({ size = 1, flip = false, active = false }: { size?: number; flip?: boolean; active?: boolean }) {
  const shell = active ? "#3d8fa3" : "#0d4e65";
  const light = active ? "#6ab5c4" : "#3d8fa3";
  const dark  = "#082a3a";
  const leg   = "#0d4e65";

  return (
    <svg width={size * 80} height={size * 68} viewBox="0 0 80 68"
      style={{ transform: flip ? "scaleX(-1)" : "none", overflow: "visible", display: "block" }}>
      {/* Rear walking legs */}
      {([-1, 1] as const).map((side) =>
        [0, 1, 2].map((i) => (
          <line key={`${side}-${i}`}
            x1={40 + side * 16} y1={28 + i * 6}
            x2={40 + side * (30 + i * 3)} y2={36 + i * 7}
            stroke={leg} strokeWidth={2.2} strokeLinecap="round" />
        ))
      )}
      {/* Shell body */}
      <ellipse cx="40" cy="36" rx="18" ry="14" fill={shell} />
      <ellipse cx="40" cy="33" rx="13" ry="8"  fill={light} opacity="0.35" />
      {/* Shell dots */}
      <circle cx="35" cy="35" r="2" fill={dark} opacity="0.4" />
      <circle cx="45" cy="35" r="2" fill={dark} opacity="0.4" />
      <circle cx="40" cy="41" r="2" fill={dark} opacity="0.4" />
      {/* Claw arms raised to hold card strings */}
      {([-1, 1] as const).map((side) => {
        const ax = 40 + side * 17;
        const ay = 28;
        const ex = ax + side * 16;
        const ey = ay - 20;
        return (
          <g key={side}>
            <line x1={ax} y1={ay} x2={ex} y2={ey} stroke={leg} strokeWidth={3} strokeLinecap="round" />
            <ellipse cx={ex} cy={ey - 3} rx="7" ry="4.5" fill={shell}
              transform={`rotate(${side * 30} ${ex} ${ey})`} />
            <ellipse cx={ex + side * 5} cy={ey + 1} rx="5.5" ry="3.5" fill={light} opacity="0.8"
              transform={`rotate(${side * -15} ${ex} ${ey})`} />
          </g>
        );
      })}
      {/* Eye stalks */}
      {([-1, 1] as const).map((side) => (
        <g key={side}>
          <line x1={40 + side * 7} y1={24} x2={40 + side * 9} y2={15}
            stroke={leg} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx={40 + side * 9} cy={12} r="4"    fill={dark} />
          <circle cx={40 + side * 9 + side} cy={10.5} r="1.5" fill="white" opacity="0.85" />
        </g>
      ))}
      {/* Shadow on sand */}
      <ellipse cx="40" cy="51" rx="19" ry="3.5" fill="#6ab5c4" opacity="0.1" />
    </svg>
  );
}

/* ─── One crab + card unit ──────────────────────────────────── */
function CrabCard({
  testimonial, index, isActive, onClick, stageWidth,
}: {
  testimonial: typeof testimonials[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
  stageWidth: number;
}) {
  const lane  = LANES[index];
  const cardW = 210;

  // Patrol keyframes spread evenly within the lane
  const minX = stageWidth * (lane.minPct / 100);
  const maxX = Math.max(minX + 10, stageWidth * (lane.maxPct / 100) - cardW);
  const mid  = (minX + maxX) / 2;
  const q1   = minX + (maxX - minX) * 0.25;
  const q3   = minX + (maxX - minX) * 0.75;

  const xFrames = [minX, q3, q1, maxX, mid, minX];
  const dur      = 18 + index * 4;   // 18s / 22s / 26s — never in sync
  const bobDur   = 2.0 + index * 0.55;
  const flip     = index === 1;      // centre crab faces opposite direction

  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: 88,
        width: cardW,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        willChange: "transform",
      }}
      animate={{ x: xFrames }}
      transition={{
        duration: dur,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.22, 0.44, 0.66, 0.88, 1],
      }}
      onClick={onClick}
    >
      {/* Floating card */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: bobDur, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: cardW,
          background: isActive ? "#ffffff" : "rgba(240,247,248,0.93)",
          borderRadius: 6,
          padding: "1.1rem 1.25rem",
          boxShadow: isActive
            ? "0 14px 45px rgba(8,42,58,0.45), 0 0 0 1.5px #3d8fa3"
            : "0 6px 22px rgba(8,42,58,0.25), 0 0 0 1px rgba(106,181,196,0.3)",
          transition: "box-shadow 0.4s",
          position: "relative",
        }}
      >
        {isActive && (
          <motion.div layoutId="activeDot" style={{
            position: "absolute", top: 8, right: 8,
            width: 7, height: 7, borderRadius: "50%",
            background: "#3d8fa3",
          }} />
        )}
        {/* Stars */}
        <div style={{ display: "flex", gap: 2, marginBottom: "0.5rem" }}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i} style={{ color: "#c9a87a", fontSize: 10 }}>★</span>
          ))}
        </div>
        {/* Truncated quote */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 12.5, fontStyle: "italic", fontWeight: 300,
          lineHeight: 1.55, color: "#082a3a", margin: "0 0 0.65rem",
          display: "-webkit-box", WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical" as const, overflow: "hidden",
        }}>
          "{testimonial.quote}"
        </p>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10.5, fontWeight: 500, color: "#0d4e65", margin: "0 0 1px" }}>
          {testimonial.author}
        </p>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 9.5, color: "#9a8b79", margin: 0 }}>
          {testimonial.location}
        </p>
      </motion.div>

      {/* Dashed strings from claws to card */}
      <svg width={cardW} height={30} style={{ marginTop: -1, display: "block" }}>
        <line x1={18}         y1={2} x2={22}         y2={28}
          stroke="#0d4e65" strokeWidth="0.9" strokeDasharray="3,2.5" opacity="0.5" />
        <line x1={cardW - 18} y1={2} x2={cardW - 22} y2={28}
          stroke="#0d4e65" strokeWidth="0.9" strokeDasharray="3,2.5" opacity="0.5" />
      </svg>

      {/* Crab body with leg-shuffle */}
      <motion.div
        animate={{ x: [0, 1.5, -1.5, 1, 0], y: [0, -1, 0, -1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, ease: "linear" }}
      >
        <Crab size={isActive ? 1.1 : 0.92} flip={flip} active={isActive} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────── */
export default function Testimonials() {
  const [active, setActive]       = useState(0);
  const [stageWidth, setStageWidth] = useState(960);
  const stageRef = useRef<HTMLDivElement>(null);
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Measure real pixel width so lane positions are accurate
  useEffect(() => {
    const measure = () => {
      if (stageRef.current) setStageWidth(stageRef.current.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // Auto-cycle every 7 s
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: "8rem 0 0", position: "relative", overflow: "hidden", background: "var(--ocean-deep)" }}>

      {/* Original wave shape from your file */}
      <svg style={{ position: "absolute", top: 0, width: "100%", opacity: 0.1, height: "120px" }}
        viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path fill="rgba(106,181,196,0.3)" d="M0,60 Q360,120 720,60 Q1080,0 1440,60 L1440,0 L0,0Z" />
      </svg>

      {/* Subtle radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 20%, rgba(61,143,163,0.1) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* ── Header ── */}
      <div ref={ref} style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 2.5rem", textAlign: "center", position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem" }}
        >
          <div style={{ width: "4rem", height: "1px", background: "var(--ocean-300)" }} />
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ocean-300)" }}>
            Guest Stories
          </span>
          <div style={{ width: "4rem", height: "1px", background: "var(--ocean-300)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 300, marginBottom: "0.75rem", color: "var(--sand-100)" }}
        >
          What guests say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}
          style={{ fontFamily: "'Jost',sans-serif", fontSize: "0.75rem", color: "rgba(253,250,245,0.3)", letterSpacing: "0.05em" }}
        >
          Click a crab to read the full story
        </motion.p>
      </div>

      {/* ── Crab stage — full width ── */}
      <motion.div
        ref={stageRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        style={{ position: "relative", width: "100%", height: 360, marginTop: "2.5rem", overflow: "hidden" }}
      >
        {stageWidth > 0 && testimonials.map((t, i) => (
          <CrabCard
            key={i} testimonial={t} index={i}
            isActive={active === i}
            onClick={() => setActive(i)}
            stageWidth={stageWidth}
          />
        ))}

        {/* Sandy beach floor */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 95 }}
          viewBox="0 0 1440 95" preserveAspectRatio="none">
          <path fill="#082a3a" d="M0,55 Q240,28 480,52 Q720,76 960,48 Q1200,22 1440,52 L1440,95 L0,95Z" />
          <path fill="#0d4e65" opacity="0.5" d="M0,68 Q360,50 720,68 Q1080,86 1440,65 L1440,95 L0,95Z" />
          {/* Pebbles */}
          {[70,180,290,410,530,650,760,880,1000,1110,1240,1360].map((x, i) => (
            <ellipse key={i} cx={x} cy={72 + (i % 3) * 5} rx={3 + (i % 2) * 2} ry="1.8" fill="#6ab5c4" opacity="0.2" />
          ))}
          {/* Shell curves */}
          {[120,250,400,570,730,890,1050,1220].map((x, i) => (
            <path key={i} d={`M${x},75 Q${x + 5},70 ${x + 10},75`}
              fill="none" stroke="#a8d8e0" strokeWidth="1.5" opacity="0.25" />
          ))}
        </svg>

        {/* Waterline */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 28 }}
          viewBox="0 0 1440 28" preserveAspectRatio="none">
          <path d="M0,14 Q180,4 360,14 Q540,24 720,14 Q900,4 1080,14 Q1260,24 1440,14"
            fill="none" stroke="rgba(106,181,196,0.15)" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* ── Full quote strip ── */}
      <div style={{ background: "rgba(8,42,58,0.6)", borderTop: "1px solid rgba(106,181,196,0.08)" }}>
        <div style={{ maxWidth: "46rem", margin: "0 auto", padding: "3rem 2.5rem", textAlign: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", lineHeight: 0.8, color: "rgba(106,181,196,0.15)", marginBottom: "0.5rem" }}>"</div>
              <blockquote style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                fontWeight: 300, fontStyle: "italic", lineHeight: 1.7,
                color: "var(--sand-100)", margin: "0 0 2rem",
              }}>
                {testimonials[active].quote}
              </blockquote>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--ocean-300)", margin: "0 0 0.25rem" }}>
                {testimonials[active].author}
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "rgba(253,250,245,0.4)", margin: 0 }}>
                {testimonials[active].location} · {testimonials[active].stay}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot nav — matches original style */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "2.5rem" }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? "1.5rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: i === active ? "0.25rem" : "50%",
                background: i === active ? "var(--ocean-300)" : "rgba(253,250,245,0.2)",
                border: "none", cursor: "pointer", transition: "all 0.3s",
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}