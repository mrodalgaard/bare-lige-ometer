import { MountOptions, MountResult, test } from '@playwright/experimental-ct-react';
import { AppContextProvider } from 'contexts/AppContext';
import { ThemeContextProvider } from 'contexts/ThemeContext';

type Mount = <HooksConfig>(component: JSX.Element, options?: MountOptions<HooksConfig>) => Promise<MountResult>;

type ExtendedFixtures = {
  mountWithProviders: Mount;
  mountWithThemeProvider: Mount;
};

export const mountWithProviders = test.extend<ExtendedFixtures>({
  mountWithProviders: async ({ mount }, use) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use((component, options) =>
      mount(
        <AppContextProvider>
          <ThemeContextProvider>{component}</ThemeContextProvider>
        </AppContextProvider>,
        options
      )
    );
  },

  mountWithThemeProvider: async ({ mount }, use) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use((component, options) => mount(<ThemeContextProvider>{component}</ThemeContextProvider>, options));
  },
});
