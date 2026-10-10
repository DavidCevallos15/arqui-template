import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { useRef, useState } from 'react';
import { plan } from '@/content/site';
import { DrawPath } from '@/components/motion/DrawPath';
import { PLAN_DIMS, PLAN_THIN, PLAN_WALLS } from '@/components/drawings/paths';
import { LineReveal, Reveal } from '@/components/motion/Reveal';

/** Posición (en coordenadas del viewBox 600×500) de cada callout. */
const SPOTS = [
  { x: 470, y: 250, at: 0.62 },
  { x: 330, y: 255, at: 0.74 },
  { x: 120, y: 135, at: 0.86 },
];

export function Plan() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [visible, setVisible] = useState(reduce ? SPOTS.length : 0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return;
    const n = SPOTS.filter((s) => v >= s.at).length;
    setVisible((prev) => (prev === n ? prev : n));
  });

  const all = PLAN_WALLS.length + PLAN_THIN.length;
  const r = (i: number): [number, number] => [0.05 + (i / all) * 0.45, 0.05 + (i / all) * 0.45 + 0.12];

  return (
    <section ref={ref} className="relative h-[280svh] border-t hairline">
      <div className="sticky top-0 grid grid-cols-1 h-svh pt-12 md:grid-cols-12">
        <div className="relative flex items-center justify-center border-b hairline p-4 md:col-span-7 md:border-r md:border-b-0 md:p-10">
          <div className="relative aspect-[6/5] w-full max-w-[640px]">
            <svg viewBox="0 0 600 500" className="absolute inset-0 size-full text-ink" fill="none" stroke="currentColor" role="img" aria-label="Planta arquitectónica de vivienda">
              {PLAN_DIMS.map((d, i) => <DrawPath key={`d${i}`} d={d} progress={scrollYProgress} range={[0.02, 0.2]} strokeWidth={0.8} className="text-ink/40" stroke="currentColor" />)}
              {PLAN_WALLS.map((d, i) => <DrawPath key={`w${i}`} d={d} progress={scrollYProgress} range={r(i)} strokeWidth={10} strokeLinecap="square" className="text-ink/85" stroke="currentColor" />)}
              {PLAN_THIN.map((d, i) => <DrawPath key={`t${i}`} d={d} progress={scrollYProgress} range={r(PLAN_WALLS.length + i)} strokeWidth={1} />)}
            </svg>
            {plan.callouts.map((c, i) => {
              const s = SPOTS[i];
              if (!s) return null;
              const on = i < visible;
              const left = (s.x / 600) * 100;
              const top = (s.y / 500) * 100;
              return (
                <div key={c.label} className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
                  <motion.span animate={{ scale: on ? 1 : 0 }} transition={{ duration: 0.3 }}
                    className="absolute size-3 -translate-1/2 bg-signal" />
                  <motion.div initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }} transition={{ duration: 0.4 }}
                    className={`absolute top-3 w-max border ${s.x > 360 ? 'right-3' : 'left-3'} border-ink bg-paper shadow-[3px_3px_0_0_#141414]`}>
                    <p className="label bg-ink px-2 py-1 text-paper">{c.label}</p>
                    <p className="px-2 py-1.5 text-[12px]">{c.meta}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-4 left-4 hidden w-64 border border-ink bg-paper md:block">
            <p className="label bg-ink px-3 py-1.5 text-paper">{plan.tag}</p>
            <p className="px-3 py-3 text-[12px] leading-snug">{plan.tagBody}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 px-4 py-6 md:col-span-5 md:px-10">
          <h2 className="display text-[clamp(1.8rem,3.6vw,3.4rem)]"><LineReveal lines={plan.title} /></h2>
          <Reveal className="max-w-md text-[14px] leading-snug text-ink/75">{plan.lead}</Reveal>
          <ul className="border-t hairline">
            {plan.features.map((f, i) => (
              <Reveal key={f} delay={i * 0.06}>
                <li className="flex items-center justify-between border-b hairline py-3 text-[14px]">
                  {f}
                  <span className="grid size-6 place-items-center rounded-full border border-ink/40 text-[11px]">{i + 1}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
