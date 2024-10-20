/// <reference types="vite/client" />

import 'styled-components';

// Override DefaultTheme to get accurate typings for your project
declare module 'styled-components' {
  export interface DefaultTheme {
    mediaQueries: {
      sm: string;
      md: string;
      lg: string;
    };
    spaces: string[];
    fontSizes: string[];
    colors: {
      background: string;
      header: string;
      success: string;
      warning: string;
      error: string;
    };
  }
}
