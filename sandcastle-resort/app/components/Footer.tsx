"use client";

const footerLinks = {
  Resort:  ["About Us", "Our Story", "Press", "Careers"],
  Explore: ["Rooms & Villas", "Experiences", "Dining", "Wellness"],
  Plan:    ["Book a Stay", "Events", "Packages", "Gift Cards"],
  Connect: ["Contact", "FAQs", "Sustainability", "Accessibility"],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--dusk)", color: "var(--sand-100)" }}>
      {/* Red-to-dusk wave transition */}
      <svg style={{ width: "100%", display: "block", background: "var(--charcoal)", marginBottom: "-1px" }} viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path fill="var(--dusk)" d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,80 L0,80Z"/>
      </svg>

      {/* Top accent stripe */}
      <div style={{ height: 2, background: "linear-gradient(90deg, transparent, var(--red-600), var(--sand-400), var(--red-600), transparent)" }} />

      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 2.5rem 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(10rem,1fr))", gap: "3rem", marginBottom: "4rem" }}>

          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <h2 className="font-display" style={{ fontSize: "1.875rem", fontWeight: 300, marginBottom: "0.5rem", color: "var(--sand-100)" }}>Sandcastle</h2>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem", color: "var(--sand-400)" }}>
              Beach Resort · Dapoli
            </p>
            <p className="font-body" style={{ fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "2rem", color: "rgba(253,250,245,0.5)" }}>
              Where the Konkan coast's timeless beauty meets thoughtful luxury. A sanctuary for those who seek stillness.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {["IG", "FB", "TW"].map((s) => (
                <a key={s} href="#" style={{ width: "2.25rem", height: "2.25rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(253,250,245,0.15)", color: "rgba(253,250,245,0.6)", fontFamily: "'Jost',sans-serif", fontSize: "0.75rem", textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--red-400)"; (e.currentTarget as HTMLElement).style.color = "var(--red-300)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(253,250,245,0.15)"; (e.currentTarget as HTMLElement).style.color = "rgba(253,250,245,0.6)"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem", color: "var(--sand-400)" }}>
                {category}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body" style={{ fontSize: "0.875rem", color: "rgba(253,250,245,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--red-200)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(253,250,245,0.5)")}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", padding: "2rem 0", borderTop: "1px solid rgba(253,250,245,0.08)", borderBottom: "1px solid rgba(253,250,245,0.08)", marginBottom: "2.5rem" }}>
          <div>
            <p className="font-display" style={{ fontSize: "1.25rem", fontWeight: 300, color: "var(--sand-100)", margin: "0 0 0.25rem" }}>Stay in the loop</p>
            <p className="font-body" style={{ fontSize: "0.875rem", color: "rgba(253,250,245,0.45)", margin: 0 }}>Seasonal offers, stories, and curated Konkan dispatches.</p>
          </div>
          <div style={{ display: "flex" }}>
            <input type="email" placeholder="Your email address" style={{ padding: "0.875rem 1.25rem", fontFamily: "'Jost',sans-serif", fontSize: "0.875rem", background: "rgba(255,255,255,0.06)", color: "var(--sand-100)", border: "1px solid rgba(253,250,245,0.1)", outline: "none", width: "16rem" }} />
            <button style={{ padding: "0.875rem 1.5rem", fontFamily: "'Jost',sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", background: "var(--red-500)", color: "var(--sand-50)", border: "none", cursor: "pointer" }}>
              Subscribe
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <p className="font-body" style={{ fontSize: "0.75rem", color: "rgba(253,250,245,0.3)", margin: 0 }}>© 2025 Sandcastle Beach Resort, Dapoli. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="font-body" style={{ fontSize: "0.75rem", color: "rgba(253,250,245,0.3)", textDecoration: "none" }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}