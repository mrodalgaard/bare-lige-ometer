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

export const lightColors: DefaultTheme['colors'] = {
  primary: '#464a4e',
  secondary: '#00b894',
  background: '#ecf0f1',
  meter: ['#00b894', '#f9ca24', '#d63031'],
};

export const darkColors: DefaultTheme['colors'] = {
  primary: '#ecf0f1',
  secondary: '#00b894',
  background: '#282C34',
  meter: ['#00b894', '#fdcb6e', '#e74c3c'],
};

export const theme: DefaultTheme = {
  mediaQueries,
  font: 'Titan One',
  typography,
  spacing,
  sizes,
  colors: lightColors,
};
