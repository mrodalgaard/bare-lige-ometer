import { mergeExpects } from '@playwright/test';
import { toHaveMeterValueExpect } from './toHaveMeterValueExpect';

export { coverageTest as test } from './coverageTest';

// export const test = mergeTests(coverageTest);
export const expect = mergeExpects(toHaveMeterValueExpect);
