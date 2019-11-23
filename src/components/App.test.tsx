import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// react-gauge does not work in tests
jest.mock("react-gauge-chart", () => {
  return function Meter() {
    return <div>GAUGE</div>;
  };
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
