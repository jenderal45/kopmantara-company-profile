import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Users, Leaf, ShieldCheck, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Multi Pihak',
    description: 'Kolaborasi inklusif untuk kekuatan bersama',
  },
  {
    icon: Leaf,
    title: 'Berkelanjutan',
    description: 'Mengutamakan keberlanjutan ekonomi, sosial, dan lingkungan',
  },
  {
    icon: ShieldCheck,
    title: 'Transparan',
    description: 'Tata kelola amanah, terbuka, dan akuntabel',
  },
  {
    icon: TrendingUp,
    title: 'Berdampak',
    description: 'Memberi manfaat nyata bagi anggota \u0026 masyarakat',
  },
];

export default function FeaturesBar() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.15 });

  return (
    <div className="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto bg-white rounded-3xl shadow-[0_-4px_40px_rgba(0,0,0,0.08)] px-6 py-8 lg:px-12 lg:py-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-forest" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-body font-medium text-[15px] text-forest">
                  {feature.title}
                </h3>
                <p className="font-body text-[13px] text-charcoal/70 mt-0.5 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
