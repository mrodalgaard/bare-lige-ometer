import { defineConfig, devices } from '@playwright/experimental-ct-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src',
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './__snapshots__',
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'output/merged/component' }],
    ['list'],
    [
      'monocart-reporter',
      {
        name: 'Component Test Report',
        outputFile: 'output/component/index.html',
        coverage: {
          entryFilter: {
            '**/node_modules/**': false,
            '**/**': true,
          },
          sourceFilter: {
            '**/node_modules/**': false,
            '**/**': true,
          },
          reports: ['raw', 'v8'],
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    ctPort: 3000,
    ctTemplateDir: './tests/component/template',
    ctViteConfig: {
      resolve: {
        alias: {
          components: resolve(__dirname, './src/components'),
          contexts: resolve(__dirname, './src/contexts'),
          hooks: resolve(__dirname, './src/hooks'),
          models: resolve(__dirname, './src/models'),
          util: resolve(__dirname, './src/util'),
        },
      },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
