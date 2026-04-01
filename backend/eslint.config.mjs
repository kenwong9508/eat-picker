import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      'dist/**',
      'src/swagger/**',
      'src/tests/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // 通用設定：Node + ES2021 環境
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // 你之前用過嘅 logger，容許 console
      'no-console': 'off',

      // Express handler 常用 req/res/req.body
      '@typescript-eslint/no-explicit-any': 'warn',

      // TypeScript 嚴格模式（你鍾意）
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    // 只對 src 入面嘅 TS 檔案啟用 type-aware 規則
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // 呢條規則需要 type information，只喺 TS 檔度開
      '@typescript-eslint/no-floating-promises': 'error',
    },
  }
);
