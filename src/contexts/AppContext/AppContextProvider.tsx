import { Mode } from 'contexts/ThemeContext';
import { ReactNode, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NumberParam, QueryParamProvider, StringParam, useQueryParam } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { AppContext } from './AppContext';
import { QueryParameter } from './QueryParameter';

const AppContextProviderWithQueryParam = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useQueryParam(QueryParameter.title, StringParam);
  const [value, setValue] = useQueryParam(QueryParameter.value, NumberParam);

  // TODO: Move to persisted state
  const [mode, setMode] = useState<Mode>('light');
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider value={{ title, setTitle, value, setValue, mode, toggleMode }}>{children}</AppContext.Provider>
  );
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <AppContextProviderWithQueryParam>{children}</AppContextProviderWithQueryParam>
      </QueryParamProvider>
    </BrowserRouter>
  );
};
