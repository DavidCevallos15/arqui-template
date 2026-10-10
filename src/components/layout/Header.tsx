import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { brand, nav } from '@/content/site';
import { ease } from '@/lib/motion';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2 ${className}`} aria-label={`${brand.name} — inicio`}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <rect x="3" y="5" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 5 L9 1 H23 V15 L19 21" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="15" y="1" width="5" height="5" className="fill-signal" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight uppercase">{brand.name}</span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b hairline bg-paper/85 backdrop-blur-md">
      <div className="flex h-12 items-stretch">
        <div className="flex items-center px-4 md:px-5"><Logo /></div>
        <nav className="ml-auto hidden items-stretch md:flex" aria-label="Principal">
          {nav.map((n) => (
            <a key={n.href} href={n.href}
              className="label relative flex items-center border-l hairline px-6 text-[11px] transition-colors hover:bg-ink hover:text-paper">
              {n.label}
            </a>
          ))}
          <a href="#contacto" className="label flex items-center border-l hairline px-6 text-[11px] text-signal transition-colors hover:bg-signal hover:text-white">
            Contacto ↗
          </a>
        </nav>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav"
          className="label ml-auto border-l hairline px-5 md:hidden">
          {open ? 'Cerrar' : 'Menú'}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-nav" aria-label="Móvil"
            initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            transition={{ duration: 0.32, ease: ease.disclosure }}
            className="overflow-hidden border-t hairline md:hidden">
            {[...nav, { label: 'Contacto', href: '#contacto' }].map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b hairline px-5 py-4 text-2xl font-semibold tracking-tight uppercase">
                {n.label}<span className="text-signal">→</span>
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
