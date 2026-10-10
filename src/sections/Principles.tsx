import { motion, useTransform } from 'motion/react';
import { useRef } from 'react';
import { principles } from '@/content/site';
import { LineReveal, Reveal } from '@/components/motion/Reveal';
import { DrawPath } from '@/components/motion/DrawPath';
import { ICONS } from '@/components/drawings/paths';
import { useInViewProgress } from '@/lib/useInViewProgress';

function Icon({ name, delay }: { name: string; delay: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const p = useInViewProgress(ref, 1.6, delay);
  const dot = useTransform(p, [0.85, 1], [0, 1]);
  const paths = ICONS[name] ?? ICONS.cube;
  return (
    <svg ref={ref} viewBox="0 0 120 120" className="size-28 text-ink md:size-32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      {paths.map((d, i) => <DrawPath key={i} d={d} progress={p} range={[(i / paths.length) * 0.7, (i / paths.length) * 0.7 + 0.3]} />)}
      <motion.rect style={{ opacity: dot }} x="56" y="56" width="8" height="8" className="fill-signal" stroke="none" />
    </svg>
  );
}

export function Principles() {
  return (
    <section className="border-b hairline">
      <div className="grid grid-cols-1 gap-6 px-4 pt-16 pb-10 md:grid-cols-12 md:px-6">
        <p className="label text-ink/60 md:col-span-12">{principles.eyebrow}</p>
        <h2 className="display text-[clamp(2rem,4.6vw,4rem)] md:col-span-7"><LineReveal lines={principles.title} /></h2>
        <Reveal className="max-w-sm self-end text-[15px] leading-snug text-ink/75 md:col-span-4 md:col-start-9">{principles.lead}</Reveal>
      </div>
      <div className="grid border-t hairline sm:grid-cols-2 lg:grid-cols-4">
        {principles.items.map((it, i) => (
          <article key={i} className="group relative flex min-h-[460px] flex-col border-b hairline p-4 sm:border-r md:p-6 lg:border-b-0 [&:nth-child(4n)]:border-r-0">
            <div className="label flex justify-between text-ink/60">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 bg-transparent transition-colors group-hover:bg-signal" />
                {it.title.join(' ')}
              </span>
              <span>[0{i + 1}]</span>
            </div>
            <div className="flex flex-1 items-center justify-center py-8 transition-transform duration-500 group-hover:-translate-y-1">
              <Icon name={it.icon} delay={i * 0.12} />
            </div>
            <Reveal delay={i * 0.08}>
              <h3 className="display text-[22px] leading-[0.95]">{it.title.map((l) => <span key={l} className="block">{l}</span>)}</h3>
              <p className="mt-3 max-w-[30ch] text-[13px] leading-snug text-ink/70">{it.body}</p>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
