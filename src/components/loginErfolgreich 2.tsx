import React from 'react';
import "./css/login.css";
import { useNavigate, useLocation } from 'react-router-dom';

const LoginErfolgreich = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { userName } = location.state;


    return (
        <>  
            <div className="warpper">

                <h1>Login Erfolgreich!</h1>

                <h2>Willkommen {userName}</h2>

            </div>
        </>
    );
}

export default LoginErfolgreich;