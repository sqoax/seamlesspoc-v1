import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Verification gate shared by all attributable content. Templates must
// filter on `verified === true` — and additionally `permission === true`
// for anything carrying a customer name, logo, or quote. Absence of
// permission means no permission. Never bypass the filter "temporarily."
const verification = {
  verified: z.boolean().default(false),
  verified_by: z.string().optional(),
  verified_date: z.coerce.date().optional(),
  permission: z.boolean().optional(),
};

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      system: z.string(),
      states: z.array(z.string()),
      scope_number: z.string(), // e.g. "412 mounts"
      scope: z.string(),
      constraints: z.string(),
      timeline: z.string(),
      quote: z.string().optional(),
      quote_attribution: z.string().optional(),
      images: z
        .array(z.object({ src: image(), alt: z.string() }))
        .default([]),
      ...verification,
    }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    title: z.string(),
    org: z.string(),
    date: z.coerce.date(),
    page_targets: z.array(z.string()).default([]),
    ...verification,
  }),
});

const customers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/customers' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      state: z.string(),
      logo: image().optional(),
      tenure_since: z.number().optional(),
      ...verification,
    }),
});

const installs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/installs' }),
  schema: z.object({
    title: z.string(),
    outcome_line: z.string(),
    settings: z.array(z.string()).default([]),
    brands: z.array(z.string()).optional(),
    faqs: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
    order: z.number(),
  }),
});

export const collections = { projects, testimonials, customers, installs };
