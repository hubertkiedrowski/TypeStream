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
        event.preventDefault();

        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;

        const keyElement = document.querySelector(`.key.c${keyCode}`) as HTMLElement;
        if (keyElement) {
            keyElement.style.color = "#007fff";
            keyElement.style.textShadow = "0 0 10px #007fff";
            keyElement.style.margin = "7px 5px 3px";
            keyElement.style.boxShadow = "inset 0 0 25px #333, 0 0 3px #333";
            keyElement.style.borderTop = "1px solid #000";
        }

        if (keyCode === 188) {
            setEnteredText((prevText: string) => (prevText + ",").toUpperCase());
        } else if (keyCode === 190) {
            setEnteredText((prevText: string) => (prevText + ".").toUpperCase());
        } else if (/^[a-zA-Z]$/.test(event.key)) {
            setEnteredText((prevText: string) => (prevText + event.key.toUpperCase()));
        } else {
            setEnteredText((prevText: string) => (prevText + event.key).toUpperCase());
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
        setColoredTargetText(lines[nextLine].split("").map(() => "#aaa"));
        setCurrentLine(nextLine);
        setNextLine(nextLine + 1);
    } else {
        setCurrentLine(0);
        setNextLine(1);
    }
};


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
        console.log(`Correct! Entered: ${upperCaseCurrentChar}`);
        const updatedColors = coloredTargetText.slice();
        updatedColors[currentIndex] = "LightGreen";
        setColoredTargetText(updatedColors);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setLastCorrectIndex(currentIndex + 1);
        const updatedIncorrectLetters = incorrectLetters.filter(
            (i: number) => i !== currentIndex
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
