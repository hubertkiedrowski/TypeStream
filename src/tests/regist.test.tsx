import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import Regist from "../components/regist";
import { describe, expect, it } from "vitest";
import React from "react";

describe("Regist", () => {
  it("Renders the registration form", () => {
    render(<Regist />, { wrapper: MemoryRouter });

    expect(screen.getByText("Regist")).toBeInTheDocument();
    expect(screen.getByText("Firstname")).toBeInTheDocument();
    expect(screen.getByText("Lastname")).toBeInTheDocument();
    expect(screen.getByText("E-Mail")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Repeat Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Registrieren" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Back to Login" })
    ).toBeInTheDocument();
  });

  it("Displays error message on failed form submission", async () => {
    render(<Regist />, { wrapper: MemoryRouter });

    const submitButton = screen.getByRole("button", { name: "Registrieren" });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(
      screen.getByText("Registrierung fehlgeschlagen!")
    ).toBeInTheDocument();
  });

  it("Navigates to login page on 'Back to Login' button click", () => {
    const { container } = render(<Regist />, { wrapper: MemoryRouter });

    const backButton = screen.getByRole("button", { name: "Back to Login" });

    fireEvent.click(backButton);

    expect(container.innerHTML).toContain("Login");
  });
});
