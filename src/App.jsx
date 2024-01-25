import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import KeyboardMac from "./components/keyboardMac";
import KeyboardWin from "./components/keyboardWin";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Ueberuns from "./components/ueberUns";
import Login from "./components/login";
import ChooseKeyboard from "./components/chooseKeyboard";
import Regist from "./components/regist";
import LoginErfolgreich from "./components/loginErfolgreich";
import Leaderboard from "./components/leaderboard";
import MyProfile from "./components/myProfile";

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [some, setSome] = useState(0);

  let i = 0;

  useEffect(() => {
    const checkSession = async () => {
      console.log("Checksession ausgeführt")
      try {
        const response = await fetch('http://localhost:3000/myProfile', {
          method: 'GET',
          credentials: 'include',
        });
    
        if (response.ok) {
          const user = await response.json();
          setLoggedIn(true);
          setUser(user);
        } else {
          // Benutzer ist nicht eingeloggt
          setLoggedIn(false);
          setUser(null);
        }
    
      } catch (error) {
        console.error('Fehler bei Routen', error);
      }
    };
    
    checkSession();
  }, [some]);

  const updateState= () => {

    i++;
  
    if(i > 3){
      i = 0;
    }
  
    setSome(i);
  
    console.log("did something");
  
  }

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="" element={<Home updateState={updateState}/>} />
        <Route path="/ueberuns" element={<Ueberuns />} />
        <Route path="/chooseKeyboard" element={<ChooseKeyboard />} />
        <Route path="/keyboard" element={<KeyboardMac />} />
        <Route path="/keyboardWin" element={<KeyboardWin />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/myProfile" /> : <Login to="/login" />}
        />
        <Route
          path="/regist"
          element={loggedIn ? <Navigate to="/myProfile" /> : <Regist to="/regist" />}
        />
        <Route
          path="/myProfile"
          element={
            loggedIn ? <MyProfile user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/loginErfolgreich"
          element={
            loggedIn ? <LoginErfolgreich user={user} /> : <Navigate to="/regist" />
          }
        />
      </Routes>
    </Router>
  );
          
  // apicall auf localhost:3000/user/ID
  // react fetch data
}
export default App;
