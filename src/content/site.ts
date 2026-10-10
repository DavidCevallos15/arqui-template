/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENIDO DEL SITIO — edita SOLO este archivo para personalizar.
 *  Todo el texto es FICTICIO y sirve como guía de qué va en cada campo.
 *  Imágenes: colócalas en /public/images/ y pon la ruta en `src`.
 *  Si `src` queda vacío, se muestra un placeholder técnico con la
 *  descripción y la medida recomendada.
 * ─────────────────────────────────────────────────────────────
 */

export type ImageAsset = {
  /** Ruta en /public, ej: '/images/hero-fachada.avif'. Vacío = placeholder. */
  src?: string;
  /** Texto alternativo (accesibilidad + SEO). */
  alt: string;
  /** Qué foto debe ir aquí (se muestra en el placeholder). */
  hint: string;
  /** Medida/formato recomendado. */
  spec: string;
};

export const brand = {
  /** Nombre del estudio. Se usa en header, footer y wordmark gigante. */
  name: 'Estudio Axis',
  /** Wordmark del footer (corto, 3–6 letras se ve mejor). */
  wordmark: 'AXIS',
  tagline: 'Arquitectura & interiorismo',
  /** <title> y meta description se editan en index.html */
};

export const nav = [
  { label: 'Estudio', href: '#estudio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
];

export const contact = {
  ctaLabel: 'Agenda una visita',
  email: 'contacto@estudioaxis.com',
  phone: '+593 99 000 0000',
  whatsapp: 'https://wa.me/593990000000',
  address: ['Av. Universitaria 123, Of. 4B', 'Portoviejo, Manabí — Ecuador'],
  mapsUrl: 'https://maps.google.com',
  hours: 'Lun – Vie · 08:30 – 17:30',
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Behance', href: 'https://behance.net' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Pinterest', href: 'https://pinterest.com' },
  ],
};

export const hero = {
  /** Título principal: cada string es una línea. */
  title: ['Diseñamos', 'espacios que', 'se habitan', 'con calma'],
  /** Ficha técnica (abajo a la derecha). */
  sheet: [
    { k: 'Estudio', v: 'Arquitectura, interiorismo y paisaje' },
    { k: 'Fundado', v: '2014' },
    { k: 'Enfoque', v: 'Vivienda, comercio y hotelería con diseño bioclimático' },
    { k: 'Ubicación', v: 'Portoviejo · Manta · Quito' },
  ],
  /** Lista tipo "boot" (cifras rápidas). */
  stats: ['001  +120 proyectos entregados', '002  48.000 m² construidos', '003  12 premios y menciones'],
  /**
   * Imagen opcional que aparece al terminar de dibujarse el plano
   * (render de la fachada sobre fondo claro, recortada sin cielo).
   */
  image: {
    src: '',
    alt: 'Fachada principal de vivienda contemporánea',
    hint: 'Render/foto de fachada frontal, fondo claro',
    spec: '2000×1000 · AVIF/WebP · ≤250 KB',
  } satisfies ImageAsset,
};

export const intro = {
  title: ['Arquitectura pensada', 'para el clima y la gente'],
  lead: 'Somos un estudio de arquitectura que diseña viviendas, espacios comerciales y proyectos de hotelería. Partimos del lugar, la luz y el presupuesto para llegar a obras que envejecen bien.',
  link: { label: 'Conoce el estudio', href: '#estudio' },
  values: ['Diseño bioclimático', 'Presupuesto controlado', 'Dirección de obra', 'Modelado BIM', 'Materiales locales'],
  statement:
    'Un buen proyecto no empieza con un render. Empieza escuchando cómo vives, cómo trabajas y qué esperas de un espacio. Nosotros convertimos eso en planos claros y en una obra sin sorpresas.',
  /** Últimas N palabras del statement quedan en gris como remate. */
  statementMutedTail: 6,
  button: { label: 'Ver servicios', href: '#servicios' },
};

export const clients = {
  label: 'Clientes y colaboradores',
  /** Reemplaza `logo` por la ruta de un SVG/PNG del cliente o deja el texto. */
  items: [
    { name: 'Norte Inmobiliaria', logo: '' },
    { name: 'Grupo Vértice', logo: '' },
    { name: 'Fundación Litoral', logo: '' },
    { name: 'Hoteles Ceibo', logo: '' },
    { name: 'Constructora Andina', logo: '' },
    { name: 'Pacífico Desarrollos', logo: '' },
  ],
};

