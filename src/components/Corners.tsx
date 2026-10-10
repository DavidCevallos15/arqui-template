/** Marcas "+" en las esquinas, estilo lámina técnica. */
export function Corners({ className = '' }: { className?: string }) {
  const c = 'absolute size-3 text-ink/60 before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:-translate-x-1/2 before:bg-current after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:-translate-y-1/2 after:bg-current';
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${c} top-2 left-2`} />
      <span className={`${c} top-2 right-2`} />
      <span className={`${c} bottom-2 left-2`} />
      <span className={`${c} right-2 bottom-2`} />
    </div>
  );
}
