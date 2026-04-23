"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const inputStyle = {
  width: "100%", padding: "0.875rem 1rem",
  fontFamily: "'Jost', sans-serif", fontSize: "0.875rem",
  background: "var(--sand-50)",
  border: "1px solid var(--sand-200)",
  color: "var(--text-primary)",
  outline: "none",
  boxSizing: "border-box" as const,
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section id="contact" style={{ padding: "10rem 0", background: "var(--sand-100)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2.5rem" }} ref={ref}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))", gap: "5rem" }}>

          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ width: "4rem", height: "1px", background: "var(--ocean-400)" }} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ocean-400)" }}>Get in Touch</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 300, lineHeight: 1.1, marginBottom: "2rem", color: "var(--ocean-deep)" }}
            >
              Plan your<br /><em>perfect escape</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.5rem", color: "var(--text-secondary)" }}
            >
              Whether you're planning a romantic retreat, a family vacation, or a soulful solo journey — our team is here to curate every detail of your stay.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }} style={{ marginBottom: "3rem" }}>
              {[
                { icon: "📍", label: "Location", value: "Beach Road, Dapoli, Ratnagiri District, Maharashtra 415712" },
                { icon: "📞", label: "Reservations", value: "+91 98765 43210" },
                { icon: "✉️", label: "Email", value: "stay@sandcastleresort.com" },
                { icon: "🕐", label: "Check-in / Check-out", value: "2:00 PM / 11:00 AM" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                  <span style={{ fontSize: "1.25rem", marginTop: "0.1rem" }}>{item.icon}</span>
                  <div>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem", color: "var(--text-muted)", margin: "0 0 0.25rem" }}>{item.label}</p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.875rem", color: "var(--text-primary)", margin: 0 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.4 }}
              style={{ overflow: "hidden", borderRadius: "2px", height: "220px" }}
            >
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.9800%2C17.5500%2C73.2000%2C17.7800&layer=mapnik"
                width="100%" height="220"
                style={{ border: "none", filter: "saturate(0.7) sepia(0.2)", display: "block" }}
                title="Dapoli, Maharashtra"
              />
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ padding: "2.5rem", backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(8,42,58,0.06)" }}
          >
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.875rem", fontWeight: 300, marginBottom: "0.5rem", color: "var(--ocean-deep)" }}>Reserve Your Stay</h3>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.875rem", marginBottom: "2rem", color: "var(--text-muted)" }}>
              Fill in the details below and our team will reach out within 2 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { label: "Full Name", type: "text", placeholder: "Your name" },
                { label: "Email Address", type: "email", placeholder: "you@email.com" },
                { label: "Phone Number", type: "tel", placeholder: "+91 00000 00000" },
              ].map((field) => (
                <div key={field.label}>
                  <label style={{ display: "block", fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem", color: "var(--text-muted)" }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = "var(--ocean-400)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--sand-200)"}
                  />
                </div>
              ))}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {["Check-in", "Check-out"].map((label) => (
                  <div key={label}>
                    <label style={{ display: "block", fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem", color: "var(--text-muted)" }}>{label}</label>
                    <input type="date" style={inputStyle} onFocus={(e) => e.target.style.borderColor = "var(--ocean-400)"} onBlur={(e) => e.target.style.borderColor = "var(--sand-200)"} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Room Type</label>
                <select style={{ ...inputStyle, appearance: "none" as const }}>
                  <option value="">Select a room...</option>
                  <option>Shoreline Suite</option>
                  <option>Coconut Grove Villa</option>
                  <option>Horizon Cottage</option>
                  <option>The Sandcastle Penthouse</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem", color: "var(--text-muted)" }}>Special Requests</label>
                <textarea
                  rows={3}
                  placeholder="Anniversaries, dietary needs, early check-in..."
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => e.target.style.borderColor = "var(--ocean-400)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--sand-200)"}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  fontFamily: "'Jost', sans-serif", fontSize: "0.875rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "1.125rem",
                  background: "var(--ocean-deep)",
                  color: "var(--sand-50)",
                  border: "none", cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(8,42,58,0.2)",
                }}
              >
                Send Enquiry
              </motion.button>

              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", textAlign: "center", color: "var(--text-muted)", margin: 0 }}>
                We respond within 2 hours · No payment required now
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
