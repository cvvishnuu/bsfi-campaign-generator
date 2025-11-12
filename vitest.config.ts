import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['**/node_modules/**', '**/e2e/**'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        'components/csv-upload.tsx', // Main business logic component
        'stores/**/*.ts',
        'lib/**/*.ts',
      ],
      exclude: [
        'node_modules/',
        '__tests__/',
        'e2e/',
        '**/*.d.ts',
        '**/*.config.ts',
        'app/**/*', // Pages are tested via E2E
        'components/ui/**/*', // UI library components
        'types/**/*',
        'stores/execution-store.ts', // Not used yet
      ],
      thresholds: {
        lines: 85,
        functions: 80,
        branches: 85,
        statements: 85,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
