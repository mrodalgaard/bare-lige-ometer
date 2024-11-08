import { z } from 'zod';

export enum Mode {
  light = 'light',
  dark = 'dark',
}

export const modeZodType = z.enum([Mode.light, Mode.dark]);
