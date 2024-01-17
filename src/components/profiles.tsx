import React from "react";
import "./css/leaderboard.css";
import { Link } from "react-router-dom";
import { fetchPoints, fetchUserdata } from "./api";
import { User } from "@prisma/client";
import Userdata from "./userdata";

const Item = () => {
  //Userdata();
  //const points = fetchPoints("/points/leaderboard/5");
  return (
    <>
      {
        <div className="flex">
          <div className="item">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60 "
              alt="picture"
            />

            <div className="info">
              <h3 className="name text-dark">TestName</h3>
              <span>TestLocation</span>
            </div>
          </div>
          <div className="item">
            <span>TestScore</span>
          </div>
        </div>
      }
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
