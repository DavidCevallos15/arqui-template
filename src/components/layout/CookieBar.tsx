import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { cookies } from '@/content/site';

const KEY = 'cookie-consent';

export function CookieBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(KEY); } catch { /* storage bloqueado */ }
    if (!stored) { const t = setTimeout(() => setShow(true), 1200); return () => clearTimeout(t); }
  }, []);
  const decide = (v: 'accept' | 'reject') => {
    try { localStorage.setItem(KEY, v); } catch { /* noop */ }
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div role="dialog" aria-label="Aviso de cookies"
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-3 bottom-3 left-3 z-[60] flex items-stretch border border-ink bg-paper shadow-[4px_4px_0_0_#141414] md:left-auto md:w-[440px]">
          <p className="flex flex-1 items-center gap-1.5 px-3 py-2.5 text-[13px]">
            {cookies.text}
            <a href={cookies.more.href} className="label text-signal underline-offset-2 hover:underline">{cookies.more.label}</a>
          </p>
          <button type="button" onClick={() => decide('accept')} className="label bg-signal px-4 text-white hover:bg-ink">Aceptar</button>
          <button type="button" onClick={() => decide('reject')} className="label border-l border-ink px-4 hover:bg-ink hover:text-paper">Rechazar</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
