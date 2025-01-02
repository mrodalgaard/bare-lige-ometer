import { Page, test } from '@playwright/test';
import { addCoverageReport } from 'monocart-reporter';

export const testCoverage = test.extend<{
  autoTestFixture: string;
}>({
  // Test fixture which is automatically applied to all E2E tests
  autoTestFixture: [
    async ({ page }: { page: Page }, use) => {
      // Setup coverage collection (chromium only)
      if (test.info().project.name === 'chromium') {
        await page.coverage.startJSCoverage({
          resetOnNavigation: false,
        });
      }

      await use('autoTestFixture');

      // Teardown coverage collection (chromium only)
      if (test.info().project.name === 'chromium') {
        const jsCoverage = await page.coverage.stopJSCoverage();
        await addCoverageReport(jsCoverage, test.info());
      }
    },
    {
      scope: 'test',
      auto: true,
    },
  ],
});
