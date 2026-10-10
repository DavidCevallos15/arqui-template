import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';
import { useRef, type ReactNode } from 'react';

export function StickyStack3D({ items }: { items: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <div ref={ref} className="relative">
      {items.map((node, i) => (
        <StackCard key={i} index={i} total={items.length} progress={scrollYProgress}>{node}</StackCard>
      ))}
    </div>
  );
}

type CardProps = { index: number; total: number; progress: MotionValue<number>; children: ReactNode };

function StackCard({ index, total, progress, children }: CardProps) {
  const reduce = useReducedMotion();
  const step = 1 / total;
  const range = [index * step, (index + 1) * step];
  const last = index === total - 1;
  const rotateX = useTransform(progress, range, [0, reduce || last ? 0 : 14]);
  const scale = useTransform(progress, range, [1, reduce || last ? 1 : 0.9]);
  const filter = useTransform(progress, range, ['brightness(1)', last ? 'brightness(1)' : 'brightness(0.82)']);
  return (
    <div className="sticky top-0 flex h-svh items-center overflow-hidden px-3 pt-16 pb-3 [perspective:1400px] md:px-5">
      <motion.div style={{ rotateX, scale, filter, transformOrigin: 'center top' }} className="size-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
