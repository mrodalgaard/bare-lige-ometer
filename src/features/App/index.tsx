import { CornerBanner } from 'components/CornerBanner';
import { Input } from 'components/Input';
import { Loader } from 'components/Loader';
import { Meter } from 'components/Meter';
import { ShareButton } from 'components/ShareButton';
import { Title } from 'components/Title';
import { AppContextProvider } from 'contexts/AppContext';
import { ThemeProvider } from 'styled-components';
import { theme } from 'util/theme';
import { useDebouncedWindowSize } from 'util/useDebouncedWindowSize';

export const App = () => {
  const { loading } = useDebouncedWindowSize();

  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <ShareButton />
        <CornerBanner />
        <Title />
        <Input />
        {loading ? <Loader /> : <Meter />}
      </AppContextProvider>
    </ThemeProvider>
  );
};
