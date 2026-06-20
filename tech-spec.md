# Tech Spec — KOPMANTARA Website

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | React DOM renderer |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.4.0 | Vite React plugin |
| typescript | ^5.7.0 | Type system |
| tailwindcss | ^4.0.0 | Utility CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite integration |
| gsap | ^3.12.0 | Animation engine (ScrollTrigger, DrawSVG) |
| three | ^0.170.0 | 3D engine (cursor trail + cylinder) |
| @types/three | ^0.170.0 | Three.js types |
| lenis | ^1.2.0 | Smooth scroll |
| lucide-react | ^0.460.0 | Icons |

**Note on GSAP plugins:** DrawSVGPlugin is a Club GSAP (paid) plugin. If unavailable, fallback to manual `stroke-dashoffset` animation using `path.getTotalLength()`.

---

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| Header | Custom | Single — fixed nav with scroll-driven background transition |
| Footer | Custom | Single — multi-column footer |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Full-viewport video background with overlay content |
| FeaturesBar | Custom | 4-column feature grid, negative margin overlap on hero |
| AboutSection | Custom | Asymmetric 2-col layout with liquid-glass card grid |
| ServicesSection | Custom | Tall scroll section (300vh) with sticky 3D canvas container |
| StatisticsSection | Custom | 4-stat horizontal band on dark green |
| NewsSection | Custom | 4-column news card grid |
| ImpactSection | Custom | SVG stroke-draw chart with scroll trigger |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| LiquidGlassCard | Custom | AboutSection (4x) — physical glass with refraction, not frosted |
| SectionLabel | Custom | About, Services, News sections — gold uppercase label with decorative lines |
| PillButton | Custom | Multiple sections — primary (filled) and secondary (outlined) variants |
| ServiceCard | Custom (3D) | ServicesSection cylinder — canvas-textured Three.js Plane |
| NewsCard | Custom | NewsSection (4x) — image + category badge + title + date |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollReveal | GSAP ScrollTrigger wrapper for fade+slide entrance animations |
| useLenis | Lenis smooth scroll instance initialization |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Golden cursor trail | Three.js | Custom particle system: velocity-based spawning, additive blending, fading sprites. Fixed canvas container at z-index 9999, pointer-events none. | **High** 🔒 |
| 3D services cylinder | Three.js + GSAP ScrollTrigger | Cards as PlaneGeometry with canvas textures arranged in circular group. ScrollTrigger scrub rotates group on Y axis. Cards call lookAt(camera) each frame. Sticky container within 300vh section. Fog matches background. | **High** 🔒 |
| SVG stroke drawing chart | GSAP + DrawSVGPlugin | Three paths with clip-path reveal. ScrollTrigger scrub drives drawSVG from 0%→100% with staggered starts (0, 0.2, 0.4). Clip-path rectangles animate width 0→800. Fallback: stroke-dashoffset. | **Medium** |
| Section scroll reveals | GSAP ScrollTrigger | Default: opacity 0→1, translateY 30→0, duration 0.8s, stagger 0.1s. Labels/headings: clip-path inset reveal from bottom. Trigger at 80% viewport. | **Low** |
| Hero parallax | GSAP ScrollTrigger | Video scale 1→1.05 at 0.3x scroll speed. | **Low** |
| Header background transition | GSAP ScrollTrigger | Transparent → rgba(248,246,243,0.95) + backdrop-blur on scroll past 100px. | **Low** |
| Card hover effects | CSS transitions | translateY(-4px) + box-shadow deepen, 0.4s cubic-bezier. | **Low** |
| Scroll indicator bounce | CSS animation | Infinite bounce keyframe on chevron. | **Low** |

---

## State & Logic Plan

### Three.js ↔ React Bridge

Both Three.js effects (cursor trail + services cylinder) must be mounted via `useRef` + `useEffect` — they are **not** React-rendered. Each gets its own canvas container div, created imperatively on mount and destroyed on unmount.

### Scroll Coordination

Lenis must own the scroll loop. GSAP ScrollTrigger must be configured to use Lenis' scroll position (via `lenis.on('scroll', ScrollTrigger.update)`). This is critical — the 3D cylinder depends on scrubbed scroll progress being smooth.

### Active Nav Section

Track current section via ScrollTrigger `onEnter`/`onLeaveBack` callbacks on each section. Store in React state for nav active indicator update. Debounce to avoid excessive re-renders.

---

## Other Key Decisions

### Raw Three.js (not R3F)

Use raw Three.js (not React Three Fiber) for both 3D effects. Rationale: the cursor trail and cylinder are self-contained imperative systems with their own render loops. R3F's declarative model adds overhead with no benefit here.

### Font Loading Strategy

Load Playfair Display, DM Sans, and Cormorant Garamond via Google Fonts `<link>` in index.html with `display=swap`. All three families are needed on first paint — preload the first 2 (Playfair + DM Sans).

### Mobile Fallback for 3D Cylinder

On viewports <768px, the services section renders as a vertical stack of standard ServiceCard components instead of the 3D cylinder. Detect via matchMedia in the ServicesSection component — conditionally mount the Three.js canvas or the card stack.

### SVG Chart DrawSVG Fallback

Implement both paths: check if `gsap.plugins.drawSVG` exists at runtime. If yes, use DrawSVG. If no, compute `path.getTotalLength()` for each path and animate `stroke-dashoffset` manually via GSAP tween. Both approaches use the same ScrollTrigger config.
