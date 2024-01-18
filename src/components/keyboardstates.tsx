// useKeyboardState.js
import { useEffect, useState } from "react";
import { handleKeyDown, handleKeyUp, loadNextLines, checkInput } from "./keyboardfunctions";

const useKeyboardState = () => {
    const [targetText, setTargetText] = useState("");
    const [pressedKey, setPressedKey] = useState(null);
    const [enteredText, setEnteredText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [lastCorrectIndex, setLastCorrectIndex] = useState(0);
    const [coloredTargetText, setColoredTargetText] = useState([]);
    const [incorrectLetters, setIncorrectLetters] = useState([]);
    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [nextLine, setNextLine] = useState(1);
    const [isDone, setIsDone] = useState(false);
    const [blinkIndex, setBlinkIndex] = useState(null);

    useEffect(() => {
        fetch("./src/components/challenge1.txt")
            .then((response) => response.text())
            .then((data) => {
                const linesArray = data.split("\n");
                setLines(linesArray);
                setTargetText(linesArray[0]);
                setColoredTargetText(linesArray[0].split("").map(() => "#aaa"));
            })
            .catch((error) =>
                console.error("Fehler beim Lesen der Datei:", error)
            );

    }, []);

    useEffect(() => {
        if (currentIndex === targetText.length) {
            console.log("Du hast alles korrekt eingegeben!");
            const allLinesEntered = nextLine === lines.length;
            if (allLinesEntered) {
                console.log("Alle Zeilen fertig!");
                setTargetText("You're done!");
                setIsDone(true);
            } else {
                loadNextLines(lines, nextLine, setTargetText, setEnteredText, setLastCorrectIndex, setCurrentIndex, setColoredTargetText, setCurrentLine, setNextLine);
            }
        }
    }, [currentIndex, targetText, nextLine, lines]);

    useEffect(() => {
        const handleKeyDownListener = (event) =>
            handleKeyDown(
                event,
                isDone,
                currentIndex,
                targetText,
                setEnteredText,
                setPressedKey,
                () => checkInput(
                    event.key,
                    targetText[currentIndex],
                    currentIndex,
                    targetText,
                    coloredTargetText,
                    incorrectLetters,
                    lastCorrectIndex,
                    setEnteredText,
                    setCurrentIndex,
                    setLastCorrectIndex,
                    setColoredTargetText,
                    setIncorrectLetters,
                    setBlinkIndex,
                    setErrorCount
                )
            );

        const handleKeyUpListener = (event) =>
            handleKeyUp(
                event,
                isDone,
                currentIndex,
                targetText,
                setEnteredText,
                setPressedKey,
                () => checkInput(
                    event.key,
                    targetText[currentIndex],
                    currentIndex,
                    targetText,
                    coloredTargetText,
                    incorrectLetters,
                    lastCorrectIndex,
                    setEnteredText,
                    setCurrentIndex,
                    setLastCorrectIndex,
                    setColoredTargetText,
                    setIncorrectLetters,
                    setBlinkIndex,
                    setErrorCount
                )
            );

        document.addEventListener("keydown", handleKeyDownListener);
        document.addEventListener("keyup", handleKeyUpListener);

        return () => {
            document.removeEventListener("keydown", handleKeyDownListener);
            document.removeEventListener("keyup", handleKeyUpListener);
        };
    }, [isDone, currentIndex, targetText, setEnteredText, setPressedKey, coloredTargetText, incorrectLetters, lastCorrectIndex, setColoredTargetText, setIncorrectLetters, setBlinkIndex, setErrorCount]);

    return {
        targetText,
        pressedKey,
        enteredText,
        currentIndex,
        errorCount,
        lastCorrectIndex,
        coloredTargetText,
        incorrectLetters,
        lines,
        currentLine,
        nextLine,
        isDone,
        blinkIndex
    };
};

export default useKeyboardState;
