import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'  // Импортируем плагин для работы с импортами

export default [
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect', // автоматическое определение версии
      },
      'import/resolver': {
        node: {
          paths: ['src'],  // Путь к исходным файлам, если ты используешь алиасы
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,  // Добавляем плагин import
    },
    rules: {
      // Базовые рекомендации
      ...js.configs.recommended.rules,

      // React
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // Дополнительно
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Удобные автофиксы
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'react/prop-types': 'off',

      // Правила для работы с импортами
      'import/no-unresolved': 'error', // Ошибка, если модуль не найден
      'import/named': 'error',         // Ошибка, если нет именованных экспортов
      'import/default': 'error',       // Ошибка, если не найден default экспорт
      'import/namespace': 'error',     // Ошибка, если неправильно используются экспорты пространства имен
      'import/no-unused-modules': ['warn', { unusedExports: true }], // Предупреждение для неиспользуемых модулей
    },
  },
]
