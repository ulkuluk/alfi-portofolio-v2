// Renders public/og.png (1200x630) from the name and role in src/config/site.ts.
// Run with `npm run og` after changing either, then commit the PNG.
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const config = readFileSync('src/config/site.ts', 'utf8');
const pick = (key) => {
  const match = config.match(new RegExp(`^\\s{2}${key}: '([^']+)'`, 'm'));
  if (!match) throw new Error(`Could not find "${key}" in src/config/site.ts`);
  return match[1];
};

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
  <rect x="80" y="96" width="72" height="6" rx="3" fill="#0F766E"/>
${nameLines
  .map(
    (line, i) =>
      `<text x="80" y="${220 + i * 100}" font-family="Georgia, 'DejaVu Serif', serif" font-size="92" font-weight="700" fill="#1A1A18">${esc(line)}</text>`,
  )
  .join('\n')}
  <text x="80" y="${220 + nameLines.length * 100 + 10}" font-family="'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="40" fill="#0F766E">${esc(role)}</text>
  <text x="80" y="520" font-family="'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="30" fill="#6B6B66">Case studies on cloud infrastructure,</text>
  <text x="80" y="564" font-family="'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="30" fill="#6B6B66">CI/CD, Kubernetes and secret management.</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
console.log(`Wrote public/og.png for "${name}".`);
