export default function SectionFlow() {
    return (
      <style>{`
        /* ── Continuous page gradient backdrop ── */
        body {
          background: #1a0d0a !important;
        }
  
        /* Each section gets a transparent bg so the page gradient shows through */
        #about    { background: transparent !important; }
        #rooms    { background: transparent !important; }
        #gallery  { background: transparent !important; }
        #experiences { background: transparent !important; }
        #contact  { background: transparent !important; }
  
        /* The page-level gradient column */
        .page-flow {
          position: relative;
          background: linear-gradient(
            180deg,
            /* Hero zone — deep charcoal red */
            #1a0d0a 0%,
            #2d1208 8%,
            /* About transition — warming up */
            #3d1a10 15%,
            #5c2415 22%,
            /* Rooms — mid warm sand-red */
            #7a3020 28%,
            #9e3d28 34%,
            /* Gallery — sandy terracotta */
            #b85535 40%,
            #c9a87a 48%,
            /* Experiences — warm sand */
            #e8d5b0 54%,
            #f2e8d0 60%,
            /* Testimonials — back to dark rich red */
            #d4c4a0 66%,
            #8b3020 72%,
            #4a1508 78%,
            /* Contact — deep charcoal with warmth */
            #2d1208 84%,
            #1a0d0a 90%,
            /* Footer */
            #0f0805 100%
          );
        }
  
        /* Overlay a subtle noise/texture over the gradient */
        .page-flow::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }
  
        /* All section content sits above the gradient */
        section > * { position: relative; z-index: 1; }
        section { position: relative; }
  
        /* Section-specific overlay tints to help readability without hard bg */
        #rooms::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(253,250,245,0.07);
          pointer-events: none;
        }
        #gallery::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(201,168,122,0.06);
          pointer-events: none;
        }
        #experiences::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(253,250,245,0.05);
          pointer-events: none;
        }
  
        /* Text color adaptations for mid-page light zone */
        #rooms h2, #rooms h3,
        #gallery h2,
        #experiences h2 {
          color: var(--red-deep) !important;
        }
  
        /* Card surfaces get a slight frosted look so they float on the gradient */
        #rooms .card-surface,
        #contact .form-surface {
          backdrop-filter: blur(8px);
          background: rgba(253,250,245,0.92) !important;
        }
      `}</style>
    );
  }