import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';
import { useRef } from 'react';

type Props = {
  text: string;
  className?: string;
  /** Cuántas palabras finales quedan en gris al terminar. */
  mutedTail?: number;
  /** Opacidad inicial de cada palabra. */
  from?: number;
};

/** Texto que se "entinta" palabra por palabra al hacer scroll. */
export function ScrubText({ text, className, mutedTail = 0, from = 0.15 }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');
  const solid = words.length - mutedTail;
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}
          to={i < solid ? 1 : 0.35} from={from}>{w}</Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, to, from }: { children: string; progress: MotionValue<number>; range: [number, number]; to: number; from: number }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, [reduce ? to : from, to]);
  return (
    <motion.span aria-hidden style={{ opacity }} className="inline-block whitespace-pre">
      {children}{' '}
    </motion.span>
  );
}
