/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Environment
    environment: 'jsdom',

    // Setup files
    setupFiles: ['./test/setup.js'],

    // Globals (describe, it, expect without imports)
    globals: true,

    // Include patterns
    include: ['src/**/*.{test,spec}.{js,jsx}'],

    // Coverage configuration
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        'src/hooks/**/*.js',
        'src/components/**/*.jsx',
        'src/context/**/*.jsx',
        'src/flows/**/*.js',
        'src/pages/**/*.jsx',
        'src/data/**/*.js',
      ],
      exclude: [
        'src/**/__tests__/**',
        'src/**/index.js',
        'src/main.jsx',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
        statements: 70,
      },
    },

    // Mock configuration
    mockReset: true,
    restoreMocks: true,

    // Reporters
    reporters: ['verbose'],

    // CSS handling
    css: {
      include: [/.+/],
    },

    // Timeout for async tests (important for timer tests)
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
