import React, { useEffect, useState } from "react";
import "./css/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../reducer';

const Navbar = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.loggedIn);
  const user = useSelector((state: RootState) => state.login.user);

  const navigate = useNavigate();
  
  const handleLogout = async () => {

    try{

        const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include',
        });
        if(response.ok){
            dispatch(logout());
            navigate('/login');
        }else {
            console.log("Fehler beim Logout");
        }
        
    } catch(error){
        console.error('Fehler beim Verarbeiten des Klicks:', error);
    }
    
  }


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
            
            {isLoggedIn ?
            <>
              <li className="schrift">
                <Link to="/myProfile" className="schrift">
                  MyProfile {user?.userName}
                </Link>
              </li>
            </>
            :
              <li className="schrift">
                 <Link to="/login" className="schrift">
                  Login
                </Link>
              </li>
            }
          </ul>
        </div>
        <div>
          {isLoggedIn? 
            <button onClick={handleLogout}>Logout</button>
            :
            <></>
          }
        </div>
      </nav>
    </>
  );
};

export default Navbar;
