import { describe, expect, it, vi } from "vitest";
import React from "react";
import { handleKeyUpWin } from '../components/keyboardfunctions';

describe("handleKeyUpWin", () => {
    it("allgemeine funktionalität", () => {
        const event: Partial<KeyboardEvent> = {
            keyCode: 190, 
        };
        const isDone = false;
        const currentIndex = 0;
        const targetText = "example";
        const setEnteredText = vi.fn(); 
        const setPressedKey = vi.fn(); 
        const checkInput = vi.fn(); 
        
        handleKeyUpWin(
            event as KeyboardEvent,
            isDone,
            currentIndex,
            targetText,
            setEnteredText,
            setPressedKey,
            checkInput
        );
        
    });
});
