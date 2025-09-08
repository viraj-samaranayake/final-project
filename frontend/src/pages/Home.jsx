import FeaturesSection from '../components/FeaturesSection';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import StatsSection from '../components/StatsSection';

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <FeaturesSection />
      <StatsSection />
      <Footer />
    </>
  );
}
