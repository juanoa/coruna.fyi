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

export async function getPublishedEntries() {
  const entries = [...await getGuideEntries(), ...(await getCollection('pages')).filter(({ data }) => !data.draft), ...(await getCollection('foodAndDrink')).filter(({ data }) => !data.draft)];
  const ids = new Set<string>();
  for (const entry of entries) {
    if (ids.has(entry.id)) throw new Error(`Duplicate page slug: ${entry.id}`);
    ids.add(entry.id);
  }
  return entries.sort((a, b) => a.id.localeCompare(b.id));
}

export async function getSearchPages(): Promise<SearchPage[]> {
  const entries = await getPublishedEntries();
  return [
    { title: 'Inicio', href: '/', group: 'General', keywords: ['home', 'notas', 'A Coruña', 'coruña.fyi'] },
    ...entries.map(({ id, data, collection }) => ({
      title: data.title,
      description: data.description,
      href: getGuideHref(id),
      group: collection === 'guide' ? 'Guía' as const : collection === 'foodAndDrink' ? 'Comida y bebida' as const : 'General' as const,
      keywords: [data.title, ...(data.description ? [data.description] : [])],
    })),
  ];
}
