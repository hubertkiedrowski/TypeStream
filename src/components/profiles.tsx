import React, { useEffect, useState } from "react";
import "./css/leaderboard.css";

import { Point } from "@prisma/client";
import { createUserDBEntry, useFetchPoints } from "./api";

const Item = () => {
  const [top5Users, setTop5Users] = useState<any>(null);
  const [points, setPoints] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/users/`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        setTop5Users(r);
        console.log(top5Users)
      })


    fetch(`http://localhost:3000/points/leaderboard/5`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        setPoints(r);
      })

    // createUserDBEntry()
  }, []);



  return (
    <>
      {top5Users && top5Users.map((user: { userName: string }, index: number) => (
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
