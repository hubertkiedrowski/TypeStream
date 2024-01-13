import { KeyboardEvent } from "react";

export const loadNextLines = (
    lines: string[],
    nextLine: number,
    setEnteredText: React.Dispatch<React.SetStateAction<string>>,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
    setLastCorrectIndex: React.Dispatch<React.SetStateAction<number>>,
    setTargetText: React.Dispatch<React.SetStateAction<string>>,
    setColoredTargetText: React.Dispatch<React.SetStateAction<string[]>>,
    setCurrentLine: React.Dispatch<React.SetStateAction<number>>,
    setNextLine: React.Dispatch<React.SetStateAction<number>>
): void => {
    if (nextLine < lines.length) {
        setCurrentIndex(0);
        setEnteredText("");
        setLastCorrectIndex(0);
        setTargetText(lines[nextLine]);
        setColoredTargetText(lines[nextLine].split("").map(() => "#aaa"));
        setCurrentLine(nextLine);
        setNextLine(nextLine + 1);
    } else {
        setCurrentLine(0);
        setNextLine(1);
    }
};

export const checkInput = (
    enteredText: string,
    currentIndex: number,
    targetText: string,
    setColoredTargetText: React.Dispatch<React.SetStateAction<string[]>>,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
    setLastCorrectIndex: React.Dispatch<React.SetStateAction<number>>,
    setEnteredText: React.Dispatch<React.SetStateAction<string>>,
    setIncorrectLetters: React.Dispatch<React.SetStateAction<number[]>>,
    setBlinkIndex: React.Dispatch<React.SetStateAction<number | null>>,
    setErrorCount: React.Dispatch<React.SetStateAction<number>>
): void => {
    const currentChar = enteredText[currentIndex];
    const targetChar = targetText[currentIndex];
    if (currentChar === targetChar) {
        console.log(`Richtig! Eingegeben: ${currentChar}`);
        const updatedColors = setColoredTargetText.slice();
        updatedColors[currentIndex] = "LightGreen";
        setColoredTargetText(updatedColors);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setLastCorrectIndex(currentIndex + 1);
        const updatedIncorrectLetters = setIncorrectLetters.filter(
            (i) => i !== currentIndex
        );
        setIncorrectLetters(updatedIncorrectLetters);
        if (currentIndex === targetText.length - 1) {
            setColoredTargetText(targetText.split("").map(() => "#aaa"));
        }
    } else {
        console.log(
            `Falsch! Eingegeben: ${currentChar}, Erwartet: ${targetChar}`
        );
        if (targetChar === " ") {
            setBlinkIndex(currentIndex);
            setTimeout(() => {‚
                setBlinkIndex(null);
            }, 500);
        }
        setErrorCount((prevCount) => prevCount + 1);
        setCurrentIndex(setLastCorrectIndex);
        setEnteredText(targetText.slice(0, setLastCorrectIndex));
        const updatedIncorrectLetters = [...setIncorrectLetters, currentIndex];
        setIncorrectLetters(updatedIncorrectLetters);
    }
};

export const handleKeyDown = (
    event: KeyboardEvent,
    isDone: boolean,
    currentIndex: number,
    targetText: string,
    setEnteredText: React.Dispatch<React.SetStateAction<string>>,
    setPressedKey: React.Dispatch<React.SetStateAction<number | null>>,
    checkInput: () => void
): void => {
    if (!isDone && currentIndex < targetText.length) {
        const key = event.key.toLowerCase(); // Convert key to lowercase
        const keyCode = event.keyCode;

        event.preventDefault();

        const keyElement = document.querySelector(
            `.key.c${keyCode}`
        ) as HTMLElement;
        if (keyElement) {
            keyElement.style.color = "#007fff";
            keyElement.style.textShadow = "0 0 10px #007fff";
            keyElement.style.margin = "7px 5px 3px";
            keyElement.style.boxShadow = "inset 0 0 25px #333, 0 0 3px #333";
            keyElement.style.borderTop = "1px solid #000";
        }

        // special characters
        if (keyCode === 188) {
            // ,
            setEnteredText((prevText) => prevText + ",");
        } else if (keyCode === 190) {
            // .
            setEnteredText((prevText) => prevText + ".");
        } else if (/^[a-zA-Z]$/.test(key)) {
            // letters
            setEnteredText((prevText) => prevText + key.toUpperCase());
        } else {
            // other
            setEnteredText((prevText) => prevText + key);
        }
    }
};

export const handleKeyUp = (
    event: KeyboardEvent,
    isDone: boolean,
    currentIndex: number,
    targetText: string,
    setEnteredText: React.Dispatch<React.SetStateAction<string>>,
    setPressedKey: React.Dispatch<React.SetStateAction<number | null>>,
    checkInput: () => void
): void => {
    if (!isDone && currentIndex < targetText.length) {
        const keyCode = event.keyCode;
        const keyElement = document.querySelector(
            `.key.c${keyCode}`
        ) as HTMLElement;

        if (keyElement) {
            keyElement.style.color = "#aaa";
            keyElement.style.textShadow = "none";
            keyElement.style.margin = "5px 5px 3px";
            keyElement.style.boxShadow = "inset 0 0 25px #333, 0 0 3px #333";
            keyElement.style.borderTop = "1px solid #000";

            setPressedKey(keyCode);
            checkInput();
        }
    }
};