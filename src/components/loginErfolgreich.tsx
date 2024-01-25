import React from 'react';
import { useEffect} from 'react';
import "./css/login.css";
import { useNavigate, useLocation } from 'react-router-dom';

const LoginErfolgreich = () => {

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
    const { userName } = location.state;

    const handleButtonClick = () => {

        navigate('/myProfile');

    }

    return (
        <>
            <div className="warpper">

                <h1>Login Erfolgreich!</h1>

                <h2>Willkommen {userName}</h2>

                <button onClick={handleButtonClick}>MyProfile</button>

            </div>
        </>
    );
}

export default LoginErfolgreich;