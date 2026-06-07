import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Jay Smith'),
    tags: z.array(z.string()).default([]),
    kind: z.enum(['essay', 'case-study', 'note']).default('essay'),
    heroSet: z.enum(['web', 'ecom', 'ops', 'ai', 'auto']).default('web'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
