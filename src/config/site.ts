/**
 * Single source of truth for personal data and site-wide switches.
 * Components read from here; no personal copy is hard-coded elsewhere.
 * Every TODO placeholder below is tracked in docs/CONTENT-TODO.md.
 */
export const site = {
  /** Canonical origin, no trailing slash. Also set SITE_URL in CI to match. */
  url: 'https://alfi-portofolio-v2.alfiram-03.workers.dev', // {{TODO: domain}}
  language: 'en',

  name: 'Muhammad Alfi Ramadhan',
  role: 'DevOps / SRE engineer, early in my career',
  /** Used in structured data (JSON-LD). */
  jobTitle: 'Site Reliability Engineer',
  employer: 'Kumparan',
  alumniOf: 'Universitas Pembangunan Nasional Veteran Yogyakarta',
  location: '{{TODO: city}}, Indonesia',
  title: 'DevOps / SRE engineer',
  description:
    'Portfolio of a DevOps / SRE engineer early in their career: case studies on cloud infrastructure, CI/CD, Kubernetes and secret management.',

  hero: {
    headline: 'I like understanding how systems work, and making them quietly reliable.',
    intro:
      'Through site reliability work at Kumparan, a bootcamp and a team project, I’ve worked on cloud infrastructure, CI/CD, Kubernetes and secret management.',
    primaryCta: { label: 'See my projects', href: '#projects' },
    secondaryCta: { label: 'Get in touch', href: '#contact' },
  },

  availability: {
    /** Set to true to show the status line in the hero. */
    show: false,
    text: 'Open to DevOps and SRE roles {{TODO: confirm availability}}',
  },

  about: {
    paragraphs: [
      'I’m a Computer Science graduate from Universitas Pembangunan Nasional Veteran Yogyakarta, now working as a Site Reliability Engineer at Kumparan. I started out as a web developer, building a real-time ticket monitoring app on Node.js, PostgreSQL and Google Cloud. {{TODO: one or two sentences on what made me move toward infrastructure and reliability}}',
      'Since then I’ve worked on the other side of delivery: a DevOps bootcamp, a team project where I built a cloud infrastructure from scratch, and now production systems at Kumparan, where I’ve worked on container image distribution and secret management. I like understanding why a system behaves the way it does, then making it quietly reliable.',
    ],
    howIWork: [
      'When I tested Spegel, I went straight to its raw /metrics endpoint to work out which signals actually say something about cache hits. When Vault’s licence changed, I asked what that meant for us and looked at OpenBao.',
      'SSH access by IP allowlist broke for a team with dynamic IPs, so I moved to Cloudflare Tunnel and Access policies and closed port 22 to the internet. When managed Postgres had no public access in that region, I made the app server the bastion.',
      'Over the last year or so I’ve worked with Tencent Cloud, Kubernetes, GitLab CI and containerd, and deployed a Next.js frontend and a .NET backend. I’ve moved between a bootcamp, a team project and a job.',
      'Every case study on this site ends with what I’d do next, and the learning journey says plainly what is still in progress.',
    ],
  },

  contact: {
    /** One warm sentence about the conversations I'm open to. */
    blurb:
      'I’m glad to talk about DevOps and SRE work, about anything on this site, or just about how systems behave. A short note is plenty.',
    email: 'alfiram.03@gmail.com',
    linkedin: 'https://www.linkedin.com/in/muhammad-alfi-ramadhan-666677268/',
    github: 'https://github.com/ulkuluk',
    /** Path under /public. The button is hidden when the file does not exist. */
    resume: '/resume.pdf',
    /** Optional short "Now" note. Leave empty to hide it. */
    now: '',
  },

  /** Public source repository, shown in the footer. */
  repo: 'https://github.com/ulkuluk/alfi-portofolio-v2',

  /** Optional portrait under /public (e.g. '/portrait.jpg'). Leave empty to hide the slot. */
  portrait: '',

  /** Social preview image under /public, 1200x630. Regenerate with `npm run og`. */
  ogImage: '/og.png',

  /** Home page sections in page order. `heading` is the visible section title. */
  nav: [
    { label: 'Projects', href: '/#projects', heading: 'Selected projects' },
    { label: 'About', href: '/#about', heading: 'About' },
    { label: 'Experience', href: '/#experience', heading: 'Experience' },
    { label: 'Skills', href: '/#skills', heading: 'Skills' },
    { label: 'Learning', href: '/#learning', heading: 'Learning journey' },
    { label: 'Contact', href: '/#contact', heading: 'Get in touch' },
  ],

  analytics: {
    /** Cloudflare Web Analytics. Off by default; also loosen the CSP in public/_headers if enabled. */
    enabled: false,
    cloudflareToken: '',
  },
} as const;

export type Site = typeof site;
