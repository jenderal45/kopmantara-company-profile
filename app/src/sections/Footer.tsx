import { Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, Globe, CheckCircle } from 'lucide-react';

const quickLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Anggota', href: '#statistik' },
  { label: 'Berita', href: '#berita' },
  { label: 'Program', href: '#dampak' },
  { label: 'Kontak', href: '#kontak' },
];

const serviceLinks = [
  'Pembiayaan',
  'Simpan Pinjam',
  'Kemitraan Usaha',
  'Pengembangan Kapasitas',
];

const infoLinks = [
  'FAQ',
  'Kebijakan Privasi',
  'Syarat \u0026 Ketentuan',
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="kontak" className="relative bg-deep">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#beranda"
              className="inline-flex items-center mb-2 transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-[#F8F6F1] rounded-xl px-1.5 py-1 shadow-lg border border-white/10">
                <img
                  src="/assets/logo-kopmantara-group.png"
                  alt="Logo KOPMANTARA"
                  className="w-40 h-auto object-contain"
                />
              </div>
            </a>
            <p className="font-body text-[15px] text-white/70 leading-relaxed mb-4">
              Bersama membangun ekonomi kerakyatan naik kelas untuk kesejahteraan anggota dan masyarakat.
            </p>
            <p className="font-accent italic text-gold/60 text-lg mb-6">
              Maju Bersama Mandiri Sejahtera
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white/70 hover:text-gold" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-body font-medium text-[15px] text-white mb-5">
              Tautan Cepat
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-body text-[14px] text-white/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-body font-medium text-[15px] text-white mb-5">
              Layanan
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#layanan"
                    onClick={(e) => handleNavClick(e, '#layanan')}
                    className="font-body text-[14px] text-white/70 hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="lg:col-span-2">
            <h4 className="font-body font-medium text-[15px] text-white mb-5">
              Informasi
            </h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-[14px] text-white/70 hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="font-body font-medium text-[15px] text-white mb-5">
              Kontak Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                <span className="font-body text-[14px] text-white/70">
                  Ruko Pd. Pinang Centre, Jl. Ciputat Raya No.A.24, RT.3/RW.6, Pd. Pinang, Kec. Kebayoran Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12310
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sage shrink-0" />
                <span className="font-body text-[14px] text-white/70">
                  (+62) 813-2109-663 
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sage shrink-0" />
                <span className="font-body text-[14px] text-white/70">
                  info@kopmantara.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-sage shrink-0" />
                <span className="font-body text-[14px] text-white/70">
                  www.kopmantara.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-[13px] text-white/60">
            &copy; 2024 KOPMANTARA. All rights reserved.
          </p>
          <p className="font-body text-[13px] text-white/60 flex items-center gap-1.5">
            Koperasi Pengusaha Muda Mandiri Nusantara
            <CheckCircle className="w-4 h-4 text-sage" />
          </p>
        </div>
      </div>
    </footer>
  );
}
