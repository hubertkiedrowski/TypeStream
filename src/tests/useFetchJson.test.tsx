import { renderHook } from "@testing-library/react-hooks";
import { useFetchJson } from "../components/utils/api";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock global.fetch before each test
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        id: 1,
        email: "user@softwareEngeneering.de",
        firstName: "admini",
        lastName: "strator",
        userName: "IKnowYourPassword",
        password: "$2a$10$PrkGZhUYCu6guZNqdUWUQOOtZ4w9pS2zEfRbv4u.fC4Flthps0rua",
        createdAt: "2024-01-22T13:27:08.081Z",
        updatedAt: "2024-01-22T13:27:08.081Z",
      }),
    }) as Promise<Response>,
  );
});


describe('useFetchJson', () => {
  it('should fetch JSON data successfully', async () => {
    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchJson('http://localhost:3000/users/1'),
    );

    // Wait for the hook to finish
    await waitForNextUpdate({ timeout: 15000 });

    // Assert the result
    expect(result.current).toEqual({
      'id': 1,
      'email': "user@softwareEngeneering.de",
      'firstName': "admini",
      'lastName': "strator",
      'userName': "IKnowYourPassword",
      'password': "$2a$10$PrkGZhUYCu6guZNqdUWUQOOtZ4w9pS2zEfRbv4u.fC4Flthps0rua",
      'createdAt': "2024-01-22T13:27:08.081Z",
      'updatedAt': "2024-01-22T13:27:08.081Z"
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/users/1', {
      credentials: 'include',
    });
  }, 15090);
}, 15000);