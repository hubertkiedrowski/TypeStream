import React, { useEffect, useState } from "react";
import "./css/leaderboard.css";

const Item = () => {
  const [points, setPoints] = useState<any>(null);

  useEffect(() => {

    fetch(`http://localhost:3000/points/leaderboard/5`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        setPoints(r);
      });
  }, []);

  return (
    <>
      {points && points.map((user: { userName: string }, index: number) => (
        <div className="flex" key={index}>
          <div className="item">
            <img
              src="https://www.amaraventures.in/assets/uploads/testimonial/user.png"
              alt="picture"
            />
            <div className="info">
              <h3 className="name text-dark">{points?.[index].user.userName}</h3>
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
