import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryParamProvider } from "use-query-params";
import theme from "util/theme";
import CornerBanner from "./CornerBanner";
import Input from "./Input";
import Meter from "./Meter";
import ShareButton from "./ShareButton";
import Title from "./Title";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <ShareButton />
          <CornerBanner />
          <Title />
          <Input />
          <Meter />
        </QueryParamProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
