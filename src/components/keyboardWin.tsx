/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import "./css/keyboardWin.css";

const KeyboardWin = () => {

    const [pressedKey, setPressedKey] = useState(null);

    const handleKeyDown = (event: { keyCode: any; }) => {

        const keyCode = event.keyCode;
        setPressedKey(keyCode);
        const keyElement = document.querySelector(`.keyWin.c${keyCode}`) as HTMLElement;

        if (keyElement) {
            keyElement.style.color = "#007fff";
            keyElement.style.textShadow = "0 0 5px #007fff";
            keyElement.style.marginTop = "-3px";
            keyElement.style.boxShadow = "inset 0 0 15px #333, 0 0 3px #333";
            keyElement.style.borderTop = "1px solid #000";
        }

    }; 

    const handleKeyUp = (event: { keyCode: any; }) => {
        const keyCode = event.keyCode;
        console.log(keyCode);
        const keyElement = document.querySelector(`.keyWin.c${keyCode}`) as HTMLElement;
        
        if (keyElement) {
            keyElement.style.color = "#fff";
            keyElement.style.background = "#333";
            keyElement.style.textShadow = "";
            keyElement.style.marginTop = "0px";
            keyElement.style.marginLeft = "2px";
            keyElement.style.marginBottom = "2px";
            keyElement.style.boxShadow = "";     
            keyElement.style.borderTop = "";

            
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

    return (
        <>

            <div className="cable">
            </div>
            <div className="keyboard">

                <div className="section-a">
                    <div className="keyWin function space1">
                        Esc
                    </div>

                    <div className="keyWin function">
                        F1
                    </div>
                    <div className="keyWin function">
                        F2
                    </div>
                    <div className="keyWin function">
                        F3
                    </div>

                    <div className="keyWin function space2">
                        F4
                    </div>
                    <div className="keyWin function">
                        F5
                    </div>
                    <div className="keyWin function">
                        F6
                    </div>
                    <div className="keyWin function">
                        F7
                    </div>
                    <div className="keyWin function space2">
                        F8
                    </div>

                    <div className="keyWin function">
                        F9
                    </div>
                    <div className="keyWin function">
                        F10
                    </div>
                    <div className="keyWin function">
                        F11
                    </div>
                    <div className="keyWin function">
                        F12
                    </div>


                    <div className="keyWin c192 num dual">
                        ^<br />°
                    </div>

                    <div className="keyWin c49 num dual">
                        !<br />1
                    </div>
                    <div className="keyWin c50 num dual">
                        @<br />2
                    </div>
                    <div className="keyWin c51 num dual">
                        #<br />3
                    </div>
                    <div className="keyWin c52 num dual">
                        $<br />4
                    </div>
                    <div className="keyWin c53 num dual">
                        %<br />5
                    </div>
                    <div className="keyWin c54 num dual">
                        ^<br />6
                    </div>
                    <div className="keyWin c55 num dual">
                        &<br />7
                    </div>
                    <div className="keyWin c56 num dual">
                        *<br />8
                    </div>
                    <div className="keyWin c57 num dual">
                        (<br />9
                    </div>
                    <div className="keyWin c48 num dual">
                        )<br />0
                    </div>
                    <div className="keyWin c191 num dual">
                        ß <br /> ?
                    </div>
                    <div className="keyWin num dual">
                        ´ `
                    </div>
                    <div className="keyWin backspace">
                        Backspace
                    </div>


                    <div className="keyWin tab">
                        Tab
                    </div>

                    <div className="keyWin c81 letter">
                        Q
                    </div>
                    <div className="keyWin c87 letter">
                        W
                    </div>
                    <div className="keyWin c69 letter">
                        E
                    </div>
                    <div className="keyWin c82 letter">
                        R
                    </div>
                    <div className="keyWin c84 letter">
                        T
                    </div>
                    <div className="keyWin c90 letter">
                        Z
                    </div>
                    <div className="keyWin c85 letter">
                        U
                    </div>
                    <div className="keyWin c73 letter">
                        I
                    </div>
                    <div className="keyWin c79 letter">
                        O
                    </div>
                    <div className="keyWin c80 letter">
                        P
                    </div>
                    <div className="keyWin c219 letter">
                        Ü
                    </div>
                    <div className="keyWin dual">
                        *<br />+ ~
                    </div>
                    <div className="keyWin c220 letter dual slash">
                        |<br />\
                    </div>
                    <div className="keyWin caps">
                        Caps<br />Lock
                    </div>
                    <div className="keyWin c65 letter">
                        A
                    </div>
                    <div className="keyWin c83 letter">
                        S
                    </div>
                    <div className="keyWin c68 letter">
                        D
                    </div>
                    <div className="keyWin c70 letter">
                        F
                    </div>
                    <div className="keyWin c71 letter">
                        G
                    </div>
                    <div className="keyWin c72 letter">
                        H
                    </div>
                    <div className="keyWin c74 letter">
                        J
                    </div>
                    <div className="keyWin c75 letter">
                        K
                    </div>
                    <div className="keyWin c76 letter">
                        L
                    </div>
                    <div className="keyWin c59 letter">
                        Ö
                    </div>
                    <div className="keyWin c222 letter">
                        Ä
                    </div>
                    <div className="keyWin enter">
                        Enter
                    </div>

                    <div className="keyWin c16 shift left">
                        Shift
                    </div>
                    <div className="keyWin dual">
                        {'<'}
                        <br/>
                        {'>'} |
                    </div>
                    <div className="keyWin c89 letter">
                        Y
                    </div>
                    <div className="keyWin c88 letter">
                        X
                    </div>
                    <div className="keyWin c67 letter">
                        C
                    </div>
                    <div className="keyWin c86 letter">
                        V
                    </div><div className="keyWin c66 letter">
                        B
                    </div><div className="keyWin c78 letter">
                        N
                    </div><div className="keyWin c77 letter">
                        M
                    </div>
                    <div className="keyWin c188 dual">
                        , <br /> ;
                    </div>
                    <div className="keyWin c190 dual">
                        . <br /> :
                    </div>
                    <div className="keyWin c109 dual">
                    _<br />-
                    </div>
                    <div className="keyWin c16 shift right">
                        Shift
                    </div>
                    <div className="keyWin ctrl">
                        Strg
                    </div>
                    <div className="keyWin other">
                        Win
                    </div>
                    <div className="keyWin other">
                        Alt
                    </div>
                    <div className="keyWin c32 space">

                    Space

                    </div>
                    <div className="keyWin other">
                        alt gr
                    </div>
                    <div className="keyWin other">
                        Win
                    </div>
                    <div className="keyWin other">
                        Prnt
                    </div>
                    <div className="keyWin ctrl">
                        Strg
                    </div>
                </div>

                <div className="section-b">
                    <div className="keyWin function small">
                        Prnt Scrn
                    </div>
                    <div className="keyWin function small">
                        Scroll Lock
                    </div>
                    <div className="keyWin function small">
                        Pause Break
                    </div>

                    <div className="sec-func">
                        <div className="keyWin leftKeys">
                            Insert
                        </div>
                        <div className="keyWin leftKeys">
                            Home
                        </div>
                        <div className="keyWin leftKeys">
                            Up
                        </div>
                        <div className="keyWin leftKeys">
                            Del
                        </div>
                        <div className="keyWin leftKeys">
                            End
                        </div>
                        <div className="keyWin leftKeys">
                            Down
                        </div>

                        <div className="arrows">
                            <div className="keyWin hidden">

                            </div>
                            <div className="keyWin c38">
                                ^
                            </div>
                            <div className="keyWin hidden">

                            </div>
                            <div className="keyWin c37">
                                {'<'}
                            </div>
                            <div className="keyWin c40">
                                v
                            </div>
                            <div className="keyWin c39">
                                {'>'}
                            </div>
                        </div>
                    </div>


                </div>

            </div>

        </>
    );

};

export default KeyboardWin;