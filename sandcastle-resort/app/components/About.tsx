"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: "2.4", unit: "km", label: "Pristine Coastline" },
  { num: "18", unit: "", label: "Private Villas" },
  { num: "300+", unit: "", label: "Days of Sunshine" },
  { num: "1987", unit: "", label: "Est. Year" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!imgRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
    tl.to(imgRef.current, { y: -60, ease: "none" });
    return () => { tl.kill(); };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "10rem 0",
        overflow: "hidden",
        background: "var(--sand-50)",
      }}
    >
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2.5rem" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
        >
          <div style={{ width: "4rem", height: "1px", background: "var(--ocean-400)" }} />
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ocean-400)" }}>
            Our Story
          </span>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))",
          gap: "5rem",
          alignItems: "center",
        }}>
          {/* Text */}
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                marginBottom: "2rem",
                color: "var(--ocean-deep)",
              }}
            >
              Where the sea<br /><em>whispers your name</em>
            </motion.h2>

            <motion.p variants={itemVariants} style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--text-secondary)" }}>
              Nestled along the unspoiled shores of Dapoli — a hidden gem on Maharashtra's
              Konkan coast — Sandcastle Beach Resort has been welcoming weary souls since
              1987. Here, the rhythm of the tides sets the pace of life.
            </motion.p>

            <motion.p variants={itemVariants} style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2.5rem", color: "var(--text-secondary)" }}>
              Far from the city's noise, our property spans across lush coconut groves and
              secluded coves. Every sunrise paints the Arabian Sea in shades of amber and gold.
            </motion.p>

            <motion.div variants={itemVariants}>
              <button style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                color: "var(--ocean-500)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}>
                Discover Dapoli
                <span style={{ height: "1px", width: "2rem", background: "var(--ocean-400)", display: "block", transition: "width 0.3s" }} />
              </button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <div style={{ position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" as const }}
              style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5", borderRadius: "2px" }}
            >
              <div
                ref={imgRef}
                style={{
                  position: "absolute", inset: 0, transform: "scale(1.1)",
                  background: "linear-gradient(160deg, #082a3a 0%, #0d4e65 30%, #1e6b82 55%, #6ab5c4 80%, #a8d8e0 100%)",
                }}
              >
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <radialGradient id="sun" cx="70%" cy="25%" r="20%">
                      <stop offset="0%" stopColor="rgba(255,220,150,0.4)" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(106,181,196,0.6)" />
                      <stop offset="100%" stopColor="rgba(8,42,58,0.9)" />
                    </linearGradient>
                  </defs>
                  <rect width="600" height="750" fill="url(#sun)" />
                  <line x1="0" y1="380" x2="600" y2="380" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <rect x="0" y="380" width="600" height="370" fill="url(#water)" />
                  <path fill="rgba(255,255,255,0.06)" d="M0,430 Q150,410 300,430 Q450,450 600,430 L600,460 Q450,480 300,460 Q150,440 0,460Z" />
                  <path fill="rgba(255,255,255,0.04)" d="M0,500 Q200,480 400,500 Q500,510 600,500 L600,530 Q500,540 400,530 Q200,510 0,530Z" />
                  <g opacity="0.4" fill="#082a3a">
                    <rect x="80" y="300" width="6" height="100" rx="3" />
                    <ellipse cx="83" cy="280" rx="45" ry="30" transform="rotate(-20 83 280)" />
                    <ellipse cx="83" cy="275" rx="40" ry="25" transform="rotate(15 83 275)" />
                  </g>
                  <g opacity="0.25" transform="translate(280, 390)">
                    <path d="M-30,0 Q0,-8 30,0 L25,15 L-25,15Z" fill="#1a1510" />
                    <line x1="0" y1="0" x2="0" y2="-35" stroke="#1a1510" strokeWidth="1.5" />
                    <path d="M0,-35 L25,-15 L0,-8Z" fill="#1a1510" opacity="0.7" />
                  </g>
                  <path fill="rgba(255,220,150,0.12)" d="M250,380 Q300,390 350,380 L340,500 Q300,510 260,500Z" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4 }}
              style={{
                position: "absolute", bottom: "-2rem", right: "-2rem",
                padding: "1.5rem", boxShadow: "0 20px 60px rgba(8,42,58,0.3)",
                background: "var(--ocean-deep)", minWidth: "180px",
              }}
            >
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.875rem", fontWeight: 300, color: "var(--sand-100)" }}>37°</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.25rem", color: "var(--ocean-300)" }}>
                avg. water temp
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
            gap: "2rem",
            marginTop: "6rem",
            paddingTop: "4rem",
            borderTop: "1px solid var(--sand-200)",
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--ocean-500)" }}>
                {stat.num}<span style={{ fontSize: "1.25rem" }}>{stat.unit}</span>
              </div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.5rem", color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
