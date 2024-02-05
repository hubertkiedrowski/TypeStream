import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Home from "../components/home";
import React from "react";

describe("Home", () => {
  it("Renders the home page content", () => {
    render(<Home />, { wrapper: MemoryRouter });

    expect(
      screen.getByText("Erlerne schnelleres Tippen kostenlos und spielerisch!")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Die Beherrschung eines zügigen Tippstils ist in der heutigen digitalen Ära sehr hilfreich, um Schritt zu halten. Unser Tipplerner ermöglicht selbst den jüngsten Nutzern, das Schreiben am Computer auf spielerische Weise zu erlernen. Unser Lernprogramm ist für alle Altersgruppen ansprechend und völlig kostenfrei."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Los geht's!" })
    ).toBeInTheDocument();
    expect(screen.getByAltText("unsere Anwendung")).toBeInTheDocument();
  });

  it("Navigates to chooseKeyboard page on 'Los geht's!' button click", () => {
    const { container } = render(<Home />, { wrapper: MemoryRouter });

    const startButton = screen.getByRole("button", { name: "Los geht's!" });

    fireEvent.click(startButton);

    expect(container.innerHTML).toContain("keyboard");
  });
});
