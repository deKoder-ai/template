import globals, { browser } from 'globals';
import pluginJs from '@eslint/js';
import html from '@html-eslint/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
    ...html.configs['flat/recommended'],
    files: ['**/*.html'],
    rules: {
      ...html.configs['flat/recommended'].rules, // Must be defined. If not, all recommended rules will be lost
      '@html-eslint/indent': 'error',
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      env: {
        browser: true,
        node: true,
      },
    },
  },
];
