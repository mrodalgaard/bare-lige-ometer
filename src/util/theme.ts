import { DefaultTheme } from 'styled-components';

const colors = {
  background: '#ecf0f1',
  header: '#464a4e',

  success: '#00b894',
  warning: '#fdcb6e',
  error: '#d63031',
};

export const theme: DefaultTheme = {
  breakpoints: ['550px', '1800px'],
  spaces: ['0px', '2px', '4px', '8px', '16px', '32px', '64px'],
  fontSizes: ['12px', '14px', '16px', '20px', '24px'],
  colors,
};
