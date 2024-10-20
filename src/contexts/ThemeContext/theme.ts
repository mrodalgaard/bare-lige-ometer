import { DefaultTheme } from 'styled-components';

const baseColors = {
  success: '#00b894',
  warning: '#fdcb6e',
  error: '#d63031',
};

const meter = [baseColors.success, baseColors.warning, baseColors.error];

export const lightColors = {
  ...baseColors,
  background: '#ecf0f1',
  header: '#464a4e',
  meter,
};

export const darkColors = {
  ...baseColors,
  background: '#282C34',
  header: '#ecf0f1',
  meter,
};

const breakpoints = {
  sm: '600px',
  md: '900px',
  lg: '1200px',
};

const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
};

export const theme: DefaultTheme = {
  mediaQueries,
  spaces: ['0px', '2px', '4px', '8px', '16px', '32px', '64px'],
  fontSizes: ['12px', '14px', '16px', '20px', '24px'],
  colors: lightColors,
};
