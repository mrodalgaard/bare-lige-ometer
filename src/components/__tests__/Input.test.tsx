import userEvent from "@testing-library/user-event";
import Input from "components/Input";
import React from "react";
import { renderUsingQueryParamProvider } from "util/query-param-provider-helper";
import { act, screen } from "util/test-utils";

describe("Input", () => {
  const inputLabel = "CHANGE TEXT";

  beforeEach(() => {
    jest.useFakeTimers("modern");
  });

  it("takes input", () => {
    renderUsingQueryParamProvider(<Input />);

    const input = screen.getByLabelText(inputLabel);
    expect(input).toHaveValue("");

    userEvent.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("sets the input from query parameter", () => {
    renderUsingQueryParamProvider(<Input />, { title: "BARELIGE" });

    expect(screen.getByLabelText(inputLabel)).toHaveValue("BARELIGE");
  });

  it("updates the query parameter debounced", () => {
    const { location } = renderUsingQueryParamProvider(<Input />);

    const input = screen.getByLabelText(inputLabel);

    userEvent.type(input, "Hello");
    expect(input).toHaveValue("Hello");
    expect(location.href).toBe("");

    act(() => {
      jest.runAllTimers();
    });

    expect(location.href).toBe("?title=Hello");
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
