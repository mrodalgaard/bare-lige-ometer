import Meter from "components/Meter";
import React from "react";
import { renderUsingQueryParamProvider } from "util/query-param-provider-helper";
import { fireEvent, screen } from "util/test-utils";

describe("Meter", () => {
  it("can render and change value", () => {
    renderUsingQueryParamProvider(<Meter showAsNumber={true} />);

    expect(screen.getByText("0%")).toBeInTheDocument();

    fireEvent.click(screen.getByText("0%"), {
      clientX: window.innerWidth / 2,
      clientY: 10,
    });

    expect(screen.getByText("50%")).toBeInTheDocument();

    fireEvent.click(screen.getByText("50%"), {
      clientX: window.innerWidth,
      clientY: 10,
    });

    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("sets the value from query parameter", () => {
    renderUsingQueryParamProvider(<Meter showAsNumber={true} />, {
      value: "15",
    });

    expect(screen.getByText("15%")).toBeInTheDocument();
  });

  it("updates the query parameter when changed", () => {
    const { location } = renderUsingQueryParamProvider(
      <Meter showAsNumber={true} />
    );

    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(location.href).toBe("");

    fireEvent.click(screen.getByText("0%"), {
      clientX: window.innerWidth / 3,
      clientY: 10,
    });

    expect(location.href).toBe("?value=33");
  });

  it("caps value", () => {
    renderUsingQueryParamProvider(<Meter showAsNumber={true} />, {
      value: "110",
    });

    expect(screen.getByText("100%")).toBeInTheDocument();

    renderUsingQueryParamProvider(<Meter showAsNumber={true} />, {
      value: "-10",
    });

    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});
