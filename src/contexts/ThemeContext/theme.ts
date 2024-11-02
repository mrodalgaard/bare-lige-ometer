import { DefaultTheme } from 'styled-components';

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

const typography = (type: 'title' | 'input' | 'body') => {
  switch (type) {
    case 'title':
      return `
        font-size: 190px;
      `;
    case 'input':
      return `
        font-size: 30px;
      `;
    case 'body':
      return `
        font-size: 14px;
      `;
  }
};

// Spacing: 0px, 4px, 8px, 16px, 24px, 32px
const spacing = (factor: 0 | 0.5 | 1 | 2 | 3 | 4) => `${factor * 8}px`;

const sizes = {
  banner: '80px',
};

const baseColors = {
  success: '#00b894',
  warning: '#fdcb6e',
  error: '#d63031',
};

const meter = [baseColors.success, baseColors.warning, baseColors.error];

export const lightColors = {
  ...baseColors,
  primary: '#464a4e',
  secondary: baseColors.success,
  background: '#ecf0f1',
  meter,
};

export const darkColors = {
  ...baseColors,
  primary: '#ecf0f1',
  secondary: baseColors.success,
  background: '#282C34',
  meter,
};

export const theme: DefaultTheme = {
  mediaQueries,
  font: 'Titan One',
  typography,
  spacing,
  sizes,
  colors: lightColors,
};
