export interface SearchPage {
  title: string;
  description?: string;
  href: string;
  group: 'General' | 'Guía' | 'Comida y bebida';
  keywords: string[];
}

export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('es').trim();
}

export function filterPage(value: string, query: string, keywords: string[] = []): number {
  const words = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const text = normalizeSearch([value, ...keywords].join(' '));
  return words.every((word) => text.includes(word)) ? 1 : 0;
}