export const principles = {
  eyebrow: 'Principios',
  title: ['Lo que cuidamos', 'en cada proyecto'],
  lead: 'Cuatro criterios que guían cada decisión, desde el primer boceto hasta la entrega de llaves.',
  items: [
    { icon: 'cube', title: ['Cada metro', 'cuadrado cuenta'], body: 'Distribuciones eficientes: menos pasillo, más espacio que realmente se usa.' },
    { icon: 'sun', title: ['Luz y aire', 'natural'], body: 'Orientación, sombras y ventilación cruzada para reducir el uso de climatización.' },
    { icon: 'stack', title: ['Presupuesto', 'bajo control'], body: 'Presupuestos por partidas y seguimiento mensual para evitar desvíos en obra.' },
    { icon: 'doc', title: ['Trámites', 'sin fricción'], body: 'Gestionamos permisos municipales, aprobación de planos y línea de fábrica.' },
  ],
};

export const services = {
  eyebrow: 'Servicios',
  title: ['Un solo equipo', 'del boceto a la obra'],
  items: [
    {
      n: '01',
      title: 'Arquitectura residencial',
      body: 'Casas unifamiliares, villas de playa y edificios de departamentos diseñados a la medida del terreno y del cliente.',
      deliverables: ['Anteproyecto y proyecto ejecutivo', 'Planos estructurales y de instalaciones', 'Renders y recorrido 360°'],
      image: { src: '', alt: 'Vivienda unifamiliar', hint: 'Foto exterior de vivienda terminada', spec: '1600×1000 · AVIF/WebP' },
    },
    {
      n: '02',
      title: 'Comercial & corporativo',
      body: 'Oficinas, locales y showrooms donde la arquitectura refuerza la marca y mejora la operación diaria.',
      deliverables: ['Programa arquitectónico', 'Diseño de fachada y señalética', 'Coordinación BIM con ingenierías'],
      image: { src: '', alt: 'Oficinas corporativas', hint: 'Interior de oficina o fachada comercial', spec: '1600×1000 · AVIF/WebP' },
    },
    {
      n: '03',
      title: 'Interiorismo',
      body: 'Mobiliario, iluminación y materiales pensados como parte del proyecto, no como un añadido final.',
      deliverables: ['Moodboard y paleta de materiales', 'Planos de mobiliario a medida', 'Diseño de iluminación'],
      image: { src: '', alt: 'Sala interior', hint: 'Interior con mobiliario y luz natural', spec: '1600×1000 · AVIF/WebP' },
    },
    {
      n: '04',
      title: 'Dirección de obra',
      body: 'Supervisamos la construcción para que lo dibujado sea lo construido: calidad, plazos y costos.',
      deliverables: ['Cronograma valorado', 'Visitas e informes semanales', 'Control de calidad y recepción'],
      image: { src: '', alt: 'Obra en construcción', hint: 'Foto de obra (estructura, encofrado)', spec: '1600×1000 · AVIF/WebP' },
    },
  ],
};

export const plan = {
  tag: 'Del plano a la obra',
  tagBody: 'Cada proyecto se documenta en planos y modelos BIM coordinados, para que el constructor tenga respuestas antes de preguntar.',
  title: ['Planos que se', 'construyen tal', 'como se dibujan'],
  lead: 'Trabajamos con Revit y ArchiCAD. Entregamos documentación completa y la mantenemos actualizada durante la obra.',
  features: [
    'Planos arquitectónicos y de detalle',
    'Modelado BIM coordinado con ingenierías',
    'Renders y recorridos virtuales',
    'Presupuesto referencial por partidas',
  ],
  /** Etiquetas que aparecen sobre la planta al hacer scroll. */
  callouts: [
    { label: 'Sala · comedor', meta: '42 m²' },
    { label: 'Patio interior', meta: 'Ventilación cruzada' },
    { label: 'Dormitorio principal', meta: '18 m² · vista al jardín' },
  ],
};

export const projects = {
  eyebrow: 'Proyectos seleccionados',
  title: ['Obras que', 'hablan por nosotros'],
  items: [
    { name: 'Casa Mirador', place: 'Manta', year: '2025', area: '320 m²', type: 'Vivienda', image: { src: '', alt: 'Casa Mirador', hint: 'Foto principal del proyecto', spec: '1200×1500 · vertical' } },
    { name: 'Edificio Alameda', place: 'Portoviejo', year: '2024', area: '2.400 m²', type: 'Residencial', image: { src: '', alt: 'Edificio Alameda', hint: 'Fachada del edificio', spec: '1200×1500 · vertical' } },
    { name: 'Oficinas Litoral', place: 'Guayaquil', year: '2024', area: '860 m²', type: 'Corporativo', image: { src: '', alt: 'Oficinas Litoral', hint: 'Interior de oficinas', spec: '1200×1500 · vertical' } },
    { name: 'Pabellón Ceibo', place: 'Puerto López', year: '2023', area: '540 m²', type: 'Hotelería', image: { src: '', alt: 'Pabellón Ceibo', hint: 'Exterior con paisaje', spec: '1200×1500 · vertical' } },
    { name: 'Casa Patio', place: 'Quito', year: '2022', area: '280 m²', type: 'Vivienda', image: { src: '', alt: 'Casa Patio', hint: 'Patio interior / detalle', spec: '1200×1500 · vertical' } },
  ],
};

