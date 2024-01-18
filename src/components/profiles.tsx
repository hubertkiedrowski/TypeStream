import React from "react";
import "./css/leaderboard.css";
import { Userdata, Points } from "./fetchedUserdata";

const Item = () => {
  const top5Users = Userdata();
  const points = Points();

  return (
    <>
      {top5Users.map((user, index) => (
        <div className="flex" key={index}>
          <div className="item">
            <img
              src="https://www.amaraventures.in/assets/uploads/testimonial/user.png"
              alt="picture"
            />

            <div className="info">
              <h3 className="name text-dark">{user?.userName}</h3>
              <span>{"Score: " + points?.[index].score}</span>
            </div>
          </div>
          <div className="item">
            <span>{"Time Played: " + points?.[index].timePlayed}</span>
          </div>
        </div>
      ))}
    </>
  );
};

const Profiles = () => {
  return (
    <>
      <div id="profile">{Item()}</div>
    </>
  );
};

export default Profiles;
