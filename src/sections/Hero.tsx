import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { hero } from '@/content/site';
import { DrawPath } from '@/components/motion/DrawPath';
import { FACADE, FACADE_FILLS } from '@/components/drawings/paths';
import { ImageSlot } from '@/components/ImageSlot';
import { LineReveal } from '@/components/motion/Reveal';

const LEVELS = [
  { y: 440, t: 'N ±0.00' },
  { y: 300, t: 'N +3.20' },
  { y: 160, t: 'N +6.50' },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Intro automática (dibuja ~30%) y luego el scroll completa el plano.
  const intro = useMotionValue(reduce ? 1 : 0);
  useEffect(() => {
    if (reduce) return;
    const c = animate(intro, 1, { duration: 2.4, ease: [0.45, 0.05, 0.2, 1], delay: 0.2 });
    return () => c.stop();
  }, [intro, reduce]);
  const p = useTransform(() => (reduce ? 1 : Math.max(intro.get() * 0.3, 0.3 + scrollYProgress.get() * 0.7 * (intro.get() >= 1 ? 1 : 0))));

  const pct = useTransform(p, (v) => `${String(Math.round(v * 100)).padStart(2, '0')}%`);
  const scanY = useTransform(p, [0, 1], ['92%', '8%']);
  const scanOpacity = useTransform(p, [0.9, 1], [1, 0]);
  const fill = useTransform(p, [0.7, 0.92], [0, 1]);
  const markers = useTransform(p, [0.5, 0.6], [0, 1]);
  const imgOpacity = useTransform(p, [0.9, 1], [0, 1]);

  const N = FACADE.length;
  const span = 0.62;

  return (
    <section ref={ref} id="top" className="relative h-[260svh]">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-12">
        {/* Plano */}
        <div className="relative flex-1">
          <motion.div aria-hidden style={{ top: scanY, opacity: scanOpacity }}
            className="absolute inset-x-0 z-10 h-px bg-signal">
            <motion.span className="label absolute -top-4 left-4 text-signal md:left-6">{pct}</motion.span>
          </motion.div>

          <div className="absolute inset-0 px-4 pt-10 pb-2 md:px-16 md:pt-14">
            <svg viewBox="0 0 1000 480" className="size-full overflow-visible text-ink" preserveAspectRatio="xMidYMid meet" fill="none"
              stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" role="img" aria-label="Alzado de una vivienda dibujándose">
              <motion.g style={{ opacity: fill }} stroke="none" fill="currentColor">
                {FACADE_FILLS.map((r, i) => <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} opacity={r.o} />)}
              </motion.g>
              {FACADE.map((d, i) => (
                <DrawPath key={i} d={d} progress={p} range={[(i / N) * span, (i / N) * span + 0.14]} />
              ))}
              <motion.g style={{ opacity: markers }}>
                <path d="M390 80 H860 M390 74 V86 M560 74 V86 M860 74 V86" className="stroke-signal" strokeWidth="1" />
                <text x="475" y="70" textAnchor="middle" className="fill-signal font-mono text-[11px]" stroke="none">6.80</text>
                <text x="710" y="70" textAnchor="middle" className="fill-signal font-mono text-[11px]" stroke="none">12.00</text>
                {LEVELS.map((l) => (
                  <g key={l.t}>
                    <path d={`M880 ${l.y} H960`} strokeWidth="0.8" strokeDasharray="3 3" />
                    <text x="965" y={l.y + 4} className="fill-ink font-mono text-[11px]" stroke="none">{l.t}</text>
                  </g>
                ))}
                <rect x="555" y="155" width="10" height="10" className="fill-signal" stroke="none" />
                <rect x="835" y="295" width="10" height="10" className="fill-signal" stroke="none" />
                <path d="M565 160 L640 120 H700" className="stroke-signal" strokeWidth="1" />
                <text x="704" y="124" className="fill-signal font-mono text-[11px]" stroke="none">VOLADIZO 3.00</text>
              </motion.g>
              {hero.image.src && (
                <foreignObject x="0" y="0" width="1000" height="480">
                  <motion.div style={{ opacity: imgOpacity }} className="size-full">
                    <ImageSlot image={hero.image} eager fit="contain" />
                  </motion.div>
                </foreignObject>
              )}
            </svg>
          </div>
        </div>

        {/* Título + ficha técnica */}
        <div className="grid grid-cols-1 gap-6 px-4 pb-6 md:grid-cols-12 md:px-6 md:pb-8">
          <h1 className="display text-[clamp(2.4rem,6.2vw,5.6rem)] md:col-span-6">
            <LineReveal lines={hero.title} animateOnMount delay={0.3} />
          </h1>
          <motion.dl initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
            className="hidden self-end border-t border-dashed border-ink/40 pt-2 md:col-span-4 md:col-start-7 md:block">
            {hero.sheet.map((r) => (
              <div key={r.k} className="label grid grid-cols-[90px_1fr] gap-2 py-1 text-[10px]">
                <dt className="text-ink/55">{r.k}</dt><dd>: {r.v}</dd>
              </div>
            ))}
          </motion.dl>
          <motion.ul initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
            className="hidden self-end md:col-span-2 md:block">
            {hero.stats.map((s) => <li key={s} className="label py-0.5 text-[10px] whitespace-pre">{s}</li>)}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
