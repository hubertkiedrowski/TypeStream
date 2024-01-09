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
                    <h1 className="header">Spaß mit Keyboards!!</h1>
                </div>

                <div className="form">

                    <div className="login">
                        <h2>Meld dich jetzt an!</h2>
                        <button onClick={onClickLogin}>Login</button>
                    </div>

                    <div className="regist">
                        <h2>Werd Teil der</h2>
                        <h2>Keyboard-Gang!</h2>
                        <button onClick={onClickRegist}>Sign Up!</button>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Home;