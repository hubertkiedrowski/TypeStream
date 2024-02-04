import { describe, expect, it, vi } from "vitest";
import React from "react";
import { handleKeyUpMac } from '../components/keyboardfunctions';

describe("handleKeyUpMac", () => {
    it("korrektes handlen wenn ',' gedrückt wurde", () => {
        // Mocking required variables and functions
        const event: Partial<KeyboardEvent> = {
            keyCode: 188, // keyCode for comma
        };
        const isDone = false;
        const currentIndex = 0;
        const targetText = "example";
        const setEnteredText = () => {}; // Mocking setEnteredText
        const setPressedKey = vi.fn(); // Mocking setPressedKey as a spy
        const checkInput = vi.fn(); // Mocking checkInput as a spy

        // Spy on document.querySelector
        const querySelectorSpy = vi.spyOn(document, "querySelector").mockReturnValue({
            style: {} as CSSStyleDeclaration, // Mocking keyElement's style property
        } as HTMLElement);

        // Calling the function
        handleKeyUpMac(event as KeyboardEvent, isDone, currentIndex, targetText, setEnteredText as any, setPressedKey as any, checkInput as any);

        // Expectations
        expect(querySelectorSpy).toHaveBeenCalledWith(`.key.c${event.keyCode}`);
        expect(setPressedKey).toHaveBeenCalled();
        expect(checkInput).toHaveBeenCalled();
    });
});

