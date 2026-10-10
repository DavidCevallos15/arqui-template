import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'motion/react';
import { ease, dur } from '@/lib/motion';

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number };

export function Reveal({ delay = 0, y = 24, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: dur.reveal, ease: ease.reveal, delay }}
      {...props}
    />
  );
}

const line: Variants = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: '0%', transition: { duration: dur.reveal, ease: ease.reveal, delay: i * 0.08 } }),
};

/**
 * Titular por líneas con máscara: cada línea sube desde abajo.
 * El trigger está en el contenedor (no en la línea) porque la línea
 * oculta queda recortada y IntersectionObserver nunca la vería.
 */
export function LineReveal({ lines, className, muteFrom, animateOnMount = false, delay = 0 }: {
  lines: string[]; className?: string; muteFrom?: number; animateOnMount?: boolean; delay?: number;
}) {
  const reduce = useReducedMotion();
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.4 } };
  return (
    <motion.span className={`block ${className ?? ''}`} initial={reduce ? false : 'hidden'} {...trigger}>
      {lines.map((l, i) => (
        <span key={i} className="-mt-[0.14em] block overflow-hidden pt-[0.14em] pb-[0.04em]">
          <motion.span custom={i + delay / 0.08} variants={line}
            className={`block ${muteFrom !== undefined && i >= muteFrom ? 'text-ink/35' : ''}`}>
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
