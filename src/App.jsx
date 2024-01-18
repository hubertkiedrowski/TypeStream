import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/ueberuns" element={<Ueberuns />} />
        <Route exact path="/chooseKeyboard" element={<ChooseKeyboard />} />
        <Route exact path="/keyboard" element={<KeyboardMac />} />
        <Route exact path="/keyboardWin" element={<KeyboardWin />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/regist" element={<Regist />} />
        <Route exact path="/loginErfolgreich" element={<LoginErfolgreich />} />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );

  // apicall auf localhost:3000/user/ID
  // react fetch data
}
export default App;
