import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const newsData = [
  {
    image: '/assets/img-4.jpg',
    category: 'Koperasi',
    categoryColor: 'bg-forest text-white',
    title: 'Rapat Anggota Tahunan KOPMANTARA 2024',
    date: '20 Mei 2024',
  },
  {
    image: '/assets/img-3.jpg',
    category: 'Program',
    categoryColor: 'bg-sage text-white',
    title: 'Pelatihan Kewirausahaan bagi Anggota',
    date: '15 Mei 2024',
  },
  {
    image: '/assets/img-6.jpg',
    category: 'Kemitraan',
    categoryColor: 'bg-gold text-forest',
    title: 'Penandatanganan MoU dengan Mitra Strategis',
    date: '10 Mei 2024',
  },
  {
    image: '/assets/img-5.jpg',
    category: 'Inspirasi',
    categoryColor: 'bg-emerald text-white',
    title: 'Kisah Sukses Anggota: Tumbuh Bersama Koperasi',
    date: '5 Mei 2024',
  },
];

export default function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    gsap.fromTo(
      cards.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
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
        if (t.trigger === cards) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="berita"
      className="relative bg-white"
      style={{ padding: 'clamp(5rem, 10vh, 8rem) 0' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <div className="section-label justify-start mb-4">
              <span className="whitespace-nowrap">BERITA TERKINI</span>
            </div>
            <h2
              className="font-display font-semibold text-forest leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
            >
              Berita & Kegiatan Terbaru
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-4 sm:mt-0 font-body font-medium text-[15px] text-forest hover:text-emerald transition-colors group shrink-0"
          >
            Lihat Semua Berita
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsData.map((news, index) => (
            <article
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-[16/10]">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-body font-medium mb-3 ${news.categoryColor}`}>
                {news.category}
              </span>
              <h3 className="font-body font-semibold text-[15px] text-forest leading-snug line-clamp-2 group-hover:text-emerald transition-colors">
                {news.title}
              </h3>
              <p className="font-body text-[13px] text-charcoal/60 mt-2">
                {news.date}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
