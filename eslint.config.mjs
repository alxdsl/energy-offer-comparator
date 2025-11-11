import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      'unicorn/no-array-sort': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // node:fs, node:path
            'external', // react, next, lodash
            'type', // import type { ... }
            'internal', // @/components, ~/utils
            'sibling', // ./component
            'parent', // ../component
            'index', // ./
            'object', // import log = console.log
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [{ pattern: 'react', group: 'external', position: 'before' }], // React always goes first
        },
      ],
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
