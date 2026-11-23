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

// Evergreen pillar guides (AEO cornerstone content). Q&A-structured: the template
// renders the answer block + each FAQ as a standalone H2 section, and emits
// Article + FAQPage + BreadcrumbList schema from this same frontmatter (single
// source of truth, so visible content and structured data never drift).
const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Jay Smith'),
    tags: z.array(z.string()).default([]),
    heroSet: z.enum(['web', 'ecom', 'ops', 'ai', 'auto']).default('ops'),
    /** The 100–150 word direct-answer block that opens the page (AEO answer block). */
    answer: z.string(),
    /** Each becomes a standalone H2 section AND a FAQPage entry. H2s should map to real PAA questions. */
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, 'case-studies': caseStudies, guides };
