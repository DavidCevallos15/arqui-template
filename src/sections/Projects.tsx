import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { projects } from '@/content/site';
import { ImageSlot } from '@/components/ImageSlot';
import { LineReveal } from '@/components/motion/Reveal';

/** Scroll horizontal pinneado: la fila de proyectos avanza de lado. */
export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [dist, setDist] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const t = track.current;
      if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  if (reduce) {
    return (
      <section id="proyectos" className="border-t hairline px-4 py-16 md:px-6">
        <Head />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{projects.items.map((p, i) => <Card key={p.name} p={p} i={i} />)}</div>
      </section>
    );
  }

  return (
    <section id="proyectos" ref={ref} className="relative border-t hairline" style={{ height: `calc(100svh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-12">
        <div className="px-4 pt-6 md:px-6"><Head /></div>
        <motion.div ref={track} style={{ x }} className="flex flex-1 items-center gap-4 px-4 py-6 will-change-transform md:px-6">
          {projects.items.map((p, i) => <Card key={p.name} p={p} i={i} />)}
          <a href="#contacto" className="flex h-full max-h-[62svh] w-[min(70vw,360px)] shrink-0 flex-col justify-end border border-ink bg-ink p-6 text-paper transition-colors hover:bg-signal">
            <span className="label">Siguiente</span>
            <span className="display mt-2 text-4xl">Tu proyecto →</span>
          </a>
        </motion.div>
        <div className="mx-4 mb-6 h-px bg-ink/15 md:mx-6">
          <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-signal" />
        </div>
      </div>
    </section>
  );
}

function Head() {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="label mb-3 text-ink/60">{projects.eyebrow}</p>
        <h2 className="display text-[clamp(2rem,4.6vw,4rem)]"><LineReveal lines={projects.title} muteFrom={1} /></h2>
      </div>
      <p className="label hidden text-ink/60 md:block">({String(projects.items.length).padStart(2, '0')}) Obras</p>
    </div>
  );
}

type P = (typeof projects.items)[number];

function Card({ p, i }: { p: P; i: number }) {
  return (
    <article className="group flex h-full max-h-[62svh] min-h-[360px] w-[min(78vw,420px)] shrink-0 flex-col border border-ink/25 bg-paper">
      <div className="relative flex-1 overflow-hidden">
        <div className="size-full transition-transform duration-700 group-hover:scale-[1.03]"><ImageSlot image={p.image} /></div>
        <span className="label absolute top-3 left-3 bg-paper px-2 py-1">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <div className="grid grid-cols-2 border-t border-ink/25">
        <h3 className="col-span-2 border-b border-ink/25 px-3 py-3 text-xl font-semibold tracking-tight uppercase">{p.name}</h3>
        {[['Ubicación', p.place], ['Año', p.year], ['Área', p.area], ['Tipo', p.type]].map(([k, v], j) => (
          <div key={k} className={`px-3 py-2 ${j % 2 === 0 ? 'border-r border-ink/25' : ''} ${j < 2 ? 'border-b border-ink/25' : ''}`}>
            <p className="label text-ink/50">{k}</p><p className="text-[13px]">{v}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
