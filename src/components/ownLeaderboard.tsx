import React, { useState } from "react";
import "./css/leaderboard.css";
import MyProfiles from "./myProfile";

//const [challenge, setChallenge] = useState(0);

const handleClick = (e: { target: any }) => {
  console.log(e.target);
};
const Leaderboard = () => {
  return (
    <>
      <div className="board">
        <h1 className="leaderboard">Leaderboard</h1>

        <div className="challenge 1">
          <button onClick={handleClick} data-id="challenge 1">
            Challenges
          </button>
        </div>
        <span></span>
        <MyProfiles />
      </div>
    </>
  );
};

export default Leaderboard;
