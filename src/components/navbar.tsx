import React, { useEffect, useState } from "react";
import "./css/navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

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
  }, [navigate]);
  
  const handleLogout = async () => {

    try{

        const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include',
        });
        if(response.ok){
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
            
            {loggedInStatus ?
            <>
              <li className="schrift">
                <Link to="/myProfile" className="schrift">
                  MyProfile {loggedInUser.username}
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
          {loggedInStatus? 
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
