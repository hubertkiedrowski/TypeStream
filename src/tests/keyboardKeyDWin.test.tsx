import { describe, expect, it, vi } from "vitest";
import React from "react";
import { handleKeyDownWin } from '../components/keyboardfunctions';

describe("handleKeyDownWin", () => {
    it("korrektes handlen wenn '.' gedrückt wurde", () => {
 
        const event: Partial<KeyboardEvent> = {
            key: ".",
            keyCode: 190,
            preventDefault: vi.fn(),
      
            altKey: false,
            charCode: 0,
            code: "",
            ctrlKey: false,

        };
        const isDone = false;
        const currentIndex = 0;
        const targetText = "example";
        const setEnteredText = vi.fn();
        const setPressedKey = vi.fn();
        const checkInput = vi.fn();
        
        handleKeyDownWin(event as KeyboardEvent, isDone, currentIndex, targetText, setEnteredText, setPressedKey, checkInput);
        
        expect(event.preventDefault).toHaveBeenCalled();
        expect(setEnteredText).toHaveBeenCalledWith(expect.any(Function));
        expect(setEnteredText.mock.calls[0][0]("")).toBe(".");
    });
});
