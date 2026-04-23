"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Track current scale to offset translate calculations
    let currentScale = 1;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      // Offset translate by half the scaled size to keep cursor centered on pointer
      const offset = (currentScale - 1) * 16; // 32px * 0.5 = 16px offset per 0.1 scale
      
      cursor.style.transform = `translate3d(${x - offset}px, ${y - offset}px, 0) scale(${currentScale})`;
    };

    const onEnter = () => {
      currentScale = 1.2;
      // Recalculate offset immediately when scale changes
      const offset = (currentScale - 1) * 16;
      const rect = cursor.getBoundingClientRect();
      cursor.style.transform = `translate3d(${rect.left - offset}px, ${rect.top - offset}px, 0) scale(${currentScale})`;
    };
    
    const onLeave = () => {
      currentScale = 1;
      const offset = (currentScale - 1) * 16;
      const rect = cursor.getBoundingClientRect();
      cursor.style.transform = `translate3d(${rect.left - offset}px, ${rect.top -0}px, 0) scale(${currentScale})`;
    };

    window.addEventListener("mousemove", onMove);
    
    const interactive = document.querySelectorAll("a, button, .cursor-pointer");
    interactive.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactive.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="custom-cursor-container hidden md:block"
      style={{ 
        width: '32px', 
        height: '32px',
        marginTop: '-16px', 
        marginLeft: '-16px',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <img 
        src="/cursor-shell.png" 
        alt="" 
        className="w-full h-full object-contain" 
      />
    </div>
  );
}