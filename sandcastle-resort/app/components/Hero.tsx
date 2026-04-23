"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const bgRef     = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animFrame: number;
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const dx = mouseX - p.x, dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { p.vx -= (dx / dist) * 0.02; p.vy -= (dy / dist) * 0.02; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx + p.speed * 0.2; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,235,${p.opacity})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,220,210,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener("resize", resize); };
  }, []);

  /* GSAP parallax */
  useEffect(() => {
    if (!bgRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
    });
    tl.to(bgRef.current, { y: "25%", ease: "none" });
    tl.to(overlayRef.current, { opacity: 0.7, ease: "none" }, 0);
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={heroRef} style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>

      {/* Background — warm red-dusk gradient */}
      <div ref={bgRef} style={{ position: "absolute", inset: 0, transform: "scale(1.1)" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(107,26,17,0.75) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 15%, rgba(26,13,10,0.85) 0%, transparent 55%),
            linear-gradient(180deg,
              #1a0d0a 0%,
              #3d1a10 20%,
              #6b1a11 40%,
              #9e2b1f 60%,
              #c0392b 75%,
              #d94f35 88%,
              #c9a87a 100%
            )
          `,
        }} />
        {/* Dusk wave shapes */}
        <svg style={{ position: "absolute", bottom: 0, width: "100%", opacity: 0.18 }} viewBox="0 0 1440 320" preserveAspectRatio="none" height="40%">
          <path fill="rgba(201,168,122,0.35)" d="M0,192L48,181C96,171,192,149,288,154C384,160,480,192,576,186C672,181,768,139,864,133C960,128,1056,160,1152,170C1248,181,1344,171,1392,165L1440,160L1440,320L0,320Z"/>
          <path fill="rgba(217,79,53,0.2)" d="M0,256L60,245C120,235,240,213,360,213C480,213,600,235,720,229C840,224,960,192,1080,186C1200,181,1320,203,1380,213L1440,224L1440,320L0,320Z"/>
        </svg>
        {/* Warm horizon glow */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, rgba(201,168,122,0.2), transparent)" }} />
      </div>

      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }} />
      <div ref={overlayRef} style={{ position: "absolute", inset: 0, zIndex: 20, background: "rgba(26,13,10,0.3)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 30, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}
        >
          <div style={{ width: 48, height: 1, background: "rgba(253,250,245,0.35)" }} />
          <span className="font-body" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(253,250,245,0.6)" }}>
            Dapoli · Konkan Coast · Maharashtra
          </span>
          <div style={{ width: 48, height: 1, background: "rgba(253,250,245,0.35)" }} />
        </motion.div>

        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display"
            style={{ fontSize: "clamp(52px,10vw,120px)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "0.03em", color: "var(--sand-50)", display: "block" }}
          >
            Sandcastle
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display"
            style={{ fontSize: "clamp(52px,10vw,120px)", fontWeight: 300, lineHeight: 0.95, fontStyle: "italic", color: "var(--red-200)", display: "block" }}
          >
            Beach Resort
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.5 }}
          className="font-body"
          style={{ fontSize: 15, letterSpacing: "0.07em", color: "rgba(253,250,245,0.65)", marginTop: 24, maxWidth: 420, lineHeight: 1.7 }}
        >
          A peaceful coastal escape where the Arabian Sea meets the soul of Konkan
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.8 }}
          style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap", justifyContent: "center" }}
        >
          <button
            onClick={() => document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" })}
            style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", padding: "14px 32px", background: "var(--red-400)", color: "var(--sand-50)", border: "none", cursor: "pointer", transition: "transform 0.2s,box-shadow 0.2s", boxShadow: "0 4px 20px rgba(192,57,43,0.35)" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            Explore Rooms
          </button>
          <button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", padding: "14px 32px", background: "transparent", border: "1px solid rgba(253,250,245,0.4)", color: "var(--sand-50)", cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            Our Story
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="font-body" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(253,250,245,0.45)" }}>Scroll</span>
        <div style={{ width: 1, height: 56, background: "rgba(253,250,245,0.15)", position: "relative", overflow: "hidden" }}>
          <motion.div
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "rgba(253,250,245,0.6)" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}