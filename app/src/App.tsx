import Header from '@/sections/Header';
import HeroSection from '@/sections/HeroSection';
import FeaturesBar from '@/sections/FeaturesBar';
import AboutSection from '@/sections/AboutSection';
import ServicesSection from '@/sections/ServicesSection';
import StatisticsSection from '@/sections/StatisticsSection';
import NewsSection from '@/sections/NewsSection';
import ImpactSection from '@/sections/ImpactSection';
import Footer from '@/sections/Footer';
import GoldenCursorTrail from '@/components/GoldenCursorTrail';

export default function App() {
  return (
    <div className="relative">
      <GoldenCursorTrail />
      <Header />
      <main>
        <HeroSection />
        <FeaturesBar />
        <AboutSection />
        <ServicesSection />
        <StatisticsSection />
        <NewsSection />
        <ImpactSection />
      </main>
      <Footer />
    </div>
  );
}
