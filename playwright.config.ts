import { defineConfig, devices } from '@playwright/test';
import { CoverageReport } from 'monocart-coverage-reports';

// Fix source path for e2e test coverage
const sourcePath = (filePath: string, info: { distFile?: string }) =>
  !filePath.includes('/') && info.distFile ? info.distFile.replace('localhost-3000/', '') : filePath;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
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
    ['html'],
    [
      'monocart-reporter',
      {
        name: 'Playwright E2E Report',
        outputFile: 'output/e2e/index.html',
        coverage: {
          entryFilter: {
            '**/node_modules/**': false,
            'reset.css': false,
            '**/src/**': true,
          },
          sourceFilter: {
            '**/node_modules/**': false,
            '**/**': true,
          },
          sourcePath,
          reports: ['raw', 'v8'],

          // Merge coverage reports for e2e and component when finished
          onEnd: () =>
            new CoverageReport({
              name: 'Coverage Report',
              inputDir: ['./output/component/coverage/raw', './output/e2e/coverage/raw'],
              outputDir: './output/merged/coverage',
              sourceFilter: {
                'src/**': true,
              },
              sourcePath,
              reports: [['console-details'], ['v8']],
            }).generate(),
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.CUSTOM_BASE_URL ?? 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        contextOptions: {
          permissions: ['clipboard-read', 'clipboard-write'],
        },
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
