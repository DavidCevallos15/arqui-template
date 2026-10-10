import { motion, useTransform, useReducedMotion, type MotionValue } from 'motion/react';

type Props = {
  d: string;
  progress: MotionValue<number>;
  range: [number, number];
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  stroke?: string;
  className?: string;
};

/** Path que se dibuja (pathLength 0→1) según un MotionValue de scroll. */
export function DrawPath({ d, progress, range, ...rest }: Props) {
  const reduce = useReducedMotion();
  const pathLength = useTransform(progress, range, [reduce ? 1 : 0, 1]);
  const opacity = useTransform(progress, [range[0], range[0] + 0.001], [reduce ? 1 : 0, 1]);
  return <motion.path d={d} style={{ pathLength, opacity }} {...rest} />;
}
