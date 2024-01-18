import React, { useState } from "react";
import "./css/leaderboard.css";
import Profiles from "./profiles";
import { Link } from "react-router-dom";

//const [challenge, setChallenge] = useState(0);

const handleClick = (e: { target: any }) => {
  console.log(e.target);
};
const Leaderboard = () => {
  return (
    <>
      <div className="board">
        <h1 className="leaderboard">Leaderboard</h1>

        <div className="challenge">
          <button onClick={handleClick} data-id="challenge 1">
            Challenge 1
          </button>
          <button onClick={handleClick} data-id="challenge 2">
            Challenge 2
          </button>
        </div>
        <span></span>
        <Profiles />
      </div>
    </>
  );
};

export default Leaderboard;
