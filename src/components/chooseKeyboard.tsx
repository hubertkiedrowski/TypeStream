import React, { useEffect, useState } from "react";
import "./css/chooseKeyboard.css"

const ChooseKeyboard = () => {

    return (
            <>  
                <a href="/keyboard">
                    <h1 className="chooseKeyboard">Mac Keybaord</h1>
                </a>

                <a href="/keyboardWin">
                    <h1 className="chooseKeyboard">Win Keyboard</h1>
                </a>
                
            </>
    );

};

export default ChooseKeyboard;