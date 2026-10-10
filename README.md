# Estudio Axis — Template de landing para arquitectos

Landing de presentación para estudios de arquitectura con estética de lámina técnica: alzado que se dibuja con el scroll, planta arquitectónica con callouts, servicios en sticky stack 3D, proyectos en scroll horizontal y wordmark en contorno.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · Motion

## Personalizar (un solo archivo)

Todo el contenido vive en **`src/content/site.ts`**. El texto es ficticio y funciona como guía de qué va en cada campo.

| Bloque | Qué editar |
|---|---|
| `brand` | Nombre del estudio, wordmark del footer, tagline |
| `contact` | Email, teléfono, WhatsApp, dirección, redes, horario |
| `hero` | Título (por líneas), ficha técnica, cifras, imagen opcional de fachada |
| `intro` / `clients` | Texto del estudio, valores de la cinta, logos de clientes |
| `principles` | 4 criterios con ícono isométrico (`cube`, `sun`, `stack`, `doc`) |
| `services` | Servicios con entregables e imagen |
| `plan` | Texto de la sección de planos y etiquetas sobre la planta |
| `projects` | Obras: nombre, ciudad, año, área, tipo, imagen |
| `audiences`, `process`, `faq`, `cta`, `footer` | Resto de secciones |

`<title>`, la meta description y el favicon se editan en `index.html`.

### Imágenes

1. Coloca los archivos en `public/images/` (AVIF/WebP recomendado).
2. Pon la ruta en el campo `src` del asset, ej. `src: '/images/casa-mirador.avif'`.
3. Si `src` está vacío, se muestra un **placeholder** que indica qué foto va y con qué medida (`hint` y `spec`).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

## Deploy en Vercel

Importa el repo en Vercel. El preset **Vite** se detecta solo (build `npm run build`, output `dist`) y no necesita variables de entorno.

## Animación y accesibilidad

- Solo se anima `transform`, `opacity`, `clip-path` y `pathLength`.
- Con `prefers-reduced-motion` todo aparece ya dibujado, sin scroll-jacking (los proyectos pasan a grid).
- El cursor técnico (cuadrado rojo con coordenadas) solo se activa con puntero fino; en touch se usa el cursor nativo.
- La barra de cookies guarda la elección en `localStorage` con fallback seguro.
