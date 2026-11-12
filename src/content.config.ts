import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { iconography } from './data/iconography';

const guide = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/guide' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['places', 'neighborhoods', 'routes']),
    category: z.enum(Object.keys(iconography) as (keyof typeof iconography)[]),
    categoryLabel: z.string(),
    image: z.string(),
    alt: z.string(),
    order: z.number().int().positive(),
    homeFilter: z.enum(['sea', 'dining', 'walks', 'history']).optional(),
  }),
});

export const collections = { guide };
