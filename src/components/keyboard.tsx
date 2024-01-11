import React, { useEffect, useState } from "react";
import "./css/keyboard.css";
import { fetchPoints, fetchUserdata } from "./api";
import {
  loadNextLines,
  checkInput,
  handleKeyDown,
  handleKeyUp,
} from "./keyboardFunctions";

const Keyboard = () => {
  const [targetText, setTargetText] = useState<string>("");
  const [pressedKey, setPressedKey] = useState<number | null>(null);
  const [enteredText, setEnteredText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [lastCorrectIndex, setLastCorrectIndex] = useState<number>(0);
  const [coloredTargetText, setColoredTargetText] = useState<string[]>(
      targetText.split("").map(() => "#aaa")
  );
  const [incorrectLetters, setIncorrectLetters] = useState<number[]>([]);
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [nextLine, setNextLine] = useState<number>(1);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [blinkIndex, setBlinkIndex] = useState<number | null>(null);


  // hier ein beispiel wird auf die userdaten zugegriffen 
  // mit der userid also 1 ,2 usw findet man die nutzer.


  const userData = fetchUserdata("/users/1");
  console.log(userData);


  // hier kann man auf die punktestände zugreifen
  // mit der id hinter leaderboard kann man sich die topX der besten 
  // punkteständ anzeigen lassen

  const points = fetchPoints("/points/leaderboard/2");
  console.log(points);
  console.log(points?.[0].userId);

  // grade wird alles noch mehrfach geloggt , da weiß 
  //ich aber zurzeit noch keine lösubng 



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



  const loadNextLines = (): void => {
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

  useEffect(() => {
    if (currentIndex === targetText.length) {
      console.log("Du hast alles korrekt eingegeben!");
      const allLinesEntered = nextLine === lines.length;
      if (allLinesEntered) {
        console.log("Alle Zeilen fertig!");
        setTargetText("You're done!");
        setIsDone(true);
      } else {
        loadNextLines();
      }
    }
  }, [currentIndex, targetText, nextLine, lines]);

  const checkInput = (): void => {
    const currentChar = enteredText[currentIndex];
    const targetChar = targetText[currentIndex];
    if (currentChar === targetChar) {
      console.log(`Richtig! Eingegeben: ${currentChar}`);
      const updatedColors = coloredTargetText.slice();
      updatedColors[currentIndex] = "LightGreen";
      setColoredTargetText(updatedColors);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setLastCorrectIndex(currentIndex + 1);
      const updatedIncorrectLetters = incorrectLetters.filter(
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
      // Überprüfe, ob ein Leerzeichen erwartet wird
      if (targetChar === " ") {
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
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!isDone && currentIndex < targetText.length) {
        const key = event.key.toLowerCase(); // Convert key to lowercase
        const keyCode = event.keyCode;

        // Prevent default behavior for all keys
        event.preventDefault();

        const keyElement = document.querySelector(`.key.c${keyCode}`) as HTMLElement;
        if (keyElement) {
          keyElement.style.color = "#007fff";
          keyElement.style.textShadow = "0 0 10px #007fff";
          keyElement.style.margin = "7px 5px 3px";
          keyElement.style.boxShadow = "inset 0 0 25px #333, 0 0 3px #333";
          keyElement.style.borderTop = "1px solid #000";
        }

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
        }
      }
    };
    const handleKeyUp = (event: KeyboardEvent): void => {
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

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isDone, currentIndex, targetText, setEnteredText, setPressedKey, checkInput]);

  /*
  const handleKeyDown = (event: { keyCode: any; }) => {

    const keyCode = event.keyCode;
    setPressedKey(keyCode);
    const keyElement = document.querySelector(`.key.c${keyCode}`) as HTMLElement;
    if (keyElement) {
      keyElement.style.color = "#007fff";
      keyElement.style.textShadow = "0 0 10px #007fff";
      keyElement.style.margin = "7px 5px 3px";
      keyElement.style.boxShadow = "inset 0 0 25px #333, 0 0 3px #333";
      keyElement.style.borderTop = "1px solid #000";
    }
  };

  const handleKeyUp = async (event: { keyCode: any; }) => {
    const keyCode = event.keyCode;
    const keyElement = document.querySelector(`.key.c${keyCode}`) as HTMLElement;

    if (keyElement) {
      keyElement.style.color = "#aaa";
      keyElement.style.textShadow = "none";
      keyElement.style.margin = "5px 5px 3px";
      keyElement.style.boxShadow = "0 0 25px #333, 0 0 3px #333";
      keyElement.style.boxShadow = "inset 0 0 25px #333, 0 0 3px #333";

      keyElement.style.borderTop = "1px solid #000";
      setPressedKey(keyCode);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKey]);
  
  */

  return (
    <>

      <>
        <div style={{ textAlign: "center", margin: "10px", fontSize: "20px", color: "PaleVioletRed" }}>
          Fehler: {errorCount}
        </div>

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
            {char === " " ? "\u00A0" : char}
          </span>
              ))}
              {/* Füge hier das Leerzeichen am Ende der Textzeile hinzu */}
              {targetText[targetText.length - 1] === " " && (
                  <span
                      style={{
                        backgroundColor: blinkIndex === targetText.length - 1 ? "PaleVioletRed" : "transparent",
                        color: incorrectLetters.includes(targetText.length - 1) ? "PaleVioletRed" : "#aaa",
                      }}
                  >
            {" "}
          </span>
              )}
              <div style={{ color: "DimGrey", fontSize: "28px" }}>{lines[nextLine]}</div>
            </div>
        ) : (
            <div style={{ color: "Khaki", fontSize: "30px" }}>{targetText}</div>
        )}
      </>
      
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

export default Keyboard;
