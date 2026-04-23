"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  { quote: "We've stayed at many luxury resorts across India, but Sandcastle is in a different league. The stillness of the cove at 6am, the sound of coconut fronds in the breeze — it's a kind of luxury you can't manufacture.", author: "Ananya Krishnamurthy", location: "Mumbai", rating: 5, stay: "Shoreline Suite · Oct 2024" },
  { quote: "Dapoli itself is magical, but the resort elevates the experience completely. The team remembered our names from the first evening, and every sunrise felt like it was staged just for us.", author: "Rohan & Priya Mehta", location: "Pune", rating: 5, stay: "Coconut Grove Villa · Dec 2024" },
  { quote: "The Konkan cuisine at the resort is extraordinary — fresh catch each morning, traditional recipes, and a chef who clearly loves what he does. I came for the beach, but I'll return for the food.", author: "Kabir Sundaram", location: "Bangalore", rating: 5, stay: "Horizon Cottage · Nov 2024" },
];

/* ── Crab SVG component ── */
function Crab({ x, y, scale = 1, flip = false, color = "#c0392b" }: { x: number; y: number; scale?: number; flip?: boolean; color?: string }) {
  const shellDark = color;
  const shellLight = "#e8755e";
  const legColor = "#9e2b1f";
  const clawColor = "#d94f35";
  const eyeColor = "#1a0d0a";

  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -scale : scale},${scale})`} style={{ transformOrigin: "center" }}>
      {/* Back legs left */}
      <line x1="-10" y1="4" x2="-22" y2="14" stroke={legColor} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="-10" y1="6" x2="-24" y2="18" stroke={legColor} strokeWidth="2" strokeLinecap="round" />
      <line x1="-8" y1="9" x2="-20" y2="22" stroke={legColor} strokeWidth="2" strokeLinecap="round" />
      {/* Back legs right */}
      <line x1="10" y1="4" x2="22" y2="14" stroke={legColor} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="6" x2="24" y2="18" stroke={legColor} strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="9" x2="20" y2="22" stroke={legColor} strokeWidth="2" strokeLinecap="round" />
      {/* Body / shell */}
      <ellipse cx="0" cy="6" rx="16" ry="12" fill={shellDark} />
      <ellipse cx="0" cy="4" rx="12" ry="8" fill={shellLight} opacity="0.4" />
      {/* Shell pattern dots */}
      <circle cx="-4" cy="4" r="1.5" fill={shellDark} opacity="0.6" />
      <circle cx="4" cy="4" r="1.5" fill={shellDark} opacity="0.6" />
      <circle cx="0" cy="8" r="1.5" fill={shellDark} opacity="0.6" />
      {/* Left claw arm raised up — holding */}
      <line x1="-14" y1="0" x2="-26" y2="-18" stroke={legColor} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="-29" cy="-22" rx="6" ry="4" fill={clawColor} transform="rotate(-30 -29 -22)" />
      <ellipse cx="-33" cy="-20" rx="5" ry="3.5" fill={clawColor} transform="rotate(20 -33 -20)" />
      {/* Right claw arm raised up — holding */}
      <line x1="14" y1="0" x2="26" y2="-18" stroke={legColor} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="29" cy="-22" rx="6" ry="4" fill={clawColor} transform="rotate(30 29 -22)" />
      <ellipse cx="33" cy="-20" rx="5" ry="3.5" fill={clawColor} transform="rotate(-20 33 -20)" />
      {/* Eyes on stalks */}
      <line x1="-6" y1="-5" x2="-8" y2="-12" stroke={legColor} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="-8" cy="-14" r="3" fill={eyeColor} />
      <circle cx="-7.5" cy="-15" r="1" fill="white" opacity="0.7" />
      <line x1="6" y1="-5" x2="8" y2="-12" stroke={legColor} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="-14" r="3" fill={eyeColor} />
      <circle cx="8.5" cy="-15" r="1" fill="white" opacity="0.7" />
    </g>
  );
}

/* ── Floating card with crab holders ── */
function FloatingCard({ testimonial, index, isActive, onClick }: any) {
  const floatAnim = {
    y: [0, -6, 0],
    rotate: [index % 2 === 0 ? -1 : 1, index % 2 === 0 ? 1 : -1, index % 2 === 0 ? -1 : 1],
  };

  const cardW = 260;
  const cardH = 160;

  return (
    <motion.div
      onClick={onClick}
      animate={isActive ? { scale: 1.05, zIndex: 10 } : { scale: 1, zIndex: 1 }}
      style={{ position: "relative", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Crab + card SVG */}
      <motion.div
        animate={floatAnim}
        transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "relative" }}
      >
        <svg width={cardW + 60} height={cardH + 70} viewBox={`0 0 ${cardW + 60} ${cardH + 70}`} style={{ overflow: "visible" }}>
          {/* Strings from claws to card corners */}
          <line
            x1={30 + 26} y1={44}
            x2={30 + 8} y2={68}
            stroke="#9e2b1f" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7"
          />
          <line
            x1={30 + cardW - 26} y1={44}
            x2={30 + cardW - 8} y2={68}
            stroke="#9e2b1f" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7"
          />

          {/* Crab left */}
          <Crab x={30 + 14} y={38} scale={0.85} color={isActive ? "#d94f35" : "#9e2b1f"} />
          {/* Crab right */}
          <Crab x={30 + cardW - 14} y={38} scale={0.85} flip color={isActive ? "#d94f35" : "#9e2b1f"} />

          {/* Card rectangle */}
          <rect
            x={30} y={62}
            width={cardW} height={cardH}
            rx="6"
            fill={isActive ? "#ffffff" : "rgba(253,250,245,0.92)"}
            stroke={isActive ? "#d94f35" : "#c9a87a"}
            strokeWidth={isActive ? "2" : "1"}
          />

          {/* Stars */}
          {Array.from({ length: 5 }).map((_, i) => (
            <text key={i} x={30 + 16 + i * 18} y={86} fontSize="11" fill="#c9a87a" fontFamily="serif">★</text>
          ))}

          {/* Quote text — truncated for card */}
          <foreignObject x={38} y={94} width={cardW - 16} height={cardH - 40}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, fontStyle: "italic", color: "#1a0d0a", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as any, overflow: "hidden" }}>
              "{testimonial.quote}"
            </div>
          </foreignObject>

          {/* Author */}
          <text x={38} y={62 + cardH - 16} fontSize="11" fontWeight="500" fontFamily="'Jost',sans-serif" fill="#9e2b1f">
            {testimonial.author}
          </text>
          <text x={38} y={62 + cardH - 4} fontSize="10" fontFamily="'Jost',sans-serif" fill="#9a7068">
            {testimonial.location}
          </text>

          {/* Active indicator dot */}
          {isActive && <circle cx={30 + cardW / 2} cy={62 + cardH + 12} r="4" fill="#d94f35" />}
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section style={{ padding: "8rem 0", position: "relative", overflow: "hidden", background: "var(--dusk)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--red-deep), var(--red-400), var(--sand-400), var(--red-400), var(--red-deep))" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(192,57,43,0.12) 0%, transparent 65%)" }} />

      {/* Sand floor */}
      <svg style={{ position: "absolute", bottom: 0, width: "100%", opacity: 0.25 }} viewBox="0 0 1440 80" preserveAspectRatio="none" height="80">
        <path fill="#c9a87a" d="M0,50 Q360,20 720,50 Q1080,80 1440,50 L1440,80 L0,80Z" />
      </svg>

      <div ref={ref} style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 10 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem" }}>
          <div style={{ width: "4rem", height: "1px", background: "var(--red-300)" }} />
          <span className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--red-300)" }}>Guest Stories</span>
          <div style={{ width: "4rem", height: "1px", background: "var(--red-300)" }} />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,3.75rem)", fontWeight: 300, marginBottom: "3.5rem", color: "var(--sand-100)", textAlign: "center" }}>
          What guests say
        </motion.h2>

        {/* Floating cards with crabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", gap: "0px", flexWrap: "wrap", alignItems: "flex-end" }}
        >
          {testimonials.map((t, i) => (
            <FloatingCard key={i} testimonial={t} index={i} isActive={active === i} onClick={() => setActive(i)} />
          ))}
        </motion.div>

        {/* Expanded full quote below */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            style={{ maxWidth: 600, margin: "2rem auto 0", textAlign: "center" }}
          >
            <div className="font-display" style={{ fontSize: "4rem", lineHeight: 1, color: "rgba(217,79,53,0.25)", marginBottom: "0.5rem" }}>"</div>
            <blockquote className="font-display" style={{ fontSize: "clamp(1rem,2.2vw,1.25rem)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.75, color: "var(--sand-100)", margin: "0 0 1.5rem" }}>
              {testimonials[active].quote}
            </blockquote>
            <p className="font-body" style={{ fontSize: "0.875rem", color: "var(--red-300)", margin: "0 0 0.2rem" }}>{testimonials[active].author}</p>
            <p className="font-body" style={{ fontSize: "0.75rem", color: "rgba(253,250,245,0.4)", margin: 0 }}>
              {testimonials[active].location} · {testimonials[active].stay}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}