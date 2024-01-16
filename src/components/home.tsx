import React from 'react';
import "./css/home.css";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const onClickLogin = () => {
        navigate("/login");
    }

    const onClickRegist = () => {
        navigate("/regist");
    }

    return (

        <>  
            <div className="wrapper">

                <div className="headerDiv">
                    <div className="typing-container">
                        <h1 className="typing-text">Spaß mit Keyboards!!</h1>
                    </div>
                </div>

                <div className="form">

                    <div className="login">
                        <h2>Sign In</h2>
                        <button onClick={onClickLogin}>Sign in!</button>
                    </div>

                    <div className="regist">
                        <h2>Sign Up</h2>
                        <button onClick={onClickRegist}>Sign Up!</button>
                    </div>

                </div>


        <>
            
        </>
    );
}

export default Home;