import React from "react";
import "./css/chooseKeyboard.css";
import { Link, useNavigate } from "react-router-dom";

const ChooseKeyboard = () => {
  const navigate = useNavigate();

  const onClickMac = () => {
    navigate("/keyboard");
  };

  const onClickWin = () => {
    navigate("/keyboardWin");
  };

  return (
    <>
      <div className="keyButton">
        <button onClick={onClickMac}>Mac-Keyboard</button>
      </div>

      <div className="keyButton">
        <button onClick={onClickWin}>Win-Keyboard</button>
      </div>
    </>
  );
};

export default ChooseKeyboard;