export const audiences = {
  eyebrow: 'Para quién',
  title: ['Diseñamos para', 'quien lo va a vivir'],
  items: [
    { title: 'Familias', body: 'Casas a la medida de su rutina, con espacios que crecen con la familia.', image: { src: '', alt: 'Familia en su vivienda', hint: 'Vivienda habitada / exterior', spec: '1200×1200 · cuadrada' } },
    { title: 'Desarrolladores inmobiliarios', body: 'Proyectos rentables: optimizamos áreas vendibles sin perder calidad espacial.', image: { src: '', alt: 'Edificio residencial', hint: 'Edificio o conjunto residencial', spec: '1200×1200 · cuadrada' } },
    { title: 'Empresas y oficinas', body: 'Espacios de trabajo que reflejan la cultura de la empresa y mejoran la productividad.', image: { src: '', alt: 'Oficina', hint: 'Oficina o sede corporativa', spec: '1200×1200 · cuadrada' } },
    { title: 'Hotelería y restaurantes', body: 'Experiencias memorables para huéspedes, con operación eficiente detrás.', image: { src: '', alt: 'Hotel', hint: 'Lobby, terraza o restaurante', spec: '1200×1200 · cuadrada' } },
    { title: 'Instituciones educativas', body: 'Aulas y campus con buena acústica, luz natural y circulaciones seguras.', image: { src: '', alt: 'Escuela', hint: 'Aula o patio escolar', spec: '1200×1200 · cuadrada' } },
    { title: 'Espacio público', body: 'Plazas, parques y equipamiento urbano pensado para la comunidad.', image: { src: '', alt: 'Plaza pública', hint: 'Plaza o parque', spec: '1200×1200 · cuadrada' } },
  ],
};

export const process = {
  eyebrow: 'Proceso',
  title: ['Cinco etapas,', 'cero sorpresas'],
  steps: [
    { n: '01', title: 'Diagnóstico', body: 'Visitamos el terreno, revisamos normativa y definimos programa y presupuesto.', time: '1–2 semanas' },
    { n: '02', title: 'Anteproyecto', body: 'Zonificación, volumetría y primeras imágenes para validar la idea.', time: '3–4 semanas' },
    { n: '03', title: 'Proyecto ejecutivo', body: 'Planos completos, detalles constructivos e ingenierías coordinadas.', time: '4–8 semanas' },
    { n: '04', title: 'Permisos', body: 'Ingreso y seguimiento de la aprobación municipal.', time: 'Según municipio' },
    { n: '05', title: 'Obra', body: 'Dirección técnica, control de costos y entrega final.', time: 'Según proyecto' },
  ],
};

export const faq = {
  eyebrow: 'Preguntas frecuentes',
  items: [
    { q: '¿Cuánto cuesta diseñar una casa?', a: 'Depende del área y la complejidad. Trabajamos con un porcentaje sobre el costo de obra o con tarifa por m²; en la primera reunión entregamos una propuesta cerrada.' },
    { q: '¿Trabajan fuera de la ciudad?', a: 'Sí. Desarrollamos proyectos en todo el país y coordinamos la obra con visitas programadas y reportes remotos.' },
    { q: '¿Puedo contratar solo los planos?', a: 'Sí. Puedes contratar el proyecto ejecutivo sin dirección de obra, aunque recomendamos al menos supervisión periódica.' },
    { q: '¿Gestionan los permisos municipales?', a: 'Sí, preparamos la documentación y damos seguimiento al trámite hasta la aprobación.' },
    { q: '¿Cuánto tarda el proceso completo?', a: 'Una vivienda unifamiliar suele tomar de 2 a 3 meses en diseño y de 8 a 12 meses en obra.' },
  ],
};

export const cta = {
  title: ['¿Tienes un terreno', 'o una idea?'],
  lead: 'Agenda una visita sin costo. Revisamos tu terreno o espacio y te entregamos una propuesta en 5 días hábiles.',
  image: { src: '', alt: 'Detalle arquitectónico', hint: 'Recorte de edificio sin fondo (PNG)', spec: '1000×800 · PNG transparente' } satisfies ImageAsset,
};

export const footer = {
  newsletter: 'Recibe nuestros proyectos y notas de diseño una vez al mes.',
  legal: [
    { label: 'Política de privacidad', href: '#' },
    { label: 'Términos', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
  credit: { label: 'Template por DC.dev', href: 'https://github.com/DavidCevallos15' },
};

export const cookies = {
  text: 'Este sitio usa cookies.',
  more: { label: 'Saber más', href: '#' },
};

/** Frase gigante centrada que se entinta al hacer scroll. */
export const bigStatement = 'Contigo desde el primer trazo hasta la entrega de llaves';
