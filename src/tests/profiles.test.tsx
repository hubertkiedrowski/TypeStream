import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { describe, expect, it } from "vitest";
import React from "react";
import test from "vitest";
import Profiles from "../components/profiles";

test;
describe("Profile", () => {
  it("Renders Profiles", () => {
    //Arrange
    render(<Profiles />);

    //Assert
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Score"
    );
  });
});
