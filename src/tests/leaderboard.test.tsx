import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { describe, expect, it } from "vitest";
import Profiles from "../components/profiles";
import React from "react";
import test from "vitest";
import Leaderboard from "../components/leaderboard";

test;
describe("Leaderboard", () => {
  it("Renders leaderboard", () => {
    //Arrange
    render(<Leaderboard />);

    //Assert
    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("Leaderboard");
  });
});
