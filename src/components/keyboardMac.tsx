import React, { useEffect, useState } from "react";
import "./css/keyboard.css";
import {loadNextLines, handleKeyDownMac, handleKeyUpMac, checkInput} from "./keyboardfunctions";

const KeyboardMac = () => {
  const [targetText, setTargetText] = useState<string>("");
  const [pressedKey, setPressedKey] = useState<number | null>(null);
  const [enteredText, setEnteredText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [lastCorrectIndex, setLastCorrectIndex] = useState<number>(0);
  const [coloredTargetText, setColoredTargetText] = useState<string[]>(targetText.split("").map(() => "#aaa"));
  const [incorrectLetters, setIncorrectLetters] = useState<number[]>([]);
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [nextLine, setNextLine] = useState<number>(1);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [blinkIndex, setBlinkIndex] = useState<number | null>(null);


  //Lade Challenge
  useEffect(() => {
    fetch("./src/components/challenge1.txt")
        .then((response) => response.text())
        .then((data) => {
          const linesArray = data.split("\n");
          setLines(linesArray);
          setTargetText(linesArray[0]);
          setColoredTargetText(linesArray[0].split("").map(() => "#262626"));
        })
        .catch((error) =>
            console.error("Fehler beim Lesen der Datei:", error)
        );

  }, []);

  //Check ob Challenge geschafft und laden der Lines
  useEffect(() => {
    if (currentIndex === targetText.length) {
      console.log("Du hast alles korrekt eingegeben!");
      const allLinesEntered = nextLine === lines.length;
      if (allLinesEntered) {
        console.log("Alle Zeilen fertig!");
        setTargetText("You're done!");
        setIsDone(true);
      } else {
        loadNextLines(
            lines,
            nextLine,
            setTargetText,
            setEnteredText,
            setLastCorrectIndex,
            setCurrentIndex,
            setColoredTargetText,
            setCurrentLine,
            setNextLine
        );
      }
    }
  }, [currentIndex, targetText, nextLine, lines]);

  //Aufrufen der Funktionen/Listener
  useEffect(() => {
    const handleKeyDownListenerMac = (event: KeyboardEvent) =>
        handleKeyDownMac(event, isDone, currentIndex, targetText, setEnteredText, setPressedKey, () =>
            checkInput(
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

    const handleKeyUpListenerMac = (event: KeyboardEvent) =>
        handleKeyUpMac(event, isDone, currentIndex, targetText, setEnteredText, setPressedKey, () =>
            checkInput(
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

    document.addEventListener("keydown", handleKeyDownListenerMac);
    document.addEventListener("keyup", handleKeyUpListenerMac);

    return () => {
      document.removeEventListener("keydown", handleKeyDownListenerMac);
      document.removeEventListener("keyup", handleKeyUpListenerMac);
    };
  }, [isDone, currentIndex, targetText, setEnteredText, setPressedKey]);


  return (
      <>
        {/* Fehler-Count */}
        <div style={{ textAlign: "center", margin: "10px", fontSize: "25px", color: "PaleVioletRed", fontWeight: "bold"}}>
          Fehler: {errorCount}
        </div>

        {/* Check, ob Text vollstänig eingegeben, wenn nicht wird jeder Index aus dem Text ein Span-Element */}
        {!isDone ? (
            <div style={{ color: "Grey", fontSize: "30px" }}>
              {targetText.split("").map((char, index) => (
                  <span
                      key={index}
                      style={{
                        backgroundColor: blinkIndex === index ? "PaleVioletRed" : "transparent",
                        color: incorrectLetters.includes(index) ? "PaleVioletRed" : coloredTargetText[index],
                      }}
                  >
                    {/* Wichtig für Darstellung */}
                    {char === " " ? "\u00A0" : char}
            </span>
              ))}
              {/* Vorschau für nächste Zeile */}
              <div style={{ color: "DarkSlateGray", fontSize: "28px" }}>{lines[nextLine]}</div>
            </div>
        ) : (
            <div style={{ color: "LightGoldenRodYellow", fontSize: "30px", fontWeight: "bold" }}>{targetText}</div>
        )}

        <div id="keyboard">
          <ul className="cf">
            <li>
              <a href="#" className="key c27 fn">
                <span id="esc">esc</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c112 fn">
                <span>F1</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c113 fn">
                <span>F2</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c114 fn">
                <span>F3</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c115 fn">
                <span>F4</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c116 fn">
                <span>F5</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c117 fn">
                <span>F6</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c118 fn">
                <span>F7</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c119 fn">
                <span>F8</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c120 fn">
                <span>F9</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c121 fn">
                <span>F10</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c122 fn">
                <span>F11</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c123 fn">
                <span>F12</span>
              </a>
            </li>
            <li>
              <a href="#" className="key fn">
                <span>Eject</span>
              </a>
            </li>
          </ul>
          <ul className="cf" id="numbers">
            <li>
              <a href="#" className="key c192">
                <b>~</b>
                <span>`</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c49">
                <b>!</b>
                <span>1</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c50">
                <b>@</b>
                <span>2</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c51">
                <b>#</b>
                <span>3</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c52">
                <b>$</b>
                <span>4</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c53">
                <b>%</b>
                <span>5</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c54">
                <b>^</b>
                <span>6</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c55">
                <b>&amp;</b>
                <span>7</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c56">
                <b>*</b>
                <span>8</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c57">
                <b>(</b>
                <span>9</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c48">
                <b>)</b>
                <span>0</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c189 alt">
                <b>_</b>
                <span>-</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c187">
                <b>+</b>
                <span>=</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c46" id="delete">
                <span>Delete</span>
              </a>
            </li>
          </ul>
          <ul className="cf" id="qwerty">
            <li>
              <a href="#" className="key c9" id="tab">
                <span>tab</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c81">
                <span>q</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c87">
                <span>w</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c69">
                <span>e</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c82">
                <span>r</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c84">
                <span>t</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c90">
                <span>z</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c85">
                <span>u</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c73">
                <span>i</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c79">
                <span>o</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c80">
                <span>p</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c219 alt">
                <b>{ }</b>
                <span>[</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c221 alt">
                <b>foo</b>
                <span>]</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c220 alt">
                <b>|</b>
                <span>\</span>
              </a>
            </li>
          </ul>
          <ul className="cf" id="asdfg">
            <li>
              <a href="#" className="key c20 alt" id="caps">
                <b></b>
                <span>caps lock</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c65">
                <span>a</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c83">
                <span>s</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c68">
                <span>d</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c70">
                <span>f</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c71">
                <span>g</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c72">
                <span>h</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c74">
                <span>j</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c75">
                <span>k</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c76">
                <span>l</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c186 alt">
                <b>:</b>
                <span>;</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c222 alt">
                <b>"</b>
                <span>'</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c13 alt" id="enter">
                <span>return</span>
              </a>
            </li>
          </ul>
          <ul className="cf" id="zxcvb">
            <li>
              <a href="#" className="key c16 shiftleft">
                <span>Shift</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c89">
                <span>y</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c88">
                <span>x</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c67">
                <span>c</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c86">
                <span>v</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c66">
                <span>b</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c78">
                <span>n</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c77">
                <span>m</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c188 alt">
                <b>&lt;</b>
                <span>,</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c190 alt">
                <b>&gt;</b>
                <span>.</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c191 alt">
                <b>?</b>
                <span>/</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c16 shiftright">
                <span>Shift</span>
              </a>
            </li>
          </ul>
          <ul className="cf" id="bottomrow">
            <li>
              <a href="#" className="key" id="fn">
                <span>fn</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c17" id="control">
                <span>control</span>
              </a>
            </li>
            <li>
              <a href="#" className="key option" id="optionleft">
                <span>option</span>
              </a>
            </li>
            <li>
              <a href="#" className="key command" id="commandleft">
                <span>command</span>
              </a>
            </li>
            <li>
              <a href="#" className="key c32" id="spacebar"></a>
            </li>
            <li>
              <a href="#" className="key command" id="commandright">
                <span>command</span>
              </a>
            </li>
            <li>
              <a href="#" className="key option" id="optionright">
                <span>option</span>
              </a>
            </li>
            <ol className="cf">
              <li>
                <a href="#" className="key c37" id="left">
                  <span>&#9666;</span>
                </a>
              </li>
              <li>
                <a href="#" className="key c38" id="up">
                  <span>&#9652;</span>
                </a>
                <a href="#" className="key c40" id="down">
                  <span>&#9662;</span>
                </a>
              </li>
              <li>
                <a href="#" className="key c39" id="right">
                  <span>&#9656;</span>
                </a>
              </li>
            </ol>
          </ul>
        </div>
        <cite> </cite>
      </>
  );
};

export default KeyboardMac;
