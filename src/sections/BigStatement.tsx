import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { bigStatement } from '@/content/site';
import { Corners } from '@/components/Corners';

export function BigStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const words = bigStatement.split(' ');
  return (
    <section ref={ref} className="relative h-[220svh]" aria-label={bigStatement}>
      <div className="sticky top-0 flex h-svh items-center justify-center p-3 pt-15">
        <div className="relative flex size-full items-center justify-center border hairline px-6">
          <Corners />
          <p aria-hidden className="display max-w-5xl text-center text-[clamp(2.2rem,6vw,5.5rem)]">
            {words.map((w, i) => {
              const r: [number, number] = [0.1 + (i / words.length) * 0.7, 0.1 + ((i + 1) / words.length) * 0.7];
              return <Word key={i} r={r} reduce={!!reduce} progress={scrollYProgress}>{w}</Word>;
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

function Word({ children, r, reduce, progress }: { children: string; r: [number, number]; reduce: boolean; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const opacity = useTransform(progress, r, [reduce ? 1 : 0.1, 1]);
  const color = useTransform(progress, [r[0], r[1], r[1] + 0.05], ['#141414', '#e8290b', '#141414']);
  return <motion.span style={{ opacity, color }} className="inline-block whitespace-pre">{children} </motion.span>;
}
