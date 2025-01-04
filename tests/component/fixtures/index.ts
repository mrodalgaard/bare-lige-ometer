import { expect as baseExpect } from '@playwright/experimental-ct-react';
import { mergeExpects, mergeTests } from '@playwright/test';
import { mountWithProviders } from './mountWithProviders';
import { testCoverage } from './testCoverage';

export const test = mergeTests(testCoverage, mountWithProviders);
export const expect = mergeExpects(baseExpect);
