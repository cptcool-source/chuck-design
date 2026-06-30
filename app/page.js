import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import FilmSlate from '@/components/FilmSlate';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Work from '@/components/Work';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import RevealInit from '@/components/RevealInit';

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main">
        <Hero />
        <FilmSlate />
        <Services />
        <Process />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
      <RevealInit />
    </>
  );
}
