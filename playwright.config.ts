import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';
import { CoverageReport } from 'monocart-coverage-reports';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
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
  reporter: [['list'], ['html', { outputFolder: 'output/merged/e2e' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASEURL ?? 'http://localhost:3000',

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
};

// Add monocart reporter for coverage
if (process.env.COVERAGE && Array.isArray(config.reporter)) {
  // Fix source path for e2e test coverage
  const sourcePath = (filePath: string, info: { distFile?: string }) =>
    !filePath.includes('/') && info.distFile ? info.distFile.replace('localhost-3000/', '') : filePath;

  config.reporter = [
    ...config.reporter,
    [
      'monocart-reporter',
      {
        name: 'E2E Test Report',
        outputFile: 'output/e2e/index.html',
        coverage: {
          all: {
            dir: ['./src'],
            filter: {
              '**/reset.css': false,
              '**/*.d.ts': false,
              '**/*.spec.tsx': false,
              '**/*.story.tsx': false,
              '**/*': true,
            },
          },
          entryFilter: {
            'reset.css': false,
            '**/src/**': true,
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
  ];
}

// Run your local dev server before starting the test
if (process.env.SERVE) {
  config.webServer = {
    command: `yarn ${process.env.SERVE}`,
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  };
}

export default defineConfig(config);
