import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.{test,spec}.ts', 'src/**/*.{test,spec}.ts'],
    exclude: ['node_modules', 'dist', '.next', 'Docs'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/core': path.resolve(__dirname, './src/core'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/db': path.resolve(__dirname, './src/infrastructure/database'),
      '@/infrastructure': path.resolve(__dirname, './src/infrastructure'),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/core': path.resolve(__dirname, './src/core'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/db': path.resolve(__dirname, './src/infrastructure/database'),
      '@/infrastructure': path.resolve(__dirname, './src/infrastructure'),
    },
  },
});
