import type { ReactNode } from 'react';

type Props = { href: string; children: ReactNode; variant?: 'outline' | 'solid' };

export function ArrowLink({ href, children, variant = 'outline' }: Props) {
  const base = 'group inline-flex items-stretch label text-[11px] transition-colors duration-200';
  const styles = variant === 'solid'
    ? 'bg-signal text-white hover:bg-ink'
    : 'border border-ink/30 hover:bg-ink hover:text-paper';
  return (
    <a href={href} className={`${base} ${styles}`}>
      <span className="px-4 py-3">{children}</span>
      <span className={`flex items-center border-l px-3 ${variant === 'solid' ? 'border-white/30' : 'border-ink/30'}`}>
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </span>
    </a>
  );
}
