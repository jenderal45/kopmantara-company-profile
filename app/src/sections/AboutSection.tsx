import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, Users, HandHeart, Heart, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: BarChart3,
    title: 'Ekonomi Kerakyatan Naik Kelas',
    description: 'Mendorong usaha anggota tumbuh, berdaya saing, dan berkelanjutan',
  },
  {
    icon: Users,
    title: 'Pemberdayaan Anggota',
    description: 'Penguatan kapasitas, akses permodalan, dan pendampingan usaha',
  },
  {
    icon: HandHeart,
    title: 'Kemandirian & Gotong Royong',
    description: 'Menghidupkan nilai gotong royong untuk kemandirian ekonomi bersama',
  },
  {
    icon: Heart,
    title: 'Kesejahteraan Bersama',
    description: 'Mewujudkan kehidupan anggota dan masyarakat yang lebih sejahtera',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    if (!section || !heading || !cards) return;

    // Heading reveal
    gsap.fromTo(
      heading.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Cards reveal with stagger
    gsap.fromTo(
      cards.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === heading || t.trigger === cards) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tentang"
      className="relative bg-white"
      style={{ padding: 'clamp(5rem, 10vh, 8rem) 0' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">
          {/* Left Column - Text */}
          <div ref={headingRef}>
            <div className="section-label justify-start mb-6">
              <span className="whitespace-nowrap">TENTANG KOPMANTARA</span>
            </div>

            <h2
              className="font-display font-semibold text-forest leading-tight mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
            >
              Bersatu Menguatkan Ekonomi, Bersama Mewujudkan Sejahtera
            </h2>

            <p className="font-body text-[17px] text-charcoal leading-relaxed mb-6">
              KOPMANTARA adalah koperasi multi pihak yang menghimpun berbagai unsur dan pemangku kepentingan untuk menciptakan nilai bersama, berkelanjutan, dan berdampak bagi masyarakat.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 font-body font-medium text-[15px] text-forest hover:text-emerald transition-colors group"
            >
              Selengkapnya tentang kami
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Column - Cards Grid */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="liquid-glass rounded-2xl p-6 transition-transform duration-400 hover:-translate-y-1"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-sage/15 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-sage" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-body font-semibold text-[15px] text-forest mb-2">
                    {benefit.title}
                  </h3>
                  <p className="font-body text-[13px] text-charcoal/80 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
