import Meter from "components/Meter";
import Title from "components/Title";
import React from "react";
import TestRenderer from "react-test-renderer";
import App from "../App";

it("renders without crashing", () => {
  // @testing-library/react does not work with the canvas used in Meter
  const testRenderer = TestRenderer.create(<App />);
  const testInstance = testRenderer.root;

  expect(testInstance.findByType(Title)).toBeDefined();
  expect(testInstance.findByType(Meter)).toBeDefined();
});
