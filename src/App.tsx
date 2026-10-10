import { Header } from '@/components/layout/Header';
import { Cursor } from '@/components/layout/Cursor';
import { CookieBar } from '@/components/layout/CookieBar';
import { Hero } from '@/sections/Hero';
import { Intro } from '@/sections/Intro';
import { Principles } from '@/sections/Principles';
import { Services } from '@/sections/Services';
import { BigStatement } from '@/sections/BigStatement';
import { Plan } from '@/sections/Plan';
import { Projects } from '@/sections/Projects';
import { Audiences } from '@/sections/Audiences';
import { Process } from '@/sections/Process';
import { Cta } from '@/sections/Cta';
import { Footer } from '@/sections/Footer';

export function App() {
  return (
    <>
      <a href="#estudio" className="sr-only focus:not-sr-only focus:fixed focus:top-14 focus:left-4 focus:z-[70] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
        Saltar al contenido
      </a>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Principles />
        <Services />
        <BigStatement />
        <Plan />
        <Projects />
        <Audiences />
        <Process />
        <Cta />
      </main>
      <Footer />
      <CookieBar />
      <Cursor />
    </>
  );
}
