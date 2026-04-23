"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Gallery", href: "#gallery" },
  { label: "Experiences", href: "#experiences" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrolledBg = "rgba(253,250,245,0.94)";
  const scrolledBorder = "rgba(201,168,122,0.2)";

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          backgroundColor: scrolled ? scrolledBg : "transparent",
          borderBottom: scrolled ? `1px solid ${scrolledBorder}` : "none",
          padding: scrolled ? "12px 0" : "22px 0",
          transition: "all 0.4s ease",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <div className="font-display" style={{ fontSize: 22, letterSpacing: "0.04em", lineHeight: 1, color: scrolled ? "var(--red-deep)" : "var(--sand-50)", transition: "color 0.3s" }}>
              Sandcastle
            </div>
            <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: scrolled ? "var(--sand-400)" : "rgba(253,250,245,0.65)", transition: "color 0.3s", marginTop: 2 }}>
              Beach Resort
            </div>
          </button>

          {/* Desktop links */}
          <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.label} style={{ display: "none" }} className="nav-desktop-item">
                <button onClick={() => handleNav(link.href)}
                  style={{
                    fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                    background: "none", border: "none", cursor: "pointer",
                    color: scrolled ? "var(--text-secondary)" : "rgba(253,250,245,0.85)",
                    transition: "opacity 0.3s", position: "relative",
                  }}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button onClick={() => handleNav("#contact")}
            style={{
              fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "10px 22px",
              border: `1px solid ${scrolled ? "var(--red-400)" : "rgba(253,250,245,0.5)"}`,
              color: scrolled ? "var(--red-500)" : "var(--sand-50)",
              background: "transparent", cursor: "pointer", transition: "all 0.3s",
              display: "none",
            }}
            className="nav-cta-desktop"
          >
            Book Stay
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger"
            style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 8, display: "flex" }}>
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              style={{ display: "block", width: 24, height: 1, background: scrolled ? "var(--text-primary)" : "var(--sand-50)", transformOrigin: "center" }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{ display: "block", width: 24, height: 1, background: scrolled ? "var(--text-primary)" : "var(--sand-50)" }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              style={{ display: "block", width: 24, height: 1, background: scrolled ? "var(--text-primary)" : "var(--sand-50)", transformOrigin: "center" }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "var(--dusk)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 32, textAlign: "center", padding: 0, margin: 0 }}>
              {navLinks.map((link, i) => (
                <motion.li key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <button onClick={() => handleNav(link.href)} className="font-display"
                    style={{ fontSize: 40, color: "var(--sand-100)", background: "none", border: "none", cursor: "pointer" }}>
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop-item { display: list-item !important; }
          .nav-cta-desktop  { display: block !important; }
          .nav-hamburger    { display: none !important; }
        }
      `}</style>
    </>
  );
}