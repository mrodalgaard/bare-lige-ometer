import { Page } from '@playwright/test';

interface CustomWindow extends Window {
  _matchMedia?: typeof window.matchMedia;
  _matchMediaChangeListeners?: ((event: MediaQueryListEvent) => void)[];
}

export const stubMatchMedia = async (page: Page, query?: string, matches = true) => {
  await page.addInitScript(
    ({ query: matchQuery, matches }) => {
      // TODO: Support for multiple match media queries

      // Store original match media method and list of change listeners on window object
      (window as CustomWindow)._matchMedia = window.matchMedia;
      (window as CustomWindow)._matchMediaChangeListeners = [];

      // Stub match media object with matches and change listener callback
      window.matchMedia = (query: string): MediaQueryList => {
        // Use original match media method if query does not match
        if (query !== matchQuery) {
          return (window as CustomWindow)._matchMedia!(query);
        }

        return {
          matches,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          dispatchEvent: () => false,
          addEventListener: (type: string, listener: EventListenerObject | ((event: MediaQueryListEvent) => void)) => {
            if (type === 'change' && listener instanceof Function) {
              (window as CustomWindow)._matchMediaChangeListeners?.push(listener);
            }
          },
          removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
            if (type === 'change' && listener instanceof Function) {
              const changeListeners = (window as CustomWindow)._matchMediaChangeListeners;
              changeListeners?.splice(changeListeners.indexOf(listener), 1);
              (window as CustomWindow)._matchMediaChangeListeners = changeListeners;
            }
          },
        };
      };
    },
    { query, matches }
  );

  // Return method which triggers the match media change listeners
  return async (event: MediaQueryListEvent) => {
    await page.evaluate((event) => {
      (window as CustomWindow)._matchMediaChangeListeners?.forEach((listener) => listener(event));
    }, event);
  };
};
