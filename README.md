# coruna.fyi

Una guía editorial de A Coruña. Primera entrega: sistema de diseño vivo en `/ds/`.

## Desarrollo

Node.js compatible con Astro 7 (este proyecto se ha validado con Node 24.10.0).

El proyecto usa pnpm 11.6.0, fijado en `package.json` mediante `packageManager`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Abrir http://127.0.0.1:4321/ds/. La raíz redirige al sistema de diseño mientras se define la portada.

```sh
pnpm check
pnpm build
pnpm preview
```

El proyecto usa Astro 7.4.10. TypeScript se mantiene en la versión 6 por compatibilidad con `astro check`. Las dependencias resueltas están fijadas en `pnpm-lock.yaml`, el único archivo de bloqueo del proyecto. Para añadir, actualizar o eliminar dependencias, usar pnpm.

## Dirección de diseño

- Papel y tinta como base; azul Atlántico para orientar; arena, barro y monte como acentos.
- Apariencia clara y oscura automática mediante `prefers-color-scheme`: sigue al sistema desde el primer pintado y responde a sus cambios sin recargar. En `/ds`, el selector **System / Light / Dark** permite comparar las variantes. La vista previa se conserva durante la sesión de esa pestaña y elegir System restablece el comportamiento automático. La selección se restaura antes del primer pintado solo en el DS. El tema oscuro adapta superficies, texto, botones, etiquetas y mapa; las fotografías conservan su color. El DS muestra y copia los HEX activos y documenta los tonos auxiliares, incluido `--color-soft`.
- Bitter para titulares y citas. Montserrat para lectura, navegación y datos prácticos. Fuentes alojadas en el propio sitio, sin solicitudes a Google Fonts.
- Tarjetas de lugar con imagen, categoría con texto y color del catálogo sobre la foto, título e introducción, sin antetítulo ni pie. Variantes Grid y List. Las categorías reutilizan el componente `Tag.astro` de «Etiquetas y contexto», con el mismo tamaño, espaciado y colores.
- Galería masonry en Componentes con 9 fotografías de A Coruña, proporciones originales y sin pies de foto. Tres columnas en escritorio, dos en tablet y una en móvil; carga diferida y dimensiones reservadas. Los créditos y licencias de cada foto están junto a la galería y en `src/data/gallery-images.json`.
- Gallego integrado con naturalidad. Las palabras que necesitan glosa usan cursiva, barro, subrayado y un botón con significado en castellano. Los nombres propios mantienen su forma local.
- Fotografías con color natural, texto alternativo y créditos. Formatos 3:2 para tarjetas, 4:5 para retratos y 16:9 para vídeo.
- Cartografía SVG local, sin servicios de mapas en ejecución. Costa, calles, playas y parques proceden de OpenStreetMap, simplificados y proyectados sin deformar las proporciones. Los marcadores usan coordenadas geográficas; el estilo responde a Light y Dark.
- Iconografía de [Lucide](https://lucide.dev/guide/astro), con el paquete oficial `@lucide/astro`. SVG estáticos de 12, 16, 20, 24 y 32 px, con trazo de 1 px para los tamaños de 12 y 16 px y de 1,5 px para el resto. El catálogo incluye ejemplos para mar, puerto, monumentos, barrios, gastronomía, rutas e historia. Los iconos decorativos están ocultos a lectores de pantalla; el texto o la etiqueta del control expresa la acción.
- Sin logotipo ni favicon: la cabecera utiliza el nombre en texto.
- Al copiar un color, una isla React con `AnimatePresence` sustituye el icono de copiar por un check durante dos segundos. Las copias repetidas reinician ese plazo; los fallos no muestran confirmación. Con movimiento reducido, el cambio usa solo opacidad.

## Estructura

```text
src/
  components/
    Icon.astro          # Selección de Lucide y reglas compartidas
    IconGallery.astro   # Catálogo y ejemplos de iconografía
    CopyFeedback.tsx    # Confirmación animada de copia con Motion y Lucide React
    ThemeControls.astro # Vista previa System / Light / Dark del DS
    CityMap.astro       # Mapa SVG con lista, filtros y selección equivalente
    GalicianWord.astro # Palabra con glosa accesible
    PlaceCard.astro     # Tarjeta editorial de lugar
    Video.astro         # Vídeo nativo o estado editorial sin contenido
  layouts/Layout.astro # Documento HTML y fuentes
  pages/ds.astro       # Catálogo y comportamientos de demostración
  pages/index.astro    # Entrada al catálogo
  styles/dark.css     # Tokens oscuros; su hoja sigue al sistema o a la vista previa
  styles/global.css   # Tailwind 4 y tema: colores, tipografía, tamaños y breakpoints
public/images/        # Fotografías locales
```

Para cambiar el lenguaje visual, empezar por el bloque `@theme` de `src/styles/global.css`. Las piezas reutilizables usan propiedades tipadas. El catálogo es estático; solo los ejemplos interactivos envían JavaScript al navegador.

## Estilos con Tailwind

Tailwind CSS **4.3.5** y `@tailwindcss/vite` se integran en `astro.config.mjs`. La hoja global importa Tailwind y define el tema con la configuración CSS de la versión 4. Las paletas, familias, tamaños de texto, radios y breakpoints predeterminados se sustituyen por los del proyecto; el espaciado mantiene una base de 4 px.

Los componentes y páginas se componen con utilidades en `class`, `class:list` o `className`, sin hojas de estilos de componentes ni `@apply`. Ejemplos: `bg-paper text-ink`, `font-display text-h2`, `text-sm leading-copy`, `min-h-control`, `max-w-reading`, `rounded-card` y `gap-3`. Los valores singulares de composición usan utilidades arbitrarias.

- Colores semánticos: `paper`, `surface`, `ink`, `muted`, `line`, `sea`, `sand`, `clay`, `moss` y sus variantes. `src/styles/dark.css` solo cambia los tokens del tema; las mismas clases sirven para ambas apariencias.
- Tipografía: `font-body` y `font-display`; escala de `text-3xs` a `text-6xl`, junto con `text-h1`, `text-h2`, `text-h3` y tamaños fluidos editoriales. Los tamaños de texto no imponen interlineado: se combina con `leading-*`.
- Tamaños: `min-h-control` (44 px), `w-sidebar`, `max-w-shell` y `max-w-reading`. Radios `rounded-sm` (4 px), `rounded-md` (8 px), `rounded-lg` (16 px), `rounded-pill` y los específicos de fotografías, tarjetas y controles.
- Breakpoints: `xs` 361 px, `sm` 541 px, `md` 761 px, `lg` 1021 px, `xl` 1201 px y `2xl` 1600 px. Las variantes `max-*` conservan los puntos de cambio del diseño anterior.
- Estados: atributos `aria-pressed`, `aria-current`, `hidden` y `data-*`, con variantes de Tailwind. JavaScript actualiza estos atributos, sin aplicar estilos inline ni alternar clases de CSS propias. Motion conserva la animación de copia y su alternativa con movimiento reducido.

Las clases elegidas a partir de datos se declaran completas en mapas tipados o literales, para que Tailwind pueda detectarlas durante la compilación; no construir fragmentos como `bg-${color}`.

## Vídeos

El catálogo muestra explícitamente el estado sin metraje. El componente acepta `src`, `poster`, `title`, `caption` y `captionsSrc`; con `src` se convierte en un reproductor HTML nativo con controles, sin autoplay y `preload="none"`. Añadir subtítulos y una transcripción editorial cuando se publique metraje. No se carga ningún reproductor externo.

## Fichas de la guía

Cada archivo MDX de `src/content/guide/` o directamente en `src/content/` genera una página. Por ejemplo, `deporte.mdx` se publica en `/deporte/`. Edita el título y la descripción en el frontmatter y escribe el contenido en el cuerpo MDX. Las entradas de la guía requieren también imagen y texto alternativo.

El esquema de `src/content.config.ts` valida las propiedades. El buscador incluye las páginas publicadas de ambas carpetas; `draft: true` las excluye del buscador y de las rutas. Los nombres de archivo deben ser únicos entre las dos carpetas.

## Fotografías

Descargadas de Wikimedia Commons y recortadas mediante CSS. Deben conservar sus créditos y licencias al reutilizarlas.

- [Torre de Hércules — Diego Delso](https://commons.wikimedia.org/wiki/File:Torre_de_H%C3%A9rcules,_La_Coru%C3%B1a,_Espa%C3%B1a,_2015-09-25,_DD_35-37_HDR.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Marina — Jorge Castro Ruso](https://commons.wikimedia.org/wiki/File:Marina_-_A_Coru%C3%B1a.jpg), [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).
- [PulpoGallega — Tamorlan](https://commons.wikimedia.org/wiki/File:PulpoGallega.JPG), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

- [Monte de San Pedro — Luis Miguel Bugallo Sánchez (Lmbuga)](https://commons.wikimedia.org/wiki/File:Monte_de_San_Pedro._A_Coru%C3%B1a-c1.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Los créditos también están disponibles en la sección «Imagen y vídeo» del catálogo.

## Datos del mapa

La base geográfica es una extracción de **© OpenStreetMap contributors**, bajo [ODbL](https://www.openstreetmap.org/copyright), del 11 de noviembre de 2026. El crédito aparece junto al mapa. Los datos derivados están disponibles en `/data/coruna-map.geojson` con su atribución, licencia, fecha, extensión y geometrías en longitud/latitud. No se utilizan imágenes ni trazados extraídos de Google Maps.

`src/data/coruna-map.json` contiene la costa, calles, playas y zonas verdes. El componente proyecta los datos a SVG al compilar: no carga teselas, APIs ni una biblioteca de mapas en el navegador. La escala se conserva con una proyección local equirectangular, corregida para la latitud de A Coruña.

`scripts/build-city-map.py BASE.json DETAIL.json` reconstruye ese archivo a partir de dos exportaciones JSON de Overpass con `out geom`. BASE incluye costa (`natural=coastline`, bbox `43.350,-8.440,43.395,-8.375`), calles `primary|secondary|tertiary|residential|pedestrian|living_street`, parques y playas (bbox `43.355,-8.432,43.392,-8.382`). DETAIL incluye jardines, prados y césped (bbox `43.362,-8.425,43.392,-8.390`) y senderos `footway|cycleway|path` de la zona de la Torre (bbox `43.380,-8.414,43.392,-8.391`). El script une la costa, recorta el terreno y simplifica vértices con una tolerancia de 0,55 unidades del SVG.
