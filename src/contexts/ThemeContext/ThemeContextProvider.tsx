import { AppContext } from 'contexts/AppContext';
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

  // Extend base theme with mode colors
  const themeExtended: DefaultTheme = { ...theme, colors: mode === Mode.dark ? darkColors : lightColors };

  return (
    <ThemeProvider theme={themeExtended}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
};
