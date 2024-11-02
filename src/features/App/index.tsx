import { Input } from 'components/Input';
import { Loader } from 'components/Loader';
import { Meter } from 'components/Meter';
import { Title } from 'components/Title';
import { Top } from 'components/Top';
import { AppContextProvider } from 'contexts/AppContext';
import { ThemeContextProvider } from 'contexts/ThemeContext';
import { useDebouncedWindowSize } from 'hooks/useDebouncedWindowSize';

export const App = () => {
  const { loading } = useDebouncedWindowSize();

  return (
    <AppContextProvider>
      <ThemeContextProvider>
        <Top />
        <Title />
        <Input />
        {loading ? <Loader /> : <Meter />}
      </ThemeContextProvider>
    </AppContextProvider>
  );
};
