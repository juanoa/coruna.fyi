import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guide = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/guide' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    alt: z.string(),
    draft: z.boolean().default(false),
    related: z.array(z.string()).default([]),
    homeFilter: z.enum(['sea', 'dining', 'walks', 'history']).optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { guide, pages };
