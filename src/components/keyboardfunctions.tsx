//LOADNEXTLINES
export const loadNextLines = (
    lines: string[],
    nextLine: number,
    setTargetText: React.Dispatch<React.SetStateAction<string>>,
    setEnteredText: React.Dispatch<React.SetStateAction<string>>,
    setLastCorrectIndex: React.Dispatch<React.SetStateAction<number>>,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
    setColoredTargetText: React.Dispatch<React.SetStateAction<string[]>>,
    setCurrentLine: React.Dispatch<React.SetStateAction<number>>,
    setNextLine: React.Dispatch<React.SetStateAction<number>>
): void => {
    if (nextLine < lines.length) {
        setCurrentIndex(0);
        setEnteredText("");
        setLastCorrectIndex(0);
        setTargetText(lines[nextLine]);
        setColoredTargetText(lines[nextLine].split("").map(() => "#262626"));
        setCurrentLine(nextLine);
        setNextLine(nextLine + 1);
    } else {
        setCurrentLine(0);
        setNextLine(1);
    }
};

//CHECK INPUT
export const checkInput = (
    currentChar: string,
    targetChar: string,
    currentIndex: number,
    targetText: string,
    coloredTargetText: any,
    incorrectLetters: any,
    lastCorrectIndex: any,
    setEnteredText: React.Dispatch<React.SetStateAction<string>>,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
    setLastCorrectIndex: React.Dispatch<React.SetStateAction<number>>,
    setColoredTargetText: React.Dispatch<React.SetStateAction<string[]>>,
    setIncorrectLetters: React.Dispatch<React.SetStateAction<number[]>>,
    setBlinkIndex: React.Dispatch<React.SetStateAction<number | null>>,
    setErrorCount: React.Dispatch<React.SetStateAction<number>>
): void => {
    const upperCaseCurrentChar = currentChar.toUpperCase();
    const upperCaseTargetChar = targetChar.toUpperCase();

    if (upperCaseCurrentChar === upperCaseTargetChar) {
        const updatedColors = coloredTargetText.slice();
        updatedColors[currentIndex] = "LightGreen";
        setColoredTargetText(updatedColors);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setLastCorrectIndex(currentIndex + 1);
        const updatedIncorrectLetters = incorrectLetters.filter(
            (i:number) => i !== currentIndex
        );
        setIncorrectLetters(updatedIncorrectLetters);
        if (currentIndex === targetText.length - 1) {
            setColoredTargetText(targetText.split("").map(() => "#aaa"));
        }
    } else {
        console.log(
            `Incorrect! Entered: ${upperCaseCurrentChar}, Expected: ${upperCaseTargetChar}`
        );
        if (upperCaseTargetChar === " ") {
            setBlinkIndex(currentIndex);
            setTimeout(() => {
                setBlinkIndex(null);
            }, 500);
        }
        setErrorCount((prevCount) => prevCount + 1);
        setCurrentIndex(lastCorrectIndex);
        setEnteredText(targetText.slice(0, lastCorrectIndex));
        const updatedIncorrectLetters = [...incorrectLetters, currentIndex];
        setIncorrectLetters(updatedIncorrectLetters);
    }
};

//KEYHANDLER MAC
export const handleKeyDownMac = (
    event: KeyboardEvent,
    isDone: boolean,
    currentIndex: number,
    targetText: string,
    setEnteredText: React.Dispatch<React.SetStateAction<string>>,
    setPressedKey: React.Dispatch<React.SetStateAction<number | null>>,
    checkInput: () => void
): void => {
    if (!isDone && currentIndex < targetText.length) {
        const key = event.key.toLowerCase();
        const keyCode = event.keyCode;

        event.preventDefault();

        const keyElement = document.querySelector(`.key.c${keyCode}`) as HTMLElement;
        if (keyElement) {
            keyElement.style.color = "#007fff";
            keyElement.style.textShadow = "0 0 10px #007fff";
            keyElement.style.margin = "7px 5px 3px";
            keyElement.style.boxShadow = "inset 0 0 25px #333, 0 0 3px #333";
            keyElement.style.borderTop = "1px solid #000";
        }

        if (keyCode === 188) {
            setEnteredText((prevText: string) => prevText + ",");
        } else if (keyCode === 190) {
            setEnteredText((prevText: string) => prevText + ".");
        } else if (/^[a-zA-Z]$/.test(key)) {
            setEnteredText((prevText: string) => prevText + key.toUpperCase());
        } else {
            setEnteredText((prevText: string) => prevText + key);
        }
    }
};

export const handleKeyUpMac = (
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
        const keyElement = document.querySelector(`.key.c${keyCode}`) as HTMLElement;

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

//KEYHANDLER WINDOWS
export const handleKeyDownWin = (
    event: KeyboardEvent,
    isDone: boolean,
    currentIndex: number,
    targetText: string,
    setEnteredText: React.Dispatch<React.SetStateAction<string>>,
    setPressedKey: React.Dispatch<React.SetStateAction<number | null>>,
    checkInput: () => void
): void => {
    if (!isDone && currentIndex < targetText.length) {
        const key = event.key.toLowerCase();
        const keyCode = event.keyCode;

        event.preventDefault();

        const keyElement = document.querySelector(
            `.keyWin.c${keyCode}`
        ) as HTMLElement;

        if (keyElement) {
            keyElement.style.boxShadow = "0px 0px 10px #14B524";
            keyElement.style.zIndex = "1000";
            keyElement.style.transition = "box-shadow 0.1s ease";
        }

        console.log(keyCode)
        // Handle letters and special characters
        if (keyCode === 188) {
            // Handle comma
            setEnteredText((prevText) => prevText + ",");
        } else if (keyCode === 190) {
            // Handle period
            setEnteredText((prevText) => prevText + ".");
        } else if (/^[a-zA-Z]$/.test(key)) {
            // Handle letters
            setEnteredText((prevText) => prevText + key.toUpperCase());
        } else {
            // Handle other keys normally
            setEnteredText((prevText) => prevText + key);
            console.log("normal")
        }
    }
};

export const handleKeyUpWin = (
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
            `.keyWin.c${keyCode}`
        ) as HTMLElement;

        if (keyElement) {
            keyElement.style.boxShadow = keyElement.dataset.initialBoxShadow || "";
            keyElement.style.zIndex = keyElement.dataset.initialZIndex || "";
            keyElement.style.transition = "";
            const currentChar = String.fromCharCode(event.which);
            const targetChar = targetText[currentIndex];
            checkInput();

        }
    }
};