// Regenerates the static brand assets from src/config/site.ts and src/styles/global.css:
//   public/og.png      (1200x630 social preview)
//   public/favicon.svg
// Run with `npm run og` after changing the name, role or accent, then commit both files.
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const config = readFileSync('src/config/site.ts', 'utf8');
const pick = (key) => {
  const match = config.match(new RegExp(`^\\s{2}${key}: '([^']+)'`, 'm'));
  if (!match) throw new Error(`Could not find "${key}" in src/config/site.ts`);
  return match[1];
};

const css = readFileSync('src/styles/global.css', 'utf8');
const accent = css.match(/--accent-base:\s*(#[0-9a-fA-F]{6})/)?.[1];
if (!accent) throw new Error('Could not find --accent-base in src/styles/global.css');

const name = pick('name');
const role = pick('role');
const esc = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Split the name over two lines so long names never run off the image.
const words = name.split(' ');
const middle = Math.ceil(words.length / 2);
const nameLines = [words.slice(0, middle).join(' '), words.slice(middle).join(' ')].filter(Boolean);

// Light-theme tokens from src/styles/global.css.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FAFAF8"/>
  <rect x="80" y="96" width="72" height="6" rx="3" fill="${accent}"/>
${nameLines
  .map(
    (line, i) =>
      `<text x="80" y="${220 + i * 100}" font-family="Georgia, 'DejaVu Serif', serif" font-size="92" font-weight="700" fill="#1A1A18">${esc(line)}</text>`,
  )
  .join('\n')}
  <text x="80" y="${220 + nameLines.length * 100 + 10}" font-family="'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="40" fill="${accent}">${esc(role)}</text>
  <text x="80" y="520" font-family="'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="30" fill="#6B6B66">Case studies on cloud infrastructure,</text>
  <text x="80" y="564" font-family="'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="30" fill="#6B6B66">CI/CD, Kubernetes and secret management.</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');

writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Site icon">
  <rect width="32" height="32" rx="7" fill="${accent}"/>
  <path d="M9 22V10l7 8 7-8v12" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
);

console.log(`Wrote public/og.png and public/favicon.svg (accent ${accent}) for "${name}".`);
