import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import ChooseKeyboard from "../components/chooseKeyboard";
import React from "react";

describe("ChooseKeyboard", () => {
  it("Navigates to '/keyboard' on 'Mac-Keyboard' button click", () => {
    const { container } = render(<ChooseKeyboard />, { wrapper: MemoryRouter });

    const macButton = screen.getByText("Mac-Keyboard");

    fireEvent.click(macButton);

    expect(container.innerHTML).toContain("Keyboard");
  });

  it("Navigates to '/keyboardWin' on 'Win-Keyboard' button click", () => {
    const { container } = render(<ChooseKeyboard />, { wrapper: MemoryRouter });

    const winButton = screen.getByText("Win-Keyboard");

    fireEvent.click(winButton);

    expect(container.innerHTML).toContain("Keyboard");
  });
});
