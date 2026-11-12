import { getCollection, getEntry } from 'astro:content';
import type { SearchPage } from './search';

export async function getGuideEntries() {
  return (await getCollection('guide')).filter(({ data }) => !data.draft).sort((a, b) => a.id.localeCompare(b.id));
}

export async function getGuideEntry(id: string) {
  const entry = await getEntry('guide', id);
  if (!entry) throw new Error(`Guide entry not found: ${id}`);
  return entry;
}

export function getGuideHref(id: string) {
  return `/${id}/`;
}

export async function getSearchPages(): Promise<SearchPage[]> {
  const entries = await getGuideEntries();
  return [
    { title: 'Inicio', href: '/', group: 'General', keywords: ['home', 'notas', 'A Coruña', 'coruña.fyi'] },
    ...entries.map(({ id, data }) => ({
      title: data.title,
      href: getGuideHref(id),
      group: 'Apuntes' as const,
      keywords: [data.title, data.description],
    })),
  ];
}
