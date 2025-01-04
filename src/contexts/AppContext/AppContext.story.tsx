import { theme } from 'contexts/ThemeContext';
import { useContext } from 'react';
import { useTheme } from 'styled-components';
import { AppContext } from './AppContext';

export const AppContextStory = () => {
  const { mode, reducedMotion } = useContext(AppContext);
  const { colors } = useTheme();

  return (
    <>
      <h1 data-testid="mode">{mode}</h1>
      <h1 data-testid="reduced-motion">{reducedMotion.toString()}</h1>
      <h1 data-testid="theme">{colors === theme.colors ? 'light' : 'dark'}</h1>
    </>
  );
};

export const TitleAppContextStory = () => {
  const { title, setTitle } = useContext(AppContext);

  return (
    <>
      <h1 data-testid="title">{title}</h1>
      <button onClick={() => setTitle('New')}>Change</button>
    </>
  );
};

export const ValueAppContextStory = () => {
  const { value, setValue } = useContext(AppContext);

  return (
    <>
      <h1 data-testid="value">{value}</h1>
      <button onClick={() => setValue((value ?? 0) + 1)}>Change</button>
    </>
  );
};

export const ModeAppContextStory = () => {
  const { mode, toggleMode } = useContext(AppContext);
  const { colors } = useTheme();

  return (
    <>
      <h1 data-testid="mode">{mode}</h1>
      <h1 data-testid="theme">{colors === theme.colors ? 'light' : 'dark'}</h1>
      <button onClick={toggleMode}>Toggle</button>
    </>
  );
};
