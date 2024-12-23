import { test } from '@playwright/test';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

interface CustomWindow extends Window {
  collectIstanbulCoverage?: (coverageJSON: string) => void;
}

const istanbulTempDir = path.join(process.cwd(), 'coverage/.nyc_output');

function generateUUID() {
  return crypto.randomBytes(16).toString('hex');
}

export const coverageTest = test.extend({
  context: async ({ context }, use) => {
    await context.addInitScript(() =>
      window.addEventListener('beforeunload', () =>
        (window as CustomWindow).collectIstanbulCoverage?.(JSON.stringify(window.__coverage__))
      )
    );
    await fs.promises.mkdir(istanbulTempDir, { recursive: true });
    await context.exposeFunction('collectIstanbulCoverage', (coverageJSON: string) => {
      if (coverageJSON) fs.writeFileSync(path.join(istanbulTempDir, `coverage_${generateUUID()}.json`), coverageJSON);
    });

    for (const page of context.pages()) {
      await page.evaluate(() => {
        (window as CustomWindow).collectIstanbulCoverage?.(JSON.stringify(window.__coverage__));
      });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(context);
  },
});
