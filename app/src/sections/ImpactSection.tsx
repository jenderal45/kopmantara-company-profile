import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const heading = headingRef.current;
    if (!svg || !heading) return;

    // Heading animation
    gsap.fromTo(
      heading.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // SVG paths
    const path1 = svg.querySelector('.chart-line-1') as SVGPathElement;
    const path2 = svg.querySelector('.chart-line-2') as SVGPathElement;
    const path3 = svg.querySelector('.chart-line-3') as SVGPathElement;
    const clip1 = svg.querySelector('.chart-clip-1') as SVGRectElement;
    const clip2 = svg.querySelector('.chart-clip-2') as SVGRectElement;
    const clip3 = svg.querySelector('.chart-clip-3') as SVGRectElement;

    if (!path1 || !path2 || !path3 || !clip1 || !clip2 || !clip3) return;

    // Set initial clip widths
    gsap.set([clip1, clip2, clip3], { attr: { width: 0 } });

    // Calculate path lengths for fallback
    const len1 = path1.getTotalLength();
    const len2 = path2.getTotalLength();
    const len3 = path3.getTotalLength();

    // Set initial dash states
    gsap.set(path1, { strokeDasharray: len1, strokeDashoffset: len1 });
    gsap.set(path2, { strokeDasharray: len2, strokeDashoffset: len2 });
    gsap.set(path3, { strokeDasharray: len3, strokeDashoffset: len3 });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5,
      },
    });

    tl.to(path1, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0);
    tl.to(path2, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0.2);
    tl.to(path3, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0.4);
    tl.to(clip1, { attr: { width: 800 }, duration: 1, ease: 'none' }, 0);
    tl.to(clip2, { attr: { width: 800 }, duration: 1, ease: 'none' }, 0.2);
    tl.to(clip3, { attr: { width: 800 }, duration: 1, ease: 'none' }, 0.4);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dampak"
      className="relative bg-cream"
      style={{ padding: 'clamp(5rem, 10vh, 8rem) 0' }}
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-12">
          <h2
            className="font-display font-semibold text-forest leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Jangkauan & Dampak Kami
          </h2>
          <p className="font-body text-[17px] text-charcoal leading-relaxed max-w-[600px] mx-auto">
            Setiap angka mewakili keluarga yang membantu, usaha yang tumbuh, dan komunitas yang diperkuat.
          </p>
        </div>

        {/* SVG Chart */}
        <svg
          ref={svgRef}
          viewBox="0 0 800 300"
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <clipPath id="clipPath1">
              <rect x="0" y="0" width="800" height="300" className="chart-clip-1" />
            </clipPath>
            <clipPath id="clipPath2">
              <rect x="0" y="0" width="800" height="300" className="chart-clip-2" />
            </clipPath>
            <clipPath id="clipPath3">
              <rect x="0" y="0" width="800" height="300" className="chart-clip-3" />
            </clipPath>
          </defs>

          {/* Grid lines */}
          <g className="chart-grid">
            <line x1="0" y1="75" x2="800" y2="75" stroke="#C8A97E" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <line x1="0" y1="150" x2="800" y2="150" stroke="#C8A97E" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <line x1="0" y1="225" x2="800" y2="225" stroke="#C8A97E" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <line x1="0" y1="300" x2="800" y2="300" stroke="#C8A97E" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          </g>

          {/* Data lines */}
          <path
            className="chart-line chart-line-1"
            clipPath="url(#clipPath1)"
            d="M 0 240 C 100 220, 200 180, 300 160 S 500 100, 600 80 S 750 40, 800 30"
            fill="none"
            stroke="#1B4332"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <path
            className="chart-line chart-line-2"
            clipPath="url(#clipPath2)"
            d="M 0 260 C 150 240, 250 220, 350 200 S 550 150, 650 120 S 780 90, 800 85"
            fill="none"
            stroke="#C8A97E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <path
            className="chart-line chart-line-3"
            clipPath="url(#clipPath3)"
            d="M 0 280 C 200 260, 300 240, 400 220 S 600 180, 700 160 S 800 140, 800 135"
            fill="none"
            stroke="#52B788"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 rounded-full bg-forest" />
            <span className="font-body text-sm text-charcoal">Anggota Aktif</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 rounded-full bg-gold" />
            <span className="font-body text-sm text-charcoal">Mitra & Kolaborator</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 rounded-full bg-sage" />
            <span className="font-body text-sm text-charcoal">Usaha Terbantu</span>
          </div>
        </div>
      </div>
    </section>
  );
}
