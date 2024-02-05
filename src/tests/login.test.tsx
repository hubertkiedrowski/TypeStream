import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "../components/login";
import React from "react";
import { describe, beforeEach, it, expect } from "vitest";
import { Store, UnknownAction } from "@reduxjs/toolkit";

const mockStore = configureStore([]);

describe("Login", () => {
  let store: Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({});
  });

  it("Renders the login form", () => {
    // ...

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument(); // Use toBeInTheDocument() to assert that the element is in the document
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Regist" })).toBeInTheDocument();
  });

  it("Displays error message on failed login", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const loginButton = screen.getByRole("button", { name: "Login" });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(screen.getByText("Login fehlgeschlagen!")).toBeInTheDocument();
  });

  it("Navigates to registration page on 'Regist' button click", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const registButton = screen.getByRole("button", { name: "Regist" });

    fireEvent.click(registButton);

    expect(container.innerHTML).toContain("Regist");
  });
});
