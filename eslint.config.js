import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/', '.lighthouseci/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['public/**/*.js'],
    languageOptions: {
      globals: { document: 'readonly', localStorage: 'readonly' },
    },
  },
  {
    files: ['scripts/**/*.mjs', '*.mjs', '*.js'],
    languageOptions: {
      globals: { process: 'readonly', console: 'readonly', Buffer: 'readonly' },
    },
  },
];
