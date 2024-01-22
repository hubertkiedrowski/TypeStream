import React from "react";
import "./css/navbar.css";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { describe, expect, it } from "vitest";

describe("Navbar", () => {
  it("Renders Über Uns", () => {
    //Arrange
    render(<Navbar />);

    //Assert
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Wir sind Team 4, bestehend aus:"
    );
  });
});
