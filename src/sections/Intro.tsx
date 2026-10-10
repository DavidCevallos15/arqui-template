import { motion, useTransform } from 'motion/react';
import { useRef } from 'react';
import { clients, intro } from '@/content/site';
import { LineReveal, Reveal } from '@/components/motion/Reveal';
import { Marquee } from '@/components/motion/Marquee';
import { ScrubText } from '@/components/motion/ScrubText';
import { DrawPath } from '@/components/motion/DrawPath';
import { TOWER } from '@/components/drawings/paths';
import { useInViewProgress } from '@/lib/useInViewProgress';
import { ArrowLink } from '@/components/ArrowLink';

function Diamond() {
  return <svg viewBox="0 0 10 10" className="mx-4 size-2.5 text-ink/50" aria-hidden><path d="M5 0 L10 5 L5 10 L0 5 Z" fill="none" stroke="currentColor" /></svg>;
}

function ClientLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex h-20 w-56 shrink-0 items-center justify-center gap-2 border-r hairline px-6 text-ink/70 grayscale transition hover:text-ink">
      {logo ? <img src={logo} alt={name} className="max-h-8 w-auto" loading="lazy" /> : (
        <>
          <svg viewBox="0 0 20 20" className="size-5" aria-hidden><path d="M2 18 L10 3 L18 18 Z M6 18 L10 10 L14 18" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
          <span className="text-[13px] font-semibold tracking-tight uppercase">{name}</span>
        </>
      )}
    </div>
  );
}

function Tower() {
  const ref = useRef<SVGSVGElement>(null);
  const p = useInViewProgress(ref, 2.6);
  const pointer = useTransform(p, [0.7, 0.85], [0, 1]);
  const N = TOWER.length;
  return (
    <svg ref={ref} viewBox="0 0 400 600" className="h-full w-full text-ink" fill="none" stroke="currentColor" strokeWidth="1" role="img" aria-label="Torre en perspectiva">
      {TOWER.map((d, i) => <DrawPath key={i} d={d} progress={p} range={[(i / N) * 0.75, (i / N) * 0.75 + 0.2]} />)}
      <motion.g style={{ opacity: pointer }}>
        <path d="M262 64 L330 36" className="stroke-signal" />
        <rect x="326" y="30" width="10" height="10" className="fill-signal" stroke="none" />
      </motion.g>
    </svg>
  );
}

export function Intro() {
  return (
    <section id="estudio" className="relative border-t hairline">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <h2 className="display border-b hairline px-4 py-8 text-[clamp(2rem,4.6vw,4rem)] md:col-span-7 md:border-r md:px-6 md:py-10">
          <LineReveal lines={intro.title} />
        </h2>
        <div className="flex flex-col border-b hairline md:col-span-5">
          <div className="flex flex-1 flex-col justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
            <Reveal className="max-w-sm text-[15px] leading-snug text-ink/80">{intro.lead}</Reveal>
            <a href={intro.link.href} className="label shrink-0 self-start text-signal hover:underline md:self-auto">{intro.link.label} →</a>
          </div>
          <Marquee duration={36} className="border-t hairline py-3">
            {intro.values.map((v) => <span key={v} className="label flex items-center text-[11px]"><Diamond />{v}</span>)}
          </Marquee>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="relative h-[60svh] border-b hairline px-6 pt-10 md:col-span-5 md:h-[90svh] md:border-r">
          <Tower />
        </div>
        <div className="flex flex-col justify-center gap-8 border-b hairline px-4 py-14 md:col-span-7 md:px-14">
          <ScrubText text={intro.statement} mutedTail={intro.statementMutedTail}
            className="display max-w-3xl text-[clamp(1.6rem,3.2vw,2.9rem)] leading-[1]" />
          <div><ArrowLink href={intro.button.href}>{intro.button.label}</ArrowLink></div>
        </div>
      </div>

      <div className="border-b hairline">
        <p className="label border-b hairline px-4 py-3 text-ink/60 md:px-6">{clients.label}</p>
        <Marquee duration={44}>
          {clients.items.map((c) => <ClientLogo key={c.name} {...c} />)}
        </Marquee>
      </div>
    </section>
  );
}
