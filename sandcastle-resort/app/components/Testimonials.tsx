"use client";
import { useState, useRef } from "react";
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

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section style={{ padding: "8rem 0", position: "relative", overflow: "hidden", background: "var(--ocean-deep)" }}>
      <svg style={{ position: "absolute", top: 0, width: "100%", opacity: 0.1, height: "120px" }} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path fill="rgba(106,181,196,0.3)" d="M0,60 Q360,120 720,60 Q1080,0 1440,60 L1440,0 L0,0Z" />
      </svg>

      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 2.5rem", textAlign: "center" }} ref={ref}>
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
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 300, marginBottom: "4rem", color: "var(--sand-100)" }}
        >
          What guests say
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.25rem", marginBottom: "2rem" }}>
              {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                <span key={i} style={{ color: "var(--sand-400)" }}>★</span>
              ))}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", lineHeight: 1, marginBottom: "1rem", color: "rgba(106,181,196,0.2)" }}>"</div>
            <blockquote style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              fontWeight: 300, fontStyle: "italic",
              lineHeight: 1.7, marginBottom: "2.5rem",
              color: "var(--sand-100)", margin: "0 0 2.5rem",
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

        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "3rem" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? "1.5rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: i === active ? "0.25rem" : "50%",
                background: i === active ? "var(--ocean-300)" : "rgba(253,250,245,0.2)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
