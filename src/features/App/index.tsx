import { CornerBanner } from 'components/CornerBanner';
import { Input } from 'components/Input';
import { Loader } from 'components/Loader';
import { Meter } from 'components/Meter';
import { ShareButton } from 'components/ShareButton';
import { Title } from 'components/Title';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { theme } from 'util/theme';
import { useDebouncedWindowSize } from 'util/useDebouncedWindowSize';

export const App = () => {
  const { loading } = useDebouncedWindowSize();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ShareButton />
          <CornerBanner />
          <Title />
          <Input />
          {loading ? <Loader /> : <Meter />}
        </QueryParamProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
