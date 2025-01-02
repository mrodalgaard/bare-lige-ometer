import { expect as baseExpect } from '@playwright/experimental-ct-react';
import { mergeExpects, mergeTests } from '@playwright/test';
import { testCoverage } from './testCoverage';

export const test = mergeTests(testCoverage);
export const expect = mergeExpects(baseExpect);
