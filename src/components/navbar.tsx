import React, { useEffect, useState } from "react";
import "./css/navbar.css";
import { Link } from "react-router-dom";
import Login from './login';

const Navbar = () => {

  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  useEffect(() => {
    // Prüfen Sie die Sitzung, wenn die Komponente montiert wird
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:3000/myProfile', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const user = await response.json();
          setLoggedInUser(user);
          setLoggedInStatus(true);
        } else {
          // Benutzer ist nicht eingeloggt
          setLoggedInUser(null);
          setLoggedInStatus(false);
        }
      } catch (error) {
        console.error('Fehler beim Überprüfen der Sitzung:', error);
      }
    };

    checkSession();
  }, []);

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
                  MyProfile {loggedInUser.username}
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
