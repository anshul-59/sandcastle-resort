"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  { title: "Sunrise Beach Walks", description: "Begin each day with a barefoot walk along our private shoreline as the sun rises over the Arabian Sea, painting the sky in amber and gold.", icon: "🌅", gradient: "linear-gradient(135deg, #c9a87a 0%, #b38b55 100%)" },
  { title: "Konkan Cuisine Trail", description: "Embark on a culinary journey through authentic Malvani flavors — fresh catch, kokum curries, and sol kadhi served at sunset.", icon: "🍛", gradient: "linear-gradient(135deg, #9e2b1f 0%, #6b1a11 100%)" },
  { title: "Ancient Fort Trails", description: "Trek to the 16th century Suvarnadurg sea fort, a marvel of Maratha architecture rising dramatically from the ocean.", icon: "🏰", gradient: "linear-gradient(135deg, #3d1a10 0%, #1a0d0a 100%)" },
  { title: "Snorkeling & Diving", description: "Discover the vibrant underwater world of the Konkan coast — teeming coral reefs, schools of tropical fish, and ancient shipwrecks.", icon: "🤿", gradient: "linear-gradient(135deg, #1a0d0a 0%, #d94f35 100%)" },
  // { title: "Yoga & Meditation", description: "Restore your inner balance with guided beachside yoga sessions at dawn, where the only sound is the ocean's gentle rhythm.", icon: "🧘", gradient: "linear-gradient(135deg, #6b1a11 0%, #e8755e 100%)" },
  // { title: "Moonlit Boat Rides", description: "Set sail on the shimmering waters under a canopy of stars. Witness bioluminescent plankton light up the night sea like living magic.", icon: "🌙", gradient: "linear-gradient(135deg, #1a0d0a 0%, #c0392b 100%)" },
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", padding: "2.5rem", overflow: "hidden", cursor: "pointer", background: hovered ? "var(--dusk)" : "#ffffff", borderBottom: "1px solid var(--sand-200)", transition: "background 0.5s" }}
    >
      <div style={{ position: "absolute", inset: 0, background: exp.gradient, opacity: hovered ? 1 : 0, transition: "opacity 0.5s" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1.25rem" }}>{exp.icon}</div>
        <h3 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 300, margin: "0 0 0.75rem", color: hovered ? "#ffffff" : "var(--red-deep)", transition: "color 0.3s" }}>
          {exp.title}
        </h3>
        <p className="font-body" style={{ fontSize: "0.875rem", lineHeight: 1.7, margin: 0, color: hovered ? "rgba(255,255,255,0.8)" : "var(--text-secondary)", transition: "color 0.3s" }}>
          {exp.description}
        </p>
        <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}>
          <span className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Learn more</span>
          <div style={{ height: "1px", width: "2rem", background: "rgba(255,255,255,0.5)" }} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Experiences() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section id="experiences" style={{ padding: "10rem 0", background: "var(--sand-50)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2.5rem" }}>
        <div ref={headerRef} style={{ marginBottom: "5rem" }}>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "4rem", height: "1px", background: "var(--red-400)" }} />
            <span className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--red-400)" }}>Curated Moments</span>
          </motion.div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem" }}>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,3.75rem)", fontWeight: 300, color: "var(--red-deep)", margin: 0 }}>
              Experiences
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body" style={{ fontSize: "0.875rem", maxWidth: "18rem", color: "var(--text-secondary)", margin: 0 }}>
              Every moment here is crafted to draw you closer to nature, culture, and yourself.
            </motion.p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,18rem),1fr))", border: "1px solid var(--sand-200)" }}>
          {experiences.map((exp, i) => <ExperienceCard key={exp.title} exp={exp} index={i} />)}
        </div>
      </div>
    </section>
  );
}