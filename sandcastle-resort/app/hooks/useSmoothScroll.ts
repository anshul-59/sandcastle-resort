"use client";
import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    let lenis: any;
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      // Sync with GSAP ScrollTrigger if available
      lenis.on("scroll", () => {
        if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
          (window as any).ScrollTrigger.update();
        }
      });
    };
    initLenis();
    return () => { if (lenis) lenis.destroy(); };
  }, []);
}
