import { test } from '@playwright/test';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

interface CustomWindow extends Window {
  collectIstanbulCoverage?: (coverageJSON: string) => void;
}

const dir = path.join(process.cwd(), 'coverage/.nyc_output');

export const coverageTest = test.extend({
  context: async ({ context }, use) => {
    await context.addInitScript(() =>
      window.addEventListener('beforeunload', () =>
        (window as CustomWindow).collectIstanbulCoverage?.(JSON.stringify(window.__coverage__))
      )
    );

    await fs.promises.mkdir(dir, { recursive: true });
    await context.exposeFunction('collectIstanbulCoverage', (coverageJSON: string) => {
      const fileName = `coverage_${crypto.randomBytes(16).toString('hex')}.json`;
      if (coverageJSON) {
        fs.writeFileSync(path.join(dir, fileName), coverageJSON);
      }
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
