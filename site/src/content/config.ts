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

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    clientUrl: z.string().url().optional(),
    industry: z.string(),
    pubDate: z.coerce.date(),
    role: z.string().default('Build partner'),
    variant: z.enum(['A', 'B', 'C']).default('B'),
    color: z.enum(['blue', 'red', 'yellow']).default('blue'),
    duration: z.string().optional(),
    tags: z.array(z.string()).default([]),
    heroQuote: z.string().optional(),
    heroQuoteAttribution: z.string().optional(),
    metrics: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })).default([]),
    stack: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, 'case-studies': caseStudies };
