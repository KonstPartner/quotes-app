import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default [
  {
    files: ['./src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        projectService: false,
      },
      globals: { ...globals.browser, ...globals.es2021, RequestInit: true },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^\\u0000'],
            ['^react$', '^react-dom$', '^@?\\w'],
            [
              '^@app(/.*)?$',
              '^@pages(/.*)?$',
              '^@shadcn(/.*)?$',
              '^@entities(/.*)?$',
              '^@features(/.*)?$',
              '^@constants(/.*)?$',
              '^@utils(/.*)?$',
              '^@hooks(/.*)?$',
            ],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
      ...prettier.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-implicit-globals': 'error',
      'prefer-const': 'warn',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-console': 'warn',
      semi: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },
  {
    files: [
      './src/**/*.test.{ts,tsx}',
      './src/**/__tests__/**/*.{ts,tsx}',
      './src/setupTests.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
