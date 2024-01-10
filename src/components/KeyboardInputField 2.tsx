import React, { useState } from "react";
import "./css/styleKeyboardInputField.css";
import { Link } from "react-router-dom";

const KeyboardInputField = () => {
  const [userSampleInput, setUserSampleInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const currentInput = event.target.value;
    const lastTypedChar = currentInput.slice(-1);
    setUserSampleInput(lastTypedChar);

    console.log(lastTypedChar);
  };

  return (
    <>
      <label htmlFor="InputField">Input mit durchgängigem loggen:</label>
      <input
        type="text"
        id="InputField"
        name="InputField"
        value={userSampleInput}
        onChange={handleInputChange}
      />
      <Link to="/keyboard">
        <button>Navigiere zu Keyboard</button>
      </Link>
    </>
  );
};
export default KeyboardInputField;
