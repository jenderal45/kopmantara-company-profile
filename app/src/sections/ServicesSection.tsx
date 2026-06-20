import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Coins, Wallet, Briefcase, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    text: 'Pembiayaan',
    description: 'Solusi pembiayaan yang adil, mudah, dan mendukung pertumbuhan usaha',
    icon: Coins,
  },
  {
    text: 'Simpan Pinjam',
    description: 'Produk simpanan dan pinjaman fleksibel untuk kebutuhan anggota',
    icon: Wallet,
  },
  {
    text: 'Kemitraan Usaha',
    description: 'Membangun jejaring dan kolaborasi usaha yang saling menguntungkan',
    icon: Briefcase,
  },
  {
    text: 'Pengembangan Kapasitas',
    description: 'Pelatihan dan pendampingan untuk meningkatkan kompetensi anggota dan mitra',
    icon: GraduationCap,
  },
];

function createTexturedCard(text: string): THREE.Mesh {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 250;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#F8F6F3';
  ctx.fillRect(0, 0, 400, 250);

  // Subtle border
  ctx.strokeStyle = 'rgba(27, 67, 50, 0.1)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 398, 248);

  // Decorative top line
  ctx.fillStyle = '#C8A97E';
  ctx.fillRect(40, 30, 60, 3);

  // Text
  ctx.fillStyle = '#1B4332';
  ctx.font = 'bold 24px "DM Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, 200, 140);

  // Subtle subtitle
  ctx.fillStyle = '#2C3E2D';
  ctx.font = '14px "DM Sans", sans-serif';
  ctx.fillText('Layanan KOPMANTARA', 200, 170);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const geometry = new THREE.PlaneGeometry(2.5, 1.6);
  const card = new THREE.Mesh(geometry, material);
  card.userData.text = text;
  return card;
}

function ServicesCylinder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1B4332, 0.08);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x1B4332, 1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Create cylinder of cards
    const cardGroup = new THREE.Group();
    const radius = 3.5;
    const angleStep = (Math.PI * 2) / servicesData.length;

    servicesData.forEach((service, index) => {
      const angle = index * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const card = createTexturedCard(service.text);
      card.position.set(x, 0, z);
      card.rotation.y = -angle + Math.PI / 2;
      cardGroup.add(card);
    });

    scene.add(cardGroup);

    // ScrollTrigger
    let currentRotation = 0;

    const scrollTrigger = ScrollTrigger.create({
      trigger: container.parentElement?.parentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        currentRotation = self.progress * Math.PI * 2;
        cardGroup.rotation.y = currentRotation;
        cardGroup.children.forEach((child) => {
          child.lookAt(camera.position);
        });
      },
    });

    // Animation loop
    const animate = () => {
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
      scrollTrigger.kill();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block w-full h-[500px]"
    />
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="layanan"
      className="relative bg-forest"
      style={{ minHeight: '250vh' }}
    >
      <div className="lg:flex lg:sticky lg:top-0 lg:h-screen">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-16 py-16 lg:py-0">
          <div className="section-label justify-start mb-6">
            <span className="whitespace-nowrap">LAYANAN KAMI</span>
          </div>

          <h2
            className="font-display font-semibold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
          >
            Solusi Koperasi untuk Setiap Kebutuhan
          </h2>

          <a
            href="#"
            className="inline-flex items-center gap-2 self-start px-7 py-3 border border-white/60 hover:border-white text-white rounded-full font-body font-medium text-[15px] transition-all duration-300 hover:bg-white/10"
          >
            Lihat Semua Layanan
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile Service Cards */}
          <div className="lg:hidden mt-10 space-y-4">
            {servicesData.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-sage/15 flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-sage" strokeWidth={1.5} />
                </div>
                <h3 className="font-body font-semibold text-[17px] text-forest mb-2">
                  {service.text}
                </h3>
                <p className="font-body text-[15px] text-charcoal/80 leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 mt-3 font-body font-medium text-sm text-forest hover:text-emerald transition-colors group"
                >
                  Selengkapnya
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right - 3D Cylinder */}
        <div className="hidden lg:block w-1/2 h-screen">
          <div className="flex items-center justify-center h-full">
            <ServicesCylinder />
          </div>
        </div>
      </div>
    </section>
  );
}
