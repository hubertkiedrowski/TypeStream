import React, { useEffect, useState } from "react";
import "./css/leaderboard.css";
import { useFetchBestPlayersByPoints, useFetchJson, useUserDataApi } from "./api";


const Item = () => {
  const [top5Users, setTop5Users] = useState<any[] | undefined>();

  const fetchedUsers = useFetchBestPlayersByPoints(5);

  useEffect(() => {
    if (fetchedUsers) {
      setTop5Users(fetchedUsers);
    }
  }, [fetchedUsers]);

  return (
    <>
      {top5Users && top5Users.map((user, index) => (
        <div className="flex" key={index}>
          <div className="item">
            <img
              src="https://www.amaraventures.in/assets/uploads/testimonial/user.png"
              alt="picture"
            />
            <div className="info">
              <h3 className="name text-dark">{user.user?.userName}</h3>
              <span>{"Score: " + user.score}</span>
            </div>
          </div>
          <div className="item">
            <span>{"Time Played: " + user.timePlayed}</span>
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
