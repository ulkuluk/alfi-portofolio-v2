// Lists every TODO placeholder in the repo (the double-brace TODO marker).
// With --strict, exits 1 when any are found, unless ALLOW_TODO=1 is set.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const skipDirs = new Set(['node_modules', 'dist', '.astro', '.git', '.lighthouseci', '.wrangler']);
// Files that talk about the marker without being content.
const skipFiles = new Set([
  'package-lock.json',
  'devops-portfolio-agent-prompt.md',
  'CONTENT-TODO.md',
  'CONTENT-GUIDE.md',
  'DEPLOY.md',
  'README.md',
  'check-todo.mjs',
]);
const textExt =
  /\.(astro|ts|js|mjs|md|yaml|yml|json|txt|css|svg|toml|html)$|(^|[\\/])(_headers|Dockerfile)$/;
const marker = '{{' + 'TODO';
const strict = process.argv.includes('--strict');

/** @type {Map<string, string[]>} */
const found = new Map();

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!skipDirs.has(entry)) walk(full);
      continue;
    }
    if (skipFiles.has(entry) || !textExt.test(full)) continue;
    const lines = readFileSync(full, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      if (line.includes(marker)) {
        const file = relative(root, full).split(sep).join('/');
        if (!found.has(file)) found.set(file, []);
        found.get(file).push(`${i + 1}: ${line.trim()}`);
      }
    });
  }
}

walk(root);

let total = 0;
for (const [file, hits] of [...found.entries()].sort()) {
  console.log(`\n${file}`);
  for (const hit of hits) console.log(`  ${hit}`);
  total += hits.length;
}
console.log(`\n${total} TODO placeholder(s) in ${found.size} file(s).`);

if (strict && total > 0) {
  if (process.env.ALLOW_TODO === '1') {
    console.log('ALLOW_TODO=1 is set, so this is allowed.');
  } else {
    console.error('Failing: resolve the TODOs above, or set ALLOW_TODO=1 to override.');
    process.exit(1);
  }
}
