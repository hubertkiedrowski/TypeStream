import React from "react";
import "./css/leaderboard.css";
import Profiles from "./profiles";

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
            Challenge
          </button>
        </div>
        <span></span>
        <Profiles />
      </div>
    </>
  );
};

export default Leaderboard;
