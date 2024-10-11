import { describe, it, expect } from "vitest";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("<Home />", () => {
  it("renders", () => {
    render(<Home />);

    expect(screen.getByTestId("home")).toBeInTheDocument();
  });
});
