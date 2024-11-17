import { AppContext } from 'contexts/AppContext';
import { useMatchMedia } from 'hooks/useMatchMedia';
import { ReactNode, useContext } from 'react';
import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components';
import { Mode } from '.';
import { darkColors, lightColors, theme } from './theme';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    overflow: hidden;
    user-select: none;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    margin: 0;

    // Custom font
    font-family: ${({ theme }) => theme.font}, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    -moz-osx-font-smoothing: grayscale;
  }

  // Turn off default view transition animations
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }
`;

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const { mode } = useContext(AppContext);
  const prefersDarkMode = useMatchMedia('(prefers-color-scheme: dark)');

  // Set theme colors and try to guess the users preferred color scheme if mode is set to system
  let colors: DefaultTheme['colors'] = mode === Mode.dark ? darkColors : lightColors;
  if (prefersDarkMode && mode === Mode.system) {
    colors = darkColors;
  }

  // Extend base theme with mode colors
  const themeExtended: DefaultTheme = { ...theme, colors };

  return (
    <ThemeProvider theme={themeExtended}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
};
