import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { describe, expect, it } from "vitest";
import React from "react";
import test from "vitest";
import UeberUns from "../components/ueberUns";

test;
describe("Über Uns", () => {
  it("Renders Über Uns", () => {
    //Arrange
    render(<UeberUns />);

    //Assert
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Wir sind Team 4, bestehend aus:"
    );
  });
});
