// Beispiel: Zugriff auf myProfile in einer React-Komponente
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../reducer';
//import { Userdata } from "./fetchedUserdata";

const MyProfile = () => {

  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/myProfile', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Fehler beim Abrufen des Profils Else:', response.statusText);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen des Profils Catch:', error);
      }
    };

    fetchMyProfile();
  }, []); // Führen Sie dies nur einmal aus

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
        <div>
            <h1>Benutzerinfos</h1>
            {userData ?
                <>  
                    <p>Benutzerinformationen: {JSON.stringify(userData)}</p>
                    <br/>
                    <h2>Vorname: {userData.firstname}</h2>
                    <h2>Name: {userData.lastName}</h2>
                    <h2>Username: {userData.userName}</h2>
                    <h2>E-Mail: {userData.email}</h2>
                </>
            : 
                <p>Benutzerinformationen nicht verfügbar</p>
            }
        </div>
    
        <div>
        <button type="button" onClick={handleLogout}>Logout</button>
        </div>
    </>
  );
  
};

export default MyProfile;
