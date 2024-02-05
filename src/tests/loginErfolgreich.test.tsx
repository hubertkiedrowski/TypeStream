import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import LoginErfolgreich from "../components/loginErfolgreich";
import React from "react";
// Remove the unnecessary import statement for "jest"
// import jest from "jest";

describe("LoginErfolgreich", () => {
  it("Renders the successful login message and username", () => {
    const userName = "JohnDoe";
    const state = { userName };
    render(
      <MemoryRouter initialEntries={[{ state }]}>
        <LoginErfolgreich />
      </MemoryRouter>
    );

    expect(screen.getByText("Login Erfolgreich!")).toBeInTheDocument();
    expect(screen.getByText(`Willkommen ${userName}`)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "MyProfile" })
    ).toBeInTheDocument();
  });
});
