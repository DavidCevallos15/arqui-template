import { motion, useReducedMotion } from 'motion/react';
import { brand, contact, footer, nav } from '@/content/site';
import { Logo } from '@/components/layout/Header';
import { services } from '@/content/site';

function Col({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border-b hairline p-4 md:p-5 ${className}`}>
      <p className="label mb-3 text-ink/50">{title}</p>
      {children}
    </div>
  );
}

const link = 'block py-0.5 text-[13px] transition-colors hover:text-signal';

export function Footer() {
  const reduce = useReducedMotion();
  return (
    <footer className="border-t hairline">
      <div className="grid sm:grid-cols-2 lg:grid-cols-12">
        <Col title={brand.tagline} className="lg:col-span-3 lg:border-r">
          <Logo />
          <p className="mt-4 max-w-[28ch] text-[13px] leading-snug text-ink/70">{footer.newsletter}</p>
          <form className="mt-4 flex border-b border-ink/40" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="nl" className="sr-only">Correo</label>
            <input id="nl" type="email" required placeholder="Tu correo" className="flex-1 bg-transparent py-2 text-[13px] outline-none placeholder:text-ink/40" />
            <button type="submit" className="px-2 text-signal" aria-label="Suscribirse">→</button>
          </form>
        </Col>
        <Col title="Estudio" className="sm:border-l lg:col-span-2 lg:border-l-0 lg:border-r">
          {nav.map((n) => <a key={n.href} href={n.href} className={link}>{n.label}</a>)}
        </Col>
        <Col title="Servicios" className="lg:col-span-3 lg:border-r">
          {services.items.map((s) => <a key={s.n} href="#servicios" className={link}>{s.title}</a>)}
        </Col>
        <Col title="Contacto" className="sm:border-l lg:col-span-2 lg:border-l-0 lg:border-r">
          {contact.address.map((a) => <p key={a} className="text-[13px]">{a}</p>)}
          <a href={contact.mapsUrl} className={`${link} label mt-2 text-signal`}>Cómo llegar ↗</a>
          <a href={`mailto:${contact.email}`} className={`${link} mt-2`}>{contact.email}</a>
          <a href={contact.whatsapp} className={link}>{contact.phone}</a>
        </Col>
        <Col title="Redes" className="lg:col-span-2">
          {contact.social.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={link}>{s.label}</a>)}
        </Col>
      </div>

      {/* Wordmark gigante en contorno con líneas de construcción */}
      <div className="relative border-b hairline px-4 py-6 md:px-6">
        <svg viewBox="0 0 1000 260" className="w-full text-ink" role="img" aria-label={brand.name}>
          <g stroke="currentColor" strokeWidth="0.5" className="text-ink/25" strokeDasharray="4 4">
            <line x1="0" y1="40" x2="1000" y2="40" /><line x1="0" y1="220" x2="1000" y2="220" />
            <line x1="0" y1="130" x2="1000" y2="130" />
          </g>
          <motion.text x="500" y="222" textAnchor="middle" fontSize="250" fontWeight="600" letterSpacing="-6"
            fill="none" stroke="currentColor" strokeWidth="1.2" style={{ fontFamily: 'var(--font-sans)' }}
            strokeDasharray="1400" initial={reduce ? false : { strokeDashoffset: 1400 }}
            whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2.4, ease: [0.45, 0.05, 0.2, 1] }}>
            {brand.wordmark}
          </motion.text>
          <motion.rect x="492" y="122" width="16" height="16" className="fill-signal" initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 2.2 }} style={{ transformOrigin: '500px 130px' }} />
        </svg>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <p className="label text-ink/60">© {new Date().getFullYear()} {brand.name}. Todos los derechos reservados. · <a href={footer.credit.href} className="underline underline-offset-2 hover:text-signal">{footer.credit.label}</a></p>
        <div className="flex gap-0 border hairline">
          {footer.legal.map((l, i) => (
            <a key={l.label} href={l.href} className={`px-3 py-1.5 text-[12px] hover:bg-ink hover:text-paper ${i ? 'border-l hairline' : ''}`}>{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
