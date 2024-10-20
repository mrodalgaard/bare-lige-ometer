import { AppContext } from 'contexts/AppContext';
import { ReactNode, useContext } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkColors, lightColors, theme } from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const { mode } = useContext(AppContext);

  // Extend base theme with mode colors
  const themeExtended = { ...theme, colors: mode === 'dark' ? darkColors : lightColors };

  return (
    <ThemeProvider theme={themeExtended}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
};
