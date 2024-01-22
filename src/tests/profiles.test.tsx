import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { describe, expect, it } from "vitest";
import React from "react";

import Profiles from "../components/profiles";

describe("Profiles", () => {
  it("Renders Profiles", () => {
    //Arrange
    render(<Profiles />);

    //Assert
    expect(screen.getAllByTestId("heading", {})).toHaveTextContent("Score: ");
  });
});
