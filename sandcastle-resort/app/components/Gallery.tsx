"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const galleryItems = [
  { id: 1, gradient: "linear-gradient(135deg, #1a0d0a 0%, #9e2b1f 100%)", label: "Sunrise over the Arabian Sea", tall: true },
  { id: 2, gradient: "linear-gradient(135deg, #3d1a10 0%, #c9a87a 100%)", label: "Coconut grove pathways", tall: false },
  { id: 3, gradient: "linear-gradient(135deg, #6b1a11 0%, #d94f35 100%)", label: "Beachfront infinity pool", tall: false },
  { id: 4, gradient: "linear-gradient(160deg, #1a0d0a 0%, #6b1a11 60%, #c9a87a 100%)", label: "Private villa terrace", tall: true },
  { id: 5, gradient: "linear-gradient(135deg, #9e2b1f 0%, #1a0d0a 100%)", label: "Cliff walk at golden hour", tall: false },
  { id: 6, gradient: "linear-gradient(135deg, #1a0d0a 0%, #c0392b 50%, #e8755e 100%)", label: "Evening beach bonfire", tall: false },
  { id: 7, gradient: "linear-gradient(135deg, #3d2b1a 0%, #b38b55 100%)", label: "Konkan cuisine tasting", tall: false },
  { id: 8, gradient: "linear-gradient(160deg, #1a0d0a 0%, #d94f35 70%, #c9a87a 100%)", label: "Boat ride at dusk", tall: false },
];

const GalleryCard = ({ item, onClick, index }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: "2px", gridRow: item.tall ? "span 2" : "span 1" }}
      whileHover={{ scale: 1.02 }}
    >
      <div style={{ position: "absolute", inset: 0, background: item.gradient, transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.7s ease" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <path fill="rgba(201,168,122,0.25)" d="M0,200 Q100,180 200,200 Q300,220 400,200 L400,300 L0,300Z"/>
          <circle cx="200" cy="100" r="60" fill="rgba(255,255,255,0.03)"/>
        </svg>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(26,13,10,0.55)", opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", transform: hovered ? "translateY(0)" : "translateY(100%)", transition: "transform 0.4s" }}>
        <p className="font-body" style={{ fontSize: "0.875rem", color: "var(--sand-100)", margin: 0 }}>{item.label}</p>
      </div>
      <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "2rem", height: "2rem", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
      </div>
    </motion.div>
  );
};

export default function Gallery() {
  const [selected, setSelected] = useState<any>(null);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section id="gallery" style={{ padding: "10rem 0", background: "var(--sand-50)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2.5rem" }}>
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "4rem", height: "1px", background: "var(--red-400)" }} />
            <span className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--red-400)" }}>Visual Journey</span>
            <div style={{ width: "4rem", height: "1px", background: "var(--red-400)" }} />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,3.75rem)", fontWeight: 300, color: "var(--red-deep)", margin: 0 }}>
            Gallery
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "220px", gap: "0.75rem" }} className="gallery-responsive">
          {galleryItems.map((item, i) => <GalleryCard key={item.id} item={item} onClick={setSelected} index={i} />)}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", background: "rgba(26,13,10,0.95)", backdropFilter: "blur(10px)" }}>
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", maxWidth: "48rem", width: "100%", aspectRatio: "16/10", borderRadius: "2px", background: selected.gradient }}>
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                <p className="font-display" style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--sand-100)", margin: 0 }}>{selected.label}</p>
                <p className="font-body" style={{ fontSize: "0.875rem", marginTop: "0.25rem", color: "rgba(253,250,245,0.6)" }}>Sandcastle Beach Resort · Dapoli</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ position: "absolute", top: "1rem", right: "1rem", width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.3)", color: "white", background: "transparent", cursor: "pointer", fontSize: "1rem" }}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(max-width:768px){.gallery-responsive{grid-template-columns:repeat(2,1fr)!important;grid-auto-rows:160px!important;}}`}</style>
    </section>
  );
}
