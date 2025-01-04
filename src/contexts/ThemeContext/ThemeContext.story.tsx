import { AppContext } from 'contexts/AppContext';
import { useContext } from 'react';
import { useTheme } from 'styled-components';

export const ThemeContextStory = () => {
  const { toggleMode } = useContext(AppContext);
  const theme = useTheme();

  return (
    <>
      <h1 data-testid="primary">{theme.colors.primary}</h1>
      <h1 data-testid="font">{theme.font}</h1>
      <button onClick={toggleMode}>Toggle Mode</button>
    </>
  );
};
