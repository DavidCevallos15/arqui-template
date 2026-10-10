import type { ImageAsset } from '@/content/site';

type Props = { image: ImageAsset; className?: string; eager?: boolean; fit?: 'cover' | 'contain' };

/**
 * Muestra la imagen si existe `src`; si no, un placeholder técnico que
 * indica qué foto va y con qué medida.
 */
export function ImageSlot({ image, className = '', eager = false, fit = 'cover' }: Props) {
  if (image.src) {
    return (
      <img src={image.src} alt={image.alt} loading={eager ? 'eager' : 'lazy'} decoding="async"
        className={`size-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`} />
    );
  }
  return (
    <div role="img" aria-label={image.alt}
      className={`relative size-full overflow-hidden bg-paper-2 ${className}`}>
      <svg className="absolute inset-0 size-full text-ink/15" preserveAspectRatio="none" aria-hidden>
        <defs>
          <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hatch)" />
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="max-w-[80%] border border-ink/20 bg-paper px-3 py-2 text-center">
          <p className="label text-signal">Imagen</p>
          <p className="mt-1 text-[13px] leading-tight font-medium">{image.hint}</p>
          <p className="label mt-1 text-ink/50">{image.spec}</p>
        </div>
      </div>
    </div>
  );
}
