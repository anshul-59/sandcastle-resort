"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle effect on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animFrame: number;
    let mouseX = 0, mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; speed: number;
    }> = [];

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx -= (dx / dist) * 0.02;
          p.vy -= (dy / dist) * 0.02;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx + p.speed * 0.2;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,240,${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,240,${0.06 * (1 - dist / 100)})`;
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

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // GSAP parallax on scroll
  useEffect(() => {
    if (!bgRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    tl.to(bgRef.current, { y: "25%", ease: "none" });
    tl.to(overlayRef.current, { opacity: 0.7, ease: "none" }, 0);
    return () => { tl.kill(); };
  }, []);

  const handleScroll = () => {
    const next = document.querySelector("#about");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(13,78,101,0.7) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(8,42,58,0.8) 0%, transparent 50%),
              linear-gradient(180deg, #082a3a 0%, #0d4e65 25%, #1e6b82 50%, #3d8fa3 75%, #6ab5c4 100%)
            `,
          }}
        />
        {/* Ocean wave layers */}
        <svg className="absolute bottom-0 w-full opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ height: "40%" }}>
          <path fill="rgba(106,181,196,0.3)" d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,186.7C672,181,768,139,864,133.3C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          <path fill="rgba(61,143,163,0.2)" d="M0,256L60,245.3C120,235,240,213,360,213.3C480,213,600,235,720,229.3C840,224,960,192,1080,186.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
        {/* Horizon glow */}
        <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(198,168,120,0.15), transparent)" }} />
      </div>

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Overlay */}
      <div ref={overlayRef} className="absolute inset-0 z-20" style={{ background: "rgba(8,42,58,0.35)" }} />

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-12 h-px" style={{ background: "rgba(253,250,245,0.4)" }} />
          <span
            className="font-body text-xs tracking-[0.3em] uppercase"
            style={{ color: "rgba(253,250,245,0.65)" }}
          >
            Dapoli · Konkan Coast · Maharashtra
          </span>
          <div className="w-12 h-px" style={{ background: "rgba(253,250,245,0.4)" }} />
        </motion.div>

        {/* Main Title */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-none tracking-wide"
            style={{ color: "var(--sand-50)" }}
          >
            Sandcastle
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-light italic leading-none tracking-wide"
            style={{ color: "var(--ocean-200)" }}
          >
            Beach Resort
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="font-body text-base md:text-lg font-light mt-6 max-w-md"
          style={{ color: "rgba(253,250,245,0.7)", letterSpacing: "0.08em" }}
        >
          A peaceful coastal escape where the Arabian Sea meets the soul of Konkan
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex gap-4 mt-10"
        >
          <button
            onClick={() => document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" })}
            className="font-body text-xs tracking-[0.25em] uppercase px-8 py-3.5 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "var(--ocean-400)",
              color: "var(--sand-50)",
              boxShadow: "0 4px 20px rgba(61,143,163,0.3)",
            }}
          >
            Explore Rooms
          </button>
          <button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="font-body text-xs tracking-[0.25em] uppercase px-8 py-3.5 border transition-all duration-300 hover:scale-105"
            style={{ borderColor: "rgba(253,250,245,0.4)", color: "var(--sand-50)" }}
          >
            Our Story
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleScroll}
      >
        <span className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(253,250,245,0.5)" }}>
          Scroll
        </span>
        <div className="w-px h-14 relative overflow-hidden" style={{ background: "rgba(253,250,245,0.15)" }}>
          <motion.div
            className="w-full absolute top-0"
            style={{ background: "rgba(253,250,245,0.6)", height: "40%" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
