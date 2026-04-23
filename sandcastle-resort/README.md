# 🏖️ Sandcastle Beach Resort — Website

A premium, cinematic resort website for **Sandcastle Beach Resort**, Dapoli, Maharashtra.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19 + TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — UI animations & micro-interactions
- **GSAP + ScrollTrigger** — Scroll-based parallax animations
- **Lenis** — Buttery smooth scroll

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── components/
│   ├── CustomCursor.tsx    # Animated cursor (desktop only)
│   ├── Navbar.tsx          # Sticky shrinking navbar + mobile menu
│   ├── Hero.tsx            # Fullscreen hero with particle canvas
│   ├── About.tsx           # Story section with parallax image
│   ├── Rooms.tsx           # Room cards with hover effects
│   ├── Gallery.tsx         # Masonry gallery with lightbox
│   ├── Experiences.tsx     # Animated experiences grid
│   ├── Testimonials.tsx    # Carousel testimonials
│   ├── Contact.tsx         # Contact form + map
│   └── Footer.tsx          # Elegant footer with newsletter
├── hooks/
│   └── useSmoothScroll.ts  # Lenis smooth scroll hook
├── globals.css             # Design tokens + base styles
├── layout.tsx              # Root layout with SEO metadata
└── page.tsx                # Page composition
```

## Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--sand-50` | `#fdfaf5` | Primary background |
| `--ocean-deep` | `#082a3a` | Primary text / dark bg |
| `--ocean-400` | `#3d8fa3` | Accent color |
| `--sand-400` | `#c9a87a` | Warm accent |

### Typography
- **Display**: Cormorant Garamond (serif, elegant)
- **Body**: Jost (geometric, clean)

## Animation Architecture

- **Hero**: GSAP parallax on scroll + interactive particle canvas
- **Sections**: Framer Motion `useInView` for staggered reveals
- **Cards**: Framer Motion hover with `whileHover` transforms
- **Scroll**: GSAP ScrollTrigger for parallax depth effects
- **Navigation**: GSAP-triggered shrink on scroll
- **Cursor**: Custom CSS + RAF loop for follower

## Future Integrations (API-Ready)

The contact form is UI-only. To integrate a booking system:
- Replace form `onSubmit` with `fetch('/api/bookings', {...})`
- Add `app/api/bookings/route.ts` for backend logic
- Connect to any PMS (e.g., ResNexus, Cloudbeds API)

## Performance Notes

- All animations use GPU-composited properties (transform, opacity)
- Animations reduced on mobile via CSS `@media` checks
- Images use Next.js `<Image>` with lazy loading
- Lenis smooth scroll synced with GSAP ScrollTrigger

---

**Built with ❤️ for the Konkan coast**
