import { render, RenderOptions } from "@testing-library/react";
import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

type Props = {
  children: ReactNode;
};

const AllTheProviders = ({ children }: Props) => {
  return (
    <Router>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Router>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, {
    wrapper: AllTheProviders as React.FunctionComponent,
    ...options,
  });

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };
