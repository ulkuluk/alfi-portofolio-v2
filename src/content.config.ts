import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const nonEmpty = z.string().trim().min(1, 'must not be empty');
const order = z.number().int().positive();

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
      /** Short name for small links, e.g. in the skills list. Defaults to the title. */
      short: nonEmpty.optional(),
      /** One sentence: the problem, not the tech. */
      summary: nonEmpty,
      type: z.enum(['work', 'internship', 'team', 'bootcamp', 'homelab']),
      org: nonEmpty,
      role: nonEmpty,
      period: nonEmpty,
      /** Be precise, e.g. "PoC validated" or "Deployed to UAT". */
      status: nonEmpty,
      /** Lower numbers come first on the home page and in prev/next links. */
      order,
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

/**
 * One Markdown file per job, project role or course in src/content/experience/.
 * Only front matter is used. Lower `order` comes first (newest first).
 */
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z
    .object({
      role: nonEmpty,
      org: nonEmpty,
      period: nonEmpty,
      order,
      /** Optional short label, e.g. to say an entry is web development, not DevOps. */
      note: nonEmpty.optional(),
      bullets: z
        .array(
          z
            .object({
              text: nonEmpty,
              /** Slug of a case study in src/content/projects/; the build fails if it is wrong. */
              project: reference('projects').optional(),
            })
            .strict(),
        )
        .min(1, 'add at least one bullet'),
    })
    .strict(),
});

/**
 * src/content/skills.yaml: one entry per skill, keyed by a unique id.
 * Group by honesty, not percentage: hands-on, familiar, exploring.
 */
const skills = defineCollection({
  loader: file('src/content/skills.yaml'),
  schema: z
    .object({
      name: nonEmpty,
      level: z.enum(['hands-on', 'familiar', 'exploring']),
      category: z.enum([
        'cloud',
        'containers',
        'cicd',
        'security',
        'observability',
        'networking',
        'linux',
        'web',
      ]),
      /** Case study slugs where I used it; shown as small links. */
      projects: z.array(reference('projects')).default([]),
    })
    .strict(),
});

/**
 * src/content/learning.yaml: one entry per item, keyed by a unique id.
 * kind: timeline (past to present), current (learning now) or next (up next).
 */
const learning = defineCollection({
  loader: file('src/content/learning.yaml'),
  schema: z
    .object({
      kind: z.enum(['timeline', 'current', 'next']),
      order,
      title: nonEmpty,
      period: nonEmpty.optional(),
      text: nonEmpty.optional(),
    })
    .strict(),
});

export const collections = { projects, experience, skills, learning };
