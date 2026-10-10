import { animate, useInView, useMotionValue, useReducedMotion } from 'motion/react';
import { useEffect, type RefObject } from 'react';

/** MotionValue 0→1 que se anima una vez cuando el elemento entra en viewport. */
export function useInViewProgress(ref: RefObject<Element | null>, duration = 2.2, delay = 0) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? 1 : 0);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(mv, 1, { duration, delay, ease: [0.45, 0.05, 0.2, 1] });
    return () => c.stop();
  }, [inView, reduce, mv, duration, delay]);
  return mv;
}
