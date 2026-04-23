"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const rooms = [
  {
    name: "Shoreline Suite",
    type: "Beachfront",
    size: "68 m²",
    guests: "2",
    price: "₹18,500",
    features: ["Private terrace", "Ocean view", "King bed", "Jacuzzi"],
    gradient: "linear-gradient(135deg, #082a3a 0%, #1e6b82 50%, #3d8fa3 100%)",
    accent: "#6ab5c4",
    badge: "Most Popular",
  },
  {
    name: "Coconut Grove Villa",
    type: "Garden",
    size: "95 m²",
    guests: "4",
    price: "₹28,000",
    features: ["Private pool", "Garden view", "2 Bedrooms", "Butler service"],
    gradient: "linear-gradient(135deg, #1a1510 0%, #3d2b1a 50%, #5c4f3d 100%)",
    accent: "#c9a87a",
    badge: "Family Choice",
  },
  {
    name: "Horizon Cottage",
    type: "Cliff View",
    size: "52 m²",
    guests: "2",
    price: "₹14,000",
    features: ["Cliff-top view", "Queen bed", "Sea breeze deck", "Plunge pool"],
    gradient: "linear-gradient(135deg, #0d4e65 0%, #1e6b82 60%, #082a3a 100%)",
    accent: "#a8d8e0",
    badge: null,
  },
  {
    name: "The Sandcastle Penthouse",
    type: "Premium",
    size: "145 m²",
    guests: "6",
    price: "₹52,000",
    features: ["Panoramic sea view", "Private infinity pool", "3 Bedrooms", "Personal chef"],
    gradient: "linear-gradient(135deg, #082a3a 0%, #0d4e65 30%, #b38b55 100%)",
    accent: "#e6c97e",
    badge: "Signature",
  },
];

function RoomCard({ room, index }: { room: typeof rooms[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      style={{ position: "relative", overflow: "hidden", borderRadius: "2px", cursor: "pointer" }}
    >
      {/* Visual */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", background: room.gradient }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <path fill="rgba(106,181,196,0.3)" d="M0,180 Q100,160 200,180 Q300,200 400,180 L400,300 L0,300Z" />
          <rect x="140" y="120" width="120" height="80" fill="rgba(8,42,58,0.4)" rx="2" />
          <polygon points="120,120 200,80 280,120" fill="rgba(8,42,58,0.5)" />
          <rect x="160" y="140" width="20" height="20" fill="rgba(255,220,150,0.4)" rx="1" />
          <rect x="220" y="140" width="20" height="20" fill="rgba(255,220,150,0.4)" rx="1" />
          <rect x="55" y="100" width="4" height="100" fill="rgba(8,42,58,0.5)" rx="2" />
          <ellipse cx="57" cy="85" rx="30" ry="18" fill="rgba(8,42,58,0.4)" transform="rotate(-15 57 85)" />
        </svg>

        {room.badge && (
          <div style={{
            position: "absolute", top: "1rem", right: "1rem",
            fontFamily: "'Jost', sans-serif", fontSize: "0.65rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "0.25rem 0.75rem",
            background: room.accent, color: "var(--ocean-deep)",
          }}>
            {room.badge}
          </div>
        )}
        <div style={{
          position: "absolute", bottom: "1rem", left: "1rem",
          fontFamily: "'Jost', sans-serif", fontSize: "0.65rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(253,250,245,0.6)",
        }}>
          {room.type}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1.75rem", backgroundColor: "#ffffff", borderTop: `2px solid ${room.accent}33` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "var(--ocean-deep)", margin: 0 }}>
            {room.name}
          </h3>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: "var(--ocean-500)" }}>{room.price}</div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--text-muted)" }}>per night</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1.25rem", marginBottom: "1.25rem" }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--text-muted)" }}>⬛ {room.size}</span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--text-muted)" }}>👥 Up to {room.guests} guests</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {room.features.map((f) => (
            <span key={f} style={{
              fontFamily: "'Jost', sans-serif", fontSize: "0.7rem",
              padding: "0.25rem 0.625rem",
              background: "var(--sand-100)", color: "var(--text-secondary)",
            }}>
              {f}
            </span>
          ))}
        </div>

        <button style={{
          width: "100%",
          fontFamily: "'Jost', sans-serif", fontSize: "0.7rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          padding: "0.875rem",
          border: `1px solid ${room.accent}`,
          color: "var(--ocean-600)",
          background: "transparent",
          cursor: "pointer",
          transition: "all 0.3s",
        }}>
          View Details & Book
        </button>
      </div>
    </motion.div>
  );
}

export default function Rooms() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section id="rooms" style={{ padding: "10rem 0", background: "var(--sand-100)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2.5rem" }}>
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "5rem" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem" }}
          >
            <div style={{ width: "4rem", height: "1px", background: "var(--ocean-400)" }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ocean-400)" }}>
              Accommodations
            </span>
            <div style={{ width: "4rem", height: "1px", background: "var(--ocean-400)" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 300, color: "var(--ocean-deep)", margin: 0 }}
          >
            Rooms & Villas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem", marginTop: "1rem", maxWidth: "28rem", marginLeft: "auto", marginRight: "auto", color: "var(--text-secondary)" }}
          >
            Each space is a sanctuary — thoughtfully designed to bring the ocean inside
          </motion.p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 26rem), 1fr))", gap: "2rem" }}>
          {rooms.map((room, i) => (
            <RoomCard key={room.name} room={room} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
            gap: "1.5rem",
            marginTop: "5rem",
            paddingTop: "4rem",
            borderTop: "1px solid var(--sand-200)",
          }}
        >
          {[
            { icon: "🌊", label: "Private Beach Access" },
            { icon: "🍽️", label: "Farm-to-Table Dining" },
            { icon: "🧘", label: "Wellness & Spa" },
            { icon: "🚤", label: "Water Activities" },
          ].map((amenity) => (
            <div key={amenity.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{amenity.icon}</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.875rem", color: "var(--text-secondary)" }}>{amenity.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
