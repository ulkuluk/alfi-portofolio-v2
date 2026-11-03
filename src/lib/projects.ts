import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export const typeLabels = {
  work: 'Work',
  internship: 'Internship',
  team: 'Team project',
  bootcamp: 'Bootcamp',
  homelab: 'Homelab',
} as const;

/** Headings every case study must contain, in this order. */
const REQUIRED_HEADINGS = [
  '## Background',
  '## Challenge',
  '## Approach',
  '### How it went',
  '### Key decisions',
  '## Outcome',
  '### What I learned',
  "### What I'd do next",
];

const MIN_STEPS = 5;
const MAX_STEPS = 8;
const MIN_WORDS = 250;
const MAX_WORDS = 450;

const warned = new Set<string>();

function validateStructure(entry: Project) {
  const file = `src/content/projects/${entry.id}.md`;
  const lines = (entry.body ?? '').split(/\r?\n/).map((line) => line.trim());

  let cursor = -1;
  for (const heading of REQUIRED_HEADINGS) {
    const index = lines.findIndex((line, i) => i > cursor && line === heading);
    if (index === -1) {
      throw new Error(
        `${file}: missing the heading "${heading}", or it is out of order.\n` +
          `Expected headings, in order:\n  ${REQUIRED_HEADINGS.join('\n  ')}`,
      );
    }
    cursor = index;
  }

  const start = lines.indexOf('### How it went');
  const end = lines.indexOf('### Key decisions');
  const steps = lines.slice(start + 1, end).filter((line) => /^\d+\.\s/.test(line)).length;
  if (steps < MIN_STEPS || steps > MAX_STEPS) {
    throw new Error(
      `${file}: "How it went" has ${steps} numbered steps; it needs ${MIN_STEPS} to ${MAX_STEPS}, one sentence each.`,
    );
  }

  const words = (entry.body ?? '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
  if ((words < MIN_WORDS || words > MAX_WORDS) && !warned.has(entry.id)) {
    warned.add(entry.id);
    console.warn(`[projects] ${file} has ${words} words; the target is ${MIN_WORDS}-${MAX_WORDS}.`);
  }
}

/** All case studies in display order. Drafts are dropped from production builds. */
export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection(
    'projects',
    ({ data }) => !(import.meta.env.PROD && data.draft),
  );

  const seen = new Map<number, string>();
  for (const entry of entries) {
    validateStructure(entry);
    const clash = seen.get(entry.data.order);
    if (clash) {
      throw new Error(
        `Projects "${clash}" and "${entry.id}" both use order: ${entry.data.order}. Give each project its own number.`,
      );
    }
    seen.set(entry.data.order, entry.id);
  }

  return entries.sort((a, b) => a.data.order - b.data.order);
}
