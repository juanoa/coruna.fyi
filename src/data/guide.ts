import { getCollection, getEntry } from 'astro:content';
import type { SearchPage } from './search';

export async function getGuideEntries() {
  return (await getCollection('guide')).sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

export async function getGuideEntry(id: string) {
  const entry = await getEntry('guide', id);
  if (!entry) throw new Error(`Guide entry not found: ${id}`);
  return entry;
}

export function getGuideHref(id: string) {
  return `/${id}/`;
}

const groups = { places: 'Lugares', neighborhoods: 'Barrios', routes: 'Rutas' } as const;

export async function getSearchPages(): Promise<SearchPage[]> {
  const entries = await getGuideEntries();
  return [
    { title: 'Inicio', href: '/', group: 'General', keywords: ['home', 'guía', 'A Coruña', 'coruña.fyi'] },
    ...entries.map(({ id, data }) => ({
      title: data.title,
      href: getGuideHref(id),
      group: groups[data.section],
      keywords: [data.title, data.categoryLabel, data.location, data.description],
    })),
    { title: 'Sistema de diseño', href: '/ds/', group: 'General', keywords: ['ds', 'design system', 'componentes', 'tipografía', 'colores'] },
  ];
}
