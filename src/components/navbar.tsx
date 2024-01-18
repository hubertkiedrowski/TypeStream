import React, { useState } from "react";
import "./css/navbar.css";
import { Link } from "react-router-dom";
import Login from './login';
interface NavbarProps {
  loggedInStatus: boolean;
  setLoggedInStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ loggedInStatus, setLoggedInStatus }) => {

  return (
    <>
      <nav>
        <div className="container">
          <ul className="container1">
            <li className="schrift">
              <Link to="/" className="schrift">
                Home
              </Link>
            </li>

            <li className="schrift">
              <Link to="/chooseKeyboard" className="schrift">
                Keyboard
              </Link>
            </li>

            <li className="schrift">
              <Link to="/leaderboard" className="schrift">
                Leaderboard
              </Link>
            </li>

            <li className="schrift">
              <Link to="/ueberuns" className="schrift">
                Über uns
              </Link>
            </li>
            
            {loggedInStatus ?
              <li className="schrift">
                <Link to="/myProfile" className="schrift">
                  MyProfile
                </Link>
              </li>
            :
              <li className="schrift">
                 <Link to="/login" className="schrift">
                  Login
                </Link>
              </li>
            }

          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
