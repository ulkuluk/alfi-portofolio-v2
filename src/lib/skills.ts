import { getCollection } from 'astro:content';
import { getProjects } from './projects';

export const levels = [
  { id: 'hands-on', label: 'Hands-on', blurb: 'Used in a real project.' },
  {
    id: 'familiar',
    label: 'Familiar',
    blurb: 'I know it and have worked with it, but it was not central.',
  },
  { id: 'exploring', label: 'Exploring', blurb: 'Learning it now or next.' },
] as const;

export const categoryLabels = {
  cloud: 'Cloud',
  containers: 'Containers & Kubernetes',
  cicd: 'CI/CD & GitOps',
  security: 'Security & Secrets',
  observability: 'Observability',
  networking: 'Networking',
  linux: 'Linux & Scripting',
  web: 'Web & Data',
} as const;

export interface SkillGroup {
  id: string;
  label: string;
  blurb: string;
  categories: {
    id: string;
    label: string;
    skills: { name: string; projects: { id: string; label: string }[] }[];
  }[];
}

/** Skills grouped by level, then category. Empty groups and categories are left out. */
export async function getSkillGroups(): Promise<SkillGroup[]> {
  const [skills, projects] = await Promise.all([getCollection('skills'), getProjects()]);
  const shortNames = new Map(projects.map((p) => [p.id, p.data.short ?? p.data.title]));

  return levels
    .map((level) => ({
      id: level.id,
      label: level.label,
      blurb: level.blurb,
      categories: Object.entries(categoryLabels)
        .map(([id, label]) => ({
          id,
          label,
          skills: skills
            .filter((s) => s.data.level === level.id && s.data.category === id)
            .map((s) => ({
              name: s.data.name,
              projects: s.data.projects
                .filter((ref) => shortNames.has(ref.id))
                .map((ref) => ({ id: ref.id, label: shortNames.get(ref.id) as string })),
            })),
        }))
        .filter((category) => category.skills.length > 0),
    }))
    .filter((group) => group.categories.length > 0);
}
