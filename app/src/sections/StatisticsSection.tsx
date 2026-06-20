import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Handshake, BarChart3, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 1250, suffix: '+', label: 'Anggota Aktif', icon: Users },
  { number: 150, suffix: '+', label: 'Mitra \u0026 Kolaborator', icon: Handshake },
  { number: 320, suffix: '+', label: 'Usaha Terbantu', icon: BarChart3 },
  { number: 25, suffix: '+', label: 'Program Berjalan', icon: Leaf },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.floor(obj.val)),
        });
      },
    });

    return () => trigger.kill();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('id-ID')}{suffix}
    </span>
  );
}

export default function StatisticsSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id="statistik"
      className="relative bg-forest py-12 lg:py-14"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex items-center gap-4 justify-center ${
                index < stats.length - 1 ? 'lg:border-r lg:border-white/20' : ''
              }`}
            >
              <stat.icon className="w-8 h-8 text-sage shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-display font-semibold text-2xl lg:text-[2.5rem] text-gold leading-tight">
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                </p>
                <p className="font-body text-[15px] text-white/80">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
