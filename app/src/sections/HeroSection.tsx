import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingUp, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    if (!section || !video || !content) return;

    // Video parallax scale
    gsap.to(video, {
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.3,
      },
    });

    // Content entrance animation
    const elements = content.querySelectorAll('.hero-animate');
    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById('tentang');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="beranda"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-end"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(13,40,24,0.55) 0%, rgba(13,40,24,0.3) 50%, rgba(13,40,24,0.6) 100%)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-32"
        style={{ zIndex: 3 }}
      >
        <div className="max-w-[600px]">
          {/* Label */}
          <p className="hero-animate text-xs font-body font-medium uppercase tracking-[0.15em] text-gold mb-4">
            KOPERASI MULTI PIHAK
          </p>

          {/* Headline */}
          <h1 className="hero-animate font-display text-white mb-1" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            KOPMANTARA
          </h1>

          {/* Subheadline */}
          <h2 className="hero-animate font-display text-white mt-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.15 }}>
            Ekonomi Kerakyatan
          </h2>
          <h2
            className="hero-animate font-accent font-light italic text-gold -mt-1"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Naik Kelas
          </h2>

          {/* Description */}
          <p className="hero-animate text-white/85 font-body font-light text-[17px] leading-relaxed mt-5 max-w-[480px]">
            Bersama membangun ekonomi kerakyatan yang inklusif, berkelanjutan, dan berdampak nyata bagi kesejahteraan anggota dan masyarakat.
          </p>

          {/* CTA Buttons */}
          <div className="hero-animate flex flex-wrap gap-4 mt-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest hover:bg-emerald text-white rounded-full font-body font-medium text-[15px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              Gabung Sekarang
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#tentang"
              onClick={(e) => { e.preventDefault(); scrollToAbout(); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/60 hover:border-white text-white rounded-full font-body font-medium text-[15px] transition-all duration-300 hover:bg-white/10"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>

        {/* Right side badge */}
        <div className="hidden lg:block absolute bottom-28 right-8">
          <div className="liquid-glass rounded-2xl p-5 text-right" style={{ width: 200 }}>
            <p className="font-accent italic text-white/90 text-lg leading-tight">
              Maju Bersama<br />Mandiri Sejahtera
            </p>
          </div>
        </div>

        {/* Economy badge */}
        <div className="hidden lg:flex absolute bottom-28 right-64 items-center gap-2 liquid-glass rounded-2xl px-4 py-3">
          <TrendingUp className="w-5 h-5 text-gold" />
          <div>
            <p className="text-white/70 text-xs">Ekonomi Kerakyatan</p>
            <p className="text-gold font-display font-semibold text-sm">Naik Kelas</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ zIndex: 3 }}>
        <button
          onClick={scrollToAbout}
          className="text-gold animate-bounce-slow"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
