import ShareButton from "components/ShareButton";
import React from "react";
import { act, fireEvent, render, screen } from "util/test-utils";

describe("ShareButton", () => {
  beforeEach(() => {
    jest.useFakeTimers("modern");

    // Mock clipboard method
    (window.navigator.clipboard as any) = { writeText: jest.fn() };
  });

  it("can copy current url and show copied text", () => {
    render(<ShareButton />);

    expect(screen.getByLabelText("Share")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Share"));

    expect(screen.queryByText("copied")).toBeInTheDocument();

    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
      "http://localhost/"
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.queryByText("copied")).not.toBeInTheDocument();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
