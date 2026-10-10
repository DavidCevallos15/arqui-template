import { motion, useReducedMotion } from 'motion/react';
import { contact, cta } from '@/content/site';
import { LineReveal, Reveal } from '@/components/motion/Reveal';
import { ArrowLink } from '@/components/ArrowLink';
import { ImageSlot } from '@/components/ImageSlot';
import { Corners } from '@/components/Corners';

export function Cta() {
  const reduce = useReducedMotion();
  return (
    <section id="contacto" className="relative overflow-hidden border-t hairline px-4 py-20 text-center md:px-6 md:py-28">
      <Corners />
      <h2 className="display mx-auto text-[clamp(2.2rem,5.4vw,5rem)]"><LineReveal lines={cta.title} /></h2>
      <Reveal className="mx-auto mt-5 max-w-md text-[15px] leading-snug text-ink/70">{cta.lead}</Reveal>
      <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-3">
        <ArrowLink href={contact.whatsapp} variant="solid">{contact.ctaLabel}</ArrowLink>
        <ArrowLink href={`mailto:${contact.email}`}>{contact.email}</ArrowLink>
      </Reveal>
      <div className="relative mx-auto mt-14 aspect-[5/4] w-full max-w-md">
        <div className="absolute inset-0 border hairline"><ImageSlot image={cta.image} fit="contain" /></div>
        <motion.span aria-hidden initial={reduce ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.3 }}
          className="absolute -top-6 -right-6 size-20 rounded-full bg-signal mix-blend-multiply" />
      </div>
      <p className="label mt-10 text-ink/50">{contact.hours} · {contact.phone}</p>
    </section>
  );
}
