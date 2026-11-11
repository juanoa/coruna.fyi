import { guideEntries } from './home';

export interface SearchPage {
  title: string;
  href: string;
  group: 'General' | 'Lugares' | 'Barrios' | 'Rutas';
  keywords: string[];
}

const groups = { lugares: 'Lugares', barrios: 'Barrios', rutas: 'Rutas' } as const;

// Las fichas comparten su fuente de datos con las rutas estáticas de Astro.
export const searchPages: SearchPage[] = [
  { title: 'Inicio', href: '/', group: 'General', keywords: ['home', 'guía', 'A Coruña', 'coruña.fyi'] },
  ...guideEntries.map((entry) => ({
    title: entry.title,
    href: entry.href,
    group: groups[entry.section],
    keywords: [entry.title, entry.categoryLabel, entry.location, entry.description],
  })),
  { title: 'Sistema de diseño', href: '/ds/', group: 'General', keywords: ['ds', 'design system', 'componentes', 'tipografía', 'colores'] },
];

export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('es').trim();
}

export function filterPage(value: string, query: string, keywords: string[] = []): number {
  const words = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const text = normalizeSearch([value, ...keywords].join(' '));
  return words.every((word) => text.includes(word)) ? 1 : 0;
}
