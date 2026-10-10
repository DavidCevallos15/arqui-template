import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/** Cursor técnico: cuadrado rojo + anillo con spring + lectura de coordenadas. */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const label = useTransform(() => `X:${Math.round(x.get())}PX\nY:${Math.round(y.get())}PX`);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    setEnabled(mq.matches);
    if (!mq.matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const h = !!(e.target as Element | null)?.closest('a,button,[data-cursor]');
      if (h !== hoverRef.current) { hoverRef.current = h; setHover(h); }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div style={{ x: rx, y: ry }} className="absolute top-0 left-0">
        <motion.div animate={{ scale: hover ? 1.7 : 1, opacity: hover ? 1 : 0.5 }} transition={{ duration: 0.24 }}
          className="size-9 -translate-1/2 rounded-full border border-ink" />
      </motion.div>
      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        <div className="size-2.5 -translate-1/2 bg-signal" />
        <motion.pre className="label absolute top-2 left-3 text-[9px] leading-tight text-ink/70">{label}</motion.pre>
      </motion.div>
    </div>
  );
}
