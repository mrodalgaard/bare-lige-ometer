import { mergeExpects } from '@playwright/test';
import { toHaveMeterValueExpect } from './toHaveMeterValueExpect';

export { test } from '@playwright/test';

export const expect = mergeExpects(toHaveMeterValueExpect);
