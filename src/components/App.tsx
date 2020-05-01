import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import CornerBanner from "./CornerBanner";
import Input from "./Input";
import Meter from "./Meter";
import ShareButton from "./ShareButton";
import Title from "./Title";

const App = () => {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <ShareButton />
        <CornerBanner />
        <Title />
        <Input />
        <Meter />
      </QueryParamProvider>
    </Router>
  );
};

export default App;
