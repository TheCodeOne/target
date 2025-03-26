const nx = require('@nx/eslint-plugin');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const html = require('eslint-plugin-html');
const jestFormatting = require('eslint-plugin-jest-formatting');
const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    ignores: ['**/dist', '**/node_modules', '**.angular'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig*.json', './frontend/apps/*/tsconfig*.json', './frontend/libs/*/tsconfig*.json', './shared/*/tsconfig*.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'simple-import-sort': simpleImportSort,
      html: html,
      '@nx': nx,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'const', next: '*' },
        { blankLine: 'never', prev: 'const', next: 'const' },
        { blankLine: 'always', prev: 'let', next: '*' },
        { blankLine: 'never', prev: 'let', next: 'let' },
      ],
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/ban-types': 0,
      '@typescript-eslint/default-param-last': 0,
      '@typescript-eslint/dot-notation': 0,
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowTypedFunctionExpressions: true, allowExpressions: true },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'no-public' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/indent': 0,
      '@typescript-eslint/keyword-spacing': 0,
      '@typescript-eslint/lines-between-class-members': 0,
      '@typescript-eslint/no-duplicate-enum-values': 0,
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-implied-eval': 0,
      '@typescript-eslint/no-inferrable-types': 0,
      '@typescript-eslint/no-loop-func': 0,
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-shadow': 0,
      '@typescript-eslint/no-throw-literal': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-use-before-define': 0,
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/return-await': 0,
      'import/no-useless-path-segments': 0,
      'import/prefer-default-export': 0,
      'arrow-body-style': 0,
      'class-methods-use-this': 0,
      'consistent-return': 0,
      'default-case': 0,
      'function-call-argument-newline': 0,
      'function-paren-newline': 0,
      'global-require': 0,
      'guard-for-in': 0,
      'implicit-arrow-linebreak': 0,
      'key-spacing': 0,
      'max-classes-per-file': 0,
      'new-cap': 0,
      'newline-per-chained-call': 0,
      'no-await-in-loop': 0,
      'no-case-declarations': 0,
      'no-cond-assign': 0,
      'no-confusing-arrow': 0,
      'no-console': 0,
      'no-continue': 0,
      'no-extra-boolean-cast': 0,
      'no-mixed-operators': 0,
      'no-multi-assign': 0,
      'no-multi-spaces': 0,
      'no-nested-ternary': 0,
      'no-new': 0,
      'no-param-reassign': 0,
      'no-path-concat': 0,
      'no-plusplus': 0,
      'no-promise-executor-return': 0,
      'no-proto': 0,
      'no-return-assign': 0,
      'no-spaced-func': 0,
      'no-sparse-arrays': 0,
      'no-underscore-dangle': 0,
      'no-unused-vars': 0,
      'no-duplicate-imports': ['error', { includeExports: true }],
      'object-property-newline': 0,
      'operator-linebreak': 0,
      'prefer-const': 0,
      'prefer-destructuring': 0,
      'prefer-object-spread': 0,
      'prefer-promise-reject-errors': 0,
      'prefer-spread': 0,
      'prefer-template': 0,
      'require-await': 'off',
      '@typescript-eslint/require-await': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['*.js', '*.jsx'],
    plugins: {
      '@nx': nx,
    },
    rules: {},
  },
  {
    files: ['*.html'],
    plugins: {
      html: html,
    },
    rules: {},
  },
  {
    files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
    plugins: {
      'jest-formatting': jestFormatting,
    },
    languageOptions: {
      globals: {
        jest: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['off'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
      'jest-formatting/padding-around-all': 'error',
    },
  },
];
