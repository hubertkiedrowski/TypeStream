import { describe, expect, it, vi } from "vitest";
import React from "react";
import { loadNextLines } from '../components/keyboardfunctions';

describe('loadNextLines Funktion Test', () => {
    it('sollte die nächsten Zeilen korrekt laden', () => {
        const mockSetStates = Array.from({ length: 7 }, () => vi.fn());

        const lines = ['Zeile 1', 'Zeile 2', 'Zeile 3'];
        const nextLine = 1;

        loadNextLines(
            lines,
            nextLine,
            mockSetStates[0],
            mockSetStates[1],
            mockSetStates[2],
            mockSetStates[3],
            mockSetStates[4],
            mockSetStates[5],
            mockSetStates[6]
        );

        expect(mockSetStates[0].mock.calls[0][0]).toBe('Zeile 2');
        expect(mockSetStates[1].mock.calls[0][0]).toBe('');
        expect(mockSetStates[2].mock.calls[0][0]).toBe(0);
        expect(mockSetStates[3].mock.calls[0][0]).toBe(0);
        expect(mockSetStates[4].mock.calls[0][0]).toEqual(['#262626', '#262626', '#262626', '#262626', '#262626', '#262626', '#262626']);
        expect(mockSetStates[5].mock.calls[0][0]).toBe(1);
        expect(mockSetStates[6].mock.calls[0][0]).toBe(2);
    });
});
