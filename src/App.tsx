import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from './store';
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

const App: React.FC = () => {

  const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
  console.log(loggedIn)
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/ueberuns" element={<Ueberuns />} />
        <Route path="/chooseKeyboard" element={<ChooseKeyboard />} />
        <Route path="/keyboard" element={<KeyboardMac />} />
        <Route path="/keyboardWin" element={<KeyboardWin />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/myProfile" /> : <Login />}
        />
        <Route
          path="/regist"
          element={loggedIn ? <Navigate to="/myProfile" /> : <Regist />}
        />
        <Route
          path="/myProfile"
          element={
            loggedIn ? <MyProfile /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/loginErfolgreich"
          element={
            loggedIn ? <LoginErfolgreich /> : <Navigate to="/regist" />
          }
        />
      </Routes>
    </Router>
  );
          
  // apicall auf localhost:3000/user/ID
  // react fetch data
}
export default App;
