/**
 * Single source of truth for personal data and site-wide switches.
 * Components read from here; no personal copy is hard-coded elsewhere.
 * Every TODO placeholder below is tracked in docs/CONTENT-TODO.md.
 */
export const site = {
  /** Canonical origin, no trailing slash. Also set SITE_URL in CI to match. */
  url: 'https://example.com', // {{TODO: domain}}
  language: 'en',

  name: '{{TODO: full name}}',
  role: 'Aspiring DevOps Engineer / DevOps Intern',
  location: '{{TODO: city}}, Indonesia',
  title: 'Aspiring DevOps engineer',
  description:
    'Portfolio of an aspiring DevOps engineer: cloud infrastructure, CI/CD, Kubernetes and secret management case studies.',

  /** Hero copy lives here so it can be edited without touching components. */
  hero: {
    headline: 'I like understanding how systems work, and making them quietly reliable.',
    primaryCta: { label: 'See my projects', href: '#projects' },
    secondaryCta: { label: 'Get in touch', href: '#contact' },
  },

  availability: 'Open to DevOps internship and junior roles {{TODO: confirm availability}}',

  contact: {
    email: '{{TODO: email}}',
    linkedin: '{{TODO: LinkedIn URL}}',
    github: '{{TODO: GitHub profile URL}}',
    /** Path under /public. The button is hidden when the file does not exist. */
    resume: '/resume.pdf',
  },

  /** Public source repository, shown in the footer. */
  repo: '{{TODO: source repo URL}}',

  /** Optional portrait under /public. Leave empty to hide the slot. */
  portrait: '',

  /** Anchor navigation, in page order. */
  nav: [
    { label: 'Projects', href: '/#projects' },
    { label: 'About', href: '/#about' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Learning', href: '/#learning' },
    { label: 'Contact', href: '/#contact' },
  ],

  analytics: {
    /** Cloudflare Web Analytics. Off by default; also loosen the CSP in public/_headers if enabled. */
    enabled: false,
    cloudflareToken: '',
  },
} as const;

export type Site = typeof site;
