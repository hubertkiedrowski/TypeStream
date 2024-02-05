import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../reducer';
import "./css/leaderboard.css";
import { getSessionUserID, getUserPointsApi } from "./api";
//import { Userdata } from "./fetchedUserdata";

const Item = () => {
  const [pointsFromUser, setPointsFromUser] = useState<any>(null);
  const [UserId, setUserId] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getSessionUserID(); 
        setUserId(userId);
        console.log("OwnUserId", userId, typeof userId);

        const fetchedPoints = await getUserPointsApi(userId);
        console.log("points from user", fetchedPoints);

        if (fetchedPoints === undefined) {
          throw new Error("FetchedPoints gleich null")
        }else {
          setPointsFromUser(fetchedPoints);
          console.log("points from user 2", fetchedPoints);
        }

      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten", error);
      }
    };

    fetchData();
  }, []);
  
    return (
      <>
        {pointsFromUser && Object.values(pointsFromUser).map((point: any, index: number) => (
          <div className="flex" key={index}>
            <div className="item">
              <img
                src="https://www.amaraventures.in/assets/uploads/testimonial/user.png"
                alt="picture"
              />
              <div className="info">
              <h3 className="name text-dark">{pointsFromUser?.[index].user.userName}</h3>
              <span>{"Score: " + pointsFromUser?.[index].score}</span>
              </div>
            </div>
            <div className="item">
              <span>{"Time Played: " + pointsFromUser?.[index].timePlayed}</span>
            </div>
          </div>
        ))}
      </>
    );
}

const MyProfile = () => {

  return (
    <>
      <div id="profile">{Item()}</div>
    </>
  );
  };

export default MyProfile;