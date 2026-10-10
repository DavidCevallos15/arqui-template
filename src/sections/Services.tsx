import { services } from '@/content/site';
import { StickyStack3D } from '@/components/motion/StickyStack3D';
import { LineReveal } from '@/components/motion/Reveal';
import { ImageSlot } from '@/components/ImageSlot';
import { Corners } from '@/components/Corners';

export function Services() {
  const cards = services.items.map((s, i) => {
    const dark = i % 2 === 1;
    return (
      <article key={s.n}
        className={`relative grid size-full overflow-hidden border md:grid-cols-12 ${dark ? 'border-ink bg-ink text-paper' : 'border-ink/25 bg-paper text-ink'}`}>
        <div className="flex flex-col justify-between gap-6 p-5 md:col-span-6 md:p-10">
          <div className="label flex justify-between opacity-70"><span>Servicio</span><span>({s.n}/0{services.items.length})</span></div>
          <div>
            <h3 className="display text-[clamp(2.2rem,5vw,4.6rem)]">{s.title}</h3>
            <p className="mt-5 max-w-md text-[15px] leading-snug opacity-75">{s.body}</p>
          </div>
          <ul className={`border-t ${dark ? 'border-paper/20' : 'border-ink/20'}`}>
            {s.deliverables.map((d) => (
              <li key={d} className={`label flex items-center gap-3 border-b py-3 text-[11px] ${dark ? 'border-paper/20' : 'border-ink/20'}`}>
                <span className="size-1.5 bg-signal" />{d}
              </li>
            ))}
          </ul>
        </div>
        <div className={`relative hidden md:col-span-6 md:block ${dark ? 'border-l border-paper/20' : 'border-l border-ink/20'}`}>
          <ImageSlot image={s.image} />
          <Corners />
        </div>
      </article>
    );
  });

  return (
    <section id="servicios" className="relative">
      <div className="grid grid-cols-1 gap-4 border-b hairline px-4 pt-16 pb-8 md:grid-cols-12 md:px-6">
        <p className="label text-ink/60 md:col-span-12">{services.eyebrow}</p>
        <h2 className="display text-[clamp(2rem,4.6vw,4rem)] md:col-span-8"><LineReveal lines={services.title} muteFrom={1} /></h2>
      </div>
      <StickyStack3D items={cards} />
    </section>
  );
}
