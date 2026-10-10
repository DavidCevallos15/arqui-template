import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { audiences } from '@/content/site';
import { ImageSlot } from '@/components/ImageSlot';
import { LineReveal } from '@/components/motion/Reveal';
import { ease } from '@/lib/motion';

/** Posiciones del círculo rojo (x/y en % de su propio tamaño). */
const CIRCLES = [
  { x: '15%', y: '12%', s: 1 }, { x: '130%', y: '25%', s: 0.85 }, { x: '45%', y: '120%', s: 0.7 },
  { x: '140%', y: '135%', s: 0.8 }, { x: '8%', y: '140%', s: 0.9 }, { x: '110%', y: '8%', s: 1.05 },
];

export function Audiences() {
  const [active, setActive] = useState(0);
  const c = CIRCLES[active % CIRCLES.length];
  return (
    <section className="grid grid-cols-1 border-t hairline md:grid-cols-12">
      <div className="relative aspect-square overflow-hidden border-b hairline md:col-span-5 md:aspect-auto md:border-r md:border-b-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={active} className="absolute inset-0"
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: ease.reveal }}>
            <ImageSlot image={audiences.items[active].image} />
          </motion.div>
        </AnimatePresence>
        <motion.span aria-hidden animate={{ x: c.x, y: c.y, scale: c.s }}
          transition={{ duration: 0.8, ease: ease.disclosure }}
          className="absolute top-0 left-0 aspect-square w-[38%] rounded-full bg-signal mix-blend-multiply" />
      </div>
      <div className="px-4 py-14 md:col-span-7 md:px-12">
        <p className="label mb-3 text-ink/60">{audiences.eyebrow}</p>
        <h2 className="display mb-10 text-[clamp(2rem,4.2vw,3.6rem)]"><LineReveal lines={audiences.title} /></h2>
        <ul className="border-t hairline">
          {audiences.items.map((a, i) => {
            const open = i === active;
            return (
              <li key={a.title} className="border-b hairline">
                <button type="button" onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-expanded={open}
                  className="flex w-full items-center justify-between py-4 text-left">
                  <span className={`text-[clamp(1.1rem,1.8vw,1.5rem)] font-semibold tracking-tight uppercase transition-colors ${open ? 'text-ink' : 'text-ink/70'}`}>{a.title}</span>
                  <span className={`label transition-transform duration-300 ${open ? 'rotate-45 text-signal' : ''}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: ease.disclosure }} className="overflow-hidden">
                      <span className="block max-w-lg pb-4 text-[14px] leading-snug text-ink/70">{a.body}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
