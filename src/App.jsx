import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Keyboard from "./components/keyboard";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Ueberuns from "./components/ueberUns";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/ueberuns" element={<Ueberuns />} />
        <Route exact path="/keyboard" element={<Keyboard />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );

  // apicall auf localhost:3000/user/ID
  // react fetch data
}
export default App;
