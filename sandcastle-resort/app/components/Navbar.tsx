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
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "none",
          backgroundColor: scrolled ? "rgba(253,250,245,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(198,168,120,0.15)" : "none",
          padding: scrolled ? "12px 0" : "24px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start group"
          >
            <span
              className="font-display text-xl md:text-2xl tracking-wide leading-none transition-colors duration-300"
              style={{ color: scrolled ? "var(--ocean-deep)" : "var(--sand-50)" }}
            >
              Sandcastle
            </span>
            <span
              className="font-body text-xs tracking-[0.25em] uppercase transition-colors duration-300"
              style={{ color: scrolled ? "var(--sand-400)" : "rgba(253,250,245,0.7)" }}
            >
              Beach Resort
            </span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="font-body text-sm tracking-[0.12em] uppercase transition-all duration-300 hover:opacity-70 relative group"
                  style={{ color: scrolled ? "var(--text-secondary)" : "rgba(253,250,245,0.85)" }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{ background: scrolled ? "var(--ocean-400)" : "rgba(253,250,245,0.7)" }}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={() => handleNav("#contact")}
            className="hidden md:block font-body text-xs tracking-[0.2em] uppercase px-6 py-2.5 border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: scrolled ? "var(--ocean-400)" : "rgba(253,250,245,0.5)",
              color: scrolled ? "var(--ocean-500)" : "var(--sand-50)",
              backgroundColor: "transparent",
            }}
          >
            Book Stay
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            style={{ color: scrolled ? "var(--text-primary)" : "var(--sand-50)" }}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block w-6 h-px bg-current transition-all" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-px bg-current" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-6 h-px bg-current" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "var(--ocean-deep)" }}
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="font-display text-4xl tracking-wide"
                    style={{ color: "var(--sand-100)" }}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
