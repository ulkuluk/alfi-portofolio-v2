import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const nonEmpty = z.string().trim().min(1, 'must not be empty');

/**
 * One Markdown file per case study in src/content/projects/.
 * A missing or invalid field fails the build with the file name and field.
 * Body structure (headings, "How it went" length) is checked in src/lib/projects.ts.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z
    .object({
      title: nonEmpty,
      /** One sentence: the problem, not the tech. */
      summary: nonEmpty,
      type: z.enum(['internship', 'team', 'bootcamp', 'homelab']),
      org: nonEmpty,
      role: nonEmpty,
      period: nonEmpty,
      /** Be precise, e.g. "PoC validated" or "Deployed to UAT". */
      status: nonEmpty,
      /** Lower numbers come first on the home page and in prev/next links. */
      order: z.number().int().positive(),
      featured: z.boolean().default(false),
      /** Plain text tags. */
      stack: z.array(nonEmpty).min(1, 'add at least one tag'),
      /** Optional SVG, e.g. src/assets/diagrams/my-project.svg */
      diagram: z
        .string()
        .regex(
          /^src\/assets\/diagrams\/[\w-]+\.svg$/,
          'must look like src/assets/diagrams/name.svg',
        )
        .optional(),
      /** Optional public URL. */
      repo: z.url().optional(),
      /** Drafts are visible in `npm run dev` and left out of production builds. */
      draft: z.boolean().default(false),
    })
    .strict(),
});

export const collections = { projects };
