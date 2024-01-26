import React, { FormEvent, useState, useEffect} from 'react';
import "./css/login.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../reducer';

interface FormData {
    userName: string;
    email: string;
    password: string
}

const Login: React.FC = () => {
    console.log('Login component rendered');
    const dispatch = useDispatch();
    console.log('Login component rendered');
    const navigate = useNavigate();
 
    const [formData, setFormData] = useState<FormData>({
        userName: '',
        email: '',
        password: '',
    });

    const [loginError, setLoginError] = useState(false);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const authString = `${formData.email}:${formData.userName}:${formData.password}`;
            const base64Auth = btoa(authString);
            //console.log('Authentifizierungszeichenkette:', authString);

            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${base64Auth}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {

                const userDataLogged = await response.json();

                // Rufe den set-session-Endpunkt auf, um dem Server mitzuteilen, dass der Benutzer eingeloggt ist
                const responseSession = await fetch('http://localhost:3000/set-session', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userDataLogged),
                });

                if(responseSession.ok){

                    // Setze den lokalen Zustand für den eingeloggten Benutzer

                    // Global State
                    let userName = formData.userName;
                    let email = formData.email;
                    dispatch(login({ userName, email}));

                    console.log('Benutzer erfolgreich eingeloggt!');

                    navigate('/loginErfolgreich', { state: { userName: formData.userName } });

                } else {

                    console.error("No session!")

                }

            } else {

                console.error('Fehler beim Einloggen1', response.statusText);

                console.log('Fehlerobjekt:', await response.json());

                setLoginError(true);
            }
        } catch (error) {

            console.error('Fehler beim Einloggen:2', error);
            setLoginError(true);

        }
    };

    const handleButtonClick = () => {

        navigate('/regist');

    }

    return (
        <>
            <div className="warpper">

                <div className="formular">

                    <h2>Login</h2>

                    <form onSubmit={handleSubmit}>

                        <label className="innerForm" >Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                            className="innerForm" />

                        <label className="innerForm" >Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="innerForm" />

                        <label className="innerForm" >Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="innerForm" />

                        <a href="" className="forget">Forget password?</a>

                        {loginError && <p>Login fehlgeschlagen!</p>}

                        <button type="submit">Login</button>

                        <button onClick={handleButtonClick}>Regist</button>

                    </form>
                    
                </div>

            </div>
        </>
    );
}

export default Login;