import { expect, type MatcherReturnType, type Page } from '@playwright/test';

interface MatcherError extends Error {
  matcherResult: { actual: string };
}

export const toHaveMeterValueExpect = expect.extend({
  async toHaveMeterValue(page: Page, expected: number): Promise<MatcherReturnType> {
    const name = 'toHaveMeterValue';

    try {
      await expect(page.locator('[aria-label="Percentage meter"]')).toHaveAttribute('aria-valuenow', String(expected));
      return { pass: true, message: () => 'Pass' };
    } catch (error) {
      const matcherResult = (error as MatcherError).matcherResult;
      return {
        message: () =>
          this.utils.matcherHint(name, undefined, undefined, { isNot: this.isNot }) +
          '\n\n' +
          `Expected: ${this.utils.printExpected(String(expected))}\n` +
          (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : ''),
        pass: false,
        name,
        expected,
        actual: matcherResult?.actual,
      };
    }
  },
});
