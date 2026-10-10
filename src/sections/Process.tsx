import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { faq, process } from '@/content/site';
import { LineReveal, Reveal } from '@/components/motion/Reveal';
import { ease } from '@/lib/motion';

export function Process() {
  return (
    <section id="proceso" className="border-t hairline">
      <div className="px-4 pt-16 pb-10 md:px-6">
        <p className="label mb-3 text-ink/60">{process.eyebrow}</p>
        <h2 className="display text-[clamp(2rem,4.6vw,4rem)]"><LineReveal lines={process.title} muteFrom={1} /></h2>
      </div>
      <ol className="grid border-t hairline sm:grid-cols-2 lg:grid-cols-5">
        {process.steps.map((s, i) => (
          <li key={s.n} className="group relative border-b hairline sm:border-r lg:border-b-0 [&:last-child]:border-r-0">
            <Reveal delay={i * 0.08} className="flex h-full min-h-[280px] flex-col p-4 md:p-6">
              <div className="flex items-center gap-3">
                <span className="display text-5xl text-ink/15 transition-colors group-hover:text-signal">{s.n}</span>
                <span className="h-px flex-1 bg-ink/20" />
              </div>
              <h3 className="mt-auto text-xl font-semibold tracking-tight uppercase">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-snug text-ink/70">{s.body}</p>
              <p className="label mt-4 text-signal">{s.time}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <Faq />
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="grid grid-cols-1 border-t hairline md:grid-cols-12">
      <p className="label px-4 pt-10 text-ink/60 md:col-span-4 md:px-6">{faq.eyebrow}</p>
      <ul className="px-4 pt-6 pb-16 md:col-span-8 md:px-6 md:pt-10">
        {faq.items.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q} className="border-b hairline">
              <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-medium">
                {f.q}
                <span className={`grid size-7 shrink-0 place-items-center border transition-colors ${isOpen ? 'border-signal bg-signal text-white' : 'border-ink/30'}`}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                    transition={{ duration: 0.32, ease: ease.disclosure }} className="overflow-hidden">
                    <p className="max-w-2xl pb-5 text-[14px] leading-relaxed text-ink/70">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
