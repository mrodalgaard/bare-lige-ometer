import { CornerBanner } from 'components/CornerBanner';
import { Input } from 'components/Input';
import { Meter } from 'components/Meter';
import { ShareButton } from 'components/ShareButton';
import { Title } from 'components/Title';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { theme } from 'util/theme';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ShareButton />
          <CornerBanner />
          <Title />
          <Input />
          <Meter />
        </QueryParamProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
