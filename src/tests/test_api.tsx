import { renderHook } from "@testing-library/react-hooks";
import { useUserDataApi } from "../components/api";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock global.fetch vor jedem Test
beforeEach(() => {
  global.fetch = vi.fn();
  global.console.error = vi.fn(); // Mock console.error, wenn Sie Fehlerbehandlung testen
});

// Mock global.fetch vor jedem Test
beforeEach(() => {
  global.fetch = vi.fn();
  global.console.error = vi.fn(); // Mock console.error, wenn Sie Fehlerbehandlung testen
});

// Setzen Sie Mocks nach jedem Test zurück


describe('useUserDataApi', () => {
  it('should fetch user data successfully', async () => {
    // Mock the fetch function using vi.fn() for vitest

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: '1', name: 'John Doe' }]),
      }) as Promise<Response>,
    );

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useUserDataApi(1));

    // Wait for the hook to finish
    await waitForNextUpdate({ timeout: 15000 });

    // Assert the result
    expect(result.current).toEqual([{ id: '1', name: 'John Doe' }]);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/users/1', {
      credentials: 'include',
    });
  }, 15090);

  it('should handle fetch error', async () => {
    // Mock the fetch function to throw an error
    const mockFetch = vi.fn(() => Promise.reject(new Error('Network error')));
    global.fetch = mockFetch;

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useUserDataApi(1));

    // Wait for the hook to finish
    await waitForNextUpdate({ timeout: 15000 });

    // Assert the result
    expect(result.current).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching data:',
      new Error('Network error')
    );
  });
});